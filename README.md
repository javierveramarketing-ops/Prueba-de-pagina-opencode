# Capital Clara

Landing page + API para captar consultas sobre oportunidades de inversión, con
registro de usuarios, panel de usuario y panel de administración.

## Estructura del repositorio

```
Prueba-de-pagina-opencode/
├── backend/          # v2 activa — Express + TypeScript + frontend estático (desplegada)
├── capital-clara/    # v3 parked  — reescritura en Next.js 16 + Supabase (en desarrollo)
├── .gitignore
├── README.md
└── render.yaml
```

| Carpeta         | Qué es                                                                                          | Estado                                       |
| --------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `backend/`      | API Express + TypeScript, y el frontend estático que se sirve desde `/public`                      | **Activa y desplegada** en Render             |
| `capital-clara/`| Rewrite del mismo producto en Next.js 16 (App Router) + Tailwind v4 + Supabase                      | Parked: en desarrollo, no desplegada         |

> La carpeta `capital-clara/` es una reimplementación del producto con otro stack. Convive
> con `backend/` pero **no está conectada ni desplegada**: para levantarla hace falta
> `npm install` dentro de esa carpeta y configurar las variables de Supabase.

## Backend (`backend/`)

### Scripts

| Script            | Qué hace                                                          |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga automática (`tsx watch`)        |
| `npm run build`   | Compila TypeScript a `dist/`                                      |
| `npm run clean`   | Borra `dist/`                                                      |
| `npm start`       | Compila (`prestart`) y arranca el servidor en `dist/server.js`     |

> `npm start` ejecuta `prestart` automáticamente, así que nunca hay que acordarse de
> compilar antes. En producción, Render compila en el `buildCommand` y arranca con
> `node dist/server.js` (ver `render.yaml`).

### Arranque local

```bash
cd backend
npm install
npm start
```

- Frontend: <http://localhost:3000>
- Panel de administración: <http://localhost:3000/admin>

### API

Todas las rutas cuelgan de `/api`. Las marcadas con 🔒 requieren el header
`Authorization: Bearer <token>`.

#### Autenticación — `/api/auth`

| Método | Ruta         | Descripción                                  |
| ------ | ------------ | -------------------------------------------- |
| POST   | `/login`     | Inicia sesión y devuelve el token JWT        |
| POST   | `/register`  | Crea una cuenta y devuelve el token JWT      |
| POST   | `/logout`    | El cliente descarta el token                 |

#### Usuario — `/api/user`

| Método | Ruta                          | Descripción                        |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/profile`                    | 🔒 Perfil del usuario autenticado  |
| GET    | `/descuentos`                 | 🔒 Descuentos por nivel            |
| GET    | `/cupones`                    | 🔒 Cupones disponibles             |
| POST   | `/cupones/:id/reclamar`       | 🔒 Reclama un cupón                |
| GET    | `/promociones`                | 🔒 Promociones disponibles         |
| GET    | `/inversiones`                | 🔒 Inversiones del usuario         |
| POST   | `/inversiones`                | 🔒 Registra una inversión          |
| GET    | `/notificaciones`             | 🔒 Notificaciones del usuario      |
| PUT    | `/notificaciones/:id/leer`    | 🔒 Marca una notificación como leída |
| PUT    | `/notificaciones/leer-todas`  | 🔒 Marca todas como leídas        |
| GET    | `/dashboard`                  | 🔒 Resumen de progreso y niveles  |

#### Administración — `/api/admin`

🔒 Requiere token **y** que el usuario sea administrador (`esAdmin: true`).

| Método | Ruta             | Descripción                   |
| ------ | ---------------- | ----------------------------- |
| GET    | `/cupones`       | Listar cupones                |
| POST   | `/cupones`       | Crear cupón                   |
| PUT    | `/cupones/:id`   | Actualizar cupón              |
| DELETE | `/cupones/:id`   | Eliminar cupón                |
| GET    | `/promociones`   | Listar promociones            |
| POST   | `/promociones`   | Crear promoción               |
| PUT    | `/promociones/:id` | Actualizar promoción         |
| DELETE | `/promociones/:id` | Eliminar promoción           |
| GET    | `/usuarios`      | Listar usuarios                |

#### Público — `/api/promociones`

| Método | Ruta      | Descripción                       |
| ------ | --------- | --------------------------------- |
| GET    | `/`       | Promociones activas                |
| GET    | `/:id`    | Una promoción por id              |

### Usuarios de prueba

Los datos viven en memoria (`backend/src/data/mockup.ts`), así que se reinician en cada
despliegue. Contraseña de todos: `123456`.

| Email                      | Nivel      | Descuento | Admin |
| -------------------------- | ---------- | --------- | ----- |
| `juan@email.com`           | `avanzado` | 15%       | no    |
| `maria@email.com`          | `premium`  | 20%       | no    |
| `admin@capitalclara.com`   | `premium`  | 20%       | **sí** |

### Variables de entorno

| Variable     | Para qué sirve                             | Por defecto                          |
| ------------ | ------------------------------------------ | ------------------------------------ |
| `JWT_SECRET` | Firma de los tokens                        | `capital-clara-secret-key-2024`      |
| `PORT`       | Puerto del servidor                        | `3000`                               |

En Render, `JWT_SECRET` se genera automáticamente desde `render.yaml`.

### Deploy

`render.yaml` define el servicio: `rootDir: backend`, `npm install && npm run build`
en el build y `node dist/server.js` en el start.

## Pendientes antes de publicar

1. **WhatsApp** — en `backend/public/script.js`, reemplazar `WHATSAPP_NUMBER` por el
   número internacional oficial, sin espacios ni signos (ej. `5491100000000`). Mientras
   quede vacío, los botones caen al formulario de contacto y el envío se hace por correo.
2. **Email** — reemplazar `contacto@capitalclara.com` (en `backend/public/script.js` y en
   `backend/public/index.html`) por el email real.
3. **Textos** — cambiar el nombre provisional **Capital Clara** y los textos de los planes
   (`planDetails` en `backend/public/script.js`).
4. **Datos legales** — completar privacidad y la advertencia de riesgo con una revisión
   profesional adecuada.
5. **Normativa** — verificar la normativa aplicable en Argentina antes de publicar u ofrecer
   productos financieros.
6. **Datos reales** — `backend/src/data/mockup.ts` es mock en memoria. Para producción hay
   que persistir usuarios, cupones, promociones e inversiones en una base de datos.
