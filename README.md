# directory_of_podiatrists — Monorepo

> Directorio profesional de podólogos con sistema de búsqueda avanzada y autenticación de usuarios.

Este repositorio contiene el frontend (Next.js) y el backend (NestJS) para el MVP del directorio de podólogos.

## 📸 Vista Previa del MVP

### Página de Inicio (Sin autenticación)
![Home Page - No Login](./assets/home-page-no-login.png)
*Página principal con acceso público al directorio de podólogos*

### Página de Registro
![Register Page](./assets/registerpage.png)
*Sistema de registro de nuevos usuarios*

### Página de Inicio de Sesión
![Login Page](./assets/login-page.png)
*Autenticación segura con JWT*

### Búsqueda de Podólogos
![Search Page](./assets/Search-page.png)
*Búsqueda avanzada con filtros por ubicación y especialidad*

### Página de Inicio (Estado de Carga)
![Home Page - Loading](./assets/home-page-isLoading.png)
*Interfaz con estados de carga optimizados*

---

## 🏗️ Estructura del Proyecto

- `client/` — aplicación Next.js (App Router, TypeScript)
- `server/` — API mock en NestJS (TypeScript)
- `pnpm-workspace.yaml` — definición de workspaces

## 🚀 Comandos Principales

```bash
# Instala dependencias para todo el monorepo
pnpm run setup

# Levanta cliente y servidor en paralelo (usa NEXT_PUBLIC_API_URL para proxy si es necesario)
pnpm run dev

# Levantar solo el servidor (reinicio rápido con ts-node-dev)
pnpm --filter server run dev:watch

# Ejecutar tests del cliente
pnpm --filter client run test
```

## ⚙️ Variables de Entorno

- `NEXT_PUBLIC_API_URL` — URL del backend (opcional). Si está definida, Next rewrites redirige `/api/*` hacia esa URL.
- `JWT_SECRET` — secreto para firmar JWT en el backend (por defecto `changeme`).

## 📝 Notas Importantes

- El backend incluye datos y usuarios en memoria para testing y desarrollo; migrar a DB para producción.
- Si quieres que añada CI, despliegue o integración con una base de datos, dime y lo configuro.
