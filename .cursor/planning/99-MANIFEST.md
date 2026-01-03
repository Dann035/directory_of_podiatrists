---
title: Manifiesto del proyecto — Directorio Podólogos (MVP → SaaS)
generated: 2025-12-31
version: 0.1
---

# Resumen

Este manifiesto agrupa los artefactos generados en `planning/` y las plantillas canonizadas en `plantillas/`, resume estimaciones, prioridades y el roadmap por sprints.

## Enlace rápido a documentos (planning)
- [00-Executive_Summary.md](00-Executive_Summary.md)
- [01-Vision_General.md](01-Vision_General.md)
- [02-PRD.md](02-PRD.md)
- [03-Architecture.md](03-Architecture.md)
- [04-Data_Model.md](04-Data_Model.md)
- [05-API_Spec.md](05-API_Spec.md)
- [06-Roadmap.md](06-Roadmap.md)
- [07-Design_System.md](07-Design_System.md)
- [08-QA_and_Testing.md](08-QA_and_Testing.md)
- [09-Security_Privacy.md](09-Security_Privacy.md)
- [10-Deployment_Runbook.md](10-Deployment_Runbook.md)
- [11-Monitoring_Observability.md](11-Monitoring_Observability.md)
- [12-GoToMarket.md](12-GoToMarket.md)
- [13-Budget_and_Estimations.md](13-Budget_and_Estimations.md)
- `sprints/` (carpetas por sprint)

## Plantillas canonizadas (carpeta `plantillas/`)
Listado de plantillas numeradas encontradas:

```
plantillas/plantilla_00_README.md
plantillas/plantilla_01_VISION_GENERAL.md
plantillas/plantilla_01_VERSION_GENERAL.md
plantillas/plantilla_02_ARQUITECTURA_INFORMACION.md
plantillas/plantilla_02_VERSION_GENERAL.md
plantillas/plantilla_03_PAGINA_HOME.md
plantillas/plantilla_03_PRD_Product_Requirements.md
plantillas/plantilla_04_Personas.md
plantillas/plantilla_05_Stakeholder_Register.md
plantillas/plantilla_06_ROADMAP_IMPLEMENTACION.md
plantillas/plantilla_07_ARQUITECTURA_INFORMACION.md
plantillas/plantilla_08_API_SPEC.md
plantillas/plantilla_08_Architecture_Overview.md
plantillas/plantilla_09_ADR_Architecture_Decision_Record.md
plantillas/plantilla_09_Data_Model.md
plantillas/plantilla_10_Design_System.md
plantillas/plantilla_10_Dev_Onboarding.md
plantillas/plantilla_11_Deployment_Runbook.md
plantillas/plantilla_11_PAGINA_HOME.md
plantillas/plantilla_12_API_SPEC.md
plantillas/plantilla_12_QA_TestPlan.md
plantillas/plantilla_13_Data_Model.md
plantillas/plantilla_13_Security_Privacy.md
plantillas/plantilla_14_Dev_Onboarding.md
plantillas/plantilla_14_Monitoring_Observability.md
plantillas/plantilla_15_Deployment_Runbook.md
plantillas/plantilla_16_Design_System.md
plantillas/plantilla_16_QA_TestPlan.md
plantillas/plantilla_17_Performance_Testing_Plan.md
plantillas/plantilla_18_ROADMAP_IMPLEMENTACION.md
plantillas/plantilla_18_Security_Privacy.md
plantillas/plantilla_19_ADR_Architecture_Decision_Record.md
plantillas/plantilla_19_Monitoring_Observability.md
plantillas/plantilla_20_Accessibility_Audit_Checklist.md
plantillas/plantilla_21_Analytics_Events_Plan.md
plantillas/plantilla_22_Architecture_Overview.md
plantillas/plantilla_22_Third_Party_Integrations.md
plantillas/plantilla_23_Budget_Costs.md
plantillas/plantilla_24_Data_Migration_Template.md
plantillas/plantilla_25_Fase_Template.md
plantillas/plantilla_26_GoToMarket_Marketing_Plan.md
plantillas/plantilla_27_Incident_Response_Playbook.md
plantillas/plantilla_28_Meeting_Notes.md
plantillas/plantilla_29_PRD_Product_Requirements.md
plantillas/plantilla_30_Stakeholder_Register.md
```

## Estimación de tiempos (resumen)
- Sprints core (desarrollo):
  - Sprint 1 (Core Search & Listing): 15 días laborables
  - Sprint 2 (Booking & Leads): 15 días laborables
  - Sprint 3 (Admin & Onboarding): 10–15 días laborables
  => Total dev MVP: 40–45 días laborables (≈ 8–9 semanas)

- Tareas operativas y de hardening (QA, Seguridad, Deploy, Monitoring): 8–12 días
- Preparación Go-to-market y marketing assets: 7–14 días

Estimación total aproximada (MVP + launch): 55–71 días laborables (~11–14 semanas). Incluye buffers y QA.

## Prioridades (Must / Should / Could)

- Must (MVP mínimo):
  - Búsqueda por ciudad/servicio (`RF-001`)
  - Listado de profesionales y ficha (`RF-002`,`RF-003`)
  - Formulario leads y persistencia (`RF-004`)
  - Infraestructura básica (Postgres, hosting, CI)
  - Tests críticos e integración de email (mock/SendGrid)

- Should (Post-MVP / ampliaciones inmediatas):
  - Autenticación profesional y verificación
  - Panel admin para gestionar leads y profesionales
  - Mejoras de performance y caching
  - Observabilidad y alertas completas

- Could (futuro SaaS):
  - Pagos, anuncios y planes premium
  - Analytics avanzado y reportes en panel profesional
  - Motor de búsqueda Algolia para escala

## Roadmap por sprint (resumen rápido)
- `sprints/sprint-core-search/` — Implementación búsqueda/listado/ficha (15d)
- `sprints/sprint-booking-leads/` — Leads + email + admin básico (15d)
- `sprints/sprint-admin-onboarding/` — Onboarding y verificación (10–15d)

## Entregables y criterios de aceptación clave
- Entregable: Endpoint `GET /api/v1/professionals` — CA: filtros funcionan, paginación, 90% de requests < 500ms en staging.
- Entregable: Ficha profesional pública — CA: muestra datos obligatorios, formulario de contacto funcional.
- Entregable: Admin leads list — CA: listar, filtrar y exportar CSV.

## Siguientes pasos recomendados
1. Confirmar equipo y rates para afinar presupuesto por rol.
2. Crear issues/tickets en repo por RF-XXX y asignar a sprints.
3. Implementar CI con pruebas básicas y despliegue a staging.

---

Generado automáticamente por la planificación. Si quieres, exporto este manifiesto a PDF o genero las issues de GitHub automáticamente (necesitaré tus rates y accesos para estimaciones detalladas y la creación de issues).
