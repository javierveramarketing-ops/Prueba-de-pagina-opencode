'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '@/lib/mock/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = login(email, password);
        if (!result.success) {
          setError(result.error || 'Error al iniciar sesión');
          return;
        }
      } else {
        if (!nombre || !apellido) {
          setError('Completá nombre y apellido');
          return;
        }
        result = register(nombre, apellido, email, password);
        if (!result.success) {
          setError(result.error || 'Error al registrarse');
          return;
        }
      }

      // Redirigir según el nivel
      const user = result.usuario;
      if (user?.nivel === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError('Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f5ee] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#173a35] mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>
            <p className="text-sm text-[#42645d]">
              {isLogin
                ? 'Accedé a tu panel de inversiones'
                : 'Registrate para comenzar a invertir'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-[#173a35] mb-1">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-transparent"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-[#173a35] mb-1">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-transparent"
                    placeholder="Pérez"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#173a35] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#173a35] mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-[#dce3db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4ae68] bg-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#d4ae68] text-[#173a35] font-bold rounded-lg hover:bg-[#eed7a7] transition-colors disabled:opacity-50"
            >
              {loading ? 'Cargando...' : isLogin ? 'Ingresar' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#2e6758] hover:underline"
            >
              {isLogin ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
            </button>
          </div>

          {/* Usuarios de prueba */}
          <div className="mt-8 p-4 bg-[#f7f5ee] rounded-lg">
            <p className="text-xs font-bold text-[#42645d] mb-2">Usuarios de prueba:</p>
            <div className="space-y-1 text-xs text-[#42645d]">
              <p><strong>Usuario:</strong> juan@email.com / 123456</p>
              <p><strong>Admin:</strong> admin@capitalclara.com / admin123</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-[#42645d] hover:underline">
            ← Volver a la página principal
          </a>
        </div>
      </div>
    </main>
  );
}
