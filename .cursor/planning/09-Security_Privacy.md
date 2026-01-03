---
title: Seguridad y Privacidad
owner: Security Lead
version: 0.1
---

Resumen

Documento de control de Seguridad y Privacidad para el MVP del Directorio de Podólogos. Incluye controles mínimos, política DLP, retención de datos, plan de respuesta a brechas, roles y responsabilidades, checklist de hardening y lista de tareas para pentest.

Controles mínimos (MVP)

- HTTPS forzado + HSTS.
- Encriptación at-rest para datos sensibles (KMS) y cifrado in-transit (TLS 1.2+).
- Autenticación: JWT con refresh tokens; passwords con bcrypt/argon2.
- Rate limiting y WAF para endpoints públicos.
- Registro de consentimientos y manejo de datos personales (GDPR).
- Monitoreo básico: Sentry para errores, métricas básicas y alertas (p95/p99 latency, error rate).

1. Política DLP (Data Loss Prevention)

- Objetivo: detectar y bloquear exfiltración de datos sensibles (PII, documentos de licencia).
- Clasificación de datos:
	- Público: contenido de marketing, listados públicos.
	- Interno: logs no sensibles, métricas agregadas.
	- Confidencial: emails, teléfonos, leads.
	- Sensible/Regulado: documentos de licencia, números de identificación.
- Controles técnicos:
	- Encriptado de columnas sensibles en DB (KMS).
	- Escaneo de repositorios y uploads contra patrones (SSN/identifiers) en ingest pipeline.
	- Reglas de exfiltración en WAF / egress monitoring: bloquear subida masiva o descargas que excedan umbral.
	- Alertas en SIEM/Logging para accesos anómalos a tablas sensibles.
- Procesos:
	- Revisión manual de alertas por Security/Ops.
	- Auditoría trimestral de accesos a PII.

2. Retention policy (política de retención)

- Principio: almacenar solo lo necesario por el menor tiempo requerido y permitir borrado por usuario/DSAR.
- Retenciones por tipo:
	- Leads (contactos): conservar 24 meses por defecto, opción de borrado a petición.
	- Perfiles profesionales públicos: conservar mientras el profesional mantenga cuenta; historial de cambios 12 meses.
	- Documentos de verificación (licencias): conservar 36 meses o hasta que el profesional solicite eliminación, sujeta a cumplimiento legal.
	- Logs de auditoría/seguridad: conservar 12 meses (resumen) y 90 días (detallado).
	- Backups: conservar snapshots 30 días + PITR según política DB (configurable).
- Requisitos de implementación:
	- Jobs periódicos de eliminación/anonimización.
	- Endpoint y procedimiento DSAR para solicitudes de acceso / borrado.

3. Breach Response Plan (plan de respuesta a brechas)

- Objetivo: contener, evaluar y notificar en plazos regulatorios.
- Pasos operativos:
	1. Detectar: alertas automáticas (SIEM/Sentry) o reporte manual.
	2. Contener: bloquear credenciales comprometidas, aislar servicios afectados, rotar keys si aplica.
	3. Evaluar: alcance (datos afectados, usuarios impactados), vector de ataque y tiempo de exposición.
	4. Notificar: informar a Product, Legal, Security Lead y, si procede, a autoridades/regulatorio y a usuarios afectados según GDPR (72h cuando aplique).
	5. Remediar: patch, limpiar accesos, forzar resets, aplicar lecciones aprendidas.
	6. Post-mortem: informe técnico y operativo con medidas preventivas y checklist de cierre.
- Roles en la respuesta: Security Lead (coordinador), CTO (técnico), Legal (notificaciones), PR/Growth (comunicaciones públicas), Ops (remediación infra).

4. Roles y responsabilidades (listas)

