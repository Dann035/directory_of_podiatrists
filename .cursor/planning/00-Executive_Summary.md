# Resumen ejecutivo

Proyecto: Directorio de Podólogos (MVP → SaaS escalable)

Objetivo: lanzar un MVP que permita búsquedas y perfiles de podólogos, contacto/reserva básica y valoraciones; dejar la documentación completa para escalar a plataforma SaaS.

Tecnología elegida (MVP): Next.js (React,ts), TailwindCSS, base de datos relacional (Postgres), despliegue en Vercel/Cloud provider, CI/CD GitHub Actions, Nestjs(ts), Docker

KPIs iniciales:
- Usuarios activos semanales (WAU): objetivo 1.000 en 6 meses
- Conversiones contacto/booking: 3–5% en primeras semanas
- Tiempo medio de carga (LCP): <2.5s

Plazo estimado MVP: 8–10 semanas (3 sprints de 3 semanas aprox.).

Alcance MVP (prioridad): búsqueda local por ciudad/servicio, listado de profesionales, ficha de profesional, formulario de contacto / solicitud de cita (sin pasarela de pago), sistema de valoraciones básicas, panel administrativo mínimo.

Detalles operativos y alcance técnico (ejecución):
- Páginas públicas: Home (SSG/ISR), Search (SSR o SSG con client-side filters), Professional Profile (SSG con ISR), About/How it works (SSG), Legal (SSG).
- API: Endpoints REST `/api/v1/*` con autenticación para admin/profesionales.
- Integraciones: Email (SendGrid), Sentry (errores), PostgreSQL gestionado, opcional cache Redis.

Stakeholders clave:
- Product Owner: responsable de scope y priorización.
- Tech Lead: responsable decisiones arquitectura y despliegue.
- Designer: diseño UI/UX y componentes.
- Growth/Marketing: Go-to-market y adquisición.

Plazos y milestones resumidos:
- Discovery y PRD: 1 semana
- Implementación MVP (3 sprints): 8–10 semanas
- Pilot & Launch: 1–2 semanas de estabilización

Riesgos principales y mitigación:
- Riesgo: baja adopción por profesionales — Mitigación: incentivos, outreach local.
- Riesgo: búsqueda lenta a escala — Mitigación: índices en DB, migración a Algolia si necesario.

Call to action para el equipo: revisar PRD y roadmap, asignar recursos y abrir tickets por RF-XXX.
