# 02 - Búsqueda de Profesionales

**Estado:** ✅ Completado (Básico)  
**Prioridad:** 🔴 Alta  
**Última actualización:** 2026-01-03

## 📋 Contexto

Funcionalidad core del directorio: encontrar podólogos por ubicación, especialidad, nombre y verificación de forma rápida y precisa.

## 🎯 Objetivos

- ✅ Búsqueda por texto (nombre, bio)
- ✅ Filtro por ciudad
- ✅ Filtro por especialidad/servicio
- ✅ Filtro por verificación
- ✅ Paginación
- ✅ Ordenamiento por relevancia
- ⬜ Búsqueda geográfica (radio)
- ⬜ Ordenamiento por distancia
- ⬜ Full-text search avanzado

## 🏗️ Arquitectura

### Stack
- **Backend:** Prisma ORM + PostgreSQL
- **Frontend:** React hooks + debouncing

### Endpoint
```
GET /api/v1/practitioners?q=...&city=...&verified=...&page=1&perPage=10

Response: {
  data: Professional[],
  meta: { total, page, perPage, totalPages, hasMore }
}
```

### Índices DB
```sql
CREATE INDEX idx_professionals_city ON professionals(city);
CREATE INDEX idx_professionals_verified ON professionals(verified);
```

## 🔄 Alternativas

| Solución | Estado | Cuándo Usar |
|----------|--------|-------------|
| Prisma contains | ✅ Actual | MVP, <10k registros |
| pg_trgm | ⬜ Recomendado | >10k registros, fuzzy search |
| Elasticsearch | ⬜ Futuro | >100k registros, $50-200/mes |
| TypeSense | ⬜ Alternativa | Open source a Elasticsearch |

**Decisión:** Prisma suficiente para MVP. Migrar a pg_trgm cuando:
- Tengamos >10k profesionales
- Búsquedas tomen >1s
- Necesitemos fuzzy search

## 📦 Implementación

### Backend
```typescript
// server/src/practitioners/practitioners.service.ts
async search(dto: SearchDto) {
  const where: Prisma.ProfessionalWhereInput = {};
  
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } }
    ];
  }
  
  if (city) where.city = { equals: city, mode: 'insensitive' };
  if (verified) where.verified = verified;
  
  return prisma.professional.findMany({
    where,
    include: { services: true },
    skip: (page - 1) * perPage,
    take: perPage
  });
}
```

### Frontend
```typescript
// client/app/search/page.tsx
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

useEffect(() => {
  const timer = setTimeout(() => {
    performSearch();
  }, 300); // Debounce
  return () => clearTimeout(timer);
}, [query]);
```

## ✅ Criterios de Aceptación

- ✅ Búsqueda por nombre funciona
- ✅ Filtros funcionan
- ✅ Paginación funciona
- ✅ Loading state
- ✅ Mensaje sin resultados
- ✅ Case-insensitive
- ✅ Debouncing (no spam requests)

## 📊 Métricas

- ✅ Búsqueda < 500ms
- ✅ Debouncing funciona
- 🔄 Tasa de éxito > 80% (pendiente analytics)

## 🧪 Tests (OBLIGATORIO)

**Requisito:** Mínimo 85% coverage para completar step

### Tests Unitarios
- ✅ `practitioners.service.ts`: search con diferentes filtros
- ✅ Query building con Prisma
- ✅ Paginación lógica

### Tests E2E
- ✅ GET /practitioners (sin filtros)
- ✅ GET /practitioners?q=nombre (búsqueda texto)
- ✅ GET /practitioners?city=Madrid (filtro ciudad)
- ✅ GET /practitioners?verified=true (filtro verificación)
- ✅ GET /practitioners?page=2&perPage=5 (paginación)
- ✅ Combinación de filtros

**Estado:** ✅ Tests implementados y pasando

## ❓ Mejoras Futuras

Ver plan detallado: [08-search-optimization.md](./08-search-optimization.md)

- ⬜ pg_trgm para fuzzy search
- ⬜ PostGIS para búsqueda geográfica
- ⬜ Ordenamiento por distancia
- ⬜ Autocompletado
- ⬜ Faceted search
- ⬜ Redis caching

## 📚 Referencias

- [Prisma Full-Text Search](https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search)
- [PostgreSQL pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)
- [Plan de Optimización](./08-search-optimization.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
