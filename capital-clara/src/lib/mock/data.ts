// ============================================
// Capital Clara - Datos Mockup
// ============================================

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  whatsapp?: string;
  monto_invertido_total: number;
  nivel: 'inicial' | 'intermedio' | 'avanzado' | 'premium' | 'admin';
  created_at: string;
}

export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  monto_minimo: number;
  rendimiento_estimado: string;
  riesgo: string;
  duracion_estimada: string;
  activo: boolean;
  orden: number;
}

export interface Inversion {
  id: number;
  usuario_id: string;
  plan_id: number;
  monto: number;
  fecha_inversion: string;
  estado: 'activa' | 'completada' | 'cancelada';
  registrado_por: 'usuario' | 'admin';
  notas?: string;
  created_at: string;
}

export interface Recompensa {
  id: number;
  nombre: string;
  descripcion: string;
  umbral_monto: number;
  tipo: 'contenido' | 'vino' | 'curso' | 'experiencia' | 'asesoria' | 'viaje';
  valor_estimado: number;
  activo: boolean;
}

export interface RecompensaDesbloqueada {
  id: number;
  usuario_id: string;
  recompensa_id: number;
  fecha_desbloqueo: string;
  estado: 'disponible' | 'reclamada' | 'vencida';
}

export interface Notificacion {
  id: number;
  usuario_id: string;
  tipo: 'recompensa' | 'inversion' | 'alerta' | 'info';
  importancia: 'alta' | 'media' | 'baja';
  titulo: string;
  mensaje: string;
  leida: boolean;
  created_at: string;
}

// ============================================
// USUARIOS MOCKUP
// ============================================

export const usuariosIniciales: Usuario[] = [
  {
    id: 'user-1',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@email.com',
    password: '123456',
    whatsapp: '+54 9 11 1234-5678',
    monto_invertido_total: 750000,
    nivel: 'avanzado',
    created_at: '2025-09-15T10:30:00Z',
  },
  {
    id: 'user-2',
    nombre: 'María',
    apellido: 'García',
    email: 'maria@email.com',
    password: '123456',
    whatsapp: '+54 9 11 9876-5432',
    monto_invertido_total: 2500000,
    nivel: 'premium',
    created_at: '2025-08-20T14:15:00Z',
  },
  {
    id: 'user-3',
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos@email.com',
    password: '123456',
    whatsapp: '+54 9 11 5555-1234',
    monto_invertido_total: 30000,
    nivel: 'inicial',
    created_at: '2025-10-01T09:00:00Z',
  },
  {
    id: 'admin-1',
    nombre: 'Admin',
    apellido: 'Capital Clara',
    email: 'admin@capitalclara.com',
    password: 'admin123',
    whatsapp: '+54 9 11 0000-0000',
    monto_invertido_total: 0,
    nivel: 'admin',
    created_at: '2025-01-01T00:00:00Z',
  },
];

// ============================================
// PLANES MOCKUP
// ============================================

export const planesIniciales: Plan[] = [
  {
    id: 1,
    nombre: 'Plan Inicial',
    descripcion: 'Una forma sencilla de conocer el proceso y evaluar si el camino se relaciona con tus objetivos.',
    monto_minimo: 10000,
    rendimiento_estimado: '5%–8%',
    riesgo: 'Bajo',
    duracion_estimada: '12 meses',
    activo: true,
    orden: 1,
  },
  {
    id: 2,
    nombre: 'Plan Intermedio',
    descripcion: 'Una alternativa con más contexto para comparar plazos, objetivos y condiciones antes de consultar.',
    monto_minimo: 50000,
    rendimiento_estimado: '5%–8%',
    riesgo: 'Moderado',
    duracion_estimada: '18 meses',
    activo: true,
    orden: 2,
  },
  {
    id: 3,
    nombre: 'Plan Personalizado',
    descripcion: 'Una conversación para revisar tu situación, preguntas y necesidades antes de explorar una alternativa.',
    monto_minimo: 150000,
    rendimiento_estimado: 'Según perfil',
    riesgo: 'Variable',
    duracion_estimada: '24 meses',
    activo: true,
    orden: 3,
  },
];

// ============================================
// RECOMPENSAS MOCKUP
// ============================================

