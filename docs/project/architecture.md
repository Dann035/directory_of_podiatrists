---
title: Arquitectura Técnica — Directorio Podólogos
owner: Tech Lead
version: 0.1
---

Stack recomendado (MVP):
- Frontend: Next.js (SSG/SSR según página), TailwindCSS
- Backend: NestJS (API REST), TypeScript
- DB: PostgreSQL (relacional), usar Prisma como ORM
- Search: filtros simples con DB + pg_trgm; iteración a Algolia si escala
- Hosting: Vercel para frontend; Backend en VPS/Cloud; DB en managed Postgres (Supabase, Neon, RDS)
- CI/CD: GitHub Actions

Componentes (detallado):

- Web app (Next.js)
	- Pages: `/` (Home), `/search`, `/professional/[slug]`, `/about`, `/legal`.
	- Rendering strategy: Home (SSG/ISR), Search (SSR or SSG+client-side), Profile (SSG with ISR for updates).

- API (NestJS)
	- Auth: JWT con Passport.js para endpoints de profesionales/admin; endpoints públicos read-only.
	- Rate limiting: Guards de NestJS por IP y por API key para integradores.
	- Validación: class-validator y class-transformer en DTOs.

- DB (Postgres + Prisma)
	- Schema: professionals, services, reviews, leads, users, audits.
	- Backups: daily automated snapshots; retention 30d.

- Workers & background jobs
	- Email delivery worker (retry, DLQ), periodic jobs (cleanup unverified), analytics events batching.

- Admin UI
	- React app (Next.js or separate) with RBAC, audit logs, CSV export.

Diagrama de despliegue (topología):
- CDN (Vercel) -> Frontend (Next.js) -> API (NestJS en VPS/Cloud) -> DB (Postgres private), Redis (cache) -> External services (SendGrid, Algolia)

Data flow: ejemplo búsqueda
1. Usuario submits search -> Frontend calls `GET /api/v1/professionals`.
2. API queries DB (or cache) -> returns paginated results.
3. Frontend renders and tracks event.

Consideraciones de scaling:
- Leer intensamente: cachear resultados de search por query; usar Redis.
- Escritura intensiva: leads are writes — partition/queue if load spikes.

Infra as Code y pipelines:
- Recomendado: Terraform o Pulumi para infra, Helm para services en k8s si escala.
- CI: GitHub Actions para lint, test, build, preview deploys; check for openapi lint and schema migrations.


ADR (detalladas)

ADR-001 — Contexto
- Contexto: Necesitamos una base de datos que soporte joins complejos, transacciones y consistencia para entidades como profesionales, servicios, reservas y facturación.
- Decisión: Usar PostgreSQL (managed) como base de datos relacional principal.
- Consecuencias:
	- Pros: consultas relacionales potentes, ACID, ecosistema maduro (PostGIS, indices GIN), migraciones controladas.
	- Contras: escalado horizontal de escrituras más complejo; necesitaremos replicas de lectura y estrategia de particionado si crecemos mucho.

ADR-002 — Contexto
- Contexto: La búsqueda inicial debe ser precisa y coste-efectiva; Algolia es caro para volúmenes altos, Postgres puede servir en MVP.
- Decisión: Empezar con search DB-driven (Postgres + GIN indexes) y planificar migración a Algolia/Elasticsearch si la latencia o coste lo justifican.
- Consecuencias:
	- Pros: menor coste inicial, simplicidad de stack.
	- Contras: posibles problemas de latencia a escala, mayor trabajo en relevancia/ranking.

ADR-003 — Contexto
- Contexto: Hosting del frontend en plataforma edge con previews y CI integrado mejora time-to-market.
- Decisión: Usar Vercel para frontend (Next.js) y VPS/Cloud para backend (NestJS) en MVP; considerar Kubernetes si necesitamos orquestación avanzada.
- Consecuencias:
	- Pros: deployments rápidos de frontend, previews por PR, control total del backend NestJS.
	- Contras: gestión de servidor backend adicional, configuración de CI/CD para ambos; escalado manual inicial.


