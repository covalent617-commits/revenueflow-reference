# RevenueFlow V2.0 — Full Product Reference

This branch contains the full V2.0 reference-site experience and product blueprint. It is a design and interaction prototype, not a production RevenueFlow deployment.

## Preview

Once the branch is published through GitHub Pages, use the project site URL:
https://covalent617-commits.github.io/revenueflow-reference/

The reference branch is **v2.0-full-reference**. The existing `main` branch has not been replaced.

## What the reference covers

The interface maps the complete approved V2.0 product direction across all eight divisions:

1. Identity, organisation and access.
2. Lead, sales and customer operations.
3. Project and service delivery.
4. Financial operations.
5. Customer success and growth.
6. Automation and integration.
7. Document and data management.
8. Unified business intelligence.

The navigation includes role-aware Dashboard, CFO Dashboard, Executive Business Command Centre, Leads, Opportunities, Customers & Contacts, Quotes & Proposals, Products & Services, Contracts, Approval Centre, Competitor Workspace, Leak Radar, Analytics & Forecast, Projects & Delivery, Resource Capacity, Customer Success & Renewals, Tasks & Milestones, Customer Support, Mutual Action Plans, Customer Portal, Invoices & Receivables, Expenses & Costs, Commissions, Email & Communications, Meeting Scheduling, Automation & Workflows, Documents & Data, Import Centre, Integrations & API, People & Access, Audit & Activity, Settings and Notifications.

## Flagship experiences

- **Leak Radar:** exactly three primary tabs — Sales Intelligence, Customer Intelligence and Process Intelligence. Lead and Competitor Intelligence are specialised Sales Intelligence views.
- **CFO Dashboard:** revenue, cash, receivables, expenses, margins, forecast, project costs, commissions, customer financial health, renewals and exposure, with metric definitions.
- **Revenue Recovery Simulator:** interactive assumptions, live scenario output, baseline comparison, reset and locally saved scenarios. It never edits live business data or calls a hypothetical result collected revenue.
- **Customer portal:** branded customer dashboard with resource-specific access to quotes, documents, MAPs, projects, milestones and interactions. Internal CRM and private notes are excluded.
- **Email execution:** contextual right-side compose drawer, preview, draft and explicit send-confirmation flow.
- **Scheduling:** individual and team booking page previews, calendar/time-zone and double-booking design considerations.
- **AI assistant:** persistent contextual panel with desktop drag/resize/minimise and mobile bottom-sheet presentation. Consequential actions require confirmation.
- **Connected lifecycle:** Lead → Opportunity → Quote/Proposal → Approval → Acceptance/Signature → Onboarding → Project Delivery → Invoice → Payment → Customer Success → Renewal.

## Prototype behaviour and limitations

The prototype includes interactive navigation, role preview, organisation switching, search, record details, basic create flows, Leak Radar tab switching, analytics reports, simulator controls, saved demo scenarios, email draft/preview/confirmation, portal-link preview and AI assistant interactions.

All business data is illustrative. Changes are local to the browser session. No production database, payment rail, email provider, calendar, e-signature provider, file storage, authentication service, AI model, or organisation permission service is connected. Controls that imply external execution are preview flows and do not perform external actions.

The reference distinguishes the complete product vision from production implementation. Backend enforcement, tenant isolation, provider integrations, auditability, data retention, document security, legal validation and operational reliability remain implementation requirements.

## Architecture and product rules

See [docs/V2.0-REFERENCE-BLUEPRINT.md](docs/V2.0-REFERENCE-BLUEPRINT.md) for the consolidated screen map, architecture boundaries, shared services, permissions, lifecycle and acceptance principles.

## Branch safety

This work is isolated on `v2.0-full-reference`. It is not a change to the active RevenueFlow application repository and does not interrupt the active V1 refinement programme.
