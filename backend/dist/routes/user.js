"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const mockup_1 = require("../data/mockup");
const router = (0, express_1.Router)();
// Obtener perfil del usuario
router.get('/profile', auth_1.authMiddleware, (req, res) => {
    const usuario = mockup_1.usuarios.find((u) => u.id === req.user?.id);
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
router.get('/descuentos', auth_1.authMiddleware, (req, res) => {
    const usuario = mockup_1.usuarios.find((u) => u.id === req.user?.id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Descuento por nivel del usuario
    const descuentoNivel = mockup_1.descuentos.find((d) => d.nivel === usuario.nivel && d.activo);
    res.json({
        success: true,
        descuentoUsuario: usuario.descuento,
        descuentoNivel: descuentoNivel || null,
        nivel: usuario.nivel,
    });
});
// Obtener cupones disponibles
router.get('/cupones', auth_1.authMiddleware, (req, res) => {
    const cuponesDisponibles = mockup_1.cupones.filter((c) => c.activo);
    res.json({
        success: true,
        cupones: cuponesDisponibles,
    });
});
// Reclamar cupón
router.post('/cupones/:id/reclamar', auth_1.authMiddleware, (req, res) => {
    const cupon = mockup_1.cupones.find((c) => c.id === req.params.id);
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
router.get('/promociones', auth_1.authMiddleware, (req, res) => {
    const usuario = mockup_1.usuarios.find((u) => u.id === req.user?.id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Promociones activas
    const promocionesActivas = mockup_1.promociones.filter((p) => p.activo);
    res.json({
        success: true,
        promociones: promocionesActivas,
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map