# 08 - Optimización de Búsqueda

**Estado:** ⬜ Pendiente  
**Prioridad:** 🟡 Media (🔴 Alta cuando escale)  
**Estimación:** 2-4 semanas  
**Última actualización:** 2026-01-03

## 📋 Contexto

Búsqueda actual usa `Prisma contains` (simple pero limitada):
- ❌ No soporta typos
- ❌ Sin ranking de relevancia
- ❌ Performance degrada con escala
- ❌ Sin búsqueda geográfica

**Cuándo optimizar:** >10k profesionales o búsquedas >1s

## 🎯 Objetivos por Fase

### Fase 1: PostgreSQL Full-Text Search
- ⬜ pg_trgm para fuzzy search
- ⬜ Índices GIN para performance
- ⬜ Ranking de relevancia
- ⬜ Búsqueda multi-campo ponderada

### Fase 2: Búsqueda Geográfica
- ⬜ PostGIS extension
- ⬜ Búsqueda por radio (5km, 10km, 20km)
- ⬜ Ordenamiento por distancia
- ⬜ "Cerca de mí" con geolocalización

### Fase 3: Avanzada (Opcional)
- ⬜ Elasticsearch o TypeSense
- ⬜ Autocompletado
- ⬜ Faceted search
- ⬜ Analytics

## 🔄 Comparación de Soluciones

| Solución | Costo | Performance | Complejidad | Cuándo |
|----------|-------|-------------|-------------|--------|
| **pg_trgm** | $0 | 🚀 | 🟡 Media | ✅ Recomendado |
| Elasticsearch | $50-200/mes | 🚀🚀 | 🔴 Alta | >100k registros |
| TypeSense | $20-100/mes | 🚀🚀 | 🟡 Media | Alternativa a ES |
| Algolia | $1/1000 búsq | 🚀🚀 | 🟢 Baja | ❌ Muy caro |

### Decisión Propuesta

**Fase 1:** pg_trgm + PostGIS
- Costo: $0
- Suficiente para 100k+ registros
- No requiere servicios externos

**Fase 3:** Considerar Elasticsearch/TypeSense solo si:
- Tengamos >100k profesionales
- Necesitemos features específicas
- Tengamos presupuesto

## 📦 Implementación

### Fase 1: pg_trgm
1. Instalar extensiones: `pg_trgm`, `postgis`, `unaccent`
2. Crear índices GIN para fuzzy search
3. Implementar búsqueda con `similarity()` y operador `%`
4. Ordenar por score de relevancia

### Fase 2: PostGIS
1. Añadir columna `location geometry(Point, 4326)`
2. Crear índice GIST para búsqueda espacial
3. Implementar búsqueda por radio con `ST_DWithin()`
4. Frontend con geolocalización del navegador

**Detalles técnicos:** Ver implementación completa en código

## ✅ Criterios de Aceptación

### Fase 1: pg_trgm
- ⬜ Fuzzy search funciona
- ⬜ Resultados por relevancia
- ⬜ Performance < 500ms con 10k registros

### Fase 2: PostGIS
- ⬜ Búsqueda por radio funciona
- ⬜ Muestra distancia
- ⬜ "Cerca de mí" funciona
- ⬜ Performance < 500ms

## 🧪 Tests (OBLIGATORIO)

**Requisito:** Mínimo 85% coverage para completar step

### Tests Unitarios - Fase 1
- ⬜ Fuzzy search con pg_trgm
- ⬜ Ranking por relevancia
- ⬜ Manejo de typos

### Tests Unitarios - Fase 2
- ⬜ Búsqueda geográfica por radio
- ⬜ Cálculo de distancias
- ⬜ Ordenamiento por distancia

### Tests E2E
- ⬜ Búsqueda con typos retorna resultados
- ⬜ Búsqueda geográfica "cerca de mí"
- ⬜ Performance < 500ms con 10k registros
- ⬜ Comparación antes/después optimización

**Estado:** ⬜ Pendiente implementación

## ❓ Preguntas Críticas

### 1. ¿pg_trgm o Elasticsearch?
**Recomendación:** pg_trgm para MVP
- Razón: $0, suficiente para 100k registros
- Migrar a ES solo si necesario

**¿Estás de acuerdo?**

### 2. ¿Raw SQL o abstracción?
**Opción A:** Raw SQL con `$queryRaw`
- Pro: Acceso completo a PostgreSQL
- Contra: Menos type-safe

**Opción B:** Servicio de búsqueda separado
- Pro: Fácil cambiar implementación
- Contra: Más código

**¿Qué prefieres?**

### 3. ¿Caching con Redis?
**Propuesta:** No necesario hasta problemas de performance
- Costo: ~$10-20/mes
- Complejidad: Media

**¿Cuándo lo necesitaremos?**

## 📊 Roadmap

### Fase 1: pg_trgm (1-2 semanas)
1. Instalar extensión
2. Crear índices
3. Implementar fuzzy search
4. Testing
5. Deploy con feature flag

### Fase 2: PostGIS (1-2 semanas)
1. Instalar PostGIS
2. Migrar coordenadas
3. Implementar búsqueda geográfica
4. Frontend con geolocalización
5. Testing

### Fase 3: Elasticsearch (Opcional, 3-4 semanas)
Solo si es necesario

## 📚 Referencias

- [PostgreSQL pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [Implementación Detallada](./08-search-optimization-details.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
