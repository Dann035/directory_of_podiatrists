---
title: PRD — Directorio de Podólogos (MVP)
owner: Product Owner
version: 0.1
---

1. Resumen ejecutivo
- Propósito: permitir que pacientes encuentren podólogos locales y contacten para cita de forma rápida y confiable; validar modelo SaaS para profesionales.

2. Objetivos de negocio
- Generar 100 leads/mes en la ciudad piloto a 3 meses.
- Captar 50 profesionales verificados en 3 meses.

3. Requisitos funcionales (priorizados — issue-ready)

- RF-001 — Búsqueda y filtros (Must) — T-shirt: L (8h–40h)
  - Descripción: búsqueda por `city`, `service`, `q` (texto libre), `postal_code`, con paginación, sorting por relevancia y por proximidad geográfica.
  - API: `GET /api/v1/professionals?city=&service=&q=&lat=&lng=&radius=&page=&per_page=`
  - Acceptance (Given/When/Then):
    - Given: dataset con 1k professionals y índices trigram/geo activos
    - When: user busca `q=podólogo uñas` y `city=Madrid`
    - Then: API responde 200 con `data.length>0`, results ordenados por relevancia, `meta.total` correcto y latency <500ms (staging)
  - Dependencias: índices DB (pg_trgm, PostGIS), cache Redis

- RF-002 — Listado (ProfessionalCard) (Must) — T-shirt: M (4h–16h)
  - Descripción: vista de lista con `ProfessionalCard` (photo, name, rating, specialties, distance, priceFrom, CTA `Ver perfil`).
  - Acceptance:
    - Given: resultados API
    - When: user loads search results page
    - Then: UI muestra cards responsivas, skeleton while loading, y cada CTA tiene `data-attributes` para tracking

- RF-003 — Perfil profesional (Must) — T-shirt: L (16h–40h)
  - Descripción: página de perfil con bio, servicios, horarios, galería fotos, mapa, reseñas, CTA contacto y JSON-LD `LocalBusiness`.
  - Acceptance:
    - Given: professional exists
    - When: user opens `/professional/{slug}`
    - Then: page returns 200, contains proper OG tags, JSON-LD visible en HTML, and `Lead` modal opens and submits

- RF-004 — Lead capture (Must) — T-shirt: M (8h–24h)
  - Descripción: modal/inline form para enviar lead a `POST /api/v1/leads`, validación client+server, dedup and rate-limit, server-side send email + analytics event.
  - Acceptance:
    - Given: user fills required fields
    - When: submits form
    - Then: API returns 201 with `leadId`, UI shows success, and professional receives notification email (or queued)

- RF-005 — Onboarding profesional (Should) — T-shirt: XL (40h+)
  - Descripción: flow de registro con upload de licencia, verificación manual en Admin y flag `verified`.
  - Acceptance:
    - Given: professional uploads license
    - When: admin approves
    - Then: profile status becomes `verified` and appears en listados con badge

- RF-006 — Admin panel (Should) — T-shirt: L (24h–40h)
  - Descripción: gestión de profesionales, leads, export CSV, búsqueda avanzada y roles.
  - Acceptance: admin puede filtrar por estado, cambiar status, exportar CSV con datos seleccionados

- RF-007 — Reviews & Ratings (Should) — T-shirt: M (8h–24h)
  - Descripción: publicar reviews (moderación opcional), mostrar `AggregateRating`.
  - Acceptance: reviews persist, appear in profile, aggregated rating updated

- RF-008 — Analytics & Dashboards (Should) — T-shirt: M (8h–24h)
  - Descripción: instrumentación de eventos (search, view_profile, lead_submitted) y dashboards básicos para admins/profiles.
  - Acceptance: events appear in GA4/SS server-side logs and dashboards show top KPIs

4. Requisitos no funcionales (NFR)

- Performance
  - Targets: LCP < 2.5s (90%), TTFB < 600ms (95%) en staging/prod for key pages.
  - Caching: CDN + ISR for profiles; Redis cache for search queries with TTL 30s.

- Seguridad
  - TLS mandatory; JWT for protected endpoints; password hashing (bcrypt/argon2); rate-limiting (100 req/min public, 1000 req/min with API key);
  - Data protection: PII encryption at rest for sensitive fields (license_number), GDPR-compliant consent flow for contact data.

- Availability & DR
  - Backups daily, PITR enabled, RTO target: 4h for DB restore; multi-AZ deployment recommended.

- Observability
  - Tracing (OpenTelemetry), errors (Sentry), metrics (Prometheus/Datadog), dashboards with p95/p99 latency and error rates.

5. API endpoints asociados (resumen)

- Public
  - GET `/api/v1/professionals` — list + filters (q, city, service, lat,lng,radius,page,per_page)
  - GET `/api/v1/professionals/{slug}` — profile
  - GET `/api/v1/services` — list services
  - GET `/api/v1/suggestions/locations?q=` — autocomplete

- Leads & Reviews
  - POST `/api/v1/leads` — create lead
  - GET `/api/v1/leads?professional_id=` — admin
  - POST `/api/v1/reviews` — create review

- Auth/Admin
  - POST `/api/v1/auth/login`, POST `/api/v1/auth/refresh`, GET `/api/v1/me`
  - POST `/api/v1/professionals` (admin), PUT/DELETE `/api/v1/professionals/{id}`

6. Acceptance criteria (Given/When/Then) — ejemplos adicionales

- Búsqueda avanzada
  - Given: índices trigram y dataset cargado
  - When: user searches `q=onicocriptosis Madrid` and applies `service=onicocriptosis`
  - Then: first result relevance > threshold (manual QA), response time <700ms, results show distance when location provided

- Lead dedup
  - Given: same user submits identical lead within 30s
  - When: second submit occurs
  - Then: API returns 409 with `{error.code: 'DUPLICATE_LEAD'}` and UI informs user "Parece que ya enviaste esta solicitud"

7. Flujos UX (resumidos — paso a paso)

- Flow A: Buscar y contactar
  1. Usuario abre Home
  2. Rellena SearchBar (city + service) -> `search_submitted` event
  3. Land on Search Results -> shows list of `ProfessionalCard`
  4. User clicks `Ver perfil` -> `view_profile` event
  5. On profile, user clicks `Contactar` -> Lead modal opens
  6. User completes form -> frontend validates -> POST `/api/v1/leads` -> shows success and fires `lead_submitted` (server-side)

- Flow B: Onboarding profesional
  1. Professional registers (email + password)
  2. Completes profile + uploads license
  3. Admin receives verification task -> reviews docs -> marks `verified`
  4. Professional receives email and profile is visible with `verified` badge

8. Estimaciones T-shirt (por historia) — guía rápida

- S: 1–4 horas
- M: 4–16 horas
- L: 16–40 horas
- XL: 40+ horas

Asignación recomendada (ejemplo):
- RF-001: L
- RF-002: M
- RF-003: L
- RF-004: M
- RF-005: XL
- RF-006: L
- RF-007: M
- RF-008: M

9. Plantillas de issue (lista corta)

- Título: `RF-XXX - [Título breve]`
- Descripción: copiar descripción desde PRD
- Acceptance: pegar Given/When/Then
- Estimación: T-shirt
- Dependencias: referenciar otros RFs

10. Notas y próximos pasos

- Entregar backlog refinado por sprint (2 semanas) y convertir cada RF en issues con checklist y subtareas de QA.
- Priorizar RF-001/002/003/004 para MVP-1.


### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
