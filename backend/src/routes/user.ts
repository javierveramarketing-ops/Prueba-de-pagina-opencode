import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { usuarios, cupones, promociones, descuentos } from '../data/mockup';

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

export default router;
