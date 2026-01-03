# Sprint: Booking & Leads — Sprint 2 (3 semanas)

Duración: 3 semanas

Objetivo:
- Implementar formulario de solicitud de cita (lead), persistencia en DB, envío de email y panel admin básico para ver leads.

Entregables:
- `POST /api/v1/leads` + validaciones + email send — 4 días
- Backend: guardar leads, endpoint admin para listar leads — 3 días
- Frontend: formulario en ficha profesional + confirmación UX — 4 días
- Admin UI básico: lista de leads, filtros (admin only) — 3 días
- Tests y buffer — 1 día

Estimación total sprint: 15 días (~120h)

Asignación recomendada:
- 1 BE — 70h
- 1 FE — 40h
- 0.5 QA — 10h

Notas:
- Integrar SendGrid y añadir retries en workers para envío.
