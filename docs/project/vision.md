
---
project_name: "Directorio de Podología - [Tu Zona]"
owner: "owner"
start_date: 2026-01-15
end_date: 2026-04-15
version: 0.1
audience: Product, Dev, Growth
---

## Visión General

Producto: marketplace/directorio especializado en podología, orientado a pacientes que buscan profesionales por ubicación, especialidad y valoraciones.

Propuesta de valor MVP:
- Búsqueda rápida y filtrada por ciudad y especialidad.
- Perfiles verificados de podólogos con información de contacto, horario y reseñas.
- Flujo simple de solicitud de cita (lead al profesional).

Estrategia de producto:
- MVP enfocado en validar demanda local y SEO programático (3 sprints de entrega rápida).
- Evolución a SaaS con paneles para profesionales, planes de pago y herramientas de marketing.

## Objetivos SMART

1. Dominio SEO local: alcanzar Top 3 en Google para 10 keywords city-specific en 6 meses. (Métrica: posición media por keyword)
2. Tracción de proveedores: 50 podólogos verificados en 3 meses. (Métrica: registros verificados)
3. Conversiones: 100 leads/mes en el mes 3 post-lanzamiento. (Métrica: leads únicos mensuales)

## Público objetivo

- Pacientes (Usuarios): personas con problemas de pie, deportistas, tercera edad — necesitan encontrar especialistas locales, leer reseñas y contactar rápidamente.
- Podólogos (Clientes): autónomos y clínicas privadas — necesitan visibilidad, captación de pacientes y gestión de reputación.
- Administradores / Operaciones: gestionar calidad de perfiles, facturación y cumplimiento legal.

## Alcance funcional (resumen)

- Home (Alta): buscador, propuesta de valor, categorías.
- Directorio / Search (Alta): resultados filtrables por ciudad/CP/servicio, paginación y mapa.
- Perfil Podólogo (Alta): ficha con servicios, fotos, reseñas, ubicación, CTA reserva/lead.
- Blog/FAQ (Media): contenidos para long-tail y autoridad.
- Dashboard Podólogo (Alta): edición perfil, métricas básicas, leads.
- Admin Panel (Alta): verificación, gestión, export CSV.

## SEO programático — implementación

Objetivo: generar páginas indexables por combinación ciudad+servicio/código postal para captar búsquedas locales con contenido útil y único.

- URL patterns:
	- `/podologos/{ciudad}/{servicio}`
	- `/podologos/{ciudad}/{cp}`
	- `/podologo/{slug}` (perfil individual)

- Meta templates:
	- Title: `{{servicio}} en {{ciudad}} — {{siteName}}` (50–60 chars)
	- Meta description: resumen único 120–155 chars con CTA.

- Structured data (JSON-LD) — ejemplo para perfil:

```json
{
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"name": "{{nombre}}",
	"image": "{{url_imagen}}",
	"address": {
		"@type": "PostalAddress",
		"addressLocality": "{{ciudad}}",
		"postalCode": "{{cp}}",
		"streetAddress": "{{direccion}}"
	},
	"telephone": "{{telefono}}",
	"aggregateRating": {
		"@type": "AggregateRating",
		"ratingValue": "{{rating}}",
		"reviewCount": "{{reviews_count}}"
	}
}
```

- Rendering strategy:
	- Profiles & Landing pages: SSG + ISR.
	- Search pages: SSR or pre-rendered fragments to ensure bots index results.

## Sitemap & crawling

- Generar `sitemap-index` que referencia sitemaps por ciudad/zona. Cada sitemap chunk <50k URLs.
- Campos: `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.
- Endpoint público: `/sitemap.xml`. robots.txt debe referenciarlo y bloquear `/api` y `/admin`.

## Schema.org / Rich Snippets

- Usar `LocalBusiness` en perfiles, `AggregateRating` y `Review` para reseñas. Incluir `BreadcrumbList` en list pages para mejorar snippets.

## SEM — checklist operativo y tracking

Objetivo: generar leads pagados con CPA controlado y optimizar landing pages por ciudad.

- Eventos clave a instrumentar (GTM + GA4 + server-side):
	- `search_performed` (query, ciudad, filtros)
	- `view_profile` (professional_id, city)
	- `lead_submitted` (lead_id, source, campaign)
	- `phone_click` (professional_id)
	- `booking_completed` (order_id)

- Landing pages de campaña:
	- Template por combinación service+city con contenido único y CTA claro.
	- Añadir UTM en enlaces y parámetros limpios.

- Campañas iniciales sugeridas:
	- 60% Search, 20% Remarketing, 20% Branding/Discovery.

- Tracking técnico:
	- GA4 + GTM cliente y server-side tagging (Cloud Run/Functions) para conversion API.

## KPIs (resumen)

- Podólogos verificados: 50 en 3 meses
- Páginas indexadas: 1,000+ en 3 meses
- Leads mensuales: 100 en mes 3
- Core Web Vitals: LCP < 2.5s móvil
- CAC objetivo: definir según LTV estimado

## Riesgos y mitigaciones (Top 5)

1. Crawl budget / duplicación de URLs — Mitigación: canonical, sitemap segmentado, robots.
2. Baja adopción de profesionales — Mitigación: onboarding incentivado y verificación simple.
3. Latencia en search — Mitigación: cache Redis y plan de migración a Algolia.
4. Cumplimiento de datos sensibles — Mitigación: RGPD, encryption, acceso restringido.
5. Costes SEM elevados — Mitigación: optimizar landing pages, negative keywords, Smart Bidding.

## Roadmap resumido

| Fase | Duración | Entregables |
|------|----------|-------------|
| Arquitectura & DB | 2 semanas | Infra, schema prisma, auth |
| Core & Perfiles | 3 semanas | CRUD profesionales, dashboard básico |
| SEO & Routing | 3 semanas | Sitemap, templates landings, schema.org |
| Frontend Público | 3 semanas | Home, Search, Profiles |
| Optimización | 2 semanas | Performance, accesibilidad |

## Checklist técnico — tareas issue-ready

- `SEO-001` Implementar meta templates dinámicos y JSON-LD en render server.
- `SEO-002` Generar sitemap-index y sitemaps por ciudad; exponer `/sitemap.xml`.
- `SEO-003` Implementar structured data en perfiles y list pages.
- `SEM-001` Instrumentar eventos clave en GTM + servidor para conversion API.
- `SEM-002` Crear landing page template para campañas (service+city).
- `ARCH-001` Implementar cache Redis para queries de search y estrategia de invalidation.
- `PERF-001` Optimizar imágenes hero, critical CSS, medir LCP/CLS.

Cada tarea debe incluir: descripción, pasos, criterios de aceptación, estimación (horas) y responsable.

---
¿Quieres que convierta estas tareas a un CSV descargable o que cree issues en GitHub? Indica tu preferencia.


### Leyenda de Estados

- ⬜ Pendiente
- 🔄 En progreso
- ✅ Completado
