# 🗄️ Configuración de Base de Datos

## ❌ Error Actual

```
Authentication failed against database server at `localhost`
```

Esto significa que las credenciales de PostgreSQL no son correctas.

## ✅ Solución

### Paso 1: Verificar PostgreSQL

```bash
# Verificar si PostgreSQL está corriendo
pg_isready

# Si no está corriendo (macOS con Homebrew):
brew services start postgresql@14

# O con pg_ctl:
pg_ctl -D /usr/local/var/postgres start
```

### Paso 2: Obtener las credenciales correctas

Necesitas saber:
1. **Usuario** de PostgreSQL (por defecto: `postgres` o tu nombre de usuario)
2. **Contraseña** (si la configuraste)
3. **Puerto** (por defecto: `5432`)
4. **Nombre de la base de datos** (usaremos: `podiatrists_db`)

#### Opción A: Sin contraseña (configuración por defecto en macOS)

Si instalaste PostgreSQL con Homebrew en macOS, probablemente no tenga contraseña:

```bash
# Edita el archivo .env en server/
cd server
nano .env
```

Cambia la línea `DATABASE_URL` a:

```env
DATABASE_URL="postgresql://tu_usuario@localhost:5432/podiatrists_db?schema=public"
```

Reemplaza `tu_usuario` con tu nombre de usuario de macOS (ejecuta `whoami` para verlo).

#### Opción B: Con contraseña

Si configuraste una contraseña:

```env
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/podiatrists_db?schema=public"
```

#### Opción C: Usar la variable de entorno que pusiste en .env.local

Si ya tienes una `DATABASE_URL` funcionando en otro proyecto, cópiala al archivo `server/.env`.

### Paso 3: Crear la base de datos

Una vez que tengas las credenciales correctas:

```bash
# Conectarse a PostgreSQL
psql -U tu_usuario postgres

# Dentro de psql, crear la base de datos:
CREATE DATABASE podiatrists_db;

# Salir:
\q
```

O en una sola línea:

```bash
createdb -U tu_usuario podiatrists_db
```

### Paso 4: Ejecutar migraciones

```bash
cd server
pnpm prisma migrate dev --name init
```

### Paso 5: Poblar con datos de prueba

```bash
pnpm prisma db seed
```

## 🔍 Verificación

### Ver bases de datos disponibles:

```bash
psql -U tu_usuario -l
```

### Conectarse a la base de datos:

```bash
psql -U tu_usuario podiatrists_db
```

### Ver tablas creadas:

```sql
\dt
```

Deberías ver:
- `users`
- `professionals`
- `services`
- `reviews`
- `leads`

## 📝 Formato de DATABASE_URL

```
postgresql://[usuario]:[contraseña]@[host]:[puerto]/[nombre_db]?schema=public
```

**Ejemplos:**

```env
# Sin contraseña (macOS con Homebrew)
DATABASE_URL="postgresql://hackz3ro@localhost:5432/podiatrists_db?schema=public"

# Con contraseña
DATABASE_URL="postgresql://postgres:mipassword@localhost:5432/podiatrists_db?schema=public"

# Puerto personalizado
DATABASE_URL="postgresql://postgres:password@localhost:5433/podiatrists_db?schema=public"

# Base de datos remota (Railway, Supabase, etc.)
DATABASE_URL="postgresql://user:pass@host.railway.app:5432/railway?schema=public"
```

## 🆘 Problemas Comunes

### Error: "role does not exist"

Tu usuario de PostgreSQL no existe. Créalo:

```bash
# Conectarse como superusuario
psql postgres

# Crear usuario
CREATE USER tu_usuario WITH PASSWORD 'tu_password' CREATEDB;

# Salir
\q
```

### Error: "database does not exist"

Crea la base de datos:

```bash
createdb podiatrists_db
```

### Error: "password authentication failed"

La contraseña es incorrecta. Puedes cambiarla:

```bash
psql postgres
ALTER USER postgres PASSWORD 'nueva_password';
\q
```

### Error: "could not connect to server"

PostgreSQL no está corriendo. Inícialo:

```bash
# macOS con Homebrew
brew services start postgresql@14

# Linux
sudo systemctl start postgresql
```

## 📋 Checklist

- [ ] PostgreSQL está corriendo (`pg_isready`)
- [ ] Tengo las credenciales correctas (usuario y contraseña)
- [ ] He actualizado `server/.env` con la `DATABASE_URL` correcta
- [ ] La base de datos `podiatrists_db` existe
- [ ] Las migraciones se ejecutaron correctamente
- [ ] Los seeds se ejecutaron correctamente
- [ ] Puedo conectarme a la base de datos

## 🎯 Siguiente Paso

Una vez que hayas configurado la `DATABASE_URL` correctamente en `server/.env`, ejecuta:

```bash
cd server
pnpm prisma migrate dev --name init
pnpm prisma db seed
cd ..
pnpm run dev
```

---

**¿Necesitas ayuda?** Comparte:
1. Tu sistema operativo
2. Cómo instalaste PostgreSQL
3. El error exacto que recibes

