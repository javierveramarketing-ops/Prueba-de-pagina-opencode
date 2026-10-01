// ============================================
// Capital Clara - Base de Datos Mockup
// ============================================

import {
  planesIniciales,
  recompensasIniciales,
  inversionesIniciales,
  notificacionesIniciales,
  type Plan,
  type Inversion,
  type Recompensa,
  type RecompensaDesbloqueada,
  type Notificacion,
  type Usuario,
} from './data';
import { getUsuarios } from './auth';

const PLANS_KEY = 'capital_clara_planes';
const REWARDS_KEY = 'capital_clara_recompensas';
const INVESTMENTS_KEY = 'capital_clara_inversiones';
const NOTIFICATIONS_KEY = 'capital_clara_notificaciones';
const UNLOCKED_KEY = 'capital_clara_recompensas_desbloqueadas';

// Inicializar datos si no existen
function initData() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(PLANS_KEY)) {
    localStorage.setItem(PLANS_KEY, JSON.stringify(planesIniciales));
  }
  if (!localStorage.getItem(REWARDS_KEY)) {
    localStorage.setItem(REWARDS_KEY, JSON.stringify(recompensasIniciales));
  }
  if (!localStorage.getItem(INVESTMENTS_KEY)) {
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(inversionesIniciales));
  }
  if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificacionesIniciales));
  }
  if (!localStorage.getItem(UNLOCKED_KEY)) {
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify([]));
  }
}

// ============================================
// PLANES
// ============================================

export function getPlanes(): Plan[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(PLANS_KEY);
  return data ? JSON.parse(data) : [];
}

// ============================================
// INVERSIONES
// ============================================

export function getInversiones(usuarioId?: string): Inversion[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(INVESTMENTS_KEY);
  const inversiones: Inversion[] = data ? JSON.parse(data) : [];

  if (usuarioId) {
    return inversiones.filter((i) => i.usuario_id === usuarioId);
  }
  return inversiones;
}

export function getInversionesWithUser(): (Inversion & { perfiles: { nombre: string; email: string } | null })[] {
  const inversiones = getInversiones();
  const usuarios = getUsuarios();

  return inversiones.map((inv) => {
    const usuario = usuarios.find((u) => u.id === inv.usuario_id);
    return {
      ...inv,
      perfiles: usuario ? { nombre: usuario.nombre, email: usuario.email } : null,
    };
  });
}

export function createInversion(
  usuarioId: string,
  planId: number,
  monto: number,
  registradoPor: 'usuario' | 'admin' = 'usuario'
): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'No disponible' };

  const inversiones = getInversiones();
  const nuevaInversion: Inversion = {
    id: Date.now(),
    usuario_id: usuarioId,
    plan_id: planId,
    monto,
    fecha_inversion: new Date().toISOString().split('T')[0],
    estado: 'activa',
    registrado_por: registradoPor,
    created_at: new Date().toISOString(),
  };

  inversiones.push(nuevaInversion);
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(inversiones));

  // Actualizar monto total del usuario
  actualizarMontoUsuario(usuarioId);

  // Verificar recompensas
  verificarRecompensas(usuarioId);

  return { success: true };
}

function actualizarMontoUsuario(usuarioId: string) {
  const inversiones = getInversiones(usuarioId);
  const total = inversiones
    .filter((i) => i.estado === 'activa')
    .reduce((sum, i) => sum + i.monto, 0);

  const usuarios = getUsuarios();
  const usuarioIndex = usuarios.findIndex((u) => u.id === usuarioId);
  if (usuarioIndex >= 0) {
    usuarios[usuarioIndex].monto_invertido_total = total;
    // Actualizar nivel
    if (total >= 1000000) {
      usuarios[usuarioIndex].nivel = 'premium';
    } else if (total >= 500000) {
      usuarios[usuarioIndex].nivel = 'avanzado';
    } else if (total >= 50000) {
      usuarios[usuarioIndex].nivel = 'intermedio';
    } else {
      usuarios[usuarioIndex].nivel = 'inicial';
    }
    localStorage.setItem('capital_clara_users', JSON.stringify(usuarios));
  }
}

