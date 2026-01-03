# 🔗 Guía de Integración Frontend-Backend

Esta guía te ayudará a poner en marcha todo el sistema con el frontend conectado al backend.

## 📋 Resumen de cambios

### ✅ Backend (NestJS)
- ✅ API REST con autenticación JWT
- ✅ Prisma ORM con PostgreSQL
- ✅ Módulos: Auth, Practitioners
- ✅ Tokens almacenados en cookies HTTP-only
- ✅ CORS configurado
- ✅ Seeds de datos de prueba

### ✅ Frontend (Next.js)
- ✅ Páginas de login y registro
- ✅ Contexto de autenticación global
- ✅ Servicios de API (auth y practitioners)
- ✅ Componentes de protección de rutas
- ✅ Página de búsqueda conectada a la API
- ✅ Header con menú de usuario autenticado

## 🚀 Pasos para iniciar

### 1. Configurar el Backend

```bash
cd server

# Crear archivo .env (si no existe)
cat > .env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/podiatrists_db?schema=public"
JWT_SECRET="tu-secreto-super-seguro-cambiar-en-produccion"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"
CLIENT_URL="http://localhost:3000"
PORT=3001
EOL

# Instalar dependencias (si no están instaladas)
pnpm install

# Crear la base de datos y ejecutar migraciones
npx prisma migrate dev --name init

# Poblar la base de datos con datos de prueba
npx prisma db seed

# Iniciar el servidor
pnpm run start:dev
```

El servidor estará corriendo en `http://localhost:3001`

### 2. Configurar el Frontend

```bash
cd client

# Crear archivo .env.local
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NODE_ENV=development
EOL

# Instalar dependencias (si no están instaladas)
pnpm install

# Iniciar el cliente
pnpm run dev
```

El cliente estará corriendo en `http://localhost:3000`

### 3. Iniciar ambos desde la raíz (Recomendado)

```bash
# Desde la raíz del proyecto
pnpm run dev
```

Este comando inicia tanto el servidor como el cliente simultáneamente.

## 🔐 Credenciales de prueba

Después de ejecutar el seed, puedes usar estas credenciales:

```
Email: admin@example.com
Password: password123
```

O puedes crear una cuenta nueva desde la página de registro.

## 🧪 Probar la integración

### 1. Página de inicio
- Visita `http://localhost:3000`
- Deberías ver la página de inicio con categorías, testimonios y podólogos destacados
- Los podólogos destacados se cargan desde la API

### 2. Registro
- Ve a `http://localhost:3000/register`
- Crea una cuenta nueva
- Serás redirigido automáticamente a la página de inicio
- El header mostrará tu nombre y un menú de usuario

### 3. Login
- Ve a `http://localhost:3000/login`
- Inicia sesión con las credenciales de prueba
- Serás redirigido a la página de inicio
- El header mostrará tu información de usuario

### 4. Búsqueda
- Ve a `http://localhost:3000/search`
- Busca podólogos por nombre, ciudad o especialidad
- Los resultados se cargan desde la API
- Puedes filtrar por ciudad, especialidad y solo verificados

### 5. Logout
- Haz clic en tu nombre en el header
- Selecciona "Cerrar sesión"
- Serás desconectado y las cookies se eliminarán

## 📁 Archivos creados/modificados

### Frontend (`client/`)

**Nuevos archivos:**
- `lib/api-client.ts` - Cliente HTTP base con manejo de errores
- `lib/services/auth.service.ts` - Servicio de autenticación
- `lib/services/practitioners.service.ts` - Servicio de podólogos
- `contexts/AuthContext.tsx` - Contexto de autenticación global
- `app/login/page.tsx` - Página de login
- `app/register/page.tsx` - Página de registro
- `app/search/page.tsx` - Página de búsqueda
- `components/ProtectedRoute.tsx` - HOC para rutas protegidas
- `components/GuestRoute.tsx` - HOC para rutas de invitados
- `README_CLIENT.md` - Documentación del cliente

**Archivos modificados:**
- `app/layout.tsx` - Agregado AuthProvider
- `components/home/HomeHeader.tsx` - Agregado menú de usuario
- `components/SearchBar.tsx` - Mejorado diseño
- `components/ResultsList.tsx` - Mejorado diseño y tipado
- `components/home/FeaturedPractitioners.tsx` - Mejorado diseño
- `lib/practitioners.ts` - Actualizado para usar nuevo servicio

### Backend (`server/`)

**Archivos creados en sesiones anteriores:**
- `prisma/schema.prisma` - Schema de la base de datos
- `prisma/seed.ts` - Seeds de datos de prueba
- `src/prisma/` - Módulo de Prisma
- `src/auth/` - Módulo de autenticación
- `src/practitioners/` - Módulo de podólogos
- `README_API.md` - Documentación de la API

## 🔧 Solución de problemas

### Error: Cannot connect to database
- Asegúrate de que PostgreSQL esté corriendo
- Verifica que la `DATABASE_URL` en `.env` sea correcta
- Crea la base de datos manualmente si es necesario:
  ```bash
  createdb podiatrists_db
  ```

### Error: CORS
- Verifica que `CLIENT_URL` en `server/.env` sea `http://localhost:3000`
- Reinicia el servidor después de cambiar variables de entorno

### Error: 401 Unauthorized
- Las cookies pueden no estar siendo enviadas
- Verifica que ambos servicios estén en localhost
- Limpia las cookies del navegador y vuelve a iniciar sesión

### Los podólogos no se cargan
- Verifica que el servidor esté corriendo
- Verifica que `NEXT_PUBLIC_API_URL` en `client/.env.local` sea correcto
- Ejecuta el seed si la base de datos está vacía:
  ```bash
  cd server && npx prisma db seed
  ```

## 📚 Endpoints de la API

### Auth
- `POST /api/v1/auth/register` - Registro de usuario
- `POST /api/v1/auth/login` - Login de usuario
- `GET /api/v1/auth/me` - Obtener perfil (requiere auth)
- `POST /api/v1/auth/logout` - Logout (requiere auth)

### Practitioners
- `GET /api/v1/practitioners` - Listar podólogos (con búsqueda y filtros)
- `GET /api/v1/practitioners/:slug` - Obtener podólogo por slug

**Parámetros de búsqueda:**
- `q` - Búsqueda por texto (nombre, bio)
- `city` - Filtrar por ciudad
- `postalCode` - Filtrar por código postal
- `service` - Filtrar por especialidad
- `verified` - Solo verificados (true/false)
- `page` - Número de página (default: 1)
- `perPage` - Resultados por página (default: 10, max: 50)

## 🎯 Próximos pasos

1. **Página de perfil de podólogo** - Crear vista detallada de cada podólogo
2. **Sistema de reseñas** - Permitir a usuarios dejar reseñas
3. **Sistema de citas** - Implementar reserva de citas
4. **Panel de administración** - Para gestionar podólogos y usuarios
5. **Notificaciones** - Email y push notifications
6. **Búsqueda geográfica** - Buscar por ubicación y radio

## 📞 Soporte

Si encuentras algún problema, revisa:
1. Los logs del servidor (`server/`)
2. La consola del navegador
3. Los archivos `.env` y `.env.local`
4. Que ambos servicios estén corriendo

---

¡Todo listo para empezar a desarrollar! 🚀

