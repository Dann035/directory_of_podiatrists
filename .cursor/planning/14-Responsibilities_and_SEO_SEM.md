# 14 — Responsabilidades, SEO y SEM (guía ejecutable)

Resumen

Documento operativo que define responsabilidades, estrategia técnica y de contenido para SEO y SEM, y un roadmap accionable para el MVP del Directorio de Podólogos. Incluye tareas priorizadas, criterios de aceptación y owners para pasar a ejecución inmediata.

Objetivos clave

- Aumentar visibilidad local y orgánica para búsquedas por servicio y ciudad.
- Generar leads cualificados para profesionales (100 leads/mes objetivo en 3 meses).
- Mantener UX y rendimiento (LCP < 2.5s) para maximizar conversiones.

1. Alcance y responsabilidades por componente

- Frontend (Next.js)
  - Responsabilidad: implementación de meta tags, JSON-LD, SSR/ISR, plantillas de landing y optimización Core Web Vitals.
  - Entregables: meta templates, JSON-LD en perfiles, plantillas SSG/ISR para landings, pruebas Lighthouse automáticas.

- Search (API + UX)
  - Responsabilidad: API `GET /api/v1/professionals`, filtros, ranking y caché por query.
  - Entregables: endpoints documentados, cache Redis con TTL, índices de texto/geolocalización.

- Profile (ficha profesional)
  - Responsabilidad: contenido estructurado, reviews, OG tags y schema para rich snippets.
  - Entregables: perfil canónico con JSON-LD, pruebas de Rich Results.

- Leads & Tracking
  - Responsabilidad: `POST /api/v1/leads`, deduplicación, server-side conversions y eventos GTM.
  - Entregables: contador Prometheus `leads_created_total`, endpoint estable y eventos en GA4.

- Growth / SEM
  - Responsabilidad: keyword research, campañas, landing copy y optimización de pujas.
  - Entregables: estructura de campañas, landing pages A/B, reporting semanal de CPA.

- Ops / SRE
  - Responsabilidad: infra, Redis, backups, monitorización y despliegues seguros.
  - Entregables: Redis configurado, monitorización SLOs y runbooks.

2. Roadmap priorizado (0–8 semanas)

- Semana 0–2 (Alta prioridad)
  - Auditoría SEO y tracking (baseline).
  - Implementar meta templates y JSON-LD en perfiles.
  - Publicar `/sitemap.xml` y registrar en Search Console.
  - Instrumentar `POST /api/v1/leads` con server-side conversion.

- Semana 2–4 (Media prioridad)
  - Cache Redis para search; índices `pg_trgm` y PostGIS.
  - Crear 5 landings iniciales para campañas SEM.
  - Optimización Core Web Vitals (imágenes, critical CSS, preload).

- Semana 4–8 (Baja prioridad / crecimiento)
  - Escalar landings (programático), outreach y linkbuilding.
  - Paneles y reporting avanzados (Grafana/Looker).

3. Acciones paso a paso (acción, por qué, verificación)

- Auditoría inicial (día 0–3)
  - Acción: ejecutar Lighthouse, Screaming Frog y Search Console audit.
  - Por qué: identificar bloqueos indexación, duplicados y problemas de rendimiento.
  - Verificación: listado P0/P1 con baseline métricas.

- Meta templates dinámicos (día 3–7)
  - Acción: implementar generator server-side para `title` y `meta description` con variaciones.
  - Verificación: tests que generan 50 ejemplos y validan longitud/uniqueness.

- JSON-LD en perfiles (día 3–7)
  - Acción: render `LocalBusiness` + `AggregateRating` + `Review` en HTML.
  - Verificación: pasar Rich Results Test para perfiles de muestra.

- Sitemap y robots (día 3–7)
  - Acción: generar sitemap-index chunked y exponer `/sitemap.xml`; incluir robots.txt.
  - Verificación: sitemap enviado y aceptado en Search Console.

- Instrumentación (día 1–14)
  - Acción: GTM cliente + server-side tagging; eventos `search_performed`, `view_profile`, `lead_submitted`.
  - Verificación: eventos en GA4 y reconciliación server/client <5%.

