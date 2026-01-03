# Cliente - Directorio de Podólogos

Frontend de la aplicación construido con Next.js 16, React 19 y Tailwind CSS.

## 🚀 Configuración

### 1. Variables de entorno

Crea un archivo `.env.local` en la raíz del directorio `client/`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Environment
NODE_ENV=development
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Ejecutar en desarrollo

```bash
pnpm run dev
```

El cliente estará disponible en `http://localhost:3000`

## 📁 Estructura del proyecto

```
client/
├── app/                      # App Router de Next.js
│   ├── layout.tsx           # Layout principal con AuthProvider
│   ├── page.tsx             # Página de inicio
│   ├── login/               # Página de login
│   ├── register/            # Página de registro
│   └── search/              # Página de búsqueda
├── components/              # Componentes React
│   ├── home/               # Componentes de la página de inicio
│   │   ├── HomeHeader.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedPractitioners.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── Footer.tsx
│   ├── SearchBar.tsx       # Barra de búsqueda
│   ├── ResultsList.tsx     # Lista de resultados
│   ├── ProtectedRoute.tsx  # HOC para rutas protegidas
│   └── GuestRoute.tsx      # HOC para rutas de invitados
├── contexts/               # Contextos de React
│   └── AuthContext.tsx    # Contexto de autenticación
├── lib/                   # Utilidades y servicios
│   ├── api-client.ts     # Cliente HTTP base
│   ├── types.ts          # Tipos TypeScript
│   ├── constants.ts      # Constantes (categorías, testimonios, etc.)
│   ├── practitioners.ts  # Utilidades de practitioners (deprecated)
│   └── services/         # Servicios de API
│       ├── auth.service.ts
│       └── practitioners.service.ts
└── public/               # Archivos estáticos
```

## 🔑 Autenticación

El sistema de autenticación utiliza:

- **JWT tokens** almacenados en **cookies HTTP-only** (más seguro que localStorage)
- **Context API** para gestionar el estado de autenticación
- **Componentes de protección** para rutas privadas

### Uso del contexto de autenticación

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // ...
}
```

### Proteger rutas

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PrivatePage() {
  return (
    <ProtectedRoute>
      {/* Contenido solo para usuarios autenticados */}
    </ProtectedRoute>
  );
}
```

## 🌐 Servicios de API

### Auth Service

```typescript
import { authService } from '@/lib/services/auth.service';

// Registro
await authService.register({ email, password, name });

// Login
await authService.login({ email, password });

// Obtener perfil
const user = await authService.getProfile();

// Logout
await authService.logout();
```

### Practitioners Service

```typescript
import { practitionersService } from '@/lib/services/practitioners.service';

// Buscar podólogos
const response = await practitionersService.search({
  q: 'Madrid',
  city: 'Madrid',
  verified: true,
  perPage: 20,
});

// Obtener por slug
const practitioner = await practitionersService.getBySlug('dr-juan-perez');

// Obtener destacados
const featured = await practitionersService.getFeatured();
```

## 🎨 Componentes principales

### HomeHeader

Header con navegación y menú de usuario autenticado.

### HeroSection

Sección hero con título y formulario de búsqueda.

### CategoryGrid

Grid de categorías con animaciones de scroll.

### BenefitsSection

Tarjetas 3D con flip en hover que muestran beneficios detallados.

### TestimonialsSection

Carrusel infinito de testimonios con animación suave.

## 📝 Scripts disponibles

```bash
# Desarrollo
pnpm run dev

# Build de producción
pnpm run build

# Iniciar en producción
pnpm run start

# Linting
pnpm run lint

# Tests
pnpm run test

# Tests en modo watch
pnpm run test:watch

# Type checking
pnpm run typecheck
```

## 🔗 Conexión con el backend

El cliente se conecta automáticamente al backend de NestJS usando la variable de entorno `NEXT_PUBLIC_API_URL`.

**Importante**: Asegúrate de que el servidor esté corriendo en `http://localhost:3001` antes de iniciar el cliente.

## 🧪 Testing

Los tests están configurados con Jest y React Testing Library:

```bash
# Ejecutar todos los tests
pnpm run test

# Ejecutar tests en modo watch
pnpm run test:watch
```

## 🚀 Deployment

### Build para producción

```bash
pnpm run build
```

### Variables de entorno en producción

Configura `NEXT_PUBLIC_API_URL` con la URL de tu API en producción:

```bash
NEXT_PUBLIC_API_URL=https://api.tupodologos.com/api/v1
```

## 📚 Tecnologías

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Jest** - Testing framework
- **React Testing Library** - Testing de componentes React

## 🔐 Seguridad

- Los tokens JWT se almacenan en cookies HTTP-only
- Las cookies incluyen flags `Secure` y `SameSite`
- CORS configurado para permitir solo el dominio del cliente
- Validación de datos en el frontend y backend

## 📖 Más información

Para más detalles sobre la arquitectura y el diseño, consulta los documentos en `.cursor/planning/`.

