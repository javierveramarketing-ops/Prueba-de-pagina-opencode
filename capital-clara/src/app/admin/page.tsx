'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, isAdmin } from '@/lib/mock/auth';
import {
  getAllUsuarios,
  getInversionesWithUser,
  createInversion,
} from '@/lib/mock/db';
import type { Usuario, Inversion } from '@/lib/mock/data';

interface InversionWithUser extends Inversion {
  perfiles: { nombre: string; email: string } | null;
}

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [inversiones, setInversiones] = useState<InversionWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [monto, setMonto] = useState('');
  const [notif, setNotif] = useState('');
  const router = useRouter();

  const loadData = useCallback(() => {
    const user = getCurrentUser();
    if (!user || !isAdmin()) {
      router.push('/login');
      return;
    }

    setUsuarios(getAllUsuarios());
    setInversiones(getInversionesWithUser());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function cargarInversion() {
    if (!selectedUser || !monto || parseFloat(monto) <= 0) return;

    const result = createInversion(selectedUser, 1, parseFloat(monto), 'admin');
    if (result.success) {
      setMonto('');
      setSelectedUser('');
      setShowModal(false);
      setNotif('Inversión cargada correctamente');
      loadData();
      setTimeout(() => setNotif(''), 3000);
    }
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

  return (
    <main className="min-h-screen bg-[#f7f5ee]">
      {/* Header */}
      <header className="bg-[#123b35] text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Capital Clara</h1>
            <span className="text-xs bg-[#d4ae68] text-[#123b35] px-2 py-1 rounded-full font-bold">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-[#c6dacb] hover:text-white transition-colors"
            >
              Ver dashboard
            </button>
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
        {notif && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-sm text-green-800">
            {notif}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Total usuarios</p>
            <p className="text-3xl font-bold text-[#173a35]">{usuarios.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Inversiones totales</p>
            <p className="text-3xl font-bold text-[#173a35]">{inversiones.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Monto total invertido</p>
            <p className="text-3xl font-bold text-[#d4ae68]">
              ${inversiones.reduce((sum, inv) => sum + inv.monto, 0).toLocaleString('es-AR')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-sm text-[#42645d] mb-1">Inversiones admin</p>
            <p className="text-3xl font-bold text-[#173a35]">
              {inversiones.filter((i) => i.registrado_por === 'admin').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Usuarios */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#173a35] mb-6">Usuarios Registrados</h2>
            {usuarios.length === 0 ? (
              <p className="text-[#42645d] text-center py-8">No hay usuarios registrados.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {usuarios.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-[#f7f5ee] rounded-lg">
                    <div>
                      <p className="font-medium text-[#173a35]">{user.nombre} {user.apellido}</p>
                      <p className="text-sm text-[#42645d]">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#173a35]">
                        ${user.monto_invertido_total.toLocaleString('es-AR')}
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#d4ae68]/10 text-[#d4ae68] capitalize">
                        {user.nivel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inversiones */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#173a35]">Últimas Inversiones</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#d4ae68] text-[#173a35] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#eed7a7] transition-colors"
              >
                + Cargar inversión
              </button>
            </div>
            {inversiones.length === 0 ? (
              <p className="text-[#42645d] text-center py-8">No hay inversiones registradas.</p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {inversiones.slice(0, 20).map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 bg-[#f7f5ee] rounded-lg">
                    <div>
                      <p className="font-medium text-[#173a35]">
                        {inv.perfiles?.nombre || 'Usuario'}
                      </p>
                      <p className="text-sm text-[#42645d]">
                        {new Date(inv.fecha_inversion).toLocaleDateString('es-AR')}
                        {inv.registrado_por === 'admin' && (
                          <span className="ml-2 text-xs bg-[#d4ae68]/10 text-[#d4ae68] px-2 py-0.5 rounded-full">Admin</span>
                        )}
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal cargar inversión */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#173a35] mb-4">Cargar Inversión</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#173a35] mb-1">Usuario</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-white"
                >
                  <option value="">Seleccionar usuario...</option>
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nombre} {user.apellido} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#173a35] mb-1">Monto</label>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
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
                onClick={cargarInversion}
                className="flex-1 py-3 bg-[#d4ae68] text-[#173a35] rounded-lg font-medium hover:bg-[#eed7a7] transition-colors"
              >
                Cargar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
