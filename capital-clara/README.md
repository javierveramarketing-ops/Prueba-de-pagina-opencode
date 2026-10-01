# Capital Clara - Next.js + Supabase

## Descripción

Landing page para Capital Clara con sistema de autenticación, panel de usuario y panel de administración.

## Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS v4
- **Backend**: Supabase (Auth + PostgreSQL)
- **Fuentes**: DM Sans + Manrope (Google Fonts)

## Estructura del Proyecto

```
capital-clara/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Estilos globales
│   │   ├── login/page.tsx      # Login / Registro
│   │   ├── dashboard/page.tsx  # Panel de usuario
│   │   └── admin/page.tsx      # Panel de administración
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts       # Cliente de Supabase (browser)
│   │       ├── server.ts       # Cliente de Supabase (server)
│   │       └── middleware.ts   # Middleware de autenticación
│   └── proxy.ts                # Proxy (protección de rutas)
├── supabase-schema.sql         # Esquema de base de datos
├── .env.local                  # Variables de entorno
└── package.json
```

## Configuración Inicial

### 1. Crear proyecto en Supabase

1. Ir a https://supabase.com
2. Crear un nuevo proyecto
3. Copiar la URL y la anon key

### 2. Configurar variables de entorno

Editar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 3. Crear las tablas en Supabase

1. Ir a Supabase Dashboard → SQL Editor
2. Copiar y ejecutar el contenido de `supabase-schema.sql`

### 4. Configurar Auth en Supabase

1. Ir a Supabase Dashboard → Authentication
2. Habilitar "Email" provider
3. Opcional: Habilitar "Google" provider

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## Rutas

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Landing page | Público |
| `/login` | Login / Registro | Público |
| `/dashboard` | Panel de usuario | Privado |
| `/admin` | Panel de administración | Privado |

## Funcionalidades

### Landing Page
- Diseño responsive
- Secciones: Hero, Enfoque, Oportunidades, Proceso, Aprende, FAQ, Contacto, Legal
- Links a login para funcionalidades privadas

### Autenticación
- Registro con email y contraseña
- Login con email y contraseña
- Recuperación de contraseña (vía Supabase)

### Dashboard de Usuario
- Ver monto invertido total
- Ver nivel actual
- Ver inversiones registradas
- Registrar nueva inversión
- Ver recompensas desbloqueadas
- Ver notificaciones

### Panel de Administración
- Ver todos los usuarios
- Ver todas las inversiones
- Cargar inversiones a usuarios
- Ver estadísticas generales

## Sistema de Recompensas

| Monto | Recompensa |
|-------|------------|
| $0+ | Acceso a contenido exclusivo |
| $50.000+ | Vino premium |
| $100.000+ | Curso online de finanzas |
| $200.000+ | Experiencia gastronómica |
| $350.000+ | Asesoría personalizada |
| $500.000+ | Viaje a Bariloche |
| $1.000.000+ | Viaje a Mendoza |

## Sistema de Notificaciones

| Importancia | Canales |
|-------------|---------|
| Alta | App + WhatsApp + Email |
| Media | App + Email |
| Baja | Solo App |

## Próximos Pasos

1. [ ] Configurar Supabase Auth con Google
2. [ ] Implementar notificaciones por email (Resend)
3. [ ] Implementar notificaciones por WhatsApp (Twilio)
4. [ ] Agregar más planes de inversión
5. [ ] Personalizar recompensas
6. [ ] Agregar más funcionalidades al dashboard