- Security Lead: coordina políticas, reviews, comunicación con legal, responsable del playbook.
- CTO / Tech Lead: ejecución técnica (patches, rotación keys, infra).
- Data Protection Officer (DPO) / Legal: determina obligaciones regulatorias y notificaciones DSAR/breach.
- DevOps / SRE: hardening infra, backups, restauración, runbooks.
- Product Owner: priorización de mitigaciones que afecten UX/negocio.
- Support / Ops: contacto inicial con usuarios y gestion de tickets.

5. Hardening checklist (rápido, issue-ready)

- Infra
	- Habilitar MFA en todas las cuentas cloud y console.
	- Least privilege IAM roles, revisión mensual de permisos.
	- Network: poner servicios administrativos en private subnets; restringir egress con policies.

- Base de datos
	- Habilitar cifrado at-rest (KMS) y TLS para conexiones.
	- Auditing de queries sensibles y roles de acceso separados (app vs admin).
	- Índices y backups con cifrado; ejecutar restore drills trimestrales.

- Aplicación
	- Validación de inputs server-side, escape output, uso de prepared statements.
	- Protect endpoints con rate-limits y WAF rules para injection/abuse.
	- Seguridad en dependencias: escaneo SCA en CI (dependabot/OSS scan).

- CI/CD
	- Firmado de artefactos, secrets en secret manager (no env vars planas).
	- Pipeline linting/SAST y gates para merge (no permitir merge si SAST crítico falla).

- Secrets
	- Uso de Secret Manager (Vault/GCP Secrets/AWS Secrets) y rotación periódica.

- Desktop / Admin
	- Access logs habilitados para panel admin; alertas en accesos inusuales.

Checklist práctico: crear issues por cada item de hardening con prioridad y dueño.

6. Pentest / pruebas (to-do)

- Objetivo: validar seguridad técnica y lógica de negocio antes de lanzamiento y periódicamente.
- Alcance recomendado:
	- Endpoints públicos: `/api/v1/*`, web UI, autenticación, lead submission.
	- Admin interfaces y APIs protegidas.
	- Infra: configuración de cloud, IAM, network.
	- Dependencias y supply-chain (SCA).

- Checklist de pruebas (issue-ready):
	- OWASP Top10 (injection, auth, XSS, CSRF, insecure deserial).
	- Broken access control: pruebas de escalado de privilegios y horizontal/vertical access.
	- Business logic abuse: creación masiva de leads, bypass of verification.
	- Rate limiting & abuse tests.
	- SAST/DAST + dependency scan.
	- Infra misconfiguration scan (CSPM), storage buckets, IAM overly permissive.

- Entregables pentest:
	- Reporte técnico con PoC minimales, clasificación CVSS, y lista de findings con prioridad y SLA de remediación.
	- Validación de fixes (re-test) y sign-off por Security Lead.

7. Pruebas de verificación y métricas de cumplimiento

- Métricas de seguridad: número de findings abiertos, tiempo medio de remediación (MTTR), cobertura SCA, resultados SAST/DAST (bloqueantes).
- Calendario recomendado: pentest pre-lanzamiento; escaneo SCA en CI cada push; revisión trimestral de políticas y ejercicios de restore.

8. Tareas inmediatas (to-do, issue-ready)

- SECURITY-001: Implementar KMS encryption para columnas PII — Dueño: DevOps — Est: 2d
- SECURITY-002: Habilitar SCA y SAST en pipeline — Dueño: Dev — Est: 1d
- SECURITY-003: Endpoint `/api/v1/leads` rate-limit + WAF rule — Dueño: Dev — Est: 1d
- SECURITY-004: Crear runbook de Breach Response y contacto de emergencia — Dueño: Security Lead — Est: 1d
- SECURITY-005: Programar pentest externo pre-lanzamiento — Dueño: Security Lead — Est: coordinar proveedores

Notas finales

Este documento cubre el alcance inicial para MVP. Se recomienda convertir los items del hardening y pentest en issues con prioridad y dueño antes de la fase de lanzamiento. Si quieres, puedo generar el CSV de issues o crear los issues en GitHub (necesitaré repo y token).

