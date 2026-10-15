import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { usuarios, cupones, promociones, descuentos, inversiones, notificaciones, Inversion, Notificacion } from '../data/mockup';

const router = Router();

// Obtener perfil del usuario
router.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuario = usuarios.find((u) => u.id === req.user?.id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { password: _, ...usuarioSinPassword } = usuario;

  res.json({
    success: true,
    usuario: usuarioSinPassword,
  });
});

// Obtener descuentos del usuario
router.get('/descuentos', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuario = usuarios.find((u) => u.id === req.user?.id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Descuento por nivel del usuario
  const descuentoNivel = descuentos.find((d) => d.nivel === usuario.nivel && d.activo);

  res.json({
    success: true,
    descuentoUsuario: usuario.descuento,
    descuentoNivel: descuentoNivel || null,
    nivel: usuario.nivel,
  });
});

// Obtener cupones disponibles
router.get('/cupones', authMiddleware, (req: AuthRequest, res: Response) => {
  const cuponesDisponibles = cupones.filter((c) => c.activo);

  res.json({
    success: true,
    cupones: cuponesDisponibles,
  });
});

// Reclamar cupón
router.post('/cupones/:id/reclamar', authMiddleware, (req: AuthRequest, res: Response) => {
  const cupon = cupones.find((c) => c.id === req.params.id);

  if (!cupon) {
    return res.status(404).json({ error: 'Cupón no encontrado' });
  }

  if (!cupon.activo) {
    return res.status(400).json({ error: 'Cupón no disponible' });
  }

  if (cupon.usosActuales >= cupon.usosMaximos) {
    return res.status(400).json({ error: 'Cupón agotado' });
  }

  // Incrementar usos
  cupon.usosActuales++;

  res.json({
    success: true,
    message: 'Cupón reclamado correctamente',
    cupon,
  });
});

// Obtener promociones del usuario
router.get('/promociones', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuario = usuarios.find((u) => u.id === req.user?.id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Promociones activas
  const promocionesActivas = promociones.filter((p) => p.activo);

  res.json({
    success: true,
    promociones: promocionesActivas,
  });
});

// ============================================
// INVERSIONES
// ============================================

// Obtener inversiones del usuario
router.get('/inversiones', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuarioInversiones = inversiones.filter((i) => i.userId === req.user?.id);

  // Calcular total invertido
  const totalInvertido = usuarioInversiones
    .filter((i) => i.estado !== 'pendiente')
    .reduce((sum, i) => sum + i.monto, 0);

  // Calcular descuento aplicable según el total
  let descuentoAplicable = 5;
  if (totalInvertido >= 1000000) descuentoAplicable = 20;
  else if (totalInvertido >= 500000) descuentoAplicable = 15;
  else if (totalInvertido >= 100000) descuentoAplicable = 10;

  // Promociones desbloqueadas
  const promocionesDesbloqueadas = promociones
    .filter((p) => p.activo && totalInvertido >= p.umbralMonto)
    .map((p) => p.titulo);

  res.json({
    success: true,
    inversiones: usuarioInversiones,
    totalInvertido,
    descuentoAplicable,
    promocionesDesbloqueadas,
  });
});

// Crear inversión
router.post('/inversiones', authMiddleware, (req: AuthRequest, res: Response) => {
  const { monto, plan, descripcion } = req.body;

  if (!monto || !plan) {
    return res.status(400).json({ error: 'Monto y plan son requeridos' });
  }

  if (monto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
  }

  const nuevaInversion: Inversion = {
    id: `inv-${Date.now()}`,
    userId: req.user!.id,
    monto,
    plan,
    descripcion: descripcion || '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'activa',
  };

  inversiones.push(nuevaInversion);

  // Verificar si alcanzó alguna promoción
  const totalInvertido = inversiones
    .filter((i) => i.userId === req.user!.id && i.estado !== 'pendiente')
    .reduce((sum, i) => sum + i.monto, 0);

  const promoAlcanzada = promociones.find(
    (p) => p.activo && totalInvertido >= p.umbralMonto
  );

  // Crear notificación si alcanzó una promoción
  if (promoAlcanzada) {
    const notif: Notificacion = {
      id: `notif-${Date.now()}`,
      userId: req.user!.id,
      titulo: '¡Felicidades! Promoción desbloqueada',
      mensaje: `Alcanzaste la promoción "${promoAlcanzada.titulo}". ${promoAlcanzada.descripcion}`,
      tipo: 'promocion',
      prioridad: 'alta',
      leida: false,
      fecha: new Date().toISOString(),
    };
    notificaciones.push(notif);
  }

  res.status(201).json({
    success: true,
    inversion: nuevaInversion,
    promoAlcanzada: promoAlcanzada || null,
  });
});