- Cache y search performance (semana 2–4)
  - Acción: Redis caching por query, índices `pg_trgm` y PostGIS.
  - Verificación: p95 < 800ms en load test 1k queries.

- Landing pages y SEM (semana 2–6)
  - Acción: crear templates SSG/ISR y campañas Search para 5 landings.
  - Verificación: campaigns live y primera conversión en 2 semanas.

4. Checklist técnico (issue-ready)

- SEO-001: Meta templates dinámicos — Dueño: Dev Frontend — Est: 1d — AC: Titles únicos en 50 ejemplos
- SEO-002: JSON-LD `LocalBusiness` + `AggregateRating` — Dueño: Dev — Est: 1d — AC: Rich Results Test OK
- SEO-003: Sitemap-index chunked + `/sitemap.xml` — Dueño: Dev — Est: 1d — AC: sitemap enviado a Search Console
- ARCH-001: Habilitar `pg_trgm` y crear índices GIN — Dueño: DBA — Est: 1d — AC: mejoras de latencia en staging
- PERF-001: Redis cache para queries de search (TTL 30s) — Dueño: Dev — Est: 1d — AC: cache hit ratio >50% en picos
- TRACK-001: GTM + server-side tagging y eventos clave — Dueño: Growth/Dev — Est: 2d — AC: eventos en GA4 y logs server
- SEM-001: 5 landing pages iniciales + campañas Search — Dueño: Growth — Est: 5d — AC: campaña en marcha y medición CPA

5. KPIs, objetivos y reporting

- Leads únicos/mes: 100 (horizon: mes 3)
- Organic sessions: +X% MoM (definir X con Growth)
- LCP: < 2.5s (90% páginas clave)
- Conversion rate en landing: >3%

- Reporting: dashboard semanal (leads, CPA, LCP, top keywords) y reporte mensual SEO/SEM.

6. Gobernanza y procesos

- Cada tarea issue-ready debe incluir: descripción, pasos técnicos, Given/When/Then acceptance, owner y estimación.
- Ciclo de revisión: daily standups para blockers; weekly growth sync para revisar campañas y experimentos.

7. Siguientes pasos recomendados (opcionales, puedo ejecutar)

- Generar CSV con las tareas `SEO-*`, `TRACK-*`, `ARCH-*`, `PERF-*`, `SEM-*` para importar a GitHub Issues.
- Crear issues directamente en un repo (necesitaré repo + token).
- Generar test script para validar meta/templates y JSON-LD automáticamente.

---

Si quieres, genero ahora el CSV con las tareas priorizadas o creo los issues en GitHub (indícame repo y token).

---

Desarrollo paso a paso y acciones recomendadas (profesional)

Objetivo: convertir el documento en una guía operacional y ejecutable para que Product, Dev y Growth implementen y midan mejoras de SEO y SEM de forma priorizada.

Prioridad inicial (0–6 semanas)
- Prioridad Alta (semana 0–3): implementar meta templates dinámicos, JSON-LD en perfiles, `/sitemap.xml` dinámico, instrumentación de eventos (GTM + server-side) y endpoints de leads con dedupe. Razonamiento: impacto directo en indexación y medición de conversiones.
- Prioridad Media (semana 2–5): optimización Core Web Vitals (LCP), caching Redis para search, landing pages por campaña, y panel de seguimiento de KPIs.
- Prioridad Baja (semana 4–8): outreach y linkbuilding, paneles avanzados para profesionales y mejoras SaaS.

Roadmap de acciones (step-by-step)

1) Auditoría inicial (día 0–3)
  - Qué hacer: ejecutar un SEO & tech audit (Lighthouse, Screaming Frog, Search Console, coverage report) y una auditoría técnica de tracking (GTM + network requests).
  - Por qué: detectar bloqueos de indexación, contenido duplicado, meta ausente, y pérdida de eventos por bloqueadores.
  - Resultado esperado: fichero con issues priorizados (P0/P1/P2) y baseline métricas (LCP, posicionamiento top keywords, leads/day).

