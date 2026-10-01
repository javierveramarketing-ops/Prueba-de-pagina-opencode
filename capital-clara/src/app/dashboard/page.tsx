'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, isAuthenticated } from '@/lib/mock/auth';
import {
  getInversiones,
  getPlanes,
  getRecompensas,
  getRecompensasDesbloqueadasWithDetails,
  getNotificaciones,
  createInversion,
  markNotificacionLeida,
} from '@/lib/mock/db';
import type { Usuario, Plan, Inversion, Recompensa, Notificacion } from '@/lib/mock/data';

interface RecompensaDesbloqueadaWithDetails {
  id: number;
  usuario_id: string;
  recompensa_id: number;
  fecha_desbloqueo: string;
  estado: string;
  recompensas: Recompensa;
}

export default function DashboardPage() {
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [inversiones, setInversiones] = useState<Inversion[]>([]);
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [recompensasDesbloqueadas, setRecompensasDesbloqueadas] = useState<RecompensaDesbloqueadaWithDetails[]>([]);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [montoNuevo, setMontoNuevo] = useState('');
  const [planId, setPlanId] = useState(1);
  const [planes, setPlanes] = useState<Plan[]>([]);
  const router = useRouter();

  const loadData = useCallback(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }

    setPerfil(user);
    setInversiones(getInversiones(user.id));
    setPlanes(getPlanes());
    setRecompensas(getRecompensas());
    setRecompensasDesbloqueadas(getRecompensasDesbloqueadasWithDetails().filter((r) => r.usuario_id === user.id));
    setNotificaciones(getNotificaciones(user.id));
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function registrarInversion() {
    if (!perfil || !montoNuevo || parseFloat(montoNuevo) <= 0) return;

    const result = createInversion(perfil.id, planId, parseFloat(montoNuevo), 'usuario');
    if (result.success) {
      setMontoNuevo('');
      setShowModal(false);
      loadData();
    }
  }

  async function handleMarkNotificacionLeida(id: number) {
    markNotificacionLeida(id);
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  }

  async function handleLogout() {
    logout();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f5ee]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4ae68] mx-auto mb-4"></div>
          <p className="text-[#42645d]">Cargando...</p>
        </div>
      </main>
    );
  }

  if (!perfil) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f5ee]">
      {/* Header */}
      <header className="bg-[#123b35] text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Capital Clara</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#c6dacb]">Hola, {perfil.nombre}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-[#d4ae68] text-[#123b35] px-4 py-2 rounded-lg font-medium hover:bg-[#eed7a7] transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Monto invertido total</p>
            <p className="text-3xl font-bold text-[#173a35]">
              ${perfil.monto_invertido_total.toLocaleString('es-AR')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Nivel actual</p>
            <p className="text-3xl font-bold text-[#d4ae68] capitalize">
              {perfil.nivel}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Inversiones activas</p>
            <p className="text-3xl font-bold text-[#173a35]">
              {inversiones.filter((i) => i.estado === 'activa').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Inversiones */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#173a35]">Mis Inversiones</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-[#d4ae68] text-[#173a35] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#eed7a7] transition-colors"
                >
                  + Registrar inversión
                </button>
              </div>

              {inversiones.length === 0 ? (
                <p className="text-[#42645d] text-center py-8">
                  Todavía no tenés inversiones registradas.
                </p>
              ) : (
                <div className="space-y-3">
                  {inversiones.map((inv) => {
                    const plan = planes.find((p) => p.id === inv.plan_id);
                    return (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-4 bg-[#f7f5ee] rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[#173a35]">
                            {plan?.nombre || 'Plan'}
                          </p>
                          <p className="text-sm text-[#42645d]">
                            {new Date(inv.fecha_inversion).toLocaleDateString('es-AR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#173a35]">
                            ${inv.monto.toLocaleString('es-AR')}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              inv.estado === 'activa'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {inv.estado}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recompensas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#173a35] mb-6">Recompensas Disponibles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recompensas.map((recompensa) => {
                  const desbloqueada = recompensasDesbloqueadas.some(
                    (rd) => rd.recompensas.id === recompensa.id
                  );
                  const montoActual = perfil.monto_invertido_total;
                  const progreso = Math.min(100, (montoActual / recompensa.umbral_monto) * 100);

                  return (
                    <div
                      key={recompensa.id}
                      className={`p-4 rounded-lg border ${
                        desbloqueada
                          ? 'bg-[#d4ae68]/10 border-[#d4ae68]'
                          : 'bg-[#f7f5ee] border-[#dce3db]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-[#173a35]">{recompensa.nombre}</h3>
                        {desbloqueada && (
                          <span className="text-xs bg-[#d4ae68] text-[#173a35] px-2 py-1 rounded-full font-medium">
                            Desbloqueada
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#42645d] mb-3">{recompensa.descripcion}</p>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-[#42645d] mb-1">
                          <span>Progreso</span>
                          <span>
                            ${montoActual.toLocaleString('es-AR')} / $
                            {recompensa.umbral_monto.toLocaleString('es-AR')}
                          </span>
                        </div>
                        <div className="h-2 bg-[#dce3db] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#d4ae68] rounded-full transition-all"
                            style={{ width: `${progreso}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notificaciones */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#173a35] mb-4">Notificaciones</h2>
              {notificaciones.length === 0 ? (
                <p className="text-[#42645d] text-sm">No tenés notificaciones.</p>
              ) : (
                <div className="space-y-3">
                  {notificaciones.slice(0, 10).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg border ${
                        notif.leida
                          ? 'bg-[#f7f5ee] border-[#dce3db]'
                          : 'bg-[#d4ae68]/10 border-[#d4ae68]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-sm text-[#173a35]">{notif.titulo}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            notif.importancia === 'alta'
                              ? 'bg-red-100 text-red-700'
                              : notif.importancia === 'media'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {notif.importancia}
                        </span>
                      </div>
                      <p className="text-xs text-[#42645d] mb-2">{notif.mensaje}</p>
                      {!notif.leida && (
                        <button
                          onClick={() => handleMarkNotificacionLeida(notif.id)}
                          className="text-xs text-[#2e6758] hover:underline"
                        >
                          Marcar como leída
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Perfil */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#173a35] mb-4">Mi Perfil</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#42645d]">Nombre</p>
                  <p className="font-medium text-[#173a35]">{perfil.nombre} {perfil.apellido}</p>
                </div>
                <div>
                  <p className="text-xs text-[#42645d]">Email</p>
                  <p className="font-medium text-[#173a35]">{perfil.email}</p>
                </div>
                <div>
                  <p className="text-xs text-[#42645d]">WhatsApp</p>
                  <p className="font-medium text-[#173a35]">{perfil.whatsapp || 'No configurado'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal nueva inversión */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#173a35] mb-4">Registrar Inversión</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#173a35] mb-1">Plan</label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-white"
                >
                  {planes.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#173a35] mb-1">Monto</label>
                <input
                  type="number"
                  value={montoNuevo}
                  onChange={(e) => setMontoNuevo(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-[#dce3db] rounded-lg text-[#173a35] font-medium hover:bg-[#f7f5ee] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={registrarInversion}
                className="flex-1 py-3 bg-[#d4ae68] text-[#173a35] rounded-lg font-medium hover:bg-[#eed7a7] transition-colors"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
