# 04 - Perfil Detallado de Profesional

**Estado:** ⬜ Pendiente  
**Prioridad:** 🟡 Media  
**Estimación:** 3-5 días  
**Última actualización:** 2026-01-03

## 📋 Contexto

Usuarios necesitan ver información completa del podólogo antes de contactar: servicios, precios, reseñas, ubicación y credenciales.

**Problema actual:** Solo cards en búsqueda con info limitada.

## 🎯 Objetivos

### Must Have
- ⬜ Página `/profesionales/[slug]`
- ⬜ Información completa del profesional
- ⬜ Lista de servicios con precios
- ⬜ Reseñas de pacientes
- ⬜ Mapa de ubicación
- ⬜ Formulario de contacto (lead)

### Should Have (Fase 2)
- ⬜ Galería de fotos
- ⬜ Horarios de atención
- ⬜ Disponibilidad en tiempo real
- ⬜ Compartir en redes sociales
- ⬜ Botón de favoritos

## 🏗️ Arquitectura

### Stack
- **Frontend:** Next.js dynamic routes + Server Components
- **Backend:** Endpoint existente `GET /practitioners/:slug`
- **Mapas:** Google Maps API (28k loads gratis/mes)

### URL Structure
```
/profesionales/juan-perez-podologia-madrid
```

### Layout
```
┌─────────────────────────────────────┐
│ Header + Avatar + Info + Rating    │
│ [Contactar] [Agendar] [❤]          │
├──────────────┬──────────────────────┤
│ Sidebar      │ Main Content         │
│ - Sobre mí   │ - Bio                │
│ - Servicios  │ - Servicios (cards)  │
│ - Reseñas    │ - Reseñas (lista)    │
│ - Ubicación  │ - Mapa               │
│ - Contacto   │                      │
└──────────────┴──────────────────────┘
```

## 🔄 Alternativas

### Mapas
| Opción | Costo | Decisión |
|--------|-------|----------|
| Google Maps | $7/1000 (28k gratis) | ✅ Elegido |
| Mapbox | $5/1000 | ⬜ Alternativa |
| OpenStreetMap | Gratis | ⬜ Limitado |

### Contacto
| Opción | Pros | Contras | Decisión |
|--------|------|---------|----------|
| Solo formulario | Privacidad, tracking | Fricción | ✅ MVP |
| Info pública | Mejor UX | Spam | ⬜ Fase 2 |
| Híbrido | Flexibilidad | Complejo | ⬜ Futuro |

## 📦 Implementación

### Backend
```typescript
// Ya existe: GET /api/v1/practitioners/:slug
// Incluye: services, reviews, _count

// Nuevo: POST /api/v1/leads
{
  professionalId: string,
  userName: string,
  userEmail?: string,
  userPhone?: string,
  message: string
}
```

### Frontend
```typescript
// app/profesionales/[slug]/page.tsx
export default async function ProfessionalPage({ params }) {
  const professional = await getProfessional(params.slug);
  return <ProfessionalProfile data={professional} />;
}

// components/professional/
├── ProfessionalProfile.tsx
├── ProfessionalHeader.tsx
├── ProfessionalServices.tsx
├── ProfessionalReviews.tsx
├── ProfessionalLocation.tsx
└── ContactForm.tsx
```

### Google Maps
```typescript
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

<GoogleMap
  center={{ lat, lng }}
  zoom={15}
  mapContainerStyle={{ width: '100%', height: '400px' }}
>
  <Marker position={{ lat, lng }} />
</GoogleMap>
```

### SEO
```typescript
export async function generateMetadata({ params }) {
  const prof = await getProfessional(params.slug);
  return {
    title: `${prof.name} - Podólogo en ${prof.city}`,
    description: prof.bio
  };
}
```

## ✅ Criterios de Aceptación

- ⬜ URL `/profesionales/[slug]` funciona
- ⬜ Muestra info completa
- ⬜ Servicios con precios visibles
- ⬜ Reseñas (mín 5 o todas)
- ⬜ Mapa con ubicación
- ⬜ Formulario contacto funcional
- ⬜ Responsive
- ⬜ SEO optimizado
- ⬜ 404 si slug no existe

## 📊 Métricas de Éxito

- ⬜ Carga < 2s
- ⬜ Conversión (visita → contacto) > 5%
- ⬜ Bounce rate < 40%
- ⬜ Tiempo en página > 2 min

## 🧪 Tests (OBLIGATORIO)

**Requisito:** Mínimo 85% coverage para completar step

### Tests Unitarios
- ⬜ `getProfessional()`: fetch data correctamente
- ⬜ ContactForm validation
- ⬜ Servicios rendering

### Tests E2E
- ⬜ GET /practitioners/:slug (success, 404)
- ⬜ POST /leads (success, validation errors)
- ⬜ Navegación desde búsqueda a perfil
- ⬜ Formulario contacto submit
- ⬜ Responsive en mobile/desktop

**Estado:** ⬜ Pendiente implementación

## ❓ Preguntas Abiertas

1. **¿Mostrar teléfono/email públicamente?**
   - Propuesta: Solo formulario por defecto
   
2. **¿Galería de fotos es bloqueante?**
   - Propuesta: No, fase 2

3. **¿Video de presentación?**
   - Propuesta: Could have, no prioritario

## 📚 Referencias

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Google Maps React](https://www.npmjs.com/package/@react-google-maps/api)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)

### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
