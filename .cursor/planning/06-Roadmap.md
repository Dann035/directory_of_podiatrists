---
title: Roadmap de Implementación
owner: Product / Tech Lead
version: 0.1
---

Resumen: roadmap desglosado en sprints de 2 semanas para lanzar el MVP del Directorio de Podología. Cada sprint contiene entregables, criterios de aceptación, dependencias y estimaciones en horas por tarea.

Duración objetivo MVP: 6 sprints (2 semanas cada uno) = 12 semanas (ajustable).

Sprint 1 (Semana 1-2) — Arquitectura & Infra
- Objetivo: levantar infra básica, DB inicial y repo + CI
- Entregables y tareas:
  - Infra inicial (Vercel + managed Postgres) — 8h Ops
  - Esquema DB inicial (Prisma models + migrations) — 16h Backend
  - Repo monorepo + CI pipeline básico (lint/test/preview) — 12h DevOps/FE
  - README de Onboarding dev — 4h
- Criterios de aceptación:
  - Preview deploys en PRs funcionando
  - DB disponible en staging y `prisma migrate deploy` ejecutable
  - Checklist de seguridad básica run
- Dependencias: decision sobre proveedor DB; credenciales/vercel token

Sprint 2 (Semana 3-4) — Core: Profesionales CRUD + Auth básica
- Objetivo: crear backend CRUD de profesionales y auth mínima para admin
- Entregables y tareas:
  - Endpoints `GET/POST/PUT/DELETE /api/v1/professionals` — 18h Backend
  - Auth simple (JWT) y roles (admin, professional) — 12h Backend
  - Admin UI mínima para crear/validar perfiles — 16h Frontend
  - Tests unitarios básicos para endpoints — 6h QA
- Criterios de aceptación:
  - CRUD funciona end-to-end entre UI y API
  - Roles y permisos restrictivos en endpoints sensibles
  - Migraciones y seed con 10 profesionales de ejemplo
- Dependencias: infra del sprint 1, secretos DB

Sprint 3 (Semana 5-6) — Search & Data Model solid
- Objetivo: search funcional, índices, y primeros landings SEO
- Entregables y tareas:
  - API `GET /api/v1/professionals` con filtros (city, service) + pagination — 18h Backend
  - Índices GIN trigram y PostGIS location — 8h DB
  - SearchBar FE + autocomplete (locations) — 16h Frontend
  - Crear 50 landings programáticos (seed) + sitemap parcial — 10h Growth/SEO
- Criterios de aceptación:
  - Search devuelve resultados consistentes y con paginación
  - Autocomplete responde <300ms en staging
  - Sitemap incluye las 50 landings y es accesible en `/sitemap.xml`
- Dependencias: DB indexes, PostGIS extension

Sprint 4 (Semana 7-8) — Perfil profesional + Reseñas + Lead flow
- Objetivo: fichas de profesional ricas, reviews y captura de leads
- Entregables y tareas:
  - Profile page FE (SSG/ISR) con JSON-LD — 16h Frontend
  - Endpoint `POST /api/v1/leads` + dedup/backoff — 12h Backend
  - Reviews CRUD + aggregate rating — 12h Backend
  - Lead modal FE + validations — 8h Frontend
  - Instrumentación analytics (events list) — 6h FE/Analytics
- Criterios de aceptación:
  - Profile pages indexadas (SSR/SSG) y render JSON-LD correcto
  - Lead creation persists and returns leadId; analytics fire server-side
  - Reviews visible and rating aggregated
- Dependencias: Search (Sprint 3), DB schema

Sprint 5 (Semana 9-10) — Onboarding profesionales & Dashboard básico
- Objetivo: onboarding self-service y dashboard con métricas básicas
- Entregables y tareas:
  - Flow de onboarding (registro, verificación de colegiado) — 20h Fullstack
  - Dashboard: visitas, leads, conversion rate (mini) — 16h Frontend/Backend
  - Emails transaccionales y plantillas (SendGrid) — 6h Backend/Ops
  - Pagos / plan (si aplica, stub) — 8h Backend
- Criterios de aceptación:
  - Profesionales pueden registrarse y completar perfil
  - Dashboard muestra métricas de las últimas 30 días
  - Emails enviados en eventos clave (lead_received)
- Dependencias: Lead flow (Sprint 4), email provider

