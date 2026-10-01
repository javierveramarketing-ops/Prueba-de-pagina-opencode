import { Router, Request, Response } from 'express';
import { promociones } from '../data/mockup';

const router = Router();

// Obtener todas las promociones (público)
router.get('/', (req: Request, res: Response) => {
  const promocionesActivas = promociones.filter((p) => p.activo);

  res.json({
    success: true,
    promociones: promocionesActivas,
  });
});

// Obtener promoción por ID
router.get('/:id', (req: Request, res: Response) => {
  const promocion = promociones.find((p) => p.id === req.params.id);

  if (!promocion) {
    return res.status(404).json({ error: 'Promoción no encontrada' });
  }

  res.json({
    success: true,
    promocion,
  });
});

export default router;
