export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    whatsapp?: string;
    nivel: 'inicial' | 'intermedio' | 'avanzado' | 'premium';
    descuento: number;
    fechaRegistro: string;
}
export interface Cupon {
    id: string;
    codigo: string;
    descripcion: string;
    descuento: number;
    tipo: 'porcentaje' | 'fijo';
    expiracion: string;
    usosMaximos: number;
    usosActuales: number;
    activo: boolean;
}
export interface Promocion {
    id: string;
    titulo: string;
    descripcion: string;
    tipo: 'viaje' | 'vino' | 'curso' | 'experiencia' | 'asesoria';
    umbralMonto: number;
    imagenUrl?: string;
    activo: boolean;
    vigencia: string;
}
export interface Descuento {
    id: string;
    nombre: string;
    descripcion: string;
    porcentaje: number;
    nivel: 'inicial' | 'intermedio' | 'avanzado' | 'premium';
    activo: boolean;
}
export declare const usuarios: Usuario[];
export declare const cupones: Cupon[];
export declare const promociones: Promocion[];
export declare const descuentos: Descuento[];
//# sourceMappingURL=mockup.d.ts.map