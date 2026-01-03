---
title: Monitoring & Observability
owner: Ops
version: 0.1
---

Resumen

Plan de Monitoring & Observability para el MVP. Define SLOs/SLIs, dashboards recomendados en Grafana, reglas de alerta mapeadas a PagerDuty, estrategia de logs (Sentry/ELK) y playbooks de respuesta con ejemplos PromQL.

1. Objetivos y cobertura

- Cobertura: infra (k8s), API, search, DB y eventos negocio (leads).
- Prioridad inicial: disponibilidad y latencia de endpoints públicos, tasa de errores y métricas de conversión (leads/day).

2. SLOs y SLIs (propuesta)

- SLO 1 — Disponibilidad API pública
	- SLI: porcentaje de solicitudes 200 en `/api/v1/*` (global)
	- Objetivo: 99.9% uptime por mes
	- Error budget: 43.2 minutos/mes

- SLO 2 — Latencia de búsqueda
	- SLI: p95 de latencia de `GET /api/v1/professionals` (ms)
	- Objetivo: p95 < 700ms (staging) / p95 < 800ms (prod)

- SLO 3 — Lead capture reliability
	- SLI: ratio de leads aceptados (201) vs intentos de envío
	- Objetivo: >= 99% de success para requests válidas

- SLO 4 — Core Web Vitals (páginas clave)
	- SLI: LCP < 2.5s en 90% de cargas de página crítica

3. SLIs métricas técnicas (lista rápida)

- Availability: `sum(rate(http_requests_total{job="api",status=~"2.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m]))`
- Error rate: `sum(rate(http_requests_total{job="api",status=~"5.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m]))`
- Latency p95: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="api"}[5m])) by (le))`
- Leads/day: `sum(increase(leads_created_total[1d]))`

4. Dashboards recomendados (Grafana)

- Dashboard: Service Overview
	- Panels: availability %, error rate 5m, p95 latency, requests/s, CPU/memory

- Dashboard: Search / Professionals API
	- Panels: p50/p95 latency, requests by query param, cache hit ratio (Redis), DB query times

- Dashboard: Leads & Conversion Funnel
	- Panels: leads/day, conversion % (views -> leads), top sources (UTM), alert on drop >30%

- Dashboard: Infra / K8s
	- Panels: pod restarts, pod CPU/memory, node health, deployment rollouts

- Dashboard: Security & Errors
	- Panels: Sentry error counts, top exceptions, rate of new issues, recent deploys vs errors

5. Alert rules y mapeo a PagerDuty

- Política general: alertas de severidad P0/P1→PagerDuty (page), P2→Slack/email (ticket).

- Ejemplos de reglas Prometheus (concepto):
	- High Error Rate (P0)
		- Expr: `increase(http_requests_total{job="api",status=~"5.."}[5m]) > 0 and (sum(rate(http_requests_total{job="api",status=~"5.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m])) ) > 0.05`
		- Remitente: PagerDuty — playbook P0

	- Latency Degradation (P1)
		- Expr: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="api"}[5m])) by (le)) > 0.8`
		- Remitente: PagerDuty (page on sustained 10m)

	- Availability Drop (P0)
		- Expr: `1 - (sum(rate(http_requests_total{job="api",status=~"2.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m]))) > 0.001` (threshold configurable)

	- Leads Drop (P1)
		- Expr: `sum(increase(leads_created_total[1d])) < 0.5 * avg_over_time(sum(increase(leads_created_total[1d]))[14d:1d])`

6. Logs y trazas

- Stack recomendado (MVP):
	- Errors: Sentry para exceptions y contexto de usuario (release, environment, tags).
	- Logs estructurados: ELK (Filebeat -> Logstash -> Elasticsearch) o Loki para logs en Grafana.
	- Tracing: OpenTelemetry -> Jaeger/Tempo para trazas distribuidas.

- Enriquecimiento de logs:
	- Añadir trace_id/span_id, user_id (anonimiz.), professional_id, request_id, env y release.

7. Playbooks de respuesta (incidencias comunes)

- P0 — API caída / 5xx masivo
	1. Responder en 15m: on-call check `kubectl get pods` y logs.
	2. Ejecutar health checks:
		 ```bash
		 kubectl -n myapp get pods
		 kubectl -n myapp logs deployment/api --since=10m | tail -n 200
		 curl -fS https://api.example.com/health || echo "health failed"
		 ```
	3. Si error por despliegue, revertir tag y redeploy (ver `planning/10-Deployment_Runbook.md`).
	4. Escalada a Security Lead si hay indicios de breach.

- P1 — Latencia en p95 elevada
	1. Revisar dashboard p95 y queries PromQL.
	2. Comprobar cache hit ratio (Redis) y DB slow queries:
		 ```promql
		 rate(redis_commands_total[5m])
		 ```
	3. Si se detecta saturación, escalar pods o activar circuit-breakers/feature-flag rollback.

- P2 — Leads drop o regresión de negocio
	1. Revisar panel de Leads & Conversion Funnel.
	2. Inspeccionar eventos en analytics (GA4/server-side) y logs de `POST /api/v1/leads`.

8. Ejemplos de consultas PromQL (útiles)

- Requests por segundo (RPS) para job "api":
	- `sum(rate(http_requests_total{job="api"}[1m]))`

- Error rate (5xx) porcentaje:
	- `sum(rate(http_requests_total{job="api",status=~"5.."}[5m])) / sum(rate(http_requests_total{job="api"}[5m]))`

- p95 latency (segundos):
	- `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="api"}[5m])) by (le))`

- Cache hit ratio (Redis):
	- `sum(rate(redis_cache_hits_total[5m])) / sum(rate(redis_cache_requests_total[5m]))`

- Leads/day (conteo):
	- `sum(increase(leads_created_total[1d]))`

9. Integración con PagerDuty

- Flujos: Alertmanager -> webhook -> PagerDuty service
- Mapear severidades a escalation policies (P0 -> page immediate, P1 -> page on sustained 10m, P2 -> email)

10. Instrumentación y SLO reporting

- Automatizar reportes SLO: tarea diaria/weekly que calcule error budget burn (scripting o Grafana reporting API).

11. Tareas issue-ready

- MON-001: Configurar exportadores Prometheus en API (metrics endpoint) — Dueño: Dev — Est: 1d
- MON-002: Crear dashboards Grafana (Service Overview, Leads Funnel) — Dueño: Ops — Est: 2d
- MON-003: Integrar Sentry y configurar alertas para regressions por deploy — Dueño: Dev — Est: 1d
- MON-004: Configurar Alertmanager -> PagerDuty mapping y escalation policies — Dueño: Ops — Est: 1d
- MON-005: Implementar tracing OpenTelemetry en backend — Dueño: Dev — Est: 2d

---

¿Quieres que genere un CSV con las tareas `MON-*` para importarlo a GitHub Issues o que cree las reglas de Prometheus/Alertmanager en formato Terraform/manifest? 


### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
