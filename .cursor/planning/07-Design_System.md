---
title: Design System — Tokens y Componentes
owner: Diseño / Frontend
version: 0.1
---

Objetivo: definir tokens visuales, variantes, estados de accesibilidad y componentes reutilizables con ejemplos Tailwind y snippets HTML/JSX listos para tickets.

1) Escala de tokens

- Color (paleta primaria):
  - `--color-primary-50: #EEF2FF`
  - `--color-primary-100: #E0E7FF`
  - `--color-primary-200: #C7D2FE`
  - `--color-primary-500: #6366F1` (primary)
  - `--color-primary-700: #4F46E5`

- Neutrales (grises):
  - `--gray-50: #FAFAFA`
  - `--gray-100: #F3F4F6`
  - `--gray-300: #D1D5DB`
  - `--gray-700: #374151`

- Semantic:
  - `--success: #10B981`
  - `--warning: #F59E0B`
  - `--danger:  #EF4444`

- Tipografía (Tailwind tokens recommended):
  - `font-sans: Inter, system-ui, -apple-system` (base)
  - `type-scale`: h1 36px, h2 28px, h3 20px, body 16px, small 14px

- Espaciado (8pt scale):
  - `space-1: 4px`, `space-2: 8px`, `space-4: 16px`, `space-8: 32px`

- Sombras y radii:
  - `radius-sm: 6px`, `radius-md: 12px`, `radius-full: 9999px`
  - `shadow-sm: 0 1px 2px rgba(0,0,0,0.04)`, `shadow-md: 0 6px 18px rgba(7,9,12,0.08)`

2) Variants y estados de componentes

- Button variants:
  - `primary` (bg-primary-500 text-white hover:bg-primary-700 focus:ring-2)
  - `secondary` (bg-transparent border border-gray-300 text-gray-700)
  - `ghost` (transparent, subtle text)
  - `danger` (bg-danger text-white)

- Input states:
  - `default`: border-gray-300
  - `focus`: outline-none ring-2 ring-primary-200
  - `error`: border-danger text-danger
  - `disabled`: bg-gray-100 cursor-not-allowed

- Card states:
  - `default`: bg-white shadow-sm
  - `hover`: shadow-md transform -translate-y-0.5
  - `selected`: border-primary-500 ring-1

3) Accessibility states & guidelines

- Contrast: ensure text contrast >= WCAG AA (ratio >= 4.5:1 for normal text). Use `--color-primary-700` for primary text on white.
- Focus: all interactive elements must have visible focus (prefer `ring-2 ring-primary-200`), avoid `outline: none` without replacement.
- Reduced motion: respect `prefers-reduced-motion` — avoid large transitions for users who opt out.
- Keyboard navigation: components must be reachable via `tab` and have aria roles/labels.

4) Component API (props) — lista principal

- `Button` props
  - `variant: 'primary'|'secondary'|'ghost'|'danger'` (default: 'primary')
  - `size: 'sm'|'md'|'lg'`
  - `disabled: boolean`
  - `onClick: () => void`

- `Input` props
  - `label: string`
  - `value: string`
  - `placeholder: string`
  - `error?: string`
  - `onChange: (value) => void`

- `SearchBar` props
  - `initialLocation?: string`
  - `initialService?: string`
  - `onSubmit: (payload) => void`
  - `suggestions?: {type:'location'|'service', items: any[]}`

- `ProfessionalCard` props
  - `photoUrl, name, slug, specialties[], rating, priceFrom, distance, verified:Boolean`
  - Callbacks: `onViewProfile(slug)`, `onContact(slug)`

- `Modal` props
  - `isOpen: boolean`, `title: string`, `onClose()`, `children`

5) Examples Tailwind classes (patterns)

- Primary button (md):
  - `class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"`

- Secondary button:
  - `class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"`

- Card wrapper:
  - `class="bg-white rounded-md shadow-sm p-4 hover:shadow-md transition-transform duration-150"`

- SearchBar input:
  - `class="w-full rounded-l-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-200"`

6) Snippets HTML / JSX (ready-to-use)

- Button (React):

```jsx
function Button({variant='primary', size='md', children, ...props}){
  const base = 'inline-flex items-center font-medium rounded-md focus:outline-none';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  const sizes = {sm:'px-2 py-1 text-sm', md:'px-4 py-2', lg:'px-6 py-3 text-lg'};
  return <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>{children}</button>
}
```

- SearchBar (simplified):

```jsx
function SearchBar({initialLocation='', initialService='', onSubmit}){
  const [location,setLocation]=useState(initialLocation);
  const [service,setService]=useState(initialService);
  return (
    <form onSubmit={e=>{e.preventDefault(); onSubmit({location,service})}} className="flex">
      <input aria-label="location" placeholder="Ciudad, barrio o código postal" className="w-2/5 rounded-l-md border px-3 py-2" value={location} onChange={e=>setLocation(e.target.value)} />
      <input aria-label="service" placeholder="Ej. uñas encarnadas" className="w-2/5 border-t border-b px-3 py-2" value={service} onChange={e=>setService(e.target.value)} />
      <Button type="submit" className="rounded-r-md">Buscar</Button>
    </form>
  )
}
```

