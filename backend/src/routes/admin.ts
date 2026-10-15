import { Router, Response } from 'express';
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth';
import { cupones, promociones, usuarios, Cupon, Promocion } from '../data/mockup';

const router = Router();

// Todas las rutas requieren auth + admin
router.use(authMiddleware, adminMiddleware);

// ============================================
// CUPONES
// ============================================

// Listar todos los cupones
router.get('/cupones', (req: AuthRequest, res: Response) => {
  res.json({ success: true, cupones });
});

// Crear cupón
router.post('/cupones', (req: AuthRequest, res: Response) => {
  const { codigo, descripcion, descuento, tipo, expiracion, usosMaximos } = req.body;

  if (!codigo || !descripcion || descuento === undefined || !tipo || !expiracion) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Verificar que el código no exista
  const existe = cupones.some((c) => c.codigo.toUpperCase() === codigo.toUpperCase());
  if (existe) {
    return res.status(400).json({ error: 'Ya existe un cupón con ese código' });
  }

  const nuevoCupon: Cupon = {
    id: `cupon-${Date.now()}`,
    codigo: codigo.toUpperCase(),
    descripcion,
    descuento,
    tipo,
    expiracion,
    usosMaximos: usosMaximos || 100,
    usosActuales: 0,
    activo: true,
  };

  cupones.push(nuevoCupon);
  res.status(201).json({ success: true, cupon: nuevoCupon });
});

// Actualizar cupón
router.put('/cupones/:id', (req: AuthRequest, res: Response) => {
  const cupon = cupones.find((c) => c.id === req.params.id);
  if (!cupon) {
    return res.status(404).json({ error: 'Cupón no encontrado' });
  }

  const { codigo, descripcion, descuento, tipo, expiracion, usosMaximos, activo } = req.body;

  if (codigo) cupon.codigo = codigo.toUpperCase();
  if (descripcion) cupon.descripcion = descripcion;
  if (descuento !== undefined) cupon.descuento = descuento;
  if (tipo) cupon.tipo = tipo;
  if (expiracion) cupon.expiracion = expiracion;
  if (usosMaximos !== undefined) cupon.usosMaximos = usosMaximos;
  if (activo !== undefined) cupon.activo = activo;

  res.json({ success: true, cupon });
});

// Eliminar cupón
router.delete('/cupones/:id', (req: AuthRequest, res: Response) => {
  const index = cupones.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Cupón no encontrado' });
  }

  cupones.splice(index, 1);
  res.json({ success: true, message: 'Cupón eliminado' });
});

// ============================================
// PROMOCIONES
// ============================================

// Listar todas las promociones
router.get('/promociones', (req: AuthRequest, res: Response) => {
  res.json({ success: true, promociones });
});

// Crear promoción
router.post('/promociones', (req: AuthRequest, res: Response) => {
  const { titulo, descripcion, tipo, umbralMonto, vigencia } = req.body;

  if (!titulo || !descripcion || !tipo || umbralMonto === undefined || !vigencia) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const nuevaPromo: Promocion = {
    id: `promo-${Date.now()}`,
    titulo,
    descripcion,
    tipo,
    umbralMonto,
    activo: true,
    vigencia,
  };

  promociones.push(nuevaPromo);
  res.status(201).json({ success: true, promocion: nuevaPromo });
});

// Actualizar promoción
router.put('/promociones/:id', (req: AuthRequest, res: Response) => {
  const promo = promociones.find((p) => p.id === req.params.id);
  if (!promo) {
    return res.status(404).json({ error: 'Promoción no encontrada' });
  }

  const { titulo, descripcion, tipo, umbralMonto, vigencia, activo } = req.body;

  if (titulo) promo.titulo = titulo;
  if (descripcion) promo.descripcion = descripcion;
  if (tipo) promo.tipo = tipo;
  if (umbralMonto !== undefined) promo.umbralMonto = umbralMonto;
  if (vigencia) promo.vigencia = vigencia;
  if (activo !== undefined) promo.activo = activo;

  res.json({ success: true, promocion: promo });
});

// Eliminar promoción
router.delete('/promociones/:id', (req: AuthRequest, res: Response) => {
  const index = promociones.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Promoción no encontrada' });
  }

  promociones.splice(index, 1);
  res.json({ success: true, message: 'Promoción eliminada' });
});

// ============================================
// USUARIOS
// ============================================

// Listar usuarios (sin contraseñas)
router.get('/usuarios', (req: AuthRequest, res: Response) => {
  const usuariosSinPassword = usuarios.map(({ password, ...rest }) => rest);
  res.json({ success: true, usuarios: usuariosSinPassword });
});

export default router;
