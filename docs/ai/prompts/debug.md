# 🐛 Debug Prompt

Usa este prompt cuando tengas un bug o error.

---

## Prompt Template

```
Tengo un problema: [DESCRIPCIÓN BREVE]

Contexto:
- Qué estaba haciendo: [ACCIÓN]
- Qué esperaba: [RESULTADO ESPERADO]
- Qué obtuve: [RESULTADO ACTUAL]

Error (si aplica):
```
[PEGAR ERROR COMPLETO]
```

Archivos relevantes:
- [ARCHIVO 1]
- [ARCHIVO 2]

Por favor:
1. Analiza el problema
2. Identifica la causa raíz
3. Propón solución
4. Explica por qué ocurrió
5. Sugiere cómo prevenir en el futuro
```

---

## Ejemplo

```
Tengo un problema: CORS error al hacer login desde el frontend

Contexto:
- Qué estaba haciendo: Intentar hacer POST a /api/v1/auth/login desde localhost:3000
- Qué esperaba: Recibir token y cookie
- Qué obtuve: Error CORS en consola

Error:
```
Access to fetch at 'http://localhost:3001/api/v1/auth/login' from origin 
'http://localhost:3000' has been blocked by CORS policy: Response to 
preflight request doesn't pass access control check
```

Archivos relevantes:
- server/src/main.ts
- server/.env

Por favor:
1. Analiza el problema
2. Identifica la causa raíz
3. Propón solución
4. Explica por qué ocurrió
5. Sugiere cómo prevenir en el futuro
```

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado

