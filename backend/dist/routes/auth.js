"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mockup_1 = require("../data/mockup");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }
        // Buscar usuario
        const usuario = mockup_1.usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        // Verificar contraseña
        const passwordValida = await bcryptjs_1.default.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        // Generar token
        const token = (0, auth_1.generateToken)({
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
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Registro
router.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, password, whatsapp } = req.body;
        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        // Verificar si ya existe
        const existe = mockup_1.usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (existe) {
            return res.status(400).json({ error: 'Ya existe una cuenta con ese email' });
        }
        // Crear nuevo usuario
        const nuevoUsuario = {
            id: `user-${Date.now()}`,
            nombre,
            apellido,
            email,
            password: await bcryptjs_1.default.hash(password, 10),
            whatsapp,
            nivel: 'inicial',
            descuento: 5,
            fechaRegistro: new Date().toISOString().split('T')[0],
        };
        mockup_1.usuarios.push(nuevoUsuario);
        // Generar token
        const token = (0, auth_1.generateToken)({
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
    }
    catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
// Logout (el cliente elimina el token)
router.post('/logout', (req, res) => {
    res.json({ success: true, message: 'Sesión cerrada' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map