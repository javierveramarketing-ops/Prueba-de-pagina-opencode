"use strict";
// ============================================
// Capital Clara - Datos Mockup
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.descuentos = exports.promociones = exports.cupones = exports.usuarios = void 0;
// ============================================
// USUARIOS MOCKUP (2 usuarios)
// ============================================
// Hash de "123456" con bcrypt (10 rounds)
const HASH_123456 = '$2a$10$QV0NR94ZcqYRPv9vXBf7NOWZTIKqCNtL8mWV0JtAH35ADR0ngDYk6';
exports.usuarios = [
    {
        id: 'user-1',
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@email.com',
        password: HASH_123456,
        whatsapp: '+54 9 11 1234-5678',
        nivel: 'avanzado',
        descuento: 15,
        fechaRegistro: '2025-09-15',
    },
    {
        id: 'user-2',
        nombre: 'María',
        apellido: 'García',
        email: 'maria@email.com',
        password: HASH_123456,
        whatsapp: '+54 9 11 9876-5432',
        nivel: 'premium',
        descuento: 20,
        fechaRegistro: '2025-08-20',
    },
];
// ============================================
// CUPONES
// ============================================
exports.cupones = [
    {
        id: 'cupon-1',
        codigo: 'BIENVENIDA2024',
        descripcion: 'Cupón de bienvenida - $5.000 de descuento',
        descuento: 5000,
        tipo: 'fijo',
        expiracion: '2026-12-31',
        usosMaximos: 100,
        usosActuales: 23,
        activo: true,
    },
    {
        id: 'cupon-2',
        codigo: 'VIAJE50',
        descripcion: '10% de descuento en viajes',
        descuento: 10,
        tipo: 'porcentaje',
        expiracion: '2026-11-30',
        usosMaximos: 50,
        usosActuales: 12,
        activo: true,
    },
    {
        id: 'cupon-3',
        codigo: 'FIESTA100',
        descripcion: '$10.000 de descuento en experiencias',
        descuento: 10000,
        tipo: 'fijo',
        expiracion: '2026-10-15',
        usosMaximos: 30,
        usosActuales: 8,
        activo: true,
    },
];
// ============================================
// PROMOCIONES
// ============================================
exports.promociones = [
    {
        id: 'promo-1',
        titulo: 'Viaje a Bariloche',
        descripcion: 'Weekend todo pago para dos en Bariloche. Incluye alojamiento, comidas y actividades.',
        tipo: 'viaje',
        umbralMonto: 500000,
        activo: true,
        vigencia: '2026-12-31',
    },
    {
        id: 'promo-2',
        titulo: 'Vino Premium',
        descripcion: 'Caja de vinos seleccionados de bodegas argentinas.',
        tipo: 'vino',
        umbralMonto: 50000,
        activo: true,
        vigencia: '2026-12-31',
    },
    {
        id: 'promo-3',
        titulo: 'Curso Online de Finanzas',
        descripcion: 'Acceso completo a nuestro curso de educación financiera.',
        tipo: 'curso',
        umbralMonto: 100000,
        activo: true,
        vigencia: '2026-12-31',
    },
    {
        id: 'promo-4',
        titulo: 'Experiencia Gastronómica',
        descripcion: 'Cena para dos en restaurantes premium.',
        tipo: 'experiencia',
        umbralMonto: 200000,
        activo: true,
        vigencia: '2026-12-31',
    },
    {
        id: 'promo-5',
        titulo: 'Asesoría Personalizada',
        descripcion: 'Sesión 1 a 1 con nuestro equipo de asesores.',
        tipo: 'asesoria',
        umbralMonto: 350000,
        activo: true,
        vigencia: '2026-12-31',
    },
];
// ============================================
// DESCUENTOS POR NIVEL
// ============================================
exports.descuentos = [
    {
        id: 'desc-1',
        nombre: 'Descuento Inicial',
        descripcion: '5% de descuento en todas las inversiones',
        porcentaje: 5,
        nivel: 'inicial',
        activo: true,
    },
    {
        id: 'desc-2',
        nombre: 'Descuento Intermedio',
        descripcion: '10% de descuento en todas las inversiones',
        porcentaje: 10,
        nivel: 'intermedio',
        activo: true,
    },
    {
        id: 'desc-3',
        nombre: 'Descuento Avanzado',
        descripcion: '15% de descuento en todas las inversiones',
        porcentaje: 15,
        nivel: 'avanzado',
        activo: true,
    },
    {
        id: 'desc-4',
        nombre: 'Descuento Premium',
        descripcion: '20% de descuento en todas las inversiones',
        porcentaje: 20,
        nivel: 'premium',
        activo: true,
    },
];
//# sourceMappingURL=mockup.js.map