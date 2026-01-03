# Deployment Runbook

**Owner:** DevOps | **Versión:** 0.1

Guía de despliegue y operaciones para el MVP.

## ✅ Pre-Deploy Checklist

- ⬜ CI pipeline verde (lint, tests)
- ⬜ Migraciones revisadas y aprobadas
- ⬜ Backup de BD verificado (<24h)
- ⬜ Health checks en verde (staging)
- ⬜ Monitoreo configurado (Sentry, logs)
- ⬜ Feature flags listos
- ⬜ Plan de rollback comunicado

## 🚀 Proceso de Despliegue

### 1. Preparación
```bash
# Crear release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Deploy a staging
git checkout release/v1.0.0
# CI/CD automático o manual
```

### 2. Validación en Staging
- ⬜ Smoke tests automáticos
- ⬜ Pruebas manuales críticas
- ⬜ Health checks OK
- ⬜ Logs sin errores

### 3. Deploy a Producción

**Ventana recomendada:** Fuera de horas pico

```bash
# Migraciones (si aplica)
cd server
DATABASE_URL=<prod_url> npx prisma migrate deploy

# Deploy aplicación
# Kubernetes
kubectl -n prod rollout restart deployment/backend
kubectl -n prod rollout restart deployment/frontend

# Vercel/Railway (automático con git push)
git push production main
```

### 4. Verificación Post-Deploy
```bash
# Health checks
curl https://api.example.com/health

# Logs
kubectl -n prod logs -f deployment/backend --tail=100

# Métricas
# Ver dashboard de monitoreo
```

## 🔄 Migraciones de BD

### Proceso
```bash
# 1. Backup
pg_dump -h <host> -U <user> <db> > backup_$(date +%Y%m%d).sql

# 2. Aplicar migraciones
DATABASE_URL=<prod_url> npx prisma migrate deploy

# 3. Verificar
npx prisma migrate status
```

### Rollback de Migración
```bash
# Revertir última migración
psql -h <host> -U <user> <db> -f rollback.sql

# Restaurar backup completo
psql -h <host> -U <user> <db> < backup_20260103.sql
```

## 🎛️ Feature Flags

**Herramienta:** Variables de entorno / LaunchDarkly

```typescript
// Ejemplo
if (process.env.FEATURE_NEW_SEARCH === 'true') {
  // Nueva búsqueda
} else {
  // Búsqueda legacy
}
```

## ⏪ Plan de Rollback

### Rollback Rápido
```bash
# Kubernetes - volver a versión anterior
kubectl -n prod rollout undo deployment/backend

# Vercel - revertir deployment
vercel rollback <deployment-url>
```

### Rollback Completo
1. ⬜ Revertir código a tag anterior
2. ⬜ Rollback migraciones BD
3. ⬜ Restaurar backup si necesario
4. ⬜ Verificar health checks
5. ⬜ Comunicar al equipo

## 🚨 Runbook de Incidentes

### Severidad

| Nivel | Descripción | Tiempo Respuesta |
|-------|-------------|------------------|
| P0 | Servicio caído | 15 min |
| P1 | Funcionalidad crítica afectada | 1 hora |
| P2 | Funcionalidad menor afectada | 4 horas |
| P3 | Mejora/bug menor | 1 día |

### Comandos Útiles

```bash
# Ver logs
kubectl -n prod logs -f deployment/backend

# Escalar pods
kubectl -n prod scale deployment/backend --replicas=5

# Reiniciar servicio
kubectl -n prod rollout restart deployment/backend

# Ver métricas
kubectl -n prod top pods

# Acceder a pod
kubectl -n prod exec -it <pod-name> -- /bin/sh
```

## 📊 Monitoreo

### Health Checks
- `/health` - Estado general
- `/health/db` - Conexión BD
- `/health/ready` - Listo para tráfico

### Métricas Clave
- ⬜ Response time (p95 < 500ms)
- ⬜ Error rate (< 1%)
- ⬜ CPU/Memory usage
- ⬜ DB connections

### Alertas
- ⬜ Error rate > 5%
- ⬜ Response time > 2s
- ⬜ CPU > 80%
- ⬜ Disk > 85%

## 📚 Referencias

- [Monitoreo](./monitoring.md)
- [Security](./security.md)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
