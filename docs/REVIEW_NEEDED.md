# 🔍 Decisiones Pendientes

Preguntas críticas que requieren decisión antes de implementar.

## ❓ Decisiones Críticas

### 1. Optimización de Búsqueda

| Opción | Costo | Cuándo |
|--------|-------|--------|
| **pg_trgm** ✅ | $0 | >10k profesionales |
| Elasticsearch | $50-200/mes | >100k profesionales |
| TypeSense | $20-100/mes | Alternativa ES |

**Recomendación:** pg_trgm para MVP

---

### 2. Google Maps

| Servicio | Costo | Decisión |
|----------|-------|----------|
| Google Maps | $7/1000 (28k gratis) | ✅ |
| Mapbox | $5/1000 | Alt |
| OpenStreetMap | Gratis | Limitado |

**Recomendación:** Google Maps (28k gratis) para MVP


---

### 3. Contacto Profesional

- **A) Solo formulario** - Privacidad, tracking ✅
- **B) Info pública** - Mejor UX, spam
- **C) Híbrido** - Flexible, complejo

**Recomendación:** A para MVP


---

### 4. Verificación Reseñas

- **A) Usuarios registrados** - Simple ✅
- **B) Solo con cita** - Verificadas
- **C) Anónimas** - Más reseñas

**Recomendación:** A para MVP

---

### 5. Refresh Tokens

**Pros:** Mejor UX, seguro  
**Contras:** Complejo, requiere DB

**Recomendación:** Fase 2

---

### 6. Búsqueda Geográfica

**Esfuerzo:** 1-2 semanas  
**Recomendación:** Fase 2

---

### 7. Redis Caching

**Costo:** $10-20/mes  
**Recomendación:** Solo si necesario

---

### 8. Cobertura Tests

- **A) ~50%** - Críticos ✅
- **B) ~80%** - Alta
- **C) ~95%** - TDD

**Recomendación:** A para MVP
Aunque me gustaria usar **TDD** lo unico que creo que el desarrollo sería mucho mas lento pero sería interesante hacerlo así

---

## 🚀 Prioridades

### Fase 1: MVP (2-3 semanas)
1. ⬜ Perfil Profesional (3-5 días)
2. ⬜ Leads mejorado (2-3 días)
3. ⬜ Reseñas básico (3-4 días)

### Fase 2: Optimización (3-4 semanas)
1. ⬜ Búsqueda Geográfica (1-2 sem)
2. ⬜ Optimización Búsqueda (1-2 sem)
3. ⬜ Panel Profesional (1 sem)

### Fase 3: Escalabilidad (4+ semanas)
1. ⬜ Citas
2. ⬜ Pagos
3. ⬜ Notificaciones
4. ⬜ SEO
5. ⬜ CI/CD

---

## 📝 Checklist

- ⬜ Optimización búsqueda
- ⬜ Servicio mapas
- ⬜ Contacto público
- ⬜ Verificación reseñas
- ⬜ Refresh tokens
- ⬜ Búsqueda geográfica
- ⬜ Redis caching
- ⬜ Cobertura tests
- ⬜ Prioridades


### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

---

**Creado:** 2026-01-03  
**Estado:** ⬜ Pendiente
