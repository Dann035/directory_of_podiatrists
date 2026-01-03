---
title: Modelo de Datos (Postgres) — Detallado
owner: Data / Backend
version: 0.2
---

Este documento complementa `planning/04-Data_Model.md` con esquemas SQL, modelos Prisma, índices GIN trigram, recomendaciones PostGIS, ejemplos de migraciones y scripts seed, además de estimaciones de tamaño y plan de crecimiento.

## Resumen de entidades

- `users` (pacientes)
  - id, name, email, phone, created_at
- `professionals` (podólogos)
  - id, name, slug, bio, clinic_address, city, postal_code, phone, email, license_number, verified, location(lat/lng), created_at
- `services`
  - id, professional_id, title, description, price (nullable), duration_minutes, created_at
- `reviews`
  - id, professional_id, user_id, rating, comment, created_at
- `leads`
  - id, professional_id, user_name, user_contact (json), message, created_at, status

Relaciones:
- professionals 1:N services
- professionals 1:N reviews
- professionals 1:N leads

Índices recomendados:
- city, slug(unique), GIN trigram on name/slug/bio, GIST on location (PostGIS)

Política de migraciones: usar Prisma Migrate; revisar SQL generado; pruebas en staging; plan de backfill y scripts idempotentes para datos históricos.

---

## Esquema SQL (ejemplo simplificado)

