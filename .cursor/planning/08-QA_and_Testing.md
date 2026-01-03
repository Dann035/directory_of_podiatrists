---
title: QA & Testing Plan
owner: QA / Engineering
version: 0.1
---

Objetivo: definir la estrategia de pruebas para el MVP (unitarias, integraciones, E2E), criterios de aceptación, ejemplos de tests (Jest, Playwright) y la pipeline de GitHub Actions que asegura calidad en cada PR.

1) Matriz de cobertura y responsabilidades

- Unit tests (FE y BE)
  - Responsable: Developers
  - Herramientas: Jest + React Testing Library (FE), Jest (BE)
  - Objetivo: cubrir lógica pura de componentes, utilidades y servicios; threshold 70% líneas por paquete

- Integration tests
  - Responsable: Backend + FE
  - Herramientas: Jest (supertest), testing-library/react (integración componentes con API mocked)
  - Objetivo: validar contratos entre módulos y endpoints críticos; threshold 60%

- E2E tests
  - Responsable: QA/Dev
  - Herramientas: Playwright
  - Objetivo: validar flujos críticos: búsqueda → ver perfil → lead; tests en staging; ejecutar por cada release

- Performance / Load
  - Responsable: SRE/Dev
  - Herramientas: k6 / Artillery
  - Objetivo: pruebas de carga para Search y Leads; SLAs: p95 < 1.5s para search bajo 100 RPS


2) Criterios de Acceptance (por feature)

- Search
  - Dado que hay 50 profesionales seed, cuando el usuario busca por ciudad+servicio, entonces la API devuelve >0 resultados y la UI muestra paginación.
  - Performance: respuesta < 500ms en staging para query simple.

- Profile & Lead
  - Dado un perfil público, cuando el usuario envía lead, entonces se persiste y retorna `leadId` y evento analytics se dispara (server-side).
  - Validación: lead aparece en dashboard admin en <1 min.

- Onboarding profesional
  - Flujo de registro completa: verificación de colegiado y publicación del perfil (estado `verified`) solo tras evidencia valida.


3) Ejemplos de tests

- Jest (unit) — ejemplo para util de formateo

```js
// utils/format.js
export function formatName(name){ return name.trim().split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ') }

// __tests__/format.test.js
import { formatName } from '../utils/format';

test('capitaliza correctamente nombres', ()=>{
  expect(formatName(' juan pérez')).toBe('Juan Pérez');
});
```

- Jest + Supertest (integration) — ejemplo endpoint

```js
// tests/professionals.test.js
const request = require('supertest');
const app = require('../src/app');

describe('GET /api/v1/professionals', ()=>{
  it('devuelve lista paginada', async ()=>{
    const res = await request(app).get('/api/v1/professionals?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});
```

- Playwright (E2E) — flujo search -> profile -> lead

```js
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('buscar y enviar lead', async ({ page })=>{
  await page.goto(process.env.BASE_URL || 'https://staging.example.com');
  await page.fill('input[aria-label="location"]', 'Madrid');
  await page.fill('input[aria-label="service"]', 'uñas');
  await page.click('button:has-text("Buscar")');
  await expect(page).toHaveURL(/\/search/);
  await page.click('a:has-text("Ver perfil")');
  await page.click('button:has-text("Contactar")');
  await page.fill('input[name="name"]','Test User');
  await page.fill('input[name="phone"]','+34123456789');
  await page.click('button:has-text("Enviar")');
  await expect(page.locator('text=Gracias')).toBeVisible();
});
```


4) Coverage thresholds y reporting

- Coverage mínima en CI:
  - `packages/*` unit coverage >= 70%
  - `integration` >= 60%
  - E2E: no threshold numérico, pero paso obligatorio para release
- Reportar coverage con `coverage/lcov-report` artefact en CI; fallar pipeline si threshold no alcanzado.


5) Pipeline GitHub Actions (workflow ejemplo)

```yaml
name: CI
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with: node-version: '18'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: postgres:14
        ports: [5432]
        env: POSTGRES_PASSWORD: postgres
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with: node-version: '18'
      - run: npm ci
      - name: Run unit & integration tests
        run: npm run test:ci
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/lcov-report

  e2e:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with: node-version: '18'
      - run: npm ci
      - name: Run Playwright tests
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}
        run: npx playwright test --reporter=list

  preview-deploy:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    needs: [test]
    steps:
      - uses: actions/checkout@v4
      - name: Deploy preview (Vercel)
        run: echo "deploy preview placeholder"
```


6) Test data & environments

- Entornos: `local`, `staging`, `production`.
- Variables: `DATABASE_URL`, `STAGING_URL`, `SENDGRID_API_KEY`, `ALGOLIA_KEY`.
- Seeds: `prisma/seed.js` para cargar dataset mínimo (10-50 profesionales) antes de pruebas integradas.


7) Flujos de QA manuales / checklist

- Smoke: Buscar -> abrir perfil -> enviar lead -> validar en admin (5 min)
- Regression: correr suite E2E completa (staging)
- Accessibility quick checks: Lighthouse + axe-core manual en páginas clave


8) Observabilidad de pruebas

- Guardar artefactos: video/screenshots Playwright, coverage reports, test logs.
- Integrar failing tests alerts en Slack/Teams.

---

Si quieres, genero los archivos de configuración (jest.config.js, playwright.config.ts) y scripts npm (`test:ci`, `test:e2e`) y los añado al repo. ¿Quieres que los cree ahora? 
---
title: QA & Testing Plan
owner: QA Lead
version: 0.1
---

Estrategia de pruebas MVP:
- Unit tests para lógica crítica (Prisma queries, helpers)
- Integration tests para endpoints críticos (`/professionals`, `/leads`)
- E2E básicos: búsqueda -> ver ficha -> enviar lead (Cypress)
- Accessibility quick audits (axe/lighthouse)

Definición de criterios de salida para release:
- Tests unitarios e integración con cobertura mínima del 70% en backend
- E2E principales verdes en staging
- Lighthouse: performance y accesibilidad no degradadas

Estimación: configurar pipeline de CI + tests iniciales — 5 días
