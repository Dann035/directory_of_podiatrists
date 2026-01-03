# ✅ Checklist de Integración Frontend-Backend

## 🎯 Verificación Rápida

### Backend
- [ ] PostgreSQL está corriendo
- [ ] Archivo `server/.env` existe y está configurado
- [ ] Base de datos creada (`podiatrists_db`)
- [ ] Migraciones ejecutadas (`npx prisma migrate dev`)
- [ ] Seeds ejecutados (`npx prisma db seed`)
- [ ] Servidor corriendo en `http://localhost:3001`
- [ ] Endpoint `/api/v1/practitioners` responde
- [ ] Endpoint `/api/v1/auth/login` responde

### Frontend
- [ ] Archivo `client/.env.local` existe y está configurado
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`
- [ ] Cliente corriendo en `http://localhost:3000`
- [ ] Página de inicio carga correctamente
- [ ] Podólogos destacados se muestran (desde API)
- [ ] Página de login accesible
- [ ] Página de registro accesible
- [ ] Página de búsqueda accesible

## 🧪 Tests Funcionales

### 1. Registro de Usuario
- [ ] Ir a `http://localhost:3000/register`
- [ ] Llenar formulario con datos válidos
- [ ] Click en "Crear cuenta"
- [ ] Usuario creado exitosamente
- [ ] Redirigido a página de inicio
- [ ] Header muestra nombre de usuario
- [ ] Menú de usuario funciona

### 2. Login
- [ ] Ir a `http://localhost:3000/login`
- [ ] Usar credenciales: `admin@example.com` / `password123`
- [ ] Click en "Iniciar sesión"
- [ ] Login exitoso
- [ ] Redirigido a página de inicio
- [ ] Header muestra información de usuario

### 3. Búsqueda de Podólogos
- [ ] Ir a `http://localhost:3000/search`
- [ ] Buscar por texto (ej: "Juan")
- [ ] Resultados se cargan desde API
- [ ] Filtrar por ciudad
- [ ] Filtrar por especialidad
- [ ] Checkbox "Solo verificados" funciona
- [ ] Cards de resultados se muestran correctamente

### 4. Navegación
- [ ] Click en logo redirige a inicio
- [ ] Links de navegación funcionan
- [ ] Botones "Ver perfil" en cards (aunque la página no exista aún)
- [ ] Link "Ver todos los podólogos" redirige a búsqueda

### 5. Logout
- [ ] Click en nombre de usuario en header
- [ ] Menú desplegable se abre
- [ ] Click en "Cerrar sesión"
- [ ] Usuario desconectado
- [ ] Header muestra botones de login/registro
- [ ] Cookies eliminadas

### 6. Protección de Rutas
- [ ] Cerrar sesión
- [ ] Intentar acceder a ruta protegida (si existe)
- [ ] Redirigido a login
- [ ] Iniciar sesión
- [ ] Ahora puede acceder a ruta protegida

## 🔍 Verificación de API

### Usando curl o Postman

#### 1. Health Check
```bash
curl http://localhost:3001
# Debería responder: "Hello World!"
```

#### 2. Listar Podólogos
```bash
curl http://localhost:3001/api/v1/practitioners
# Debería devolver lista de podólogos
```

#### 3. Buscar Podólogos
```bash
curl "http://localhost:3001/api/v1/practitioners?city=Madrid&verified=true"
# Debería devolver podólogos de Madrid verificados
```

#### 4. Registro
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
# Debería crear usuario y devolver token
```

#### 5. Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
# Debería devolver token y guardar cookie
```

#### 6. Obtener Perfil (requiere auth)
```bash
curl http://localhost:3001/api/v1/auth/me \
  -b cookies.txt
# Debería devolver información del usuario
```

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Verificar PostgreSQL
psql -U postgres -c "SELECT version();"

# Verificar puerto 3001
lsof -i :3001

# Ver logs del servidor
cd server && pnpm run start:dev
```

### Frontend no conecta con Backend
```bash
# Verificar .env.local
cat client/.env.local

# Verificar que backend esté corriendo
curl http://localhost:3001/api/v1/practitioners

# Ver logs del cliente
cd client && pnpm run dev
```

### Errores de CORS
```bash
# Verificar CLIENT_URL en server/.env
cat server/.env | grep CLIENT_URL

# Debería ser: CLIENT_URL=http://localhost:3000
```

### Cookies no se envían
- Verificar que ambos servicios estén en localhost
- Limpiar cookies del navegador
- Verificar configuración de CORS en backend
- Verificar que `credentials: 'include'` esté en requests

### Base de datos vacía
```bash
cd server

# Reset de base de datos
npx prisma migrate reset

# Ejecutar seeds
npx prisma db seed
```

## 📊 Métricas de Éxito

- [ ] Tiempo de carga de página de inicio < 2s
- [ ] Búsqueda responde en < 500ms
- [ ] Login/Registro responde en < 1s
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en logs del servidor
- [ ] Todas las páginas son responsive
- [ ] Animaciones son suaves (60fps)

## 🎨 Verificación Visual

### Página de Inicio
- [ ] Header con logo y navegación
- [ ] Hero section con título y descripción
- [ ] Grid de categorías con animaciones
- [ ] Podólogos destacados con cards
- [ ] Sección de beneficios con flip cards
- [ ] Carrusel de testimonios infinito
- [ ] Sección "Cómo funciona"
- [ ] Footer

### Página de Login
- [ ] Formulario centrado
- [ ] Campos de email y password
- [ ] Botón de submit
- [ ] Link a registro
- [ ] Credenciales de prueba visibles
- [ ] Mensajes de error claros

### Página de Registro
- [ ] Formulario centrado
- [ ] Campos: nombre, email, teléfono, password, confirmar password
- [ ] Validación de passwords coincidan
- [ ] Botón de submit
- [ ] Link a login
- [ ] Términos y condiciones

### Página de Búsqueda
- [ ] Header con navegación
- [ ] Barra de búsqueda
- [ ] Filtros (ciudad, especialidad, verificados)
- [ ] Grid de resultados
- [ ] Cards con información de podólogos
- [ ] Estados de carga
- [ ] Mensaje cuando no hay resultados

## 🚀 Listo para Producción

- [ ] Variables de entorno de producción configuradas
- [ ] Base de datos de producción creada
- [ ] Migraciones ejecutadas en producción
- [ ] HTTPS configurado
- [ ] Dominio configurado
- [ ] Monitoreo configurado (Sentry, etc.)
- [ ] Backups de base de datos configurados
- [ ] CI/CD configurado
- [ ] Tests automatizados pasando

---

## 📝 Notas

- Todos los checkboxes deben estar marcados antes de considerar la integración completa
- Si algún test falla, revisar la sección de Troubleshooting
- Documentar cualquier problema encontrado y su solución

**Última actualización:** $(date)

