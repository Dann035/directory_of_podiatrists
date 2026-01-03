---
title: Deployment Runbook
owner: DevOps
version: 0.1
---

Resumen

Runbook de despliegue y operación para el MVP del Directorio de Podólogos. Contiene checklist pre-deploy, playbook de despliegue Staging → Producción, pasos para migraciones de base de datos, gestión de feature flags, plan de rollback y runbook de incidentes con SLAs y comandos operativos.

1. Checklist pre-deploy

- CI: pipeline verde (lint, tests unitarios, integración y e2e smoke).
- Migrations: migraciones revisadas, aprobadas y en branch de release.
- Backups: snapshot de la base de datos y copia de backup verificada (últimas 24h).
- Health: endpoints de health check en verde en staging.
- Monitorización/Alertas: notificaciones configuradas (Sentry, Prometheus/Datadog).
- Feature flags: flags para cambios arriesgados disponibles para toggle rápido.
- Rollback plan revisado y comunicado al equipo on-call.

2. Playbook de despliegue (Staging → Producción)

Preparación (antes del día de despliegue)

- Crear release branch y tag: `release/vX.Y.Z`.
- Ejecutar pipeline completo en CI (incluye build de imágenes y tests).
- Desplegar en `staging` y ejecutar smoke e2e automáticos y pruebas manuales rápidas.

Ventana de despliegue recomendada

- Fuera de horas pico locales; comunicad al equipo y al soporte.

Despliegue

1. Tag y push

	- Crear tag semántico y push:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

2. Desplegar infra (si aplica): Terraform plan + apply en el entorno `prod` (si hay cambios infra)

```bash
terraform plan -var-file=prod.tfvars
terraform apply -var-file=prod.tfvars
```

3. Desplegar artefactos (images) — ejemplo Kubernetes / ArgoCD / CI CD runner

```bash
# ejemplo: forzar rollout en k8s
kubectl -n myapp rollout restart deployment/frontend
kubectl -n myapp rollout status deployment/frontend --timeout=5m
```

4. Ejecutar migraciones (ver sección 3) y validar health checks.

5. Ejecutar smoke tests y monitorear métricas p95/p99, error rate y Sentry.

6. Staged feature flags: habilitar gradualmente si aplica (canary %).

7. Monitoreo post-deploy: 30–60 min de observación intensiva; checklists de KPIs.

3. Migraciones de base de datos (procedimiento seguro)

Principios

- Nunca ejecutar migraciones destructivas en el mismo paso que despliegue sin fallback.
- Preferir migraciones en dos pasos: añadir columnas/índices → backfill → cortar uso → eliminar columnas antiguas en release posterior.

Pasos operativos

1. Backup antes de migración

```bash
# ejemplo postgres snapshot
psql -c "SELECT pg_start_backup('pre_migration');"
# generar snapshot según proveedor
psql -c "SELECT pg_stop_backup();"
```

2. Ejecutar migración en staging y verificar datos.

3. Ejecutar migración en prod en ventana controlada:

```bash
# ejecutar migration runner (ejemplo prisma)
npx prisma migrate deploy --schema=prisma/schema.prisma
```

4. Verificar integridad (row counts, índices, checksums) y health endpoints.

5. Rollback DB: preparar procedimiento de restauración desde backup (ver sección 4). Evitar rollback de producción que implique pérdida de datos; preferir migraciones compensatorias.

Notas

- Para migraciones que requieran downtime: coordinar ventana, anunciar a usuarios y preparar página de mantenimiento.
- Testear restore en entorno staging trimestralmente.

4. Feature flags

- Implementación recomendada: LaunchDarkly / Unleash / simple flags en DB + cache.
- Buenas prácticas:
	- Flag por comportamiento (API/UI) con targeting por userId/env.
	- Defaults: off for risky features.
	- Documentar owner y criterios de rollout para cada flag.
	- Monitorizar métricas al habilitar (error rate, latencia, conversión).