Backup / DR (Disaster Recovery)

- Backups diarios automatizados (managed Postgres snapshots) con retención mínima de 30 días.
- Habilitar Point-in-Time Recovery (PITR) para permitir restauración hasta un timestamp.
- Deploy multi-AZ para alta disponibilidad; habilitar read replicas en una región secundaria para failover planificado.
- Procedimiento de restore documentado en `runbooks/db-restore.md` con pasos y tiempos estimados.


Caching y coherencia

- Redis (ElastiCache / managed Redis)
	- Uso: cache de queries de search por query-string, sessions, rate-limiting counters.
	- TTL: 5–60s para resultados de búsqueda; invalidación por key on-write (p.ej. al actualizar perfil cambiar prefijo de cache).
	- Estrategia: cache-aside (get -> cache miss -> DB -> populate) + pub/sub para invalidation si múltiples replicas.

- CDN: cachear assets y HTML estático; usar headers `cache-control` y stale-while-revalidate para ISR.

Autoscaling y capacidad

- Frontend: Vercel / edge scaling automático.
- API (NestJS): escalar horizontalmente con load balancer (Nginx/HAProxy); monitorizar CPU, memoria y latencia de requests.
- Si se despliega en k8s:
	- HPA basado en CPU / request latency / custom metrics (queue length for workers).
	- PodDisruptionBudget y readiness/liveness probes configuradas.
- DB: escalar verticalmente en etapas iniciales; añadir read replicas para lectura intensiva; particionado/sharding como última ratio.

Topología de despliegue (detalle)

- Edge CDN (Vercel) - distribuye HTML estático y assets.
- Frontend (Next.js) - prerender SSG/ISR, SSR para search cuando proceda.
- API (NestJS en VPS/Cloud) - autenticación JWT, Guards, business logic, validación con DTOs.
- Cache (Redis) - consulta rápida, sessions, rate limiting.
- DB (Postgres managed) - transacciones, persistencia, Prisma ORM.
- Workers (Queue + Redis) - emails, retries, batch jobs.
- Integraciones: SendGrid, Algolia (futuro), Maps provider, Payment provider (opcional).

Checklist de despliegue (Runbook resumido)

Pre-deploy
- Revisar PRs y correr pipeline: `lint`, `test`, `build`, `security scan`.
- Ejecutar migraciones en staging: `DATABASE_URL=staging ... npx prisma migrate deploy`.
- Generar y revisar preview deploy en Vercel.

Deploy (producción)
- Lock maintenance page (si aplica).
- Desplegar backend/migrations ordenadas:
	1) Aplicar migraciones no destructivas: `npx prisma migrate deploy`
	2) Deploy backend NestJS: `npm run build && pm2 restart app` (o docker/k8s)
	3) Deploy frontend Next.js: push a Vercel
- Verificar health checks y synthetic transactions (login, search, lead submit).

Post-deploy
- Validar métricas: error rate < threshold, p50/p95 latency aceptable.
- Ejecutar smoke tests (end-to-end) y revisar logs de Sentry.
- Monitorizar costos y autoscaling behaviour 1–2 horas tras deploy.

Rollback
- Si falla crítico: revert deploy (Vercel rollback) y restaurar DB desde snapshot si la migración fue destructiva.
- Procedimiento: activar runbook `runbooks/rollback.md`, notificar stakeholders, abrir incident ticket.

Monitoreo y alertas recomendadas

- Métricas básicas:
	- Availability (HTTP 200 ratio)
	- Error rate (5xx)
	- Latency p95/p99
	- Queue length (workers)
	- LCP / CLS (Core Web Vitals)
- Alertas iniciales:
	- Error rate > 1% sustained 5m
	- Latency p95 > 1.5s
	- Free storage < 10%

Diagrama y artefactos

- Añadir diagramas Mermaid en `diagrams/architecture.mmd` y exports PNG/SVG para la documentación.

Notas finales
- Empezar con stack managed (Vercel + Supabase/Neon) acelera MVP, luego iterar infraestructura con Terraform cuando el negocio lo demande.

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
