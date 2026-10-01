import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { usuarios, Usuario } from '../data/mockup';
import { generateToken } from '../middleware/auth';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const usuario = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar token
    const token = generateToken({
      id: usuario.id,
      email: usuario.email,
      nivel: usuario.nivel,
    });

    // Devolver datos del usuario (sin contraseña)
    const { password: _, ...usuarioSinPassword } = usuario;

    res.json({
      success: true,
      token,
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Registro
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, password, whatsapp } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si ya existe
    const existe = usuarios.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existe) {
      return res.status(400).json({ error: 'Ya existe una cuenta con ese email' });
    }

    // Crear nuevo usuario
    const nuevoUsuario: Usuario = {
      id: `user-${Date.now()}`,
      nombre,
      apellido,
      email,
      password: await bcrypt.hash(password, 10),
      whatsapp,
      nivel: 'inicial',
      descuento: 5,
      fechaRegistro: new Date().toISOString().split('T')[0],
    };

    usuarios.push(nuevoUsuario);

    // Generar token
    const token = generateToken({
      id: nuevoUsuario.id,
      email: nuevoUsuario.email,
      nivel: nuevoUsuario.nivel,
    });

    const { password: _, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json({
      success: true,
      token,
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Logout (el cliente elimina el token)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Sesión cerrada' });
});

export default router;