// ============================================
// NOTIFICACIONES
// ============================================

// Obtener notificaciones del usuario
router.get('/notificaciones', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuarioNotifs = notificaciones
    .filter((n) => n.userId === req.user?.id)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const noLeidas = usuarioNotifs.filter((n) => !n.leida).length;

  res.json({
    success: true,
    notificaciones: usuarioNotifs,
    noLeidas,
  });
});

// Marcar notificación como leída
router.put('/notificaciones/:id/leer', authMiddleware, (req: AuthRequest, res: Response) => {
  const notif = notificaciones.find(
    (n) => n.id === req.params.id && n.userId === req.user?.id
  );

  if (!notif) {
    return res.status(404).json({ error: 'Notificación no encontrada' });
  }

  notif.leida = true;
  res.json({ success: true, notificacion: notif });
});

// Marcar todas como leídas
router.put('/notificaciones/leer-todas', authMiddleware, (req: AuthRequest, res: Response) => {
  notificaciones
    .filter((n) => n.userId === req.user?.id)
    .forEach((n) => (n.leida = true));

  res.json({ success: true, message: 'Todas las notificaciones marcadas como leídas' });
});

// ============================================
// DASHBOARD
// ============================================

router.get('/dashboard', authMiddleware, (req: AuthRequest, res: Response) => {
  const usuarioInversiones = inversiones
    .filter((i) => i.userId === req.user?.id)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  // Evolución acumulada por fecha
  const evolucion: { fecha: string; acumulado: number }[] = [];
  let acumulado = 0;
  const porFecha = new Map<string, number>();

  usuarioInversiones
    .filter((i) => i.estado !== 'pendiente')
    .forEach((i) => {
      porFecha.set(i.fecha, (porFecha.get(i.fecha) || 0) + i.monto);
    });

  Array.from(porFecha.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .forEach(([fecha, monto]) => {
      acumulado += monto;
      evolucion.push({ fecha, acumulado });
    });

  // Inversiones por plan
  const porPlan: Record<string, number> = { inicial: 0, intermedio: 0, personalizado: 0 };
  usuarioInversiones
    .filter((i) => i.estado !== 'pendiente')
    .forEach((i) => {
      porPlan[i.plan] = (porPlan[i.plan] || 0) + i.monto;
    });

  const totalInvertido = acumulado;

  // Próxima promoción a alcanzar
  const siguientePromo = promociones
    .filter((p) => p.activo && p.umbralMonto > totalInvertido)
    .sort((a, b) => a.umbralMonto - b.umbralMonto)[0];

  // Promociones alcanzadas
  const promosAlcanzadas = promociones.filter(
    (p) => p.activo && totalInvertido >= p.umbralMonto
  );

  // Nivel actual por descuento
  let nivel = 'Inicial';
  let proximoNivel = null;
  if (totalInvertido >= 1000000) nivel = 'Premium';
  else if (totalInvertido >= 500000) nivel = 'Avanzado';
  else if (totalInvertido >= 100000) nivel = 'Intermedio';

  const niveles = [
    { nombre: 'Inicial', umbral: 0, descuento: 5 },
    { nombre: 'Intermedio', umbral: 100000, descuento: 10 },
    { nombre: 'Avanzado', umbral: 500000, descuento: 15 },
    { nombre: 'Premium', umbral: 1000000, descuento: 20 },
  ];

  const nivelActual = niveles.find((n) => n.nombre === nivel)!;
  proximoNivel = niveles.find((n) => n.umbral > totalInvertido) || null;

  const progresoNivel = proximoNivel
    ? ((totalInvertido - nivelActual.umbral) / (proximoNivel.umbral - nivelActual.umbral)) * 100
    : 100;

  res.json({
    success: true,
    evolucion,
    porPlan,
    totalInvertido,
    cantidadInversiones: usuarioInversiones.filter((i) => i.estado !== 'pendiente').length,
    nivelActual: nivelActual.nombre,
    descuentoNivel: nivelActual.descuento,
    proximoNivel: proximoNivel
      ? { nombre: proximoNivel.nombre, umbral: proximoNivel.umbral, descuento: proximoNivel.descuento }
      : null,
    progresoNivel: Math.min(100, Math.max(0, progresoNivel)),
    promocionesAlcanzadas: promosAlcanzadas.map((p) => p.titulo),
    siguientePromocion: siguientePromo
      ? { titulo: siguientePromo.titulo, umbral: siguientePromo.umbralMonto, tipo: siguientePromo.tipo }
      : null,
    progresoSiguientePromo: siguientePromo
      ? Math.min(100, (totalInvertido / siguientePromo.umbralMonto) * 100)
      : 100,
  });
});

export default router;
