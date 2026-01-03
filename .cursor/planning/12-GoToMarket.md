---
title: Go-to-Market | Lanzamiento MVP
owner: Growth
version: 0.1
---

Resumen

Plan Go-to-Market para el MVP del Directorio de Podólogos. Objetivo: validar demanda local, generar leads cualificados y comenzar a probar canales pagados (SEM) y orgánicos (SEO) en una ciudad piloto.

1. Buyer personas (3)

- Paciente buscador inmediato ("Paciente Urgente")
	- Perfil: 25–55 años, busca solución rápida por dolor agudo o problema estético (ej. uña encarnada, verrugas), alta intención de conversión.
	- Necesidades: disponibilidad rápida, confianza (reseñas), precio claro.
	- Messaging clave: "Encuentra podólogos verificados en tu zona y solicita cita en minutos".

- Paciente preventivo / informativo ("Cuidado Continuo")
	- Perfil: 40+ años, seguimiento periódico, valora cercanía, reviews y especialidad.
	- Necesidades: confianza, reputación profesional, horarios.
	- Messaging clave: "Perfiles verificados con opiniones reales — elige el especialista que mejor se adapta a ti".

- Podólogo / Clínica (Proveedor)
	- Perfil: profesional autónomo o pequeña clínica, busca pacientes y reputación online.
	- Necesidades: leads cualificados, visibilidad local, panel sencillo.
	- Messaging clave: "Aumenta tu agenda con leads locales verificados — gestión y métricas incluidas".

2. Messaging y posicionamiento

- Headline (pacientes): "Podólogos verificados cerca de ti — reserva o contacta hoy"
- Subheadline (pacientes): "Perfiles completos, reseñas reales y contacto rápido"
- Headline (profesionales): "Llega a más pacientes locales — panel y gestión de leads"
- Value props (top 3): verificación profesional, leads cualificados, control y métricas.

3. Lista de assets necesarios

- Tech / Web
	- 5 landing pages (city+service) SSG/ISR
	- Plantilla de landing (SEO blocks, FAQs, CTAs)
	- Página de perfil con JSON-LD y reviews
	- `/sitemap.xml` y robots.txt

- Creativos & Contenido
	- 5 hero images (localizadas) + variantes móviles
	- 10 anuncios responsivos (Google Ads) — headlines y descriptions
	- 10 textos para landing (600–900 palabras) + 5 FAQs por landing
	- Testimonios / casos (5) y assets multimedia (fotos)

- Tracking & Analytics
	- GTM container (client+server) con eventos `search_performed`, `view_profile`, `lead_submitted`
	- Conversion API config y UTM naming conventions

- Growth & Sales
	- Email outreach template para profesionales
	- Onboarding pack para profesionales (guía GBP, fotos, checklist)

4. Estrategia de campañas (SEM + SEO)

- SEM (pagado)
	- Foco inicial: Google Search (high-intent) + Performance Max para descubrimiento local
	- Estructura: Campaign per city → Ad groups por servicio → Keywords high-intent + long-tail
	- Creatives: Responsive Search Ads + Landing specific
	- Tracking: server-side conversion + GA4

- SEO (orgánico)
	- Programático: generar landings city+service (SSG/ISR), schema en perfiles, sitemap por ciudad
	- On-page: meta templates, headings, canonical, internal linking hubs
	- Content: blog/FAQ para long-tail y autoridad local

- Local / Partnerships
	- GBP optimization program for listed professionals
	- Partnerships with clinics and local associations (referral agreements)

5. Timeline operativo (12 semanas)

- Semana 0 (preparación)
	- Auditoría SEO + tracking baseline; definir 5 ciudades/services iniciales (start pilot city)
	- Crear assets prioritarios (5 landings skeleton, GTM container)

- Semanas 1–2
	- Implementar meta templates y JSON-LD en perfiles
	- Publicar 2 landing pages y configurar `/sitemap.xml`
	- GTM client + server tagging básico implementado

- Semanas 3–4
	- Lanzar campañas Search para 2 landings (piloto)
	- Monitorizar CPA, CTR, conversiones; A/B test creatives
	- Onboard 10–20 profesionales en la ciudad piloto

- Semanas 5–6
	- Publicar 3 landings adicionales (total 5)
	- Optimización SEO on-page y Core Web Vitals (images, LCP)
	- Ajustes de pujas y negative keywords

- Semanas 7–8
	- Escalar campañas efectivas; activar Performance Max para discovery
	- Outreach y partnerships: 1–2 acuerdos locales
	- Monitorización y ajustes continuos (weekly)

- Semanas 9–10
	- Ejecutar tácticas de CRO (A/B tests en landing CTA/headlines)
	- Preparar plan de scaling y presupuesto para mes siguiente

- Semanas 11–12
	- Revisión 12-week: report de KPIs, aprendizajes, optimizaciones y roadmap de siguiente trimestre

6. KPIs (por canal) y objetivos

- Global MVP objectives
	- Leads únicos/mes (pilot city): 100 en mes 3
	- Podólogos verificados: 50 en 3 meses

- SEM (Google Search)
	- KPI: CPA (cost per lead) — objetivo inicial: €8–€30 por lead (varía por ciudad)
	- KPI: CTR > 5% (ad groups optimizados)

- SEO (orgánico)
	- KPI: Organic sessions — +X% MoM (definir X con Growth)
	- KPI: Top-3 positions for prioritized keywords — objetivo: 3–6 months progress

- GBP / Local
	- KPI: Calls from GBP / leads from GBP — track via phone tracking/UTM

- CRO
	- KPI: Landing conversion rate > 3% (benchmark initial)

7. Estimación de budget por canal (rango mensual inicial)

- Google Search (Search + extensions): €800–€2,000 (piloto: 5 landings)
- Performance Max / Discovery: €300–€800
- Remarketing / Display: €150–€400
- Content & SEO production (copy + images): €800–€1,500 (one-off / monthly for scale)
- Outreach & Partnerships (paid/ops): €200–€800

- Total mensual estimado (piloto): €2,250–€5,500

Notas: cifras orientativas — ajustar según CPC real por ciudad y conversion rate observada.

8. Roles, owners y governance

- Growth: owner de campañas, keyword research y reporting
- Dev Frontend: implementa landings, meta, JSON-LD y optimizaciones de rendimiento
- Dev Backend: endpoints de leads, server-side conversion y métricas
- Ops/SRE: infra, CDN, Redis y monitoring
- Sales / Ops: outreach y onboarding a profesionales

9. Checklist issue-ready (prioritario)

- GTM-001: Configurar GTM client + server container y mapear eventos — Dueño: Growth/Dev — Est: 2d
- SEO-001: Implementar meta templates dinámicos y validar — Dueño: Dev Frontend — Est: 1d
- SEO-002: Publicar sitemap-index y `/sitemap.xml` — Dueño: Dev — Est: 0.5d
- LAND-001: Crear 5 landing pages SSG/ISR (copy + images) — Dueño: Growth/Dev — Est: 5d
- SEM-001: Lanzar campañas Search para 2 landings (pilot) — Dueño: Growth — Est: 3d

10. Siguientes pasos que puedo ejecutar ahora

- Generar CSV con las tareas prioritarias `GTM-*`, `SEO-*`, `LAND-*`, `SEM-*` para importar a GitHub Issues.
- Crear brief de 5 landings (plantilla) con keywords y estructura de contenidos.

---

¿Quieres que genere el CSV con las tareas para importarlas a GitHub Issues o que cree los issues directamente en un repositorio (necesitaré repo + token)?
