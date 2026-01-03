# directory_of_podiatrists — Monorepo

Este repositorio contiene el frontend (Next.js) y el backend (NestJS) para el MVP del directorio de podólogos.

Estructura principal:

- `client/` — aplicación Next.js (App Router, TypeScript)
- `server/` — API mock en NestJS (TypeScript)
- `pnpm-workspace.yaml` — definición de workspaces

Comandos principales (desde la raíz):

```bash
# Instala dependencias para todo el monorepo
pnpm run bootstrap

# Levanta cliente y servidor en paralelo (usa NEXT_PUBLIC_API_URL para proxy si es necesario)
pnpm run dev

# Levantar solo el servidor (reinicio rápido con ts-node-dev)
pnpm --filter server run dev:watch

# Ejecutar tests del cliente
pnpm --filter client run test
```

Variables de entorno recomendadas:

- `NEXT_PUBLIC_API_URL` — URL del backend (opcional). Si está definida, Next rewrites redirige `/api/*` hacia esa URL.
- `JWT_SECRET` — secreto para firmar JWT en el backend (por defecto `changeme`).

Notas:

- El backend incluye datos y usuarios en memoria para testing y desarrollo; migrar a DB para producción.
- Si quieres que añada CI, despliegue o integración con una base de datos, dime y lo configuro.
