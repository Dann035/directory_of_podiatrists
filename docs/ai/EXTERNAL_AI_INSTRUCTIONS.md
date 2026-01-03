# 📋 Instrucciones para IAs Externas

Si usas **ChatGPT**, **Claude** (web), **Gemini**, u otra IA externa, copia y pega este prompt al inicio de tu conversación.

---

## 🚀 Prompt de Inicio

```
Voy a trabajar en el proyecto "Directory of Podiatrists". 

Por favor, lee y sigue estos archivos del proyecto:

1. .ai/rules.md - Reglas del proyecto
2. .ai/context.md - Contexto y estado actual  
3. .ai/conventions.md - Convenciones de código

[PEGAR CONTENIDO DE LOS ARCHIVOS AQUÍ O ADJUNTARLOS]

Confirma que has leído y entendido las reglas antes de continuar.
```

---

## 📁 Archivos a Compartir

### Mínimo (para tareas simples):
- `.ai/rules.md`

### Recomendado (para tareas complejas):
- `.ai/rules.md`
- `.ai/context.md`
- `.ai/conventions.md`

### Completo (para features nuevas):
- `.ai/rules.md`
- `.ai/context.md`
- `.ai/conventions.md`
- `/docs/plans/README.md`
- Plan específico de `/docs/plans/`

---

## 💡 Tips

### Para ChatGPT
1. Sube los archivos como attachments
2. O copia y pega el contenido
3. Usa "Custom Instructions" para reglas permanentes

### Para Claude (web)
1. Copia y pega el contenido de `.ai/rules.md`
2. Adjunta archivos relevantes
3. Usa "Projects" para mantener contexto

### Para Gemini
1. Copia y pega el contenido
2. Adjunta archivos si es posible

---

## 🎯 Prompts Útiles

### Onboarding
```
Lee .ai/rules.md, .ai/context.md y .ai/conventions.md.
Confirma que entiendes las reglas del proyecto.
```

### Nueva Feature
```
Necesito implementar [FEATURE].
Primero, busca si existe un plan en /docs/plans/.
Si existe, léelo y cuestiónalo.
Si no existe, créalo siguiendo la estructura.
```

### Debug
```
Tengo este error: [ERROR]
Analiza según las reglas en .ai/rules.md
Propón solución y explica la causa raíz.
```

---

## ⚠️ Importante

Las IAs externas **NO leen automáticamente** los archivos del proyecto. Debes:
1. Copiar y pegar el contenido
2. O adjuntar los archivos
3. O describir las reglas manualmente

Para mejor experiencia, usa IAs integradas en editores (Cursor, Windsurf, Cline) que leen automáticamente `.ai/`

---

## 📚 Recursos

- [Reglas](.ai/rules.md)
- [Contexto](.ai/context.md)
- [Convenciones](.ai/conventions.md)
- [Planes](/docs/plans/README.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

