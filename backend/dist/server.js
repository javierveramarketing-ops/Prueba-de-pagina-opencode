"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const promociones_1 = __importDefault(require("./routes/promociones"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Archivos estáticos (frontend)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rutas de la API
app.use('/api/auth', auth_1.default);
app.use('/api/user', user_1.default);
app.use('/api/promociones', promociones_1.default);
// Ruta principal - servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Frontend servido desde: ${path_1.default.join(__dirname, '../public')}`);
});
//# sourceMappingURL=server.js.map