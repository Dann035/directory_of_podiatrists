# Modelo de Datos

**Owner:** Data / Backend  
**Versión:** 0.2

Modelo de datos PostgreSQL con Prisma ORM para el directorio de podólogos.

## 📊 Entidades Principales

### Users (Pacientes)
- ⬜ `id`, `name`, `email`, `phone`, `created_at`

### Professionals (Podólogos)
- ✅ `id`, `name`, `slug`, `bio`, `clinic_address`
- ✅ `city`, `postal_code`, `phone`, `email`
- ✅ `license_number`, `verified`, `location` (lat/lng)
- ✅ `created_at`

### Services
- ✅ `id`, `professional_id`, `title`, `description`
- ✅ `price`, `duration_minutes`, `created_at`

### Reviews
- ⬜ `id`, `professional_id`, `user_id`
- ⬜ `rating`, `comment`, `created_at`

### Leads
- ✅ `id`, `professional_id`, `user_name`
- ✅ `user_contact` (JSON), `message`, `status`, `created_at`

## 🔗 Relaciones

```
professionals 1:N services
professionals 1:N reviews
professionals 1:N leads
users 1:N reviews
```

## 🗂️ Índices Recomendados

### Búsqueda Textual (pg_trgm)
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX professionals_name_trgm_idx ON professionals USING gin (name gin_trgm_ops);
CREATE INDEX professionals_bio_trgm_idx ON professionals USING gin (bio gin_trgm_ops);
```

### Búsqueda Geográfica (PostGIS)
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE INDEX professionals_location_idx ON professionals USING gist (location);
```

### Índices Secundarios
```sql
CREATE INDEX professionals_city_idx ON professionals (city);
CREATE INDEX professionals_verified_idx ON professionals (verified);
CREATE INDEX services_professional_idx ON services (professional_id);
CREATE INDEX reviews_professional_idx ON reviews (professional_id);
```

## 📦 Prisma Schema

Ver implementación completa en: [`/server/prisma/schema.prisma`](../../server/prisma/schema.prisma)

**Modelos principales:**
- ✅ `User` - Usuarios del sistema
- ✅ `Professional` - Podólogos verificados
- ✅ `Service` - Servicios ofrecidos
- ⬜ `Review` - Reseñas de pacientes
- ✅ `Lead` - Solicitudes de contacto

## 🔍 Búsquedas

### Búsqueda Fuzzy (pg_trgm)
```sql
SELECT * FROM professionals 
WHERE name % 'perez'  -- Operador de similitud
ORDER BY similarity(name, 'perez') DESC 
LIMIT 20;
```

### Búsqueda Geográfica (PostGIS)
```sql
SELECT id, name, 
  ST_Distance(location, ST_MakePoint(lng, lat)::geography) AS distance
FROM professionals
WHERE ST_DWithin(location, ST_MakePoint(lng, lat)::geography, 20000)
ORDER BY distance LIMIT 50;
```

## 🔄 Migraciones

**Flujo con Prisma:**
1. `npx prisma migrate dev --name <nombre>`
2. Revisar SQL generado
3. Aplicar a staging: `npx prisma migrate deploy`
4. Ejecutar backfills si necesario

**Ver detalles:** [`/docs/project/data-model-migrations.md`](./data-model-migrations.md)

## 📈 Estimaciones de Crecimiento

### Escenario Inicial (Ciudad Piloto)
| Entidad | Filas | Tamaño |
|---------|-------|--------|
| Professionals | 1,000 | ~2 MB |
| Services | 3,000 | ~3 MB |
| Reviews | 10,000 | ~10 MB |
| Leads | 1,000/mes | ~1 MB/mes |

### Proyección 12 Meses
- **Professionals:** ~3,000 (crecimiento 10%/mes)
- **Leads acumulados:** ~23,000 (~23 MB)
- **Total DB:** ~50-100 MB

### Plan de Escalabilidad
- ⬜ Monitoreo de índices (reindex semanal)
- ⬜ Archivar leads >2 años a S3
- ⬜ Particionado si >10M rows
- ⬜ Read replicas para búsquedas

## 🛠️ Operaciones

### Mantenimiento
- ✅ Extensiones habilitadas: `pg_trgm`, `postgis`
- ⬜ Vacuum automático configurado
- ⬜ Monitoreo de tamaño de índices
- ⬜ Backups diarios

### Seeds
Ver: [`/server/prisma/seed.ts`](../../server/prisma/seed.ts)

## 📚 Referencias

- [Prisma Schema](../../server/prisma/schema.prisma)
- [Migraciones](./data-model-migrations.md)
- [PostgreSQL pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)
- [PostGIS](https://postgis.net/)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