export const recompensasIniciales: Recompensa[] = [
  {
    id: 1,
    nombre: 'Acceso a contenido exclusivo',
    descripcion: 'Newsletter premium con análisis de mercado y oportunidades.',
    umbral_monto: 0,
    tipo: 'contenido',
    valor_estimado: 0,
    activo: true,
  },
  {
    id: 2,
    nombre: 'Vino premium',
    descripcion: 'Caja de vinos seleccionados de bodegas argentinas.',
    umbral_monto: 50000,
    tipo: 'vino',
    valor_estimado: 15000,
    activo: true,
  },
  {
    id: 3,
    nombre: 'Curso online de finanzas',
    descripcion: 'Acceso a nuestro curso completo de educación financiera.',
    umbral_monto: 100000,
    tipo: 'curso',
    valor_estimado: 25000,
    activo: true,
  },
  {
    id: 4,
    nombre: 'Experiencia gastronómica',
    descripcion: 'Cena para dos en restaurantes premium.',
    umbral_monto: 200000,
    tipo: 'experiencia',
    valor_estimado: 50000,
    activo: true,
  },
  {
    id: 5,
    nombre: 'Asesoría personalizada',
    descripcion: 'Sesión 1 a 1 con nuestro equipo de asesores.',
    umbral_monto: 350000,
    tipo: 'asesoria',
    valor_estimado: 75000,
    activo: true,
  },
  {
    id: 6,
    nombre: 'Viaje a Bariloche',
    descripcion: 'Weekend todo pago para dos en Bariloche.',
    umbral_monto: 500000,
    tipo: 'viaje',
    valor_estimado: 150000,
    activo: true,
  },
  {
    id: 7,
    nombre: 'Viaje a Mendoza',
    descripcion: 'Viaje de 4 días para dos en Mendoza con experiencias incluidas.',
    umbral_monto: 1000000,
    tipo: 'viaje',
    valor_estimado: 350000,
    activo: true,
  },
];

// ============================================
// INVERSIONES MOCKUP
// ============================================

export const inversionesIniciales: Inversion[] = [
  {
    id: 1,
    usuario_id: 'user-1',
    plan_id: 1,
    monto: 50000,
    fecha_inversion: '2025-09-20',
    estado: 'activa',
    registrado_por: 'usuario',
    created_at: '2025-09-20T10:30:00Z',
  },
  {
    id: 2,
    usuario_id: 'user-1',
    plan_id: 2,
    monto: 200000,
    fecha_inversion: '2025-10-05',
    estado: 'activa',
    registrado_por: 'admin',
    created_at: '2025-10-05T14:15:00Z',
  },
  {
    id: 3,
    usuario_id: 'user-1',
    plan_id: 3,
    monto: 500000,
    fecha_inversion: '2025-10-15',
    estado: 'activa',
    registrado_por: 'usuario',
    created_at: '2025-10-15T09:00:00Z',
  },
  {
    id: 4,
    usuario_id: 'user-2',
    plan_id: 3,
    monto: 1000000,
    fecha_inversion: '2025-08-25',
    estado: 'activa',
    registrado_por: 'admin',
    created_at: '2025-08-25T11:00:00Z',
  },
  {
    id: 5,
    usuario_id: 'user-2',
    plan_id: 3,
    monto: 1500000,
    fecha_inversion: '2025-09-10',
    estado: 'activa',
    registrado_por: 'usuario',
    created_at: '2025-09-10T16:30:00Z',
  },
  {
    id: 6,
    usuario_id: 'user-3',
    plan_id: 1,
    monto: 30000,
    fecha_inversion: '2025-10-01',
    estado: 'activa',
    registrado_por: 'usuario',
    created_at: '2025-10-01T09:00:00Z',
  },
];

// ============================================
// NOTIFICACIONES MOCKUP
// ============================================

export const notificacionesIniciales: Notificacion[] = [
  {
    id: 1,
    usuario_id: 'user-1',
    tipo: 'recompensa',
    importancia: 'alta',
    titulo: '¡Nueva recompensa desbloqueada!',
    mensaje: 'Felicitaciones, desbloqueaste: Viaje a Bariloche. Weekend todo pago para dos.',
    leida: false,
    created_at: '2025-10-15T09:00:00Z',
  },
  {
    id: 2,
    usuario_id: 'user-1',
    tipo: 'inversion',
    importancia: 'media',
    titulo: 'Inversión registrada',
    mensaje: 'Se registró tu inversión de $500.000 en Plan Personalizado.',
    leida: true,
    created_at: '2025-10-15T09:00:00Z',
  },
  {
    id: 3,
    usuario_id: 'user-2',
    tipo: 'recompensa',
    importancia: 'alta',
    titulo: '¡Nueva recompensa desbloqueada!',
    mensaje: 'Felicitaciones, desbloqueaste: Viaje a Mendoza. Viaje de 4 días para dos.',
    leida: false,
    created_at: '2025-09-10T16:30:00Z',
  },
  {
    id: 4,
    usuario_id: 'user-3',
    tipo: 'info',
    importancia: 'baja',
    titulo: 'Bienvenido a Capital Clara',
    mensaje: 'Gracias por registrarte. Explorá nuestros planes de inversión.',
    leida: true,
    created_at: '2025-10-01T09:00:00Z',
  },
];
