# API Backend - Directorio de Podólogos

API profesional desarrollada con NestJS, Prisma y PostgreSQL con autenticación JWT y cookies seguras.

## 🚀 Características

- ✅ Autenticación JWT con cookies HTTP-only
- ✅ Búsqueda avanzada de podólogos (texto, ciudad, ubicación)
- ✅ Validación de datos con class-validator
- ✅ CORS configurado para frontend
- ✅ Prisma ORM con PostgreSQL
- ✅ Seeds de datos de prueba
- ✅ TypeScript estricto

## 📋 Requisitos Previos

- Node.js >= 18
- PostgreSQL >= 14
- pnpm >= 8.8.0

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd server
pnpm install
```

### 2. Configurar base de datos

Crea una base de datos PostgreSQL:

```bash
createdb podiatrists_db
```

O usando psql:

```sql
CREATE DATABASE podiatrists_db;
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/podiatrists_db?schema=public"
JWT_SECRET="tu-clave-secreta-muy-segura"
JWT_REFRESH_SECRET="tu-clave-refresh-muy-segura"
FRONTEND_URL="http://localhost:3000"
```

### 4. Ejecutar migraciones y seeds

```bash
# Generar cliente de Prisma
pnpm prisma:generate

# Ejecutar migraciones
pnpm prisma:migrate

# Poblar base de datos con datos de prueba
pnpm prisma:seed

# O todo en uno:
pnpm db:setup
```

### 5. Iniciar servidor

```bash
# Desarrollo
pnpm start:dev

# Producción
pnpm build
pnpm start:prod
```

El servidor estará disponible en: `http://localhost:3001/api/v1`

## 📚 Endpoints de la API

### Autenticación

#### POST `/api/v1/auth/register`
Registrar nuevo usuario

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+34 123 456 789"
}
```

#### POST `/api/v1/auth/login`
Iniciar sesión

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

#### POST `/api/v1/auth/refresh`
Refrescar token

```json
{
  "refreshToken": "eyJhbGc..."
}
```

#### GET `/api/v1/auth/me`
Obtener perfil del usuario autenticado (requiere autenticación)

#### POST `/api/v1/auth/logout`
Cerrar sesión (limpia cookies)

### Podólogos

#### GET `/api/v1/practitioners`
Buscar podólogos (público)

**Query params:**
- `q` - Búsqueda de texto libre
- `city` - Filtrar por ciudad
- `postalCode` - Filtrar por código postal
- `service` - Filtrar por servicio
- `lat` & `lng` - Coordenadas para búsqueda por proximidad
- `radius` - Radio en metros (default: 20000)
- `verified` - Solo verificados (true/false)
- `page` - Número de página (default: 1)
- `perPage` - Resultados por página (default: 20, max: 100)

**Ejemplo:**
```
GET /api/v1/practitioners?city=Madrid&verified=true&page=1&perPage=10
```

**Respuesta:**
```json
{
  "meta": {
    "total": 45,
    "page": 1,
    "perPage": 10,
    "totalPages": 5
  },
  "data": [
    {
      "id": "1",
      "name": "Dr. Juan Pérez",
      "slug": "dr-juan-perez",
      "bio": "Especialista en biomecánica...",
      "city": "Madrid",
      "verified": true,
      "rating": 4.8,
      "reviewCount": 45,
      "services": [...]
    }
  ]
}
```

#### GET `/api/v1/practitioners/:slug`
Obtener perfil completo de un podólogo (público)

**Respuesta:**
```json
{
  "id": "1",
  "name": "Dr. Juan Pérez",
  "slug": "dr-juan-perez",
  "bio": "...",
  "services": [...],
  "reviews": [...],
  "_count": {
    "reviews": 45
  }
}
```

#### POST `/api/v1/practitioners`
Crear podólogo (requiere autenticación)

#### PUT `/api/v1/practitioners/:id`
Actualizar podólogo (requiere autenticación)

#### DELETE `/api/v1/practitioners/:id`
Eliminar podólogo (requiere autenticación)

## 🔒 Seguridad

### Cookies HTTP-Only

Los tokens JWT se almacenan en cookies HTTP-only para mayor seguridad:

- `access_token` - Token de acceso (1 hora)
- `refresh_token` - Token de refresco (7 días)

### CORS

CORS está configurado para aceptar peticiones solo desde el frontend configurado en `FRONTEND_URL`.

### Validación

Todos los endpoints validan los datos de entrada usando `class-validator`.

## 🗄️ Base de Datos

### Modelos Principales

- **User** - Usuarios del sistema
- **Professional** - Podólogos
- **Service** - Servicios ofrecidos
- **Review** - Reseñas
- **Lead** - Solicitudes de contacto

### Comandos Prisma Útiles

```bash
# Ver base de datos en navegador
pnpm prisma:studio

# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Resetear base de datos (¡cuidado!)
pnpm prisma migrate reset

# Generar cliente después de cambios en schema
pnpm prisma:generate
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## 📝 Scripts Disponibles

- `pnpm start:dev` - Iniciar en modo desarrollo
- `pnpm build` - Compilar para producción
- `pnpm start:prod` - Iniciar en producción
- `pnpm prisma:generate` - Generar cliente Prisma
- `pnpm prisma:migrate` - Ejecutar migraciones
- `pnpm prisma:seed` - Poblar base de datos
- `pnpm prisma:studio` - Abrir Prisma Studio
- `pnpm db:setup` - Setup completo de DB

## 🔧 Datos de Prueba

Después de ejecutar el seed, tendrás:

- **Usuario admin:**
  - Email: `admin@podiatrists.com`
  - Password: `admin123`

- **5 podólogos** en diferentes ciudades (Madrid, Barcelona, Valencia, Sevilla, Oviedo)
- **3 servicios** por cada podólogo
- **3 reseñas** por cada podólogo

## 🚀 Despliegue

### Variables de Entorno en Producción

Asegúrate de configurar:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...
JWT_SECRET=clave-muy-segura-aleatoria
JWT_REFRESH_SECRET=otra-clave-muy-segura
FRONTEND_URL=https://tu-dominio.com
COOKIE_DOMAIN=tu-dominio.com
COOKIE_SECURE=true
```

### Recomendaciones

- Usa PostgreSQL managed (Supabase, Neon, AWS RDS)
- Configura backups automáticos
- Habilita SSL en producción
- Usa secretos fuertes y aleatorios
- Configura rate limiting
- Monitorea con Sentry o similar

## 📖 Documentación Adicional

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contribuir

1. Crea una rama feature
2. Haz tus cambios
3. Ejecuta tests y linter
4. Crea un Pull Request

## 📄 Licencia

UNLICENSED - Proyecto privado

