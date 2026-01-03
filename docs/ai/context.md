# 📊 Project Context

**Proyecto:** Directory of Podiatrists  
**Estado:** MVP en desarrollo  
**Última actualización:** 2026-01-03

## 🎯 Qué es este Proyecto

Directorio online de podólogos en España que permite:
- **Usuarios:** Buscar y contactar podólogos por ubicación y especialidad
- **Profesionales:** Tener presencia online y recibir leads
- **Administradores:** Gestionar el directorio

## 📈 Estado Actual

### ✅ Implementado
- **Autenticación:** JWT en cookies HTTP-only, roles (USER, PROFESSIONAL, ADMIN)
- **Búsqueda básica:** Por nombre, ciudad, especialidad, verificación
- **Base de datos:** PostgreSQL con Prisma ORM
- **Frontend:** Next.js 16 con App Router, Tailwind CSS
- **Backend:** NestJS 11 con arquitectura modular

### 🔄 En Desarrollo
- Ninguno actualmente

### ⬜ Pendiente (Priorizado)

**Fase 1: MVP (2-3 semanas)**
1. Perfil detallado de profesional (3-5 días)
2. Sistema de leads mejorado (2-3 días)
3. Sistema de reseñas básico (3-4 días)

**Fase 2: Optimización (3-4 semanas)**
1. Búsqueda geográfica con PostGIS
2. Optimización búsqueda con pg_trgm
3. Panel de profesional

**Fase 3: Escalabilidad (4+ semanas)**
1. Sistema de citas
2. Pagos y suscripciones
3. Notificaciones
4. SEO y performance
5. CI/CD

## 🏗️ Stack Tecnológico

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Context API (estado global)

### Backend
- NestJS 11
- Prisma 6
- PostgreSQL
- Passport.js + JWT
- bcryptjs

### DevOps
- pnpm (workspace)
- Git
- (CI/CD pendiente)

## 🗄️ Base de Datos

### Modelos Principales

**User**
- Usuarios del sistema (pacientes, profesionales, admins)
- Roles: USER, PROFESSIONAL, ADMIN
- Auth con password hasheado (bcrypt)

**Professional**
- Podólogos en el directorio
- Slug único para URLs amigables
- Verificación (badge)
- Rating y reviewCount calculados

**Service**
- Servicios ofrecidos por profesionales
- Precio y duración

**Review**
- Reseñas de usuarios
- Rating 1-5 estrellas

**Lead**
- Solicitudes de contacto
- Estados: NEW, CONTACTED, CONVERTED, CLOSED

## 🔑 Decisiones Arquitectónicas

### 1. JWT en Cookies (No localStorage)
**Razón:** Seguridad contra XSS  
**Trade-off:** Más complejo pero más seguro

### 2. Prisma (No TypeORM)
**Razón:** Mejor DX, type-safety, migraciones  
**Trade-off:** Menos flexible que raw SQL

### 3. Búsqueda con Prisma contains (Por ahora)
**Razón:** Simple para MVP  
**Próximo paso:** pg_trgm cuando >10k profesionales

### 4. Context API (No Redux/Zustand)
**Razón:** Suficiente para auth y estado simple  
**Trade-off:** Considerar migrar si crece complejidad

### 5. Monorepo con pnpm
**Razón:** Compartir tipos, deps, scripts  
**Trade-off:** Más setup inicial

## 🚨 Problemas Conocidos

### Técnicos
- ⬜ Búsqueda no soporta typos (resolver con pg_trgm)
- ⬜ Sin búsqueda geográfica (resolver con PostGIS)
- ⬜ Sin refresh tokens (considerar en fase 2)

### Funcionales
- ⬜ No hay página de perfil detallado (próxima feature)
- ⬜ No hay sistema de reseñas verificadas
- ⬜ No hay panel para profesionales

### Performance
- ⬜ Sin caching (no necesario aún)
- ⬜ Sin CDN para assets (considerar en producción)

## 💡 Lecciones Aprendidas

1. **Simplicidad primero:** Empezamos con Prisma contains en lugar de Elasticsearch. Decisión correcta para MVP.

2. **Seguridad desde el inicio:** JWT en cookies HTTP-only desde el principio evitó refactoring.

3. **Documentación viva:** Mantener planes actualizados ahorra tiempo al equipo.

4. **Cuestionar siempre:** Proponer alternativas mejora las decisiones.

## 🎯 Próximas Decisiones Pendientes

Ver `/docs/REVIEW_NEEDED.md` para:
1. ¿pg_trgm o Elasticsearch?
2. ¿Google Maps, Mapbox o OpenStreetMap?
3. ¿Mostrar contacto público o solo formulario?
4. ¿Cómo verificar reseñas?
5. ¿Implementar refresh tokens?
6. ¿Cuándo búsqueda geográfica?
7. ¿Redis caching necesario?
8. ¿Nivel de cobertura de tests?

## 📊 Métricas Actuales

- **Profesionales:** ~20 (seed data)
- **Usuarios:** ~5 (seed data)
- **Páginas:** 4 (home, login, register, search)
- **Endpoints:** ~8
- **Tests:** Básicos (aumentar cobertura)

## 🔗 Enlaces Útiles

- [Planes](/docs/plans/README.md)
- [Arquitectura](/ARCHITECTURE_SUMMARY.md)
- [Decisiones Pendientes](/docs/REVIEW_NEEDED.md)
- [Guía IA](/docs/AI_COLLABORATION_GUIDE.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

---

**Mantén este archivo actualizado** cuando cambien decisiones importantes o estado del proyecto.

