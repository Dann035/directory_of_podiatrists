# ✨ New Feature Prompt

Usa este prompt cuando quieras que una IA implemente una nueva feature.

---

## Prompt Template

```
Necesito implementar: [NOMBRE DE LA FEATURE]

Antes de empezar:
1. Busca si existe un plan en /docs/plans/ para esta feature
2. Si existe, léelo completamente y cuestiónalo si ves mejores alternativas
3. Si NO existe, crea un plan siguiendo la estructura de /docs/plans/README.md
4. Propón la arquitectura y alternativas
5. Espera mi aprobación antes de implementar

Descripción de la feature:
[DESCRIBE QUÉ NECESITAS]

Requisitos específicos:
- [REQUISITO 1]
- [REQUISITO 2]
```

---

## Ejemplo

```
Necesito implementar: Sistema de favoritos para usuarios

Antes de empezar:
1. Busca si existe un plan en /docs/plans/ para esta feature
2. Si existe, léelo completamente y cuestiónalo si ves mejores alternativas
3. Si NO existe, crea un plan siguiendo la estructura de /docs/plans/README.md
4. Propón la arquitectura y alternativas
5. Espera mi aprobación antes de implementar

Descripción de la feature:
Los usuarios deben poder marcar profesionales como favoritos y ver una lista de sus favoritos.

Requisitos específicos:
- Botón de favorito en card de profesional
- Página /favoritos con lista
- Persistir en base de datos
- Responsive
```

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

