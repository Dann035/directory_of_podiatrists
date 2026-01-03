---
title: Arquitectura Técnica — Directorio Podólogos
owner: Tech Lead
version: 0.1
---

Stack recomendado (MVP):
- Frontend: Next.js (SSG/SSR según página), TailwindCSS
- Backend: API server en Node.js / Next API Routes o serverless functions
- DB: PostgreSQL (relacional), usar Prisma como ORM
- Search: filtros simples con DB; iteración a Algolia si escala
- Hosting: Vercel para frontend; DB en managed Postgres (Supabase, Neon, RDS)
- CI/CD: GitHub Actions

Componentes (detallado):

- Web app (Next.js)
	- Pages: `/` (Home), `/search`, `/professional/[slug]`, `/about`, `/legal`.
	- Rendering strategy: Home (SSG/ISR), Search (SSR or SSG+client-side), Profile (SSG with ISR for updates).

- API (Node/Next API routes or small Express/Serverless)
	- Auth: JWT for professionals/admin endpoints; public endpoints read-only.
	- Rate limiting: per IP and per API key for integrators.

- DB (Postgres + Prisma)
	- Schema: professionals, services, reviews, leads, users, audits.
	- Backups: daily automated snapshots; retention 30d.

- Workers & background jobs
	- Email delivery worker (retry, DLQ), periodic jobs (cleanup unverified), analytics events batching.

- Admin UI
	- React app (Next.js or separate) with RBAC, audit logs, CSV export.

Diagrama de despliegue (topología):
- CDN (Vercel) -> Frontend -> API (serverless) -> DB (private), Redis (cache) -> External services (SendGrid, Algolia)

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
- Decisión: Usar Vercel para frontend y serverless API (Next API Routes) en MVP; considerar Kubernetes/cuadros gestionados si necesitamos control fino.
- Consecuencias:
	- Pros: deployments rápidos, previews por PR, fácil integración con Next.js.
	- Contras: limitaciones en tiempo de ejecución de serverless, costes impredecibles ante tráfico masivo; migración futura posible pero con trabajo.


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
- API serverless: escala automática pero monitorizar cold starts y límites de concurrencia.
- Si se despliega en k8s:
	- HPA basado en CPU / request latency / custom metrics (queue length for workers).
	- PodDisruptionBudget y readiness/liveness probes configuradas.
- DB: escalar verticalmente en etapas iniciales; añadir read replicas para lectura intensiva; particionado/ sharding como última ratio.


Topología de despliegue (detalle)

- Edge CDN (Vercel) - distribuye HTML estático y assets.
- Frontend (Next.js) - prerender SSG/ISR, SSR para search cuando proceda.
- API (serverless / container) - autenticación, orquestación, business logic.
- Cache (Redis) - consulta rápida, sessions.
- DB (Postgres managed) - transacciones, persistance.
- Workers (Queue + Redis) - emails, retries, batch jobs.
- Integraciones: SendGrid, Algolia (futuro), Maps provider, Payment provider (opcional).


Comandos y snippets Terraform sugeridos

Nota: Ajusta providers y módulos según tu cloud (AWS/GCP/Azure) y políticas.

Ejemplo (AWS) - RDS Postgres básico:

```hcl
provider "aws" { region = "eu-west-1" }

resource "aws_db_instance" "postgres" {
	identifier = "podologos-db"
	engine = "postgres"
	instance_class = "db.t3.medium"
	allocated_storage = 100
	username = var.db_user
	password = var.db_password
	skip_final_snapshot = false
	backup_retention_period = 7
	multi_az = true
}
```

Ejemplo (AWS) - ElastiCache Redis:

```hcl
resource "aws_elasticache_cluster" "redis" {
	cluster_id = "podologos-redis"
	engine = "redis"
	node_type = "cache.t3.micro"
	num_cache_nodes = 1
}
```

Ejemplo (Vercel provider) - proyecto y variables:

```hcl
provider "vercel" {
	token = var.vercel_token
}

resource "vercel_project" "frontend" {
	name = "podologos-frontend"
}

resource "vercel_environment_variable" "db_url" {
	project_id = vercel_project.frontend.id
	key = "DATABASE_URL"
	value = aws_db_instance.postgres.endpoint
	type = "encrypted"
}
```

Alternativa: usar Terraform modules oficiales para RDS/ElastiCache o usar managed products como Supabase/Neon si prefieres menos infra.


Checklist de despliegue (Runbook resumido)

Pre-deploy
- Revisar PRs y correr pipeline: `lint`, `test`, `build`, `security scan`.
- Ejecutar migraciones en staging: `DATABASE_URL=staging ... npx prisma migrate deploy`.
- Generar y revisar preview deploy en Vercel.

Deploy (producción)
- Lock maintenance page (si aplica).
- Desplegar backend/migrations ordenadas:
	1) Aplicar migraciones no destructivas: `npx prisma migrate deploy`
	2) Deploy backend
	3) Deploy frontend
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