2) Implementación técnica básica (día 3–14)
  - Meta templates dinámicos
    - Acción: implementar generator de title/description usando la plantilla `{{service}} en {{city}} — {{siteName}}`. Añadir longitud y variación para evitar duplicados.
    - Por qué: títulos únicos mejoran CTR y ranking.
    - Verificación: tests automatizados que renderizan 50 ejemplos y validan longitud.

  - JSON-LD / Schema en perfiles
    - Acción: añadir `LocalBusiness`, `AggregateRating`, y `Review` JSON-LD server-side en `GET /professional/{slug}`.
    - Por qué: mejora la probabilidad de rich snippets y CTR.
    - Verificación: pasar Rich Results Test para 10 perfiles.

  - Sitemap dinámico y robots
    - Acción: generar `sitemap-index` chunked por ciudad; exponer `/sitemap.xml` y referenciar en `robots.txt`.
    - Por qué: mejora discovery y control de crawl budget.
    - Verificación: sitemap accesible y enviado a Search Console; no más de 50k URLs por chunk.

  - Canonical y paginación
    - Acción: establecer canonical por página principal y `rel=next/prev` en paginación; normalizar query params UTM en enlaces internos.
    - Por qué: evita contenido duplicado y desperdicio de crawl budget.

3) Instrumentación & tracking (día 1–14)
  - GTM cliente + server-side
    - Acción: instrumentar eventos `search_performed`, `view_profile`, `lead_submitted`, `phone_click`, `booking_completed` en GTM y configurar server-side tagging (Cloud Run / Functions) para enviar a GA4 y conversion API.
    - Por qué: evita pérdida de datos por bloqueadores y mejora atribución.
    - Verificación: eventos duplicados filtrados, tasa de eventos congruente entre client/server < 5%.

  - Backend: asegurar `POST /api/v1/leads` retorna `leadId` y expone métricas Prometheus (counter `leads_created_total`).

4) Search UX & performance (semana 2–4)
  - Caching y search performance
    - Acción: cache por query en Redis con TTL corto (30s) y cache bust strategy para cambios en perfiles.
    - Por qué: reduce TTFB y mejora p95/p99 latency.
    - Verificación: load test con 1k simulated queries, p95 < 800ms.

  - Índices DB
    - Acción: activar `pg_trgm` y, si se usa geolocalización, PostGIS; crear índices GIN trigram en `name`, `services`, y `address`.
    - Por qué: mejora relevancia DB-driven y evita migración urgente a search-as-a-service.

5) Contenido y arquitectura (semana 1–6)
  - Keyword research operacional
    - Acción: generar lista de keywords por ciudad/servicio (seed + modifiers), priorizar por search volume y CPC.
    - Por qué: guía creación de landing pages y estructura URL.
    - Tarea: Growth produce 100 landings prioritarias (ciudad+servicio) con contenido único ~600–900 palabras.

  - Plantillas de landing y blog
    - Acción: crear templates SSG/ISR con bloques dinámicos: hero, CTA, FAQs, reviews, schema, internal links.
    - Por qué: escala SEO programático sin contenido duplicado.

  - Internal linking & hub pages
    - Acción: crear hub pages por ciudad/región que enlacen landing pages y categorías.
    - Por qué: mejora distribución de autoridad y facilita crawling.

6) Local SEO (semana 2–8)
  - Google Business Profile (GBP)
    - Acción: guiar profesionales para crear/optimizar GBP (nombre, fotos, horario, servicios, reviews) y sincronizar datos donde sea posible.
    - Por qué: mejora presencia en local pack y CTR de búsquedas geolocalizadas.

  - Citations y directories
    - Acción: crear lista de citations locales (sanidad, salud, directorios médicos) y plan outreach.

7) Reviews & reputation (continuo)
  - Acción: implementar flujo para solicitar reseñas a pacientes (email / SMS) tras servicio; mostrar `AggregateRating` en perfil.
  - Por qué: reviews suben CTR y relevancia local.
  - Verificación: +X reviews/mes objetivo y schema markup válido.

