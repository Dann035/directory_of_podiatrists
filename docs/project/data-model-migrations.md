# Migraciones y Scripts de Datos

**Owner:** Backend  
**Versión:** 0.1

Guía detallada de migraciones, seeds y scripts de datos.

## 🔄 Flujo de Migraciones

### Desarrollo
```bash
# Crear migración
npx prisma migrate dev --name add_professional_location

# Aplicar migraciones
npx prisma migrate dev

# Reset completo (⚠️ elimina datos)
npx prisma migrate reset
```

### Staging/Producción
```bash
# Aplicar migraciones pendientes
DATABASE_URL=<staging_url> npx prisma migrate deploy

# Ver estado
npx prisma migrate status
```

## 📝 Ejemplos de Migraciones

### Agregar Columna PostGIS
```sql
-- migration.sql
ALTER TABLE professionals 
ADD COLUMN location geography(POINT,4326);

-- Poblar desde lat/lng existentes
UPDATE professionals 
SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography 
WHERE longitude IS NOT NULL AND latitude IS NOT NULL;

-- Crear índice
CREATE INDEX professionals_location_idx 
ON professionals USING gist (location);
```

### Agregar Índices Trigram
```sql
-- Habilitar extensión
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Índices GIN
CREATE INDEX professionals_name_trgm_idx 
ON professionals USING gin (name gin_trgm_ops);

CREATE INDEX professionals_bio_trgm_idx 
ON professionals USING gin (bio gin_trgm_ops);
```

## 🌱 Scripts Seed

### Seed Principal
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear profesionales de prueba
  const prof1 = await prisma.professional.create({
    data: {
      name: 'Dr. Juan Pérez',
      slug: 'dr-juan-perez',
      city: 'Madrid',
      verified: true,
      bio: 'Especialista en biomecánica',
      services: {
        create: [
          { title: 'Consulta General', price: 50, durationMinutes: 45 },
          { title: 'Estudio de la Marcha', price: 80, durationMinutes: 60 }
        ]
      }
    }
  });

  console.log('✅ Seed completado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Ejecutar Seeds
```bash
# Con Prisma
npx prisma db seed

# Manual
ts-node prisma/seed.ts
```

## 🔧 Scripts de Backfill

### Actualizar Ubicaciones
```typescript
// scripts/backfill-locations.ts
async function backfillLocations() {
  const professionals = await prisma.professional.findMany({
    where: { location: null, latitude: { not: null } }
  });

  for (const prof of professionals) {
    await prisma.$executeRaw`
      UPDATE professionals 
      SET location = ST_SetSRID(ST_MakePoint(${prof.longitude}, ${prof.latitude}), 4326)::geography
      WHERE id = ${prof.id}
    `;
  }
}
```

## ⚠️ Consideraciones

### Antes de Migrar
- ✅ Backup de base de datos
- ✅ Probar en staging
- ✅ Revisar SQL generado
- ✅ Plan de rollback

### Migraciones Grandes
- ⬜ Ejecutar en horario de bajo tráfico
- ⬜ Usar `CONCURRENTLY` para índices
- ⬜ Monitorear locks de tablas
- ⬜ Considerar migraciones en lotes

### Rollback
```bash
# Revertir última migración (desarrollo)
npx prisma migrate reset

# Producción: aplicar migración inversa manual
psql -d <database> -f rollback.sql
```

## 📚 Referencias

- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [PostGIS Functions](https://postgis.net/docs/reference.html)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

