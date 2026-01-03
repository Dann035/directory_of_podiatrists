---
title: API Specification (OpenAPI-like)
owner: Backend
version: 0.1
---

Este documento ofrece una especificación OpenAPI-like para el Directorio de Podología (MVP). Incluye paths, parámetros, esquemas, seguridad (JWT), ejemplos request/response, códigos de error, recomendaciones de headers y política de rate limiting. También incluye un outline para una colección Postman.

Base path: `/api/v1`

Security
- Authentication: JWT Bearer for protected endpoints (Authorization: `Bearer <token>`)
- Roles: `admin`, `professional`, `user`

Common headers
- `Authorization: Bearer <token>` (when required)
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Request-ID: <uuid>` (recommended for tracing)
- `X-Forwarded-For` (proxy)

Rate limiting (recommendation)
- Default (public): 100 req/min per IP
- Integrator/API keys: 1,000 req/min per API key (with burst allowance)
- Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

Standard Error schema
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": null
  }
}
```

Schemas (core)
- `Professional`:
  - id: integer
  - slug: string
  - name: string
  - bio: string
  - city: string
  - postal_code: string
  - phone: string
  - email: string
  - license_number: string
  - verified: boolean
  - location: {lat, lng}
  - rating: float
  - created_at: datetime

- `Service`:
  - id, professional_id, title, description, price, duration_minutes, created_at

- `Review`:
  - id, professional_id, user_id, rating, comment, created_at

- `Lead`:
  - id, professional_id, user_name, user_contact (object), message, status, created_at

- `User`:
  - id, name, email, phone, role, created_at


Endpoints (summary)

1) Public — Search & Discovery

GET /professionals
- Description: list + filter professionals
- Query params:
  - `q` (string) free text
  - `city` (string)
  - `postal_code` (string)
  - `service` (string slug)
  - `lat` (float), `lng` (float), `radius` (meters)
  - `page` (int, default 1)
  - `per_page` (int, default 20, max 100)
- Response 200:
```json
{
  "meta": {"total": 234, "page":1, "per_page":20},
  "data": [{"id":123,"slug":"dr-juan-perez","name":"Dr. Juan Pérez","rating":4.8,...}]
}
```

GET /professionals/{slug}
- Description: get professional profile by slug
- Path param: `slug` (string)
- Response 200: `Professional` schema + `services[]` + `reviews[]`
- 404: `{error}` if not found

GET /services
- Description: list of services/specialities
- Response 200: `{ data: [{id, title, slug}] }`

GET /suggestions/locations
- Query: `q` partial query for autocomplete
- Response: list of suggestions `{type:'city'|'postcode'|'address', value, lat, lng}`


2) Leads & Reviews

POST /leads
- Description: create lead for a professional
- Body:
```json
{ "professional_id": 123, "user_name": "Ana", "user_contact": {"email":"a@a.com","phone":"+34..."}, "message":"Necesito cita" }
```
- Response 201:
```json
{ "ok": true, "leadId": 987 }
```
- Validation 400 -> `{error}`

GET /reviews?professional_id={id}&page=&per_page=
- List reviews for a professional

POST /reviews
- Auth: optional (prefer registered users), body: `{professional_id, rating, comment}`
- Response 201 review created (may go to moderation based on config)


3) Auth & Users

POST /auth/login
- Body: `{email,password}`
- Response 200:
```json
{ "accessToken": "<jwt>", "refreshToken": "<token>", "expires_in": 3600 }
```

POST /auth/refresh
- Body: `{refreshToken}` -> new access token

GET /me
- Auth required (Bearer token)
- Response 200: `User` object


4) Admin / Protected

POST /professionals
- Auth: Bearer token (admin)
- Body: `Professional` fields (except id, created_at)
- Response 201 created

PUT /professionals/{id}
- Auth: admin or owner professional
- Response 200 updated

DELETE /professionals/{id}
- Auth: admin
- Response 204


Error codes and examples
- 400 Bad Request — invalid payload
- 401 Unauthorized — missing/invalid token
- 403 Forbidden — insufficient role/permission
- 404 Not Found
- 429 Too Many Requests — rate limit exceeded
- 500 Internal Server Error

Error response example
```json
{ "error": { "code": "INVALID_PAYLOAD", "message": "'email' is required" } }
```


Headers and caching recommendations
- `Cache-Control: public, max-age=60, stale-while-revalidate=300` for landing pages and profiles served SSG/ISR
- Use `ETag` on API list endpoints where appropriate
- Send `X-Request-ID` from client and persist in logs

Security notes
- Use short-lived access tokens (1h) and refresh tokens rotation
- Store secrets in secret manager; never return tokens in query params
- Rate-limit admin/protected endpoints more strictly


Postman collection outline (folders + sample requests)

- Folder: Auth
  - `POST /auth/login` (example user)
  - `POST /auth/refresh`
  - `GET /me` (requires Bearer token)

- Folder: Public
  - `GET /professionals?q=podologo&city=Madrid&page=1`
  - `GET /professionals/{slug}`
  - `GET /services`
  - `GET /suggestions/locations?q=mad`

- Folder: Leads & Reviews
  - `POST /leads` (sample body)
  - `GET /reviews?professional_id=123`
  - `POST /reviews` (sample)

- Folder: Admin
  - `POST /professionals` (admin token required)
  - `PUT /professionals/{id}`
  - `DELETE /professionals/{id}`

Collection variables
- `{{baseUrl}}` (https://staging.example.com/api/v1)
- `{{adminToken}}`, `{{userToken}}`

Tests to include in Postman (basic)
- Auth login returns 200 and `accessToken`
- Create lead returns 201 and leadId
- Rate limit test: send 200 requests quickly and expect 429 when exceeded
- Profile endpoint returns `cache-control` header for SSG pages


CI / Contract testing recommendations
- Include OpenAPI contract linting in CI (`openapi-cli` or `spectral`) to validate schema changes.
- Add contract tests (Pact / Dredd) for critical endpoints (`/professionals`, `/leads`, `/auth`).

---

Si quieres, genero el JSON OpenAPI 3.0 spec o la colección Postman exportable (v2.1). ¿Cuál prefieres? 
---
title: API Spec — Endpoints críticos
owner: Backend
version: 0.1
---

Convenciones: `/api/v1/` JSON, auth Bearer for protected endpoints.

Endpoints principales (MVP):
- `GET /api/v1/professionals?city=&service=&page=` — listado y filtros (cacheable) — 200
- `GET /api/v1/professionals/:slug` — ficha detallda con servicios y reviews — 200
- `POST /api/v1/leads` — crear lead (payload: professional_id, name, contact, message) — 201 + send email
- `POST /api/v1/auth/login` — (opcional para profesionales/admin)
- `GET /api/v1/reviews?professional_id=` — paginado

Errores: estandarizar `{ code, message, details? }`.

Rate limits: 60 req/min por IP para endpoints públicos.

Docs: mantener `openapi.yaml` en `docs/` y validar en CI.