8) SEM operativo (campañas iniciales — semana 1–6)
  - Estructura de campaña
    - Acción: crear campaigns por ciudad > ad groups por servicio > keywords high-intent y long-tail.
    - Por qué: segmentación mejora Quality Score y reduce CPA.

  - Landing pages y experimentación
    - Acción: landing por keyword con A/B testing (headline, CTA, hero image). Implementar Google Optimize o experimentos en-house.

  - Tracking y server-side conversions
    - Acción: enviar conversiones server-side para leads (conversion API) con UTM intactos para atribución.

  - Keywords negativas y budgets
    - Acción: inicial negative list (`gratis`, `curso`, `universidad`) y daily budget por ciudad; revisar rendimiento semanal.

9) Backlinks & outreach (semana 4–12)
  - Acción: outreach a asociaciones médicas, colegios profesionales y medios locales; crear guest posts y notas de prensa.
  - Por qué: backlinks de calidad suben autoridad y posiciones orgánicas.

10) Medición, reporting & optimización (continuo)
  - Dashboards y reporting
    - Acción: crear dashboards en Grafana/Looker con KPIs: leads/day, conversion rate, organic sessions, top keywords position, LCP.
    - Cadencia: daily health, weekly growth report, monthly SLO/SEO report.

  - Experimentación
    - Acción: establecer ciclos de 2 semanas por experimento (A/B) y evaluar uplift en conversion rate con statistical significance.

Checklist técnico y tareas issue-ready (prioritizadas)
- SEO-001: Implementar meta templates dinámicos y validación (Dueño: Dev Frontend) — Est: 1d — AC: Titles únicos en 50 ejemplos.
- SEO-002: Añadir JSON-LD `LocalBusiness` + `AggregateRating` en profiles (Dueño: Dev) — Est: 1d — AC: Pass Rich Results Test.
- SEO-003: Generar `sitemap-index` chunked y endpoint `/sitemap.xml` (Dueño: Dev) — Est: 1d — AC: sitemap enviado a Search Console.
- SEO-004: Canonical & pagination rules (Dueño: Dev) — Est: 0.5d — AC: no duplicados en indexación sample.
- ARCH-001: Habilitar `pg_trgm` y crear índices GIN en columnas de búsqueda (Dueño: DBA) — Est: 1d — AC: queries más rápidas en staging.
- PERF-001: Implementar Redis cache para queries de search con TTL 30s (Dueño: Dev) — Est: 1d — AC: cache hit ratio >50% en picos.
- TRACK-001: Implementar GTM + server-side tagging y eventos clave (Dueño: Growth/Dev) — Est: 2d — AC: events present in GA4 and server logs.
- SEM-001: Crear 5 landing pages iniciales (city+service) y campañas Search (Dueño: Growth) — Est: 5d — AC: campaigns live + first conversion within 2 weeks.

Métricas y objetivos (KPI)
- Organic sessions: +X% month-over-month (Growth decides X). Horizon: 3 months.
- Leads mensuales: 100 uniques/month (horizon: month 3 post-launch).
- Core Web Vitals: LCP <2.5s (90% pages).
- Conversion Rate (landing): >3% (benchmark to iterate).

Owners y governance
- Product: prioriza backlog y decide trade-offs UX vs SEO.
- Dev Frontend: implementa meta templates, JSON-LD, SSR/ISR.
- Dev Backend/DBA: APIs de leads, indices, caching.
- Growth/SEM: campañas, landing copy y experiments.
- Ops/SRE: infra, caching y monitorización.

Criterios de aceptación generales
- Cada tarea issue-ready debe incluir: descripción, steps técnicos, acceptance (Given/When/Then), owner, estimation, and test instructions.

Siguientes pasos que puedo ejecutar ahora
- Convertir las tareas `SEO-*`, `TRACK-*`, `SEM-*` en un CSV para importar a GitHub Issues.
- Crear los issues directamente en un repo (necesito repo + token).
- Generar script de validación automática para meta/templates y JSON-LD.

---

¿Quieres que genere el CSV de issues ahora o que cree los issues directamente en GitHub?