-- Habilitar extensiones requeridas
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabla professionals
CREATE TABLE professionals (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT,
  clinic_address TEXT,
  city TEXT,
  postal_code TEXT,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  verified BOOLEAN DEFAULT FALSE,
  location GEOGRAPHY(POINT, 4326), -- lat/lng
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  professional_id BIGINT REFERENCES professionals(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  price NUMERIC(10,2),
  duration_minutes INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla reviews
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  professional_id BIGINT REFERENCES professionals(id) ON DELETE CASCADE,
  user_id BIGINT,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla leads
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  professional_id BIGINT REFERENCES professionals(id) ON DELETE SET NULL,
  user_name TEXT,
  user_contact JSONB,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para búsquedas textuales y geoespaciales
-- GIN trigram para búsqueda por nombre/slug/bio
CREATE INDEX professionals_name_trgm_idx ON professionals USING gin (name gin_trgm_ops);
CREATE INDEX professionals_slug_trgm_idx ON professionals USING gin (slug gin_trgm_ops);
CREATE INDEX professionals_bio_trgm_idx ON professionals USING gin (bio gin_trgm_ops);

-- Índice geoespacial (PostGIS)
CREATE INDEX professionals_location_idx ON professionals USING gist (location);

-- Índices secundarios
CREATE INDEX services_professional_idx ON services (professional_id);
CREATE INDEX reviews_professional_idx ON reviews (professional_id);

---

## Prisma schema (models) — ejemplo

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Professional {
  id             BigInt   @id @default(autoincrement())
  name           String
  slug           String   @unique
  bio            String?
  clinicAddress  String?
  city           String?
  postalCode     String?
  phone          String?
  email          String?
  licenseNumber  String?
  verified       Boolean  @default(false)
  location       Unsupported("geography")?
  services       Service[]
  reviews        Review[]
  leads          Lead[]
  createdAt      DateTime @default(now())

  @@index([city])
}

model Service {
  id              BigInt @id @default(autoincrement())
  professional    Professional @relation(fields: [professionalId], references: [id])
  professionalId  BigInt
  title           String?
  description     String?
  price           Float?
  durationMinutes Int?
  createdAt       DateTime @default(now())

  @@index([professionalId])
}

model Review {
  id              BigInt @id @default(autoincrement())
  professional    Professional @relation(fields: [professionalId], references: [id])
  professionalId  BigInt
  userId          BigInt?
  rating          Int
  comment         String?
  createdAt       DateTime @default(now())

  @@index([professionalId])
}

model Lead {
  id              BigInt @id @default(autoincrement())
  professional    Professional? @relation(fields: [professionalId], references: [id])
  professionalId  BigInt?
  userName        String?
  userContact     Json?
  message         String?
  status          String   @default("new")
  createdAt       DateTime @default(now())
}
```

Nota: Prisma no tiene tipo `geography` nativo; manejar location con columnas raw o usar `Unsupported("geography")` y aplicar índices con migraciones SQL.

---

## Índices GIN trigram — por qué y cómo

- Uso: mejorar búsqueda por texto parcial (nombre, slug, bio, servicios).
- Recomendación: activar la extensión `pg_trgm` y crear índices GIN con `gin_trgm_ops`.
- Ejemplo: `CREATE INDEX professionals_name_trgm_idx ON professionals USING gin (name gin_trgm_ops);`
- Query de ejemplo para búsqueda fuzzy:
  - `SELECT * FROM professionals WHERE name ILIKE '%perez%' ORDER BY similarity(name, 'perez') DESC LIMIT 20;`

Consideración: los índices trigram ocupan espacio; monitorizar y recalcular estadísticas tras grandes cargas.

---

## PostGIS / Geolocation tips

- Usar `GEOGRAPHY(POINT,4326)` para búsquedas por distancia con lat/lng.
- Indexar con GIST: `CREATE INDEX professionals_location_idx ON professionals USING gist (location);`
- Búsqueda por proximidad (ejemplo):
  ```sql
  SELECT id, name, ST_Distance(location, ST_MakePoint(lng, lat)::geography) AS distance
  FROM professionals
  WHERE ST_DWithin(location, ST_MakePoint(lng, lat)::geography, 20000) -- 20km
  ORDER BY distance
  LIMIT 50;
  ```

---

## Migraciones y scripts (ejemplos)

- Flujo recomendado con Prisma:
  1. `npx prisma migrate dev --name add-professional-location` (desarrollo)
  2. Revisar SQL generado en `prisma/migrations/<timestamp>/migration.sql`
  3. Aplicar a staging: `DATABASE_URL=staging npx prisma migrate deploy`
  4. Ejecutar backfills si es necesario (`node scripts/backfill_location.js`)

- Ejemplo de migración raw para añadir PostGIS column (manual):
  ```sql
  ALTER TABLE professionals ADD COLUMN location geography(POINT,4326);
  -- populate from lat/lng columns if exist
  UPDATE professionals SET location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography WHERE lng IS NOT NULL AND lat IS NOT NULL;
  CREATE INDEX professionals_location_idx ON professionals USING gist (location);
  ```

## Scripts seed (ejemplo Node + Prisma)

`prisma/seed.js`:

```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prof = await prisma.professional.create({
    data: {
      name: 'Dr. Juan Pérez',
      slug: 'dr-juan-perez',
      city: 'Madrid',
      verified: true,
      bio: 'Especialista en uñas encarnadas y biomecánica.'
    }
  });

  await prisma.service.createMany({ data: [
    { professionalId: prof.id, title: 'Tratamiento uñas', price: 35, durationMinutes: 30 },
    { professionalId: prof.id, title: 'Estudio de la marcha', price: 60, durationMinutes: 45 }
  ]});
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
```

Ejecutar: `node prisma/seed.js` o integrar con `prisma db seed`.

---

## Tamaño estimado de tablas y growth plan (estimaciones)

Supuestos iniciales (ciudad piloto):
- Podólogos verificados: 1,000
- Servicios por profesional: 3 en media
- Reviews por profesional (media inicial): 10
- Leads por mes: 1,000

Estimación de filas y tamaño (apróx.):
- `professionals`: 1,000 rows × ~2KB/row = ~2 MB
- `services`: 3,000 rows × ~1KB/row = ~3 MB
- `reviews`: 10,000 rows × ~1KB/row = ~10 MB
- `leads`: 12,000 rows/año × ~1KB/row = ~12 MB/año

Escenario de crecimiento (12 meses):
- Crecimiento orgánico 10% mes a mes en profesionales y leads.
- Tras 12 meses: profesionales ≈ 3,138; leads acumulados ≈ ~23k (≈23 MB)

Growth plan / operaciones:
- Monitorizar índices: reindexar y vacuum periódicamente (cron job semanal para tablas grandes).
- Archivar leads antiguos > 2 años a almacenamiento frío (S3) con proceso ETL mensual.
- Particionado por fecha para `leads` y `reviews` si superan ~10M rows (partition by range on created_at).
- Read replicas para lecturas intensivas (search); usar replicas en otra AZ para DR.

---

## Recomendaciones operativas

- Mantener `pg_trgm` y `postgis` habilitados en entorno DB desde inicio.
- Evaluar índices en staging con cargas representativas y ajustar `fillfactor` si necesario.
- Hacer pruebas de carga en queries de búsqueda y medir tiempos con/without cache.

---

Si quieres, genero automáticamente los archivos SQL/migration scripts y un CSV con filas estimadas por tabla para integrarlo al planning.
