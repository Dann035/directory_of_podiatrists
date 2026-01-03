
---
title: Budget and Estimations
owner: Finance / Product
version: 0.1
---

Resumen ejecutivo

Desglose inicial de CAPEX y OPEX para el lanzamiento y operación del MVP (Directorio de Podólogos), estimaciones por sprint, coste por recurso, supuestos clave y plan de contingencia. Los valores son estimaciones orientativas para planificación y toma de decisiones; ajustar según mercado y recursos reales.

1) CAPEX (gastos de capital — one-off)

- Infra & IaC setup: despliegue inicial de Terraform, VPC, RDS/Postgres, configuración de backups y seguridad — €2,000 (estimado).
- Diseño & UX: wireframes, 5 landings, 1 kit de assets (hero images) — €1,200.
- Desarrollo inicial (licencias/tools): dominio, cuentas cloud, licencias de terceros, herramientas CI — €800.
- Integraciones & Seguridad: configuración DLP básica, KMS, secrets manager, runbook inicial — €1,000.

Subtotal CAPEX estimado: €5,000 (one-off)

2) OPEX (gastos operativos — mensuales)

- Hosting / Infra (VPS/Cloud managed Postgres, Redis, CDN): €150–€400 / mes
- Observability (Sentry, Prometheus/Grafana SaaS or Datadog): €50–€200 / mes
- Email provider (SendGrid/Mailgun) & SMS (opcional): €50–€200 / mes
- Search / indexing (si se usa Algolia early): €0–€200 / mes (start DB-driven → 0)
- Google Ads + SEM budget (pilot): €800–€2,000 / mes
- Content production / SEO (copy + images): €800–€1,500 (one-off or monthly to scale)

OPEX mensual estimado (rango piloto): €1,850–€4,500

3) Coste por recurso (tasas orientativas por hora / coste mensual asumido)

- Frontend Developer: €35–€60 / h — 160h/month ≈ €5,600–€9,600
- Backend Developer: €40–€65 / h — 160h/month ≈ €6,400–€10,400
- DevOps / SRE: €45–€75 / h — 40h/month (part-time) ≈ €1,800–€3,000
- Designer (UI/UX): €30–€55 / h — 40h (sprint) ≈ €1,200–€2,200
- Growth / SEM: €30–€60 / h — 40h/month ≈ €1,200–€2,400
- QA/Test: €25–€45 / h — 40h/month ≈ €1,000–€1,800
- Product / PM: €45–€80 / h — 40h/month ≈ €1,800–€3,200

Nota: si los recursos son contratados como freelance o agencia, añadir margen +20–30% en el coste.

4) Estimaciones por sprint (2 semanas, equipo reducido)

Asunción de equipo para sprint estimado (MVP core): 1 FE, 1 BE, 0.25 DevOps, 0.5 QA, 0.25 Designer, 0.25 PM.

- Coste por sprint (estimación conservadora)
  - Frontend (80h) @ €45/h = €3,600
  - Backend (80h) @ €50/h = €4,000
  - DevOps (20h) @ €60/h = €1,200
  - QA (40h) @ €30/h = €1,200
  - Designer (20h) @ €40/h = €800
  - PM (20h) @ €60/h = €1,200

  - Total por sprint ≈ €12,000

Estimación por milestone (ejemplo 6 sprints ≈ 12 semanas): €72,000 (equipo reducido)

5) Supuestos clave

- Horas útiles mensuales por recurso = 160h (FT) / sprint 80h.
- Tarifas indicadas son promedio de mercado para profesionales mid-senior en Europa; pueden variar localmente.
- Infra inicial se mantiene baja si se usa DB-managed; costes de Ads/SEM serán la principal variable.
- No se incluyen costes legales/seguros adicionales; añadir según jurisdicción.

6) Plan de contingencia y mitigación de riesgos financieros

- Reserva de contingencia: 15% del presupuesto total estimado para MVP (recomendado).
- Si el CAC observado > target: pausar incremento de presupuesto SEM, centrarse en SEO y optimizar funnel (CRO).
- Si los costes infra superan estimación: revisar arquitectura (caching, downsizing, spot instances) o migrar a plan más económico.
- Plan de reducción rápida: priorizar features críticos (RF-001..RF-004), retrasar panel admin y funcionalidades no esenciales.

7) Tabla CSV — gasto mensual (ejemplo 6 meses)

CSV (Month,DevSalaries,Infra,Monitoring,Email,Ads,Content,Outreach,Total)

```csv
Month,DevSalaries,Infra,Monitoring,Email,Ads,Content,Outreach,Total
Month-1,12000,300,100,50,2250,800,200,15600
Month-2,12000,300,100,50,2250,0,200,15100
Month-3,12000,300,150,50,2250,0,400,15450
Month-4,12000,300,150,50,1500,0,400,14850
Month-5,12000,300,150,50,1500,0,400,14850
Month-6,12000,300,150,50,1000,0,400,13850
```

Notas tabla: `DevSalaries` es coste mensual aproximado del equipo (equivalente a 2-week sprint coste mensualizado), `Ads` y `Content` varían según estrategia y escalado. Los totales incluyen suma directa de columnas.

8) Recomendaciones finales

- Mantener una reserva de contingencia del 15% sobre el primer trimestre.
- Priorizar inversión en medición (tracking server-side) y campañas SEM controladas para validar CAC antes de escalar.
- Revisar estimaciones salariales y horas reales tras 2 sprints y ajustar burn-rate.

Siguientes pasos que puedo ejecutar

- Aplicar contingencia del 15% y generar CSV descargable con proyección de 6 meses.
- Desglosar coste por historia/issue para alimentar estimaciones por sprint en el backlog.

Indícame cuál de estas acciones ejecutar ahora.
---
title: Presupuesto y estimaciones
owner: Finance/Product
version: 0.1
---

Resumen estimado (MVP 3 meses)
- Equipo: 2 devs (fullstack), 0.5 designer, 0.5 QA, 0.2 PM — coste aproximado mensual: variable según rates
- Infraestructura: DB managed $50–200/mo, hosting Vercel (plan gratuito->pro), email $20–50/mo
- Marketing inicial: $1.000–3.000 para piloto

Coste total aproximado MVP (3 meses): 20K–60K EUR (dependiendo de sueldos/rates externos)

Notas:
- Desgloses detallados por rol/mes se pueden anexar si facilitas rates.
