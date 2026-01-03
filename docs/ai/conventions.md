# 📐 Code Conventions

Convenciones de código para mantener consistencia.

## 📁 Naming

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Backend files | `kebab-case.ts` | `user.service.ts` |
| Frontend Components | `PascalCase.tsx` | `UserProfile.tsx` |
| Frontend hooks/utils | `camelCase.ts` | `useAuth.ts`, `api-client.ts` |
| Variables/Functions | `camelCase` | `getUserData()` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Interfaces/Types | `PascalCase` | `User`, `UserRole` |

## 🏗️ Estructura

### Backend (NestJS)
```
src/[feature]/
├── [feature].module.ts
├── [feature].controller.ts
├── [feature].service.ts
├── dto/
│   ├── create-[feature].dto.ts
│   └── update-[feature].dto.ts
├── guards/
└── decorators/
```

### Frontend (Next.js)
```
app/[page]/page.tsx
components/[Feature]/[Feature].tsx
lib/services/[feature].service.ts
```

## 🎨 TypeScript

### Tipos
- **Interface** para objetos: `interface User { id: string; }`
- **Type** para unions: `type Role = 'USER' | 'ADMIN';`
- **Evitar** `any`/`unknown` sin justificación

### Funciones
- `async/await` (NO callbacks)
- Arrow functions preferidas
- Destructuring cuando mejore legibilidad
- Optional chaining (`?.`)
- Nullish coalescing (`??`)

**Ejemplo:**
```typescript
const getUser = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ?? throw new Error('Not found');
};
```

## 🎯 NestJS

### Controllers
- Usar decorators: `@Get()`, `@Post()`, `@Body()`, `@Query()`
- Guards para auth: `@UseGuards(JwtAuthGuard)`
- DTOs para validación automática

### Services
- `@Injectable()`
- Inyectar dependencias en constructor
- Prisma para DB operations

### DTOs
- `class-validator` decorators: `@IsEmail()`, `@IsNotEmpty()`, `@MinLength()`
- `@IsOptional()` para campos opcionales

## ⚛️ React/Next.js

### Components
- **Server Component** por defecto (NO `'use client'`)
- **Client Component** solo si necesario (state, effects, events)
- Props con TypeScript interfaces

### Hooks
- Custom hooks: `use[Name]`
- Cleanup en `useEffect` cuando necesario
- Throw error si hook usado fuera de context

### Servicios
- Fetch con `credentials: 'include'` para cookies
- Manejo de errores apropiado
- TypeScript para responses

## 🎨 Tailwind CSS

- **Usar** utility classes: `flex items-center gap-4 p-4`
- **NO** inline styles: `style={{ ... }}`
- Responsive: `md:flex-row`, `lg:text-xl`

## 🔐 Seguridad

- **Validar** siempre con DTOs (backend)
- **Hash** passwords con bcrypt (10 rounds)
- **JWT** en cookies HTTP-only (`httpOnly: true`, `secure: true`, `sameSite: 'strict'`)
- **NUNCA** JWT en localStorage
- **Prisma** queries parametrizadas (NO raw SQL sin razón)

## 🧪 Tests

### Unitarios
```typescript
describe('Service', () => {
  it('should do something', async () => {
    const result = await service.method();
    expect(result).toBeDefined();
  });
});
```

### E2E
```typescript
describe('Endpoint (e2e)', () => {
  it('/path (POST)', () => {
    return request(app).post('/path')
      .send({ data })
      .expect(200);
  });
});
```

**Requisito:** 85% coverage mínimo

## 📝 Comentarios

- Comentar el **"por qué"**, no el "qué"
- JSDoc para funciones públicas
- Evitar comentarios obvios

```typescript
// ✅ Bueno
// Usamos bcrypt con 10 rounds (balance seguridad/performance)
const hash = await bcrypt.hash(password, 10);

// ❌ Malo
// Hashea el password
const hash = await bcrypt.hash(password, 10);
```

## 📦 Imports

### Orden
1. External libraries
2. Internal modules
3. Relative imports
4. Types

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from '@prisma/client';
```

## 🔄 Git

### Commits
**Formato:** `type(scope): subject`

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Ejemplos:**
```bash
feat(auth): add password reset
fix(search): improve performance
docs(plans): update auth plan
```

**❌ NO:**
- Commits "hero" (todo en uno)
- Referencias a IA
- Mensajes vagos

### Branches
- `main` - Producción
- `develop` - Desarrollo
- `feature/[nombre]` - Features
- `fix/[nombre]` - Bug fixes

## 📚 Recursos

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [NestJS Docs](https://docs.nestjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
