# 🎯 AI Rules - Directory of Podiatrists

**Versión:** 1.0  
**Última actualización:** 2026-01-04

## 📋 Overview

**Monorepo:** Directorio de podólogos
- Frontend: Next.js 16 + React 19 + TypeScript + Tailwind
- Backend: NestJS 11 + Prisma 6 + PostgreSQL
- Workspace: pnpm

## 🚫 NUNCA / ✅ SIEMPRE

| ❌ NUNCA | ✅ SIEMPRE |
|----------|-----------|
| JWT en localStorage | HTTP-only cookies |
| `any`/`unknown` | Tipos específicos |
| Commit `.env` | Usar `.env.example` |
| Skip validación | Validar siempre (DTOs) |
| Inline styles | Tailwind CSS |
| Implementar sin leer plan | Leer `/docs/plans/` primero |
| Commits con refs IA | Commits limpios |
| Commits "hero" | Commits agrupados |

## 📚 Flujo de Trabajo

### 1. Antes de Implementar
- ⬜ Leer `/docs/plans/README.md`
- ⬜ Leer plan específico `/docs/plans/0X-[nombre].md`
- ⬜ Entender contexto y objetivos
- ⬜ Cuestionar decisiones si parecen subóptimas
- ⬜ Proponer alternativas mejores

### 2. Durante Implementación
- ⬜ Seguir convenciones (ver `conventions.md`)
- ⬜ Validar inputs (cliente + servidor)
- ⬜ Manejar errores apropiadamente
- ⬜ Documentar decisiones importantes

### 3. Tests (OBLIGATORIO)
- ⬜ Tests unitarios para lógica
- ⬜ Tests e2e para flujos críticos
- ⬜ **Mínimo 85% coverage**
- ⬜ **Step NO se completa si tests no pasan**

### 4. Después de Implementar
- ⬜ Actualizar plan con estado y aprendizajes
- ⬜ Actualizar `/docs/plans/README.md` (tracker)
- ⬜ Commit siguiendo convenciones
- ⬜ Marcar step como completado

## 🏗️ Arquitectura

### Backend (NestJS)
- Modular: 1 feature = 1 module
- Prisma para DB
- JWT en cookies HTTP-only
- DTOs con `class-validator`
- `JwtAuthGuard` global + `@Public()` decorator

### Frontend (Next.js)
- Server Components por defecto
- Client Components solo cuando necesario
- TypeScript strict
- Tailwind CSS (NO inline styles)
- Context API para estado global
- Servicios en `/client/lib/services/`

## 📁 Estructura

```
directory_of_podiatrists/
├── server/src/
│   ├── auth/           # Autenticación
│   ├── practitioners/  # Profesionales
│   └── prisma/         # DB service
├── client/
│   ├── app/           # App Router
│   ├── components/    # Components
│   ├── lib/services/  # API services
│   └── contexts/      # Context API
└── docs/
    ├── plans/         # Planes desarrollo
    ├── project/       # Docs proyecto
    └── ai/            # Config IA
```

## 🔧 Comandos

```bash
pnpm install                        # Instalar
pnpm run dev                        # Dev completo
pnpm --filter server run dev:watch  # Backend
pnpm --filter client run dev        # Frontend

cd server
pnpm prisma migrate dev             # Migraciones
pnpm prisma db seed                 # Seed

pnpm --filter client run test       # Tests frontend
pnpm --filter server run test:e2e   # Tests e2e
```

## 🔐 Seguridad

- JWT en cookies HTTP-only con `sameSite: 'strict'`
- Validación cliente + servidor (NUNCA confiar solo en cliente)
- Prisma queries parametrizadas (protección SQL injection)
- CORS configurado correctamente
- NUNCA commitear secrets
- HTTPS obligatorio en producción

## 📝 Commits

**Formato:** `type(scope): subject`

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Ejemplos:**
```bash
feat(auth): add password reset
fix(search): improve performance
docs(plans): update auth plan
test(practitioners): add e2e tests
```

**❌ NO hacer:**
```bash
feat: implement entire system  # Hero commit
feat(auth): add login (co-authored with AI)  # Ref IA
fix: stuff  # Vago
```

## 🗣️ Comunicación

### Preguntar al Usuario:
- Requisitos poco claros
- Múltiples approaches posibles
- Decisiones arquitectónicas importantes
- Breaking changes
- Implicaciones de coste

### Decidir Autónomamente:
- Detalles de implementación
- Estructura de código
- Librerías menores
- UX pequeños
- Bug fixes obvios

## 🔍 Debug Común

| Problema | Solución |
|----------|----------|
| CORS errors | Verificar `CLIENT_URL` en backend `.env` |
| 401 Unauthorized | Verificar `JWT_SECRET` y cookies |
| DB errors | Ejecutar `prisma migrate dev` |
| Build errors | Verificar tipos TypeScript |
| Tests failing | Verificar mocks y setup |

## 📚 Recursos

- [Contexto proyecto](./context.md)
- [Convenciones código](./conventions.md)
- [Planes desarrollo](../plans/README.md)
- [Guía colaboración](../AI_COLLABORATION_GUIDE.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