- ProfessionalCard (JSX):

```jsx
function ProfessionalCard({photoUrl,name,slug,specialties,rating,priceFrom,distance,verified,onViewProfile,onContact}){
  return (
    <article className="bg-white rounded-md shadow-sm p-4">
      <img src={photoUrl} alt={`Foto de ${name}`} className="w-20 h-20 rounded-md object-cover" />
      <h3 className="text-lg font-semibold">{name}{verified && <span className="ml-2 text-sm text-green-600">✓</span>}</h3>
      <p className="text-sm text-gray-500">{specialties.join(', ')}</p>
      <div className="mt-3 flex gap-2">
        <Button onClick={()=>onViewProfile(slug)} variant="secondary">Ver perfil</Button>
        <Button onClick={()=>onContact(slug)} variant="primary">Contactar</Button>
      </div>
    </article>
  )
}
```

7) Guidelines de imagen y assets

- Formatos: usar WebP/AVIF para produción (fallback a JPEG/PNG). Hero images 1200x630 para OpenGraph.
- Responsive: servir `srcset` y `sizes` para imágenes de profesionales (e.g. 320, 640, 1024). Lazy load non-critical images.
- Aspect ratio: usar 4:3 o 1:1 para profesionales; crop centrado en rostro.
- Placeholder: usar LQIP o blurred placeholder para mejor CLS.

8) Responsive behavior

- Mobile first: breakpoints `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- Navigation: collapse to hamburger under `md`. SearchBar full width on mobile, split inputs on desktop.
- Grid: use 1 column on mobile, 2 columns `md`, 3 columns `lg` for card lists.

9) Accessibility checklist for components

- All images: `alt` present.
- All inputs: associated `label` or `aria-label`.
- Buttons: focusable, have discernible text, avoid icon-only without `aria-label`.
- Modal: trap focus, restore focus on close, escape to close.
- Color: test with `axe`/Lighthouse and manual checks.

10) Tokens and Tailwind config example (tailwind.config.js snippet)

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          500: '#6366F1',
          700: '#4F46E5'
        }
      },
      borderRadius: { 'md': '12px' }
    }
  }
}
```

11) How to use this Design System in tickets

- For each UI ticket include:
  - Component name (e.g. `SearchBar`)
  - Props required and example usage (copy-paste JSX)
  - Acceptance criteria (visual + accessibility + tracking)
  - Storybook entry (if available)

---

Si quieres, genero un pequeño Storybook-ready set (stories + components) o convierto cada componente en issues con criterios y estimaciones. ¿Lo genero ahora? 
---
title: Design System — Next.js + Tailwind
owner: Diseño
version: 0.1
---

Tokens esenciales:
- Colores semánticos: `primary`, `accent`, `neutral`, `success`, `danger`.
- Tipografía: variables CSS con scale (base 16px).
- Espaciado: escala modular (4px * n).

Componentes críticos (MVP):
- `SearchBar`, `ProfessionalCard`, `ProfileHeader`, `ReviewList`, `FormLead`, `AdminTable`.

Integración técnica:
- Usar Tailwind config con tokens, exportar variables CSS para componentes y Storybook para documentar.

Estimación creación básica: 5 días (FE)

---

Component specs (Home-focused)

1) `SearchBar`
- Purpose: entrada principal de conversión en Home.
- Props:
	- `initialLocation?: string`
	- `initialService?: string`
	- `onSubmit(payload)` — payload `{location, service, radius}`
	- `className?: string`
- Accessibility:
	- Each input has an associated `<label>` and `aria-autocomplete` for suggestions.
- Visual / Tailwind examples:
	- Container: `flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm`
	- Input: `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary`
- Events to emit: `search_input`, `search_suggestion_click`, `search_submitted`

2) `ProfessionalCard`
- Purpose: snapshot listing and featured cards.
- Props:
	- `photoUrl`, `name`, `slug`, `specialities: string[]`, `rating: number`, `priceFrom?: number`, `distanceKm?: number`, `verified?: boolean`
	- `onViewProfile(slug)`, `onContact(slug)`
- Visual / Tailwind examples:
	- Card wrapper: `bg-white rounded-lg shadow p-4 flex gap-4`
	- Photo: `w-24 h-24 rounded-md object-cover`
	- Name: `text-lg font-medium`
	- Buttons: primary `bg-primary text-white px-3 py-2 rounded`, secondary `border px-3 py-2 rounded`

3) `LeadModal / ContactForm`
- Fields and validation as specified in Home doc.
- UX: show loader during submission, success state with `leadId` and CTA to view professional profile.

4) Storybook and visual tests
- Create stories for SearchBar variants (desktop, mobile, error states), ProfessionalCard variants (no-photo, verified, low-rating), LeadModal states.
- Add visual regression snapshots (Chromatic or Percy).

Governance
- Versioning: bump `design-system` version when tokens or component API change.

