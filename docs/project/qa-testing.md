# QA & Testing

**Owner:** QA/Dev | **Versión:** 0.1

Estrategia de testing y quality assurance para el MVP.

## 🎯 Objetivos

- ⬜ Cobertura de tests > 80% en código crítico
- ⬜ 0 bugs críticos en producción
- ⬜ Tiempo de respuesta < 500ms (p95)
- ⬜ 99.9% uptime

## 🧪 Tipos de Tests

### Unit Tests
**Scope:** Funciones, utilidades, servicios

**Herramientas:**
- Backend: Jest
- Frontend: Jest + React Testing Library

**Cobertura mínima:** 80%

**Ejemplo:**
```typescript
describe('AuthService', () => {
  it('should hash password', async () => {
    const hashed = await authService.hashPassword('password123');
    expect(hashed).not.toBe('password123');
  });
});
```

### Integration Tests
**Scope:** APIs, base de datos, servicios externos

**Herramientas:**
- Supertest (API testing)
- Test database

**Ejemplo:**
```typescript
describe('POST /auth/login', () => {
  it('should return token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'pass123' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });
});
```

### E2E Tests
**Scope:** Flujos completos de usuario

**Herramientas:**
- Playwright / Cypress

**Flujos críticos:**
- ⬜ Registro e inicio de sesión
- ⬜ Búsqueda de profesionales
- ⬜ Envío de lead
- ⬜ Creación de reseña

### Manual Testing
**Cuándo:** Antes de cada release

**Checklist:**
- ⬜ Flujos críticos en diferentes navegadores
- ⬜ Responsive en móvil/tablet/desktop
- ⬜ Accesibilidad básica (keyboard navigation)
- ⬜ Performance (Lighthouse score > 90)

## 📊 Estrategia por Componente

### Backend
- ✅ Unit tests: Servicios, utilidades
- ✅ Integration tests: Endpoints API
- ⬜ Load tests: Búsquedas, auth

### Frontend
- ✅ Unit tests: Componentes, hooks
- ⬜ Integration tests: Flujos completos
- ⬜ Visual regression: Screenshots

### Database
- ✅ Migration tests
- ⬜ Performance tests: Queries complejas
- ⬜ Backup/restore tests

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install
        run: pnpm install
      - name: Lint
        run: pnpm run lint
      - name: Unit Tests
        run: pnpm run test
      - name: E2E Tests
        run: pnpm run test:e2e
```

## 🐛 Bug Tracking

### Severidad

| Nivel | Descripción | SLA |
|-------|-------------|-----|
| Critical | Servicio caído | 4h |
| High | Funcionalidad crítica rota | 24h |
| Medium | Bug que afecta UX | 3 días |
| Low | Mejora/bug menor | 1 semana |

### Proceso
1. ⬜ Reportar en GitHub Issues
2. ⬜ Asignar severidad y owner
3. ⬜ Reproducir y documentar
4. ⬜ Fix y PR con tests
5. ⬜ Code review
6. ⬜ Deploy y verificación

## ✅ Criterios de Aceptación

### Para Release
- ⬜ Todos los tests pasan
- ⬜ Cobertura > 80%
- ⬜ 0 bugs críticos
- ⬜ Lighthouse score > 90
- ⬜ Manual testing completado
- ⬜ Documentación actualizada

### Performance
- ⬜ API response < 500ms (p95)
- ⬜ Page load < 2s
- ⬜ Time to Interactive < 3s

### Seguridad
- ⬜ Sin vulnerabilidades críticas (npm audit)
- ⬜ HTTPS en producción
- ⬜ Headers de seguridad configurados

## 🚀 Comandos

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage
pnpm run test:coverage

# E2E
pnpm run test:e2e

# Lint
pnpm run lint
```

## 📚 Referencias

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev/)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
