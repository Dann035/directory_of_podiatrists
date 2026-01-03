# 🤖 Guía de Configuración por IA

Cómo configurar cada IA para trabajar con este proyecto.

## 🎯 Estructura Universal

Este proyecto usa `.ai/` como estándar universal:

```
.ai/
├── README.md                      # Overview
├── rules.md                       # Reglas proyecto
├── context.md                     # Contexto actual
├── conventions.md                 # Convenciones código
├── EXTERNAL_AI_INSTRUCTIONS.md    # IAs externas
└── prompts/                       # Prompts reutilizables
```

## 🔧 IAs con Soporte Automático

### Cursor
- **Archivo:** `.cursorrules`
- **Setup:** Abrir proyecto → Listo ✅
- **Verificar:** Preguntar "¿Has leído las reglas?"

### Windsurf
- **Archivo:** `.windsurfrules`
- **Setup:** Abrir proyecto → Listo ✅

### Cline/Claude Dev
- **Archivo:** `.clinerules`
- **Setup:** Abrir proyecto → Listo ✅

### GitHub Copilot
- **Archivo:** `.github/copilot-instructions.md`
- **Setup:** Commit archivo → Sincroniza automáticamente

## 🌐 IAs Externas (Web/API)

### ChatGPT (Web/API)
**Setup manual:**
1. Copia contenido de `.ai/EXTERNAL_AI_INSTRUCTIONS.md`
2. Pégalo en custom instructions (Settings → Personalization)
3. O incluye al inicio de cada conversación

### Claude (Web/API)
**Setup manual:**
1. Copia contenido de `.ai/EXTERNAL_AI_INSTRUCTIONS.md`
2. Pégalo al inicio de cada conversación
3. O usa Projects (si disponible) y añade como contexto

### Otros (Gemini, etc.)
**Setup manual:**
1. Lee `.ai/EXTERNAL_AI_INSTRUCTIONS.md`
2. Adapta formato según la IA
3. Incluye al inicio de conversación

## 📋 Checklist de Verificación

**Para cualquier IA, verificar que entienda:**
- ⬜ Stack tecnológico (Next.js + NestJS)
- ⬜ Estructura del monorepo
- ⬜ Convenciones de código
- ⬜ Proceso de desarrollo (leer plans primero)
- ⬜ Requisitos de tests (85% coverage)
- ⬜ Convenciones de commits

**Pregunta de prueba:**
```
"¿Cuál es el stack del proyecto y dónde están los planes de desarrollo?"
```

**Respuesta esperada:**
```
Frontend: Next.js 16 + React 19 + TypeScript + Tailwind
Backend: NestJS 11 + Prisma 6 + PostgreSQL
Planes: /docs/plans/0X-[nombre].md
```

## 🔄 Sincronización

**Archivos que deben mantenerse sincronizados:**
- `.cursorrules` ↔ `CLAUDE.md`
- Todos apuntan a `.ai/` como fuente de verdad

**Al actualizar reglas:**
1. Editar `.ai/rules.md` (fuente de verdad)
2. Actualizar `.cursorrules` si es necesario
3. Actualizar `CLAUDE.md` si es necesario
4. Verificar `.ai/EXTERNAL_AI_INSTRUCTIONS.md`

## 📚 Recursos

- [Reglas completas](./rules.md)
- [Contexto proyecto](./context.md)
- [Convenciones código](./conventions.md)
- [Planes desarrollo](../plans/README.md)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
