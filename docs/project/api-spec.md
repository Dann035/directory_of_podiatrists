# API Specification

**Owner:** Backend | **Versión:** 0.1

Especificación REST API para Directory of Podiatrists MVP.

## 🔧 Base

**URL:** `/api/v1` | **Auth:** JWT Bearer | **Format:** JSON

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

### Rate Limiting
- Público: 100 req/min
- API Keys: 1,000 req/min

## 🔐 Auth

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/auth/register` | POST | No | Registro |
| `/auth/login` | POST | No | Login |
| `/auth/logout` | POST | Sí | Logout |
| `/auth/me` | GET | Sí | Perfil actual |

**Ejemplo Login:**
```json
POST /auth/login
{ "email": "user@example.com", "password": "pass123" }

Response: 200 OK + Cookie HTTP-only
```

## 👨‍⚕️ Professionals

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/professionals` | GET | No | Buscar/listar |
| `/professionals/:slug` | GET | No | Detalle |

**Query Params (GET /professionals):**
- `q` - Texto libre
- `city` - Ciudad
- `service` - Servicio
- `verified` - Boolean
- `lat`, `lng`, `radius` - Geolocalización
- `page`, `perPage` - Paginación

**Response:**
```json
{
  "data": [{ "id": 1, "slug": "...", "name": "...", "city": "...", "verified": true }],
  "meta": { "total": 100, "page": 1, "perPage": 20 }
}
```

## 📝 Leads

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/leads` | POST | No | Crear solicitud |

**Request:**
```json
{
  "professionalId": 1,
  "userName": "María",
  "userEmail": "maria@example.com",
  "message": "Necesito consulta..."
}
```

## ⭐ Reviews

| Endpoint | Método | Auth | Descripción |
|----------|--------|------|-------------|
| `/professionals/:id/reviews` | GET | No | Listar |
| `/professionals/:id/reviews` | POST | Sí | Crear |

**Request (POST):**
```json
{
  "rating": 5,
  "comment": "Excelente"
}
```

## ❌ Errores

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limit |
| 500 | Server Error |

**Formato:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email required"
  }
}
```

## 📊 Schemas

Ver: [`/server/src/*/dto/`](../../server/src/)

**Principales:**
- `Professional` - Podólogo
- `Service` - Servicios
- `Review` - Reseñas
- `Lead` - Contactos
- `User` - Usuarios

## 🧪 Testing

**Postman:** [`api-postman.json`](./api-postman.json)

**cURL:**
```bash
# Buscar
curl "http://localhost:3001/api/v1/professionals?city=Madrid"

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

## 📚 Referencias

- [Backend](../../server/src/)
- [Prisma Schema](../../server/prisma/schema.prisma)
- [OpenAPI](https://swagger.io/specification/)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
