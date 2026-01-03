# 📋 Planes de Desarrollo - Tracker

Directorio de planes organizados por prioridad y estado.

## 🎯 Propósito

- Estandarizar comunicación con IAs
- Documentar decisiones arquitectónicas
- Planificar features y mejoras
- Facilitar onboarding
- **Trackear progreso del desarrollo**

## 📊 Estado General del Proyecto

| Métrica | Valor |
|---------|-------|
| **Planes Totales** | 15 |
| **Completados** | 2 (13%) |
| **En Progreso** | 0 (0%) |
| **Pendientes** | 13 (87%) |
| **Tests Coverage** | ~60% (objetivo: 85%) |

## 📚 Índice de Planes

### 🔴 Alta Prioridad

| # | Plan | Estado | Tests | Última Act. |
|---|------|--------|-------|-------------|
| 01 | [Autenticación](./01-authentication.md) | ✅ Completado | ✅ 85%+ | 2026-01-04 |
| 02 | [Búsqueda](./02-search-professionals.md) | ✅ Completado | ✅ 85%+ | 2026-01-04 |
| 03 | Arquitectura Base | ✅ Completado | N/A | 2026-01-03 |

### 🟡 Media Prioridad

| # | Plan | Estado | Tests | Estimación |
|---|------|--------|-------|------------|
| 04 | [Perfil Profesional](./04-professional-profile.md) | ⬜ Pendiente | ⬜ 0% | 3-5 días |
| 05 | Sistema de Reseñas | ⬜ Pendiente | ⬜ 0% | 3-4 días |
| 06 | Sistema de Leads | ⬜ Pendiente | ⬜ 0% | 2-3 días |
| 07 | Panel Admin | ⬜ Pendiente | ⬜ 0% | 1 semana |
| 08 | [Optimización Búsqueda](./08-search-optimization.md) | ⬜ Pendiente | ⬜ 0% | 2-4 semanas |

### 🟢 Baja Prioridad

| # | Plan | Estado | Tests | Estimación |
|---|------|--------|-------|------------|
| 09 | Sistema de Citas | ⬜ Pendiente | ⬜ 0% | 2-3 semanas |
| 10 | Notificaciones | ⬜ Pendiente | ⬜ 0% | 1-2 semanas |
| 11 | Panel Profesional | ⬜ Pendiente | ⬜ 0% | 1-2 semanas |
| 12 | Pagos | ⬜ Pendiente | ⬜ 0% | 2-3 semanas |
| 13 | SEO | ⬜ Pendiente | ⬜ 0% | 1-2 semanas |
| 14 | CI/CD | ⬜ Pendiente | ⬜ 0% | 1 semana |
| 15 | i18n | ⬜ Pendiente | ⬜ 0% | 1 semana |

## 📖 Estructura de un Plan

Cada plan debe seguir esta estructura:

```markdown
# [Número] - [Nombre]

**Estado:** ⬜ Pendiente | 🔄 En progreso | ✅ Completado
**Prioridad:** 🔴 Alta | 🟡 Media | 🟢 Baja
**Estimación:** X días/semanas
**Última actualización:** YYYY-MM-DD

## 📋 Contexto
[Problema y valor]

## 🎯 Objetivos
[Lista específica con checkboxes]

## 🏗️ Arquitectura
[Tecnologías y diseño]

## 🔄 Alternativas
[Opciones evaluadas]

## 📦 Implementación
[Pasos clave]

## ✅ Criterios de Aceptación
[Requisitos]

## 🧪 Tests (OBLIGATORIO)
**Requisito:** Mínimo 85% coverage
- Tests unitarios
- Tests e2e
**Estado:** [Estado actual]

## ❓ Preguntas Abiertas
[Decisiones pendientes]

### Leyenda de Estados
- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
```

## 🔄 Proceso de Desarrollo

### Para cada Step:

**1. Pre-implementación:**
- ⬜ Leer plan completamente
- ⬜ Entender contexto y objetivos
- ⬜ Cuestionar decisiones si parecen subóptimas
- ⬜ Proponer alternativas mejores

**2. Durante implementación:**
- ⬜ Seguir convenciones de código
- ⬜ Validar inputs (cliente + servidor)
- ⬜ Manejar errores apropiadamente
- ⬜ Documentar decisiones importantes

**3. Tests (OBLIGATORIO):**
- ⬜ Tests unitarios para lógica de negocio
- ⬜ Tests e2e para flujos críticos
- ⬜ **Mínimo 85% coverage**
- ⬜ **Step NO se completa si tests no pasan**

**4. Post-implementación:**
- ⬜ Actualizar plan con estado y aprendizajes
- ⬜ Actualizar este README (tracker)
- ⬜ Commit siguiendo convenciones
- ⬜ Marcar step como completado

### Actualización de Documentación

Después de completar un step:

```bash
# 1. Actualizar plan específico
# - Cambiar estado a ✅ Completado
# - Marcar objetivos completados
# - Añadir aprendizajes y decisiones

# 2. Actualizar este tracker (README.md)
# - Cambiar estado en tabla
# - Actualizar % de tests
# - Actualizar "Última Act."
# - Actualizar métricas generales

# 3. Commit
git add docs/plans/
git commit -m "docs(plans): mark step 0X as completed"
```

## 📚 Recursos Adicionales

- [Guía de Colaboración IA](../AI_COLLABORATION_GUIDE.md)
- [Decisiones Pendientes](../REVIEW_NEEDED.md)
- [Arquitectura del Sistema](../project/architecture.md)
- [Convenciones de Código](../ai/conventions.md)

## 🎯 Próximos Steps

**Recomendación actual:**
1. **Plan 04 - Perfil Profesional** (3-5 días)
2. **Plan 06 - Sistema de Leads** (2-3 días)
3. **Plan 05 - Sistema de Reseñas** (3-4 días)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

---

**Última actualización:** 2026-01-04  
**Versión:** 2.0 (Con tracker de desarrollo)
