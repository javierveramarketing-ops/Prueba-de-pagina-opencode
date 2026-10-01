import { NextResponse, type NextRequest } from 'next/server';

// Rutas protegidas y públicas
const protectedRoutes = ['/dashboard'];
const adminRoutes = ['/admin'];
const publicRoutes = ['/login', '/'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta es protegida
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Obtener sesión del cookie (mockup)
  const session = request.cookies.get('capital_clara_auth')?.value;

  // Redirigir a /login si no está autenticado
  if ((isProtectedRoute || isAdminRoute) && !session) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirigir a /dashboard si ya está autenticado y trata de acceder a login
  if (isPublicRoute && session && pathname === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