Operación rápida (ejemplo toggling):

```bash
# ejemplo: toggle via CLI o panel
# curl -X POST "https://flags.internal/api/toggle" -d '{"flag":"new_search","state":true}'
```

5. Rollback plan

Código

- Revertir a tag anterior y redeploy inmediato:

```bash
git checkout vX.Y.(Z-1)
kubectl -n myapp rollout restart deployment/frontend
```

Base de datos

- Evitar rollback automatizado de migraciones en producción salvo que exista un procedimiento probado.
- Preferir migraciones compensatorias (scripts para transformar datos a formato anterior) o restauración desde snapshot si es imprescindible.

Rollback rápido (pasos)

1. Identificar fallo crítico (página caída, error 5xx extendido).
2. Deshabilitar feature flags relacionados.
3. Revertir despliegue a tag previo.
4. Si el fallo es por migración DB irreversible: activar plan de restore desde backup (comunicar RTO/RPO).

6. Incident Runbook (SLAs, responsabilidades y comandos)

Objetivo: procedimiento claro para incidencias críticas (P0/P1).

Clasificación y SLAs

- P0 (sev 1): servicio caído o pérdida masiva de datos — SLA: responder en 15 min, RTO objetivo: 4h.
- P1 (sev 2): degradación severa (p95 muy alto, errores 5xx) — SLA: responder en 30 min, RTO objetivo: 8h.
- P2 (sev 3): incidentes menores sin impacto en producción — SLA: 4h respuesta, RTO: 48h.

Roles

- On-call Engineer: primera respuesta técnica.
- Security Lead / CTO: coordinación técnica y decisiones críticas.
- Product Owner / Ops: comunicación usuario y priorización.
- PR/Growth: comunicación pública si aplica.

Run commands & checks (rápido)

1. Status cluster / pods

```bash
kubectl -n myapp get pods
kubectl -n myapp describe pod <pod-name>
kubectl -n myapp logs deployment/frontend --since=10m
```

2. Check health endpoints

```bash
curl -fS https://api.example.com/health || echo "health failed"
```

3. DB connectivity & slow queries

```bash
psql $DATABASE_URL -c "SELECT count(*) FROM professionals;"
# check locks
psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity WHERE state!='idle' ORDER BY query_start DESC LIMIT 10;"
```

4. Restore from backup (procedimiento resumido)

```bash
# snapshot restore (varía por proveedor)
# ejemplo conceptual: restore snapshot -> promote -> switch traffic
```

Comunicación

- Notificar en canal #oncall y abrir incidente en tracker con plantilla: resumen, impacto, steps realizados, owner, ETA.

Post-mortem

- Completar post-mortem en 72h para P0/P1: root cause, timeline, mitigaciones y owners.

7. Escenarios comunes y playbooks rápidos

- Deploy fallido: revertir tag, revisar logs, ejecutar smoke tests.
- Migración fallida: activar restore drill; si no es crítico, aplicar migración compensatoria.
- Breach / incidente de seguridad: seguir `planning/09-Security_Privacy.md` Breach Response Plan.

8. Automatización y pruebas

- Integrar checks automatizados en CI para migrations y smoke tests.
- Realizar rehearsals (deploy rehearsal) en staging una vez por sprint.

9. Tareas issue-ready (ejemplos)

- DEPLOY-001: Script automatizado de backup pre-deploy — Dueño: DevOps — Est: 1d
- DEPLOY-002: Pipeline de migrations con gating y rollback test — Dueño: Dev — Est: 2d
- DEPLOY-003: Integrar feature flags con panel y CLI — Dueño: Dev — Est: 2d
- DEPLOY-004: Test de restore trimestral en staging — Dueño: DevOps — Est: 1d

---

¿Quieres que convierta estas tareas en un CSV para importar a GitHub Issues o que cree los issues directamente en un repositorio (necesitaré repo y token)?

