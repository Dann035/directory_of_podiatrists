#!/bin/bash

echo "🚀 Iniciando Directorio de Podólogos..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar PostgreSQL
echo "📊 Verificando PostgreSQL..."
if ! pg_isready -q 2>/dev/null; then
    echo -e "${RED}❌ PostgreSQL no está corriendo${NC}"
    echo "Por favor, inicia PostgreSQL primero"
    echo ""
    echo "macOS (Homebrew): brew services start postgresql@14"
    echo "Linux: sudo systemctl start postgresql"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL está corriendo${NC}"
echo ""

# Verificar .env del servidor
if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  Archivo server/.env no encontrado${NC}"
    echo "Creando archivo server/.env..."
    cat > server/.env << 'ENVEOF'
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/podiatrists_db?schema=public"
JWT_SECRET="tu-secreto-super-seguro-cambiar-en-produccion"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_EXPIRES_IN="30d"
CLIENT_URL="http://localhost:3000"
PORT=3001
ENVEOF
    echo -e "${GREEN}✅ Archivo server/.env creado${NC}"
fi

# Verificar .env.local del cliente
if [ ! -f "client/.env.local" ]; then
    echo -e "${YELLOW}⚠️  Archivo client/.env.local no encontrado${NC}"
    echo "Creando archivo client/.env.local..."
    cat > client/.env.local << 'ENVEOF'
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NODE_ENV=development
ENVEOF
    echo -e "${GREEN}✅ Archivo client/.env.local creado${NC}"
fi
echo ""

# Verificar si la base de datos existe
echo "🗄️  Verificando base de datos..."
if ! psql -U postgres -lqt 2>/dev/null | cut -d \| -f 1 | grep -qw podiatrists_db; then
    echo -e "${YELLOW}⚠️  Base de datos no existe. Creando...${NC}"
    cd server
    npx prisma migrate dev --name init
    npx prisma db seed
    cd ..
    echo -e "${GREEN}✅ Base de datos creada y poblada${NC}"
else
    echo -e "${GREEN}✅ Base de datos existe${NC}"
fi
echo ""

# Iniciar servicios
echo "🚀 Iniciando servicios..."
echo ""
pnpm run dev