Sprint 6 (Semana 11-12) — QA, Performance y Lanzamiento MVP
- Objetivo: pulir, tests, Core Web Vitals y despliegue a producción
- Entregables y tareas:
  - E2E tests full flow (search -> profile -> lead) — 12h QA/Dev
  - Performance optimizations (images, LCP, CLS) — 16h Frontend
  - Accessibility fixes WCAG AA — 8h QA/FE
  - Go-to-production checklist + monitoring alerts — 8h Ops
- Criterios de aceptación:
  - Smoke tests pasan en producción
  - LCP < 2.5s en páginas clave (mobile) y CLS <0.1
  - Alertas configuradas y runbooks disponibles
- Dependencias: todo lo anterior


Estimaciones totales aproximadas (MVP 6 sprints):
- Infra & Core backend: 120h
- Frontend Core (Home, Search, Profiles): 160h
- QA & Performance: 40h
- Growth/SEO + Onboarding: 60h
- Total aproximado: 380h (equivalente a ~12 semanas con 2 devs fulltime en paralelo según asignación)


Backlog inicial — 3 sprints (issues ready)

Sprint-Backlog-1 (2 semanas) — Prioridad Alta
1. ID: BL-01 — Mejorar relevancia de search
   - Título: Ajustar ranking por reviews y proximidad
   - Pasos:
     1) Analizar queries actuales y UX
     2) Implementar score = f(reviews_weight, distance_weight)
     3) Añadir tests y validar ejemplos
   - Estimación: 16h

2. ID: BL-02 — Bulk import de profesionales (CSV)
   - Título: Importador CSV con validaciones y backfill
   - Pasos:
     1) Definir formato CSV y validaciones (license_number)
     2) Implementar endpoint admin `POST /api/v1/import/csv`
     3) Crear job background para procesamiento y report
   - Estimación: 20h

Sprint-Backlog-2 (2 semanas) — Prioridad Media
1. ID: BL-03 — Migración a Algolia (POC)
   - Título: POC de search en Algolia para 5k records
   - Pasos:
     1) Exportar sample dataset
     2) Indexar en Algolia y comparar latencias/relevancia
     3) Documentar coste y plan de migración
   - Estimación: 16h

2. ID: BL-04 — Mejora SEO: FAQ schema y páginas FAQ
   - Título: Implementar FAQ schema en landing templates
   - Pasos:
     1) Definir preguntas frecuentes por servicio
     2) Añadir JSON-LD en templates y testar en Rich Results
   - Estimación: 8h

Sprint-Backlog-3 (2 semanas) — Prioridad Baja
1. ID: BL-05 — Integración server-side tagging
   - Título: Implementar servidor de tagging para conversion API
   - Pasos:
     1) Diseñar endpoint server-side para recibir events
     2) Forward a GA4/Google Ads via server
     3) Documentar mapping de eventos
   - Estimación: 12h

2. ID: BL-06 — Accessibility audit y fixes (deep)
   - Título: Auditoría completa WCAG + lista de fixes
   - Pasos:
     1) Ejecutar tests automáticos (axe, lighthouse)
     2) Priorizar fixes y estimar por componente
   - Estimación: 20h


Notas finales:
- Dependencias entre sprints: Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6.
- Recomendación: mantener un devops/ops on-call durante despliegues y asignar 0.5 FTE de QA para pruebas continuas.
- Si quieres, convierto las tareas y backlog a CSV/JSON para import directo a tu gestor de issues (GitHub/Jira). Indica formato preferido.
---
title: Roadmap y Fases
owner: Product Owner
version: 0.1
---

Fases (alto nivel):

- Fase 0 — Discovery (1 semana)
  - Validar hipótesis, crear PRD, user interviews. Entregable: PRD final.
- Fase 1 — MVP (8–10 semanas)
  - Sprint A: Core search + listing + profile (3 semanas)
  - Sprint B: Contact leads + admin básico + auth (3 semanas)
  - Sprint C: QA, performance, lanzamiento piloto (2–4 semanas)
- Fase 2 — Growth & SaaS (post-MVP)
  - Pagos, anuncios, dashboards profesionales, analítica avanzada

Hitos clave:
- H-001: PRD aprobado (end week 1)
- H-002: MVP alfa en staging (week 6)
- H-003: Launch pilot (week 10)

Riesgos y mitigación:
- Falta de profesionales inscritos: mitigación outreach local, incentivos.
- Problemas de performance en búsquedas: migrar a Algolia si latencia alta.
