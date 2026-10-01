// ============================================
// Capital Clara - Autenticación Mockup
// ============================================

import { usuariosIniciales, type Usuario } from './data';

const AUTH_KEY = 'capital_clara_auth';
const USERS_KEY = 'capital_clara_users';

// Inicializar usuarios en localStorage si no existen
function initUsers() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usuariosIniciales));
  }
}

// Obtener todos los usuarios
export function getUsuarios(): Usuario[] {
  if (typeof window === 'undefined') return [];
  initUsers();
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Login
export function login(email: string, password: string): { success: boolean; usuario?: Usuario; error?: string } {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!usuario) {
    return { success: false, error: 'Email o contraseña incorrectos' };
  }

  // Guardar sesión
  localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: usuario.id }));
  return { success: true, usuario };
}

// Registro
export function register(nombre: string, apellido: string, email: string, password: string): { success: boolean; usuario?: Usuario; error?: string } {
  const usuarios = getUsuarios();

  // Verificar si ya existe
  if (usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Ya existe una cuenta con ese email' };
  }

  // Crear nuevo usuario
  const nuevoUsuario: Usuario = {
    id: `user-${Date.now()}`,
    nombre,
    apellido,
    email,
    password,
    monto_invertido_total: 0,
    nivel: 'inicial',
    created_at: new Date().toISOString(),
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));

  // Guardar sesión
  localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: nuevoUsuario.id }));
  return { success: true, usuario: nuevoUsuario };
}

// Obtener usuario actual
export function getCurrentUser(): Usuario | null {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return null;

  const { userId } = JSON.parse(auth);
  const usuarios = getUsuarios();
  return usuarios.find((u) => u.id === userId) || null;
}

// Logout
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

// Verificar si está autenticado
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Verificar si es admin
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.nivel === 'admin';
}
