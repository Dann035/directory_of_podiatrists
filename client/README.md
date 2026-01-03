# Cliente — MVP básico

Comandos útiles desde la raíz del monorepo:

```bash
pnpm run bootstrap    # instala dependencias del monorepo
pnpm --filter client run dev   # levantar Next en modo dev
pnpm --filter client run build # build del cliente
pnpm --filter client run start # start de producción
```

Páginas creadas:
- `/search` — búsqueda básica de podólogos
- `/practitioners/[id]` — perfil básico

Componentes:
- `components/SearchBar.tsx`
- `components/ResultsList.tsx`
- `components/ProfileCard.tsx`

Variables de entorno
--------------------

- Crea `client/.env` a partir de `client/.env.example` y ajusta `NEXT_PUBLIC_API_URL` si el backend corre en otro puerto.

Ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Proxy / API
-----------

Para evitar CORS durante el desarrollo, `client/next.config.js` añade una regla de `rewrites` que redirige llamadas a `/api/*` hacia `NEXT_PUBLIC_API_URL` si está definido. Si no defines `NEXT_PUBLIC_API_URL`, el cliente usará rutas relativas y se espera que el backend esté disponible en el mismo host/puerto.

Levantar localmente (recomendado):

```bash
pnpm run bootstrap
pnpm run dev
```

Tests
-----

Ejecutar tests del cliente:

```bash
pnpm --filter client run test
```



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
