"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.adminMiddleware = adminMiddleware;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'capital-clara-secret-key-2024';
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            nivel: decoded.nivel,
            esAdmin: decoded.esAdmin || false,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}
function adminMiddleware(req, res, next) {
    if (!req.user?.esAdmin) {
        return res.status(403).json({ error: 'Acceso restringido a administradores' });
    }
    next();
}
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, nivel: user.nivel, esAdmin: user.esAdmin }, JWT_SECRET, { expiresIn: '7d' });
}
//# sourceMappingURL=auth.js.map