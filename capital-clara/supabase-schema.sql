-- ============================================
-- Capital Clara - Esquema de Base de Datos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Perfiles de usuario (extiende auth.users)
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  apellido TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  monto_invertido_total DECIMAL(12,2) DEFAULT 0,
  nivel TEXT DEFAULT 'inicial',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Planes de inversión
CREATE TABLE IF NOT EXISTS planes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  monto_minimo DECIMAL(12,2),
  rendimiento_estimado TEXT,
  riesgo TEXT,
  duracion_estimada TEXT,
  activo BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0
);

-- Inversiones registradas
CREATE TABLE IF NOT EXISTS inversiones (
  id SERIAL PRIMARY KEY,
  usuario_id UUID REFERENCES perfiles(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES planes(id),
  monto DECIMAL(12,2) NOT NULL,
  fecha_inversion DATE DEFAULT CURRENT_DATE,
  estado TEXT DEFAULT 'activa',
  registrado_por TEXT DEFAULT 'usuario',
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Recompensas / Beneficios
CREATE TABLE IF NOT EXISTS recompensas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  umbral_monto DECIMAL(12,2) NOT NULL,
  tipo TEXT NOT NULL,
  valor_estimado DECIMAL(12,2),
  imagen_url TEXT,
  activo BOOLEAN DEFAULT true,
  stock INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
  id SERIAL PRIMARY KEY,
  usuario_id UUID REFERENCES perfiles(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  importancia TEXT NOT NULL,
  titulo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Recompensas desbloqueadas por usuario
CREATE TABLE IF NOT EXISTS recompensas_desbloqueadas (
  id SERIAL PRIMARY KEY,
  usuario_id UUID REFERENCES perfiles(id) ON DELETE CASCADE,
  recompensa_id INTEGER REFERENCES recompensas(id),
  fecha_desbloqueo TIMESTAMPTZ DEFAULT now(),
  estado TEXT DEFAULT 'disponible',
  UNIQUE(usuario_id, recompensa_id)
);

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_inversiones_usuario ON inversiones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_recompensas_desbloqueadas_usuario ON recompensas_desbloqueadas(usuario_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inversiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE recompensas ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE recompensas_desbloqueadas ENABLE ROW LEVEL SECURITY;

-- Perfiles: los usuarios pueden ver y editar su propio perfil
CREATE POLICY "Usuarios pueden ver su propio perfil" ON perfiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden editar su propio perfil" ON perfiles
  FOR UPDATE USING (auth.uid() = id);

-- Planes: todos pueden ver los planes activos
CREATE POLICY "Todos pueden ver planes activos" ON planes
  FOR SELECT USING (activo = true);

-- Inversiones: los usuarios pueden ver sus propias inversiones
CREATE POLICY "Usuarios pueden ver sus inversiones" ON inversiones
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden crear sus inversiones" ON inversiones
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Recompensas: todos pueden ver las recompensas activas
CREATE POLICY "Todos pueden ver recompensas activas" ON recompensas
  FOR SELECT USING (activo = true);

-- Notificaciones: los usuarios pueden ver sus propias notificaciones
CREATE POLICY "Usuarios pueden ver sus notificaciones" ON notificaciones
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden actualizar sus notificaciones" ON notificaciones
  FOR UPDATE USING (auth.uid() = usuario_id);

-- Recompensas desbloqueadas: los usuarios pueden ver las suyas
CREATE POLICY "Usuarios pueden ver sus recompensas desbloqueadas" ON recompensas_desbloqueadas
  FOR SELECT USING (auth.uid() = usuario_id);

-- ============================================
-- FUNCIÓN: Actualizar monto invertido total
-- ============================================
CREATE OR REPLACE FUNCTION actualizar_monto_invertido()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE perfiles
  SET monto_invertido_total = (
    SELECT COALESCE(SUM(monto), 0)
    FROM inversiones
    WHERE usuario_id = NEW.usuario_id AND estado = 'activa'
  ),
  updated_at = now()
  WHERE id = NEW.usuario_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_monto_invertido
AFTER INSERT OR UPDATE OR DELETE ON inversiones
FOR EACH ROW EXECUTE FUNCTION actualizar_monto_invertido();

-- ============================================
-- FUNCIÓN: Verificar y desbloquear recompensas
-- ============================================
CREATE OR REPLACE FUNCTION verificar_recompensas()
RETURNS TRIGGER AS $$
DECLARE
  recompensa RECORD;
BEGIN
  FOR recompensa IN
    SELECT * FROM recompensas
    WHERE activo = true
    AND umbral_monto <= NEW.monto_invertido_total
    AND NOT EXISTS (
      SELECT 1 FROM recompensas_desbloqueadas
      WHERE usuario_id = NEW.id AND recompensa_id = recompensas.id
    )
  LOOP
    INSERT INTO recompensas_desbloqueadas (usuario_id, recompensa_id)
    VALUES (NEW.id, recompensa.id);

    INSERT INTO notificaciones (usuario_id, tipo, importancia, titulo, mensaje)
    VALUES (
      NEW.id,
      'recompensa',
      CASE
        WHEN recompensa.tipo = 'viaje' THEN 'alta'
        WHEN recompensa.tipo = 'experiencia' THEN 'media'
        ELSE 'baja'
      END,
      '¡Nueva recompensa desbloqueada!',
      'Felicitaciones, desbloqueaste: ' || recompensa.nombre || '. ' || recompensa.descripcion
    );
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_verificar_recompensas
AFTER UPDATE OF monto_invertido_total ON perfiles
FOR EACH ROW EXECUTE FUNCTION verificar_recompensas();

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Planes de inversión
INSERT INTO planes (nombre, descripcion, monto_minimo, rendimiento_estimado, riesgo, duracion_estimada, orden)
VALUES
  ('Plan Inicial', 'Una forma sencilla de conocer el proceso y evaluar si el camino se relaciona con tus objetivos.', 10000, '5%–8%', 'Bajo', '12 meses', 1),
  ('Plan Intermedio', 'Una alternativa con más contexto para comparar plazos, objetivos y condiciones antes de consultar.', 50000, '5%–8%', 'Moderado', '18 meses', 2),
  ('Plan Personalizado', 'Una conversación para revisar tu situación, preguntas y necesidades antes de explorar una alternativa.', 150000, 'Según perfil', 'Variable', '24 meses', 3);

-- Recompensas
INSERT INTO recompensas (nombre, descripcion, umbral_monto, tipo, valor_estimado, activo)
VALUES
  ('Acceso a contenido exclusivo', 'Newsletter premium con análisis de mercado y oportunidades.', 0, 'contenido', 0, true),
  ('Vino premium', 'Caja de vinos seleccionados de bodegas argentinas.', 50000, 'vino', 15000, true),
  ('Curso online de finanzas', 'Acceso a nuestro curso completo de educación financiera.', 100000, 'curso', 25000, true),
  ('Experiencia gastronómica', 'Cena para dos en restaurantes premium.', 200000, 'experiencia', 50000, true),
  ('Asesoría personalizada', 'Sesión 1 a 1 con nuestro equipo de asesores.', 350000, 'asesoria', 75000, true),
  ('Viaje a Bariloche', 'Weekend todo pago para dos en Bariloche.', 500000, 'viaje', 150000, true),
  ('Viaje a Mendoza', 'Viaje de 4 días para dos en Mendoza con experiencias incluidas.', 1000000, 'viaje', 350000, true);
