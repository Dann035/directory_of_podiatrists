# 🤖 Guía de Colaboración con IA

Guía para IAs (Cursor, ChatGPT, Claude, Copilot) trabajando en este proyecto.

## 🎯 Objetivo

Estandarizar colaboración independiente de la herramienta.

## 📖 Onboarding

1. `README.md`
2. `ARCHITECTURE_SUMMARY.md`
3. `/docs/plans/README.md`
4. `.cursorrules`

## 🔄 Flujo de Trabajo

### Antes de Implementar

**Plan existe:**
1. Leer completo
2. Entender contexto
3. Cuestionar decisiones
4. Proponer alternativas
5. Discutir dudas

**Plan NO existe:**
1. Crear plan
2. Documentar problema
3. Proponer soluciones
4. Discutir antes de implementar

### Durante

1. Seguir `.cursorrules`
2. Mantener estilo
3. Documentar decisiones
4. Actualizar plan
5. Commits descriptivos

### Después

1. Actualizar plan (estado, decisiones, aprendizajes)
2. Actualizar docs
3. Verificar tests
4. Documentar deuda técnica

## 🤔 Cuestionamiento

**Preguntas clave:**
1. ¿Solución más simple?
2. ¿Herramientas mejores?
3. ¿Escalará?
4. ¿Alternativas?
5. ¿Best practices?

**Ejemplo:**
```markdown
## pg_trgm vs Elasticsearch

Contexto: Búsqueda fuzzy necesaria
Propuesta: Elasticsearch
Cuestionamiento: ¿Necesario para <1k registros?

Alternativas:
1. pg_trgm: $0, suficiente 100k
2. Elasticsearch: $50-200/mes, overkill MVP

Recomendación: pg_trgm para MVP
Decisión: [Pendiente]
```

## 📝 Estructura de Planes

```markdown
# [XX] - [Nombre]

**Estado:** ⬜|🔄|✅
**Prioridad:** 🔴|🟡|🟢
**Estimación:** X días

## Contexto
## Objetivos
## Arquitectura
## Alternativas
## Implementación
## Criterios
## Preguntas

### Leyenda de Estados
- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
```

## 🗣️ Comunicación

**Preguntar:** Requisitos no claros | Múltiples enfoques | Decisión arquitectónica | Breaking changes | Costo/seguridad

**Decidir:** Detalles implementación | Estructura código | Librería menor | UX pequeña | Bug fixes

### Cómo

**Bueno:**
```
Propongo pg_trgm vs Elasticsearch:
1. Costo: $0 vs $50-200/mes
2. Complejidad: Baja vs Alta
3. Performance: Suficiente 100k
¿De acuerdo?
```

**Malo:**
```
¿Qué DB usar?
```

## 🔍 Debugging

1. Reproducir
2. Logs (backend/frontend/DB)
3. Aislar
4. Verificar config
5. Buscar docs
6. Proponer solución

## ✅ Checklist

**Antes:**
- ⬜ Leí README
- ⬜ Leí ARCHITECTURE_SUMMARY
- ⬜ Leí plans/README
- ⬜ Entiendo contexto

**Durante:**
- ⬜ Sigo .cursorrules
- ⬜ Mantengo estilo
- ⬜ Documento decisiones

**Después:**
- ⬜ Actualicé plan
- ⬜ Documenté aprendizajes
- ⬜ Tests pasan

## 🚀 Ejemplos

### Nueva Feature
```
Usuario: "Agregar favoritos"
IA:
1. Busca plan (no existe)
2. Crea plan
3. Documenta alternativas
4. Propone: DB (mejor MVP)
5. Discute
6. Implementa
7. Actualiza ✅
```

### Optimizar
```
Usuario: "Búsqueda lenta"
IA:
1. Lee plan
2. Identifica problema
3. Propone pg_trgm
4. Cuestiona: ¿ES necesario? No
5. Implementa
6. Actualiza
```

## 🎯 Principios

1. Simplicidad (KISS, YAGNI)
2. Cuestionar siempre
3. Documentar decisiones
4. Priorizar valor
5. Mantener calidad

## 📚 Recursos

- [README](../README.md)
- [Architecture](../ARCHITECTURE_SUMMARY.md)
- [Plans](./plans/README.md)
- [Review](./REVIEW_NEEDED.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
