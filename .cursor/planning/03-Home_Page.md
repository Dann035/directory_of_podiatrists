---
title: Home Page — Especificación detallada
owner: Product / UX
version: 0.1
---

# Objetivo de la Home

La Home actúa como punto de entrada principal: convierte visitantes en búsquedas y leads, comunica la propuesta de valor y facilita el acceso a profesionales.

KPIs principales:
- CTR del search bar (objetivo MVP: 8–12%)
- Tasa de conversión a lead desde Home (objetivo: 1–2%)
- Tiempo medio en página (>45s indica engagement)

Audiencia primaria: pacientes buscando podólogos por ubicación y especialidad.

Nota técnica: la Home debe ser renderizable con SSG para SEO (hero dinámico puede usar ISR). Eventos de tracking implementados para cada CTA y elemento interactivo.

---

# Wireframe y estructura (de arriba hacia abajo)

Sección 1 — Header (global)
- Elementos:
  - Logo (clickable) — aria-label: "Ir al inicio"
  - Nav links: "Buscar podólogo", "Cómo funciona", "Precios" (solo si aplica), "Para profesionales" — cada link con slug y aria-label
  - CTA primaria: "Buscar ahora" (visible en desktop y mobile, color `primary`) — role=button
  - Mobile: hamburger que abre drawer con navegación
  - Microcopy: tooltip/alt text sobre logo: "Directorio de Podólogos — Encuentra profesionales cerca de ti"

Sección 2 — Hero + Search Bar (focus UX)
- Composición:
  - Superheading (eyebrow): "Encuentra podólogos cerca de ti"
  - H1 (headline): "Reserva cita con podólogos verificados" (texto exacto)
  - Subheadline: "Búsqueda por ciudad, especialidad o nombre. Perfiles con reseñas y horarios."
  - SearchBar component (ver especificaciones más abajo)
  - CTA secundaria: "Buscar profesionales" (same as SearchBar submit)
  - Trust badges: "Profesionales verificados", iconos de seguridad/ratings (3 badges)

SearchBar (componente crítico):
- Fields:
  1) `location` (input con autocompletion / geocomplete) — placeholder: "Ciudad, código postal o dirección" — required
  2) `service` (select or autocomplete) — placeholder: "Especialidad (ej. callos, uñas, plantillas)" — optional
  3) `radius` (optional, default 20km) — hidden on mobile, accessible via "Más filtros"
  4) Submit button: label "Buscar" — aria-label "Buscar podólogos"
- UX details:
  - Autocomplete suggestions with keyboard navigation, debounced API call 300ms
  - On submit: navigate to `/search?city=...&service=...`
  - Tracking event: `search_submitted` with props `{query, city, service, result_count}`
  - Accessibility: label each input, error messages inline

Sección 3 — Destacados / Categorías
- Grid de 4–6 tarjetas con categorías (ej.: "Tratamientos uñas", "Fascitis plantar", "Ortopodología")
- Cada tarjeta:
  - Icono + title + short excerpt (20–40 chars)
  - CTA: "Ver especialistas" -> `/search?service=...`
  - Event: `category_clicked` {category}

Sección 4 — Por qué elegirnos (beneficios)
- 3–4 bullets con iconos: "Profesionales verificados", "Opiniones reales", "Reserva fácil", "Soporte".

Sección 5 — Listado rápido / Resultados destacados (optional)
- Muestra 3–5 profesionales destacados (cards) con snapshot: photo, name, specialty, rating, distance, price-start
- CTA en cada tarjeta: "Ver perfil" -> `/professional/:slug`
- Secondary CTA: "Contactar" opens modal/contact form (event: `quick_lead_started`)

Sección 6 — Testimonios / Reseñas
- Carousel o list con 3–5 reseñas, mostrar nombre, city, rating (stars)

Sección 7 — How it works / Steps
- 3 pasos: "Buscar → Contactar → Cita" con microcopy y CTA "Cómo funciona"

Sección 8 — Footer
- Links legales, contacto, social, newsletter signup (email opt-in) — track newsletter signups

---

# Componentes UI/UX (especificación técnica)

1) `Header` props
- `links: Array<{label, href, weight}>`
- `onCTAClick()`
- Tailwind recommended classes: `bg-white shadow-sm`, responsive breakpoints

2) `SearchBar` props
- `initialLocation?: string`
- `initialService?: string`
- `onSubmit(payload) => void`
- `onSuggestionSelected(item) => void`
- Events emitted: `search_input`, `search_suggestion_click`, `search_submitted`

3) `CategoryCard` props
- `icon`, `title`, `slug`, `description`
- `onClick()`

4) `ProfessionalCard` props
- `photoUrl`, `name`, `slug`, `specialities[]`, `rating` (float), `priceFrom`, `distance`, `verified:boolean`
- Buttons: `Ver perfil`, `Contactar` (primary/secondary)
- ARIA: `aria-labelledby` and `aria-describedby` linking

