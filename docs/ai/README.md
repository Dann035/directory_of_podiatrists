# 🤖 AI Configuration Directory

Esta carpeta `.ai` contiene las reglas y configuración para **TODAS las IAs** que trabajen en este proyecto, independientemente del editor o herramienta.

## 🎯 Propósito

Estandarizar el desarrollo con IA para que todo el equipo siga los mismos principios, sin importar si usan:
- **Cursor** (lee `.cursorrules` y `.ai/`)
- **Claude** (Claude.ai, Cline extension)
- **GitHub Copilot**
- **ChatGPT**
- **Windsurf**
- **Cody**
- Cualquier otra IA

## 📁 Archivos en esta Carpeta

### `rules.md` (Principal)
Reglas del proyecto que TODAS las IAs deben seguir.

### `context.md`
Contexto del proyecto: arquitectura, decisiones, estado actual.

### `conventions.md`
Convenciones de código, commits, y estructura.

### `prompts/`
Prompts reutilizables para tareas comunes.

## 🔄 Cómo Funciona

### Para IAs Integradas (Cursor, Cody, etc.)
Estas IAs buscan automáticamente en `.ai/` y cargan las reglas.

### Para IAs Externas (Claude, ChatGPT, etc.)
El desarrollador debe decir al inicio:
```
Lee y sigue las reglas en .ai/rules.md de este proyecto
```

### Para Todo el Equipo
1. **Antes de empezar:** Lee `.ai/rules.md`
2. **Durante desarrollo:** Sigue las convenciones
3. **Al actualizar:** Mantén `.ai/` actualizado

## 📚 Documentación Completa

- `/docs/plans/` - Planes de desarrollo
- `/docs/AI_COLLABORATION_GUIDE.md` - Guía detallada
- `ARCHITECTURE_SUMMARY.md` - Arquitectura del sistema

## 🔄 Compatibilidad

Esta estructura es compatible con:
- ✅ Cursor (lee `.cursorrules` y `.ai/`)
- ✅ Claude/Cline (instrucción manual)
- ✅ GitHub Copilot (instrucción manual)
- ✅ Windsurf (lee `.windsurfrules` y `.ai/`)
- ✅ Cody (lee `.cody/` y `.ai/`)
- ✅ ChatGPT (instrucción manual)

## 🚀 Inicio Rápido

### Para Desarrolladores
```bash
# 1. Lee las reglas
cat .ai/rules.md

# 2. Lee el contexto
cat .ai/context.md

# 3. Empieza a desarrollar siguiendo las reglas
```

### Para IAs
```
1. Lee .ai/rules.md
2. Lee .ai/context.md
3. Consulta /docs/plans/ para features específicas
4. Sigue las convenciones en .ai/conventions.md
```

---

**Última actualización:** 2026-01-03  
**Mantenido por:** El equipo de desarrollo

