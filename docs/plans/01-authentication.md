# 01 - Autenticación y Autorización

**Estado:** ✅ Completado  
**Prioridad:** 🔴 Alta  
**Última actualización:** 2026-01-03

## 📋 Contexto

Sistema de identificación de usuarios para proteger datos, personalizar experiencia y diferenciar roles (USER, PROFESSIONAL, ADMIN).

## 🎯 Objetivos

- ✅ Registro y login con email/password
- ✅ Logout seguro
- ✅ Protección de rutas (frontend) y endpoints (backend)
- ✅ JWT en cookies HTTP-only
- ✅ Refresh tokens (7 días)
- ✅ Roles de usuario

## 🏗️ Arquitectura

### Stack
- **Backend:** NestJS + Passport.js + JWT + bcryptjs
- **Frontend:** React Context API + HOCs

### Flujo
```
1. POST /auth/register → Hash password → Generate JWT
2. Set HTTP-only cookie → Store in AuthContext
3. Requests include cookie → Verify JWT → Allow/Deny
4. POST /auth/logout → Clear cookie
```

### JWT Payload
```typescript
{
  sub: string,      // User ID
  email: string,
  role: Role,       // USER | PROFESSIONAL | ADMIN
  exp: number       // 7 days
}
```

### Seguridad
- ✅ Passwords hasheados (bcrypt, 10 rounds)
- ✅ Cookies: `httpOnly`, `secure`, `sameSite: 'lax'`
- ✅ CORS configurado
- ✅ DTOs validados
- ✅ Guards globales con `@Public()` decorator

## 🔄 Alternativas Consideradas

| Opción | Elegida | Razón |
|--------|---------|-------|
| JWT en cookies | ✅ | Seguro contra XSS, stateless |
| JWT en localStorage | ❌ | Vulnerable a XSS |
| Session-based | ❌ | Requiere estado en servidor |
| OAuth2/Social | ⬜ | Fase 2 |
| Magic Links | ⬜ | Fase 2 |

## 📦 Implementación

### Backend
```
server/src/auth/
├── auth.controller.ts    # register, login, logout, me
├── auth.service.ts
├── strategies/jwt.strategy.ts
├── guards/jwt-auth.guard.ts
├── decorators/
│   ├── public.decorator.ts
│   └── current-user.decorator.ts
└── dto/
    ├── register.dto.ts
    └── login.dto.ts
```

### Frontend
```
client/
├── contexts/AuthContext.tsx
├── lib/services/auth.service.ts
├── components/
│   ├── ProtectedRoute.tsx
│   └── GuestRoute.tsx
└── app/
    ├── login/page.tsx
    └── register/page.tsx
```

### Endpoints
- `POST /api/v1/auth/register` - Público
- `POST /api/v1/auth/login` - Público
- `POST /api/v1/auth/logout` - Requiere auth
- `GET /api/v1/auth/me` - Requiere auth

### Variables de Entorno
```env
JWT_SECRET=tu-secreto-seguro
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

## ✅ Criterios de Aceptación

- ✅ Usuario puede registrarse
- ✅ Usuario puede iniciar sesión
- ✅ Sesión persiste al recargar
- ✅ Rutas protegidas funcionan
- ✅ Cookies HTTP-only
- ✅ Passwords hasheados
- ✅ CORS configurado

## 🧪 Tests (OBLIGATORIO)

**Requisito:** Mínimo 85% coverage para completar step

### Tests Unitarios
- ✅ `auth.service.ts`: register, login, validateUser, hashPassword
- ✅ `jwt.strategy.ts`: validate payload
- ✅ DTOs validation

### Tests E2E
- ✅ POST /auth/register (success, duplicate email, invalid data)
- ✅ POST /auth/login (success, wrong password, user not found)
- ✅ POST /auth/logout (success, unauthorized)
- ✅ GET /auth/me (success, unauthorized)
- ✅ Protected routes con JWT válido/inválido

**Estado:** ✅ Tests implementados y pasando

## 📊 Métricas

- ✅ Registro < 2s
- ✅ Login < 1s
- ✅ 0 errores CORS
- ✅ 0 tokens en localStorage

## ❓ Mejoras Futuras

- ⬜ Refresh token rotation
- ⬜ Password reset via email
- ⬜ Email verification
- ⬜ OAuth2 (Google, Facebook)
- ⬜ Rate limiting
- ⬜ 2FA opcional

## 📚 Referencias

- [NestJS Auth](https://docs.nestjs.com/security/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Auth Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