5) `LeadModal` / `ContactForm`
- Fields: `name`, `email`, `phone`, `message`, `preferred_date` (optional)
- Validation rules: email format, phone numeric (international optional)
- On submit: POST `/api/v1/leads` return `{ok, leadId}`; show success message and track `lead_created`

6) `TestimonialCarousel`
- Accessible carousel (keyboard left/right) with pause on hover

---

# Copywriting / Microcopy (texto exacto para implementación)

Header CTA: "Buscar ahora"
Hero H1: "Reserva cita con podólogos verificados"
Hero subheadline: "Encuentra especialistas por ciudad y especialidad. Reseñas reales y reservas rápidas."
Search placeholder location: "Ciudad, barrio o código postal"
Search placeholder service: "Ej. uñas encarnadas, plantillas"
Category CTA: "Ver especialistas"
Profile CTA: "Ver perfil" / "Contactar"
Lead success message: "¡Gracias! Tu solicitud fue enviada. El profesional te contactará pronto."
Newsletter CTA: "Suscribirme"

Errores y mensajes de ayuda:
- Location required: "Introduce una ciudad o dirección"
- Email invalid: "Introduce un email válido"

---

# Tracking / Analytics (events y propiedades)

Implementar eventos con una capa `analytics.track(event, props)`.

Eventos claves:
- `search_input` {query, location, service}
- `search_submitted` {query, city, service, results_count}
- `category_clicked` {category}
- `professional_card_view` {professional_id, slug, position}
- `lead_started` {professional_id}
- `lead_created` {lead_id, professional_id}
- `cta_clicked` {cta_name}

Incluir pageview con `page: 'home'` y metadata `theme`, `experiments`.

---

# SEO / Meta / Social

Meta:
- title: "Directorio de Podólogos — Busca y reserva cita"
- description: "Encuentra podólogos verificados en tu ciudad. Lee reseñas, compara servicios y solicita cita en minutos."

OpenGraph:
- og:image: hero share image (1200x630)
- twitter:card summary_large_image

Schema.org: `WebPage` + `LocalBusiness` snippets for featured professionals (render via JSON-LD en SSR)

---

# Accessibility

- WCAG AA: contrast ratios, focus states for all interactive elements
- Keyboard navigation: SearchBar suggestions, carousel controls, modal focus trap
- Images: `alt` attributes, aria-labels for icons

---

# APIs y Endpoints necesarios (Home)

- `GET /api/v1/suggestions/locations?q=` — para Autocomplete
- `GET /api/v1/services` — lista de especialidades + slugs
- `GET /api/v1/professionals?city=&service=&limit=5` — destacados
- `POST /api/v1/leads` — lead submission (via modal o ficha)

Respuesta ejemplo `GET /api/v1/professionals?city=Madrid&service=ungas`:
```json
{
  "meta": {"total": 234, "page":1},
  "data":[{"id":123,"slug":"dr-juan-perez","name":"Dr. Juan Pérez","rating":4.8,"specialities":["Uñas"],"distance_km":2.4,"price_from":35}]
}
```

---

# Assets y diseño

- Hero image / hero illustration (responsive 2x variants)
- Icons: categories, badges, rating stars (SVG)
- Placeholder images for professionals (grayscale)

---

# Acceptance Criteria (por sección)

- Header: todos los enlaces navegables y responsive; CTA visible en mobile
- SearchBar: sugerencias accesibles, submit redirige correctamente y trackea event
- Category cards: link correcto y tracking
- Professional snapshot: datos obligatorios presentes y CTA funcionan
- Lead flow: crea registro en DB y confirma visualmente al usuario

---

# Tareas desglosadas (issue-ready) y estimaciones

Epic: Home page (implementation)

Tasks (dev):
1. Implementar `SearchBar` component + location autocomplete (3 días FE + 1 día BE for suggestions)
2. Hero layout + copy (1 día FE)
3. Category grid & cards (1 día FE)
4. Featured professionals API + `ProfessionalCard` (2 días BE + 2 días FE)
5. Lead modal + API integration (2 días BE + 1 día FE)
6. Testimonials carousel (1 día FE)
7. Accessibility fixes & tests (1 día QA/FE)
8. Analytics events instrumentation (0.5 días FE)

Total estimado implementación Home: ~13–15 días laborables

Asignación sugerida:
- 1 FE senior, 1 BE fullstack (compartido con otros sprints), 0.5 QA

---

# Sprints propuestos para ejecutar Home

- Sprint A (3 semanas) — incluir tasks 1,2,3,4
- Sprint B (3 semanas) — tasks 5,6,7,8 + integration

---

Si quieres, puedo convertir cada "Task" en un issue con plantilla (PRD link, acceptance criteria, estimación) y agruparlos por sprint. ¿Lo genero ahora?
