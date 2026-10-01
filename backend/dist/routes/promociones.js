"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockup_1 = require("../data/mockup");
const router = (0, express_1.Router)();
// Obtener todas las promociones (público)
router.get('/', (req, res) => {
    const promocionesActivas = mockup_1.promociones.filter((p) => p.activo);
    res.json({
        success: true,
        promociones: promocionesActivas,
    });
});
// Obtener promoción por ID
router.get('/:id', (req, res) => {
    const promocion = mockup_1.promociones.find((p) => p.id === req.params.id);
    if (!promocion) {
        return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.json({
        success: true,
        promocion,
    });
});
exports.default = router;
//# sourceMappingURL=promociones.js.map