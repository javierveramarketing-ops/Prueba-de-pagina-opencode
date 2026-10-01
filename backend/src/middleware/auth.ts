import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'capital-clara-secret-key-2024';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    nivel: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      id: decoded.id,
      email: decoded.email,
      nivel: decoded.nivel,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

export function generateToken(user: { id: string; email: string; nivel: string }): string {
  return jwt.sign(
    { id: user.id, email: user.email, nivel: user.nivel },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