// ============================================
// RECOMPENSAS
// ============================================

export function getRecompensas(): Recompensa[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(REWARDS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getRecompensasDesbloqueadas(usuarioId: string): RecompensaDesbloqueada[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(UNLOCKED_KEY);
  const desbloqueadas: RecompensaDesbloqueada[] = data ? JSON.parse(data) : [];
  return desbloqueadas.filter((d) => d.usuario_id === usuarioId);
}

export function getRecompensasDesbloqueadasWithDetails(): (RecompensaDesbloqueada & { recompensas: Recompensa })[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(UNLOCKED_KEY);
  const desbloqueadas: RecompensaDesbloqueada[] = data ? JSON.parse(data) : [];
  const recompensas = getRecompensas();

  return desbloqueadas
    .map((d) => {
      const recompensa = recompensas.find((r) => r.id === d.recompensa_id);
      return recompensa ? { ...d, recompensas: recompensa } : null;
    })
    .filter(Boolean) as (RecompensaDesbloqueada & { recompensas: Recompensa })[];
}

function verificarRecompensas(usuarioId: string) {
  const usuarios = getUsuarios();
  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) return;

  const recompensas = getRecompensas();
  const desbloqueadas = getRecompensasDesbloqueadas(usuarioId);
  const notificaciones = getNotificaciones(usuarioId);

  for (const recompensa of recompensas) {
    if (!recompensa.activo) continue;
    if (recompensa.umbral_monto > usuario.monto_invertido_total) continue;

    // Verificar ya está desbloqueada
    if (desbloqueadas.some((d) => d.recompensa_id === recompensa.id)) continue;

    // Desbloquear
    const nuevaDesbloqueada: RecompensaDesbloqueada = {
      id: Date.now(),
      usuario_id: usuarioId,
      recompensa_id: recompensa.id,
      fecha_desbloqueo: new Date().toISOString(),
      estado: 'disponible',
    };

    const data = localStorage.getItem(UNLOCKED_KEY);
    const todasDesbloqueadas: RecompensaDesbloqueada[] = data ? JSON.parse(data) : [];
    todasDesbloqueadas.push(nuevaDesbloqueada);
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify(todasDesbloqueadas));

    // Crear notificación
    const importancia = recompensa.tipo === 'viaje' ? 'alta' : recompensa.tipo === 'experiencia' ? 'media' : 'baja';
    const nuevaNotificacion: Notificacion = {
      id: Date.now(),
      usuario_id: usuarioId,
      tipo: 'recompensa',
      importancia,
      titulo: '¡Nueva recompensa desbloqueada!',
      mensaje: `Felicitaciones, desbloqueaste: ${recompensa.nombre}. ${recompensa.descripcion}`,
      leida: false,
      created_at: new Date().toISOString(),
    };

    const notifData = localStorage.getItem(NOTIFICATIONS_KEY);
    const todasNotificaciones: Notificacion[] = notifData ? JSON.parse(notifData) : [];
    todasNotificaciones.push(nuevaNotificacion);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(todasNotificaciones));
  }
}

// ============================================
// NOTIFICACIONES
// ============================================

export function getNotificaciones(usuarioId: string): Notificacion[] {
  if (typeof window === 'undefined') return [];
  initData();
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  const notificaciones: Notificacion[] = data ? JSON.parse(data) : [];
  return notificaciones
    .filter((n) => n.usuario_id === usuarioId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function markNotificacionLeida(notificacionId: number) {
  if (typeof window === 'undefined') return;

  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  const notificaciones: Notificacion[] = data ? JSON.parse(data) : [];
  const index = notificaciones.findIndex((n) => n.id === notificacionId);

  if (index >= 0) {
    notificaciones[index].leida = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notificaciones));
  }
}

// ============================================
// USUARIOS (para admin)
// ============================================

export function getAllUsuarios(): Usuario[] {
  return getUsuarios();
}
