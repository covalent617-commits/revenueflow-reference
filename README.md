# RevenueFlow V2.0 — Full Product Reference

This repository contains the complete V2.0 product reference experience and master blueprint. It is a design and interaction prototype, not a production RevenueFlow deployment.

## Preview

Published reference site: https://covalent617-commits.github.io/revenueflow-reference/

This additive refinement is being prepared on **`refinement-identity-roles-charts`**. The active V1 application repository and its Cline refinement programme are separate and are not modified by this work.

## Product coverage

The reference maps the complete approved product direction across eight divisions:

1. Identity, Organisation and Access.
2. Lead, Sales and Customer Operations.
3. Project and Service Delivery.
4. Financial Operations.
5. Customer Success and Growth.
6. Automation and Integration.
7. Document and Data Management.
8. Unified Business Intelligence.

### Navigation and workspaces

- **Home:** Dashboard; Attention Queue; CFO Dashboard; Executive Business Command Centre.
- **CRM / Commercial:** Leads; Opportunities; Customers & Contacts; Quotes & Proposals; Products & Services; Contracts; Approval Centre.
- **Intelligence:** Leak Radar; Forecast; Analytics.
- **Delivery / Collaboration:** Projects & Delivery; Resource Capacity; Customer Success & Renewals; Tasks & Milestones; Customer Support; Mutual Action Plans; Customer Portal.
- **Finance:** Invoices & Receivables; Expenses & Costs; Commissions.
- **Execution / Platform:** Email & Communications; Meeting Scheduling; Automation & Workflows; Documents & Data; Records; Import Centre; Integrations & API.
- **Administration:** Team Performance; Activity & Audit; Settings; Notifications.

Competitor Intelligence and Lead Intelligence are specialised Sales Intelligence views within Leak Radar, not additional primary Leak Radar tabs or duplicate signal systems.

## Identity and access model

- A **user account** represents an individual person.
- An **organisation** represents a business workspace and never has an employee role.
- A **membership** connects one individual to one organisation and carries that person's role and data-access scope.
- One person may have different roles in different organisations.
- The organisation owner or an authorised administrator invites people and assigns membership roles. Members cannot choose or elevate their own roles.
- Role management, invitations, custom roles, permission scopes and audit history live in Settings.
- The top-bar persona selector is explicitly a **demo-only preview control**, not a real permission or membership editor.

## Visual identity and chart language

The interface preserves deep navy and layered blue surfaces while restoring a controlled semantic palette:

- Green / teal: positive performance, success, collections and improvement.
- Amber / orange: warning, attention and pending action.
- Red / coral: critical risk, loss, overdue and negative outcomes.
- Blue / cyan: information, active selection and analytical series.
- Purple: secondary analytical categories and specialised intelligence.

Leak Radar restores its circular risk-distribution visual. It represents active case counts by severity (critical, high and medium), not a composite score. The three primary tabs remain exactly Sales Intelligence, Customer Intelligence and Process Intelligence.

Charts use differentiated series, visible points, date labels, units, legends, hover/focus tooltips and actual-versus-forecast distinctions. The reference includes line, funnel, donut and ranked/progress visualisations. All values remain illustrative.

## Flagship experiences

- **CFO Dashboard:** complete founder-review preview, not hidden behind a demo role restriction. It covers booked revenue, cash collected, receivables, expenses, margins, forecast, project costs, commissions, customer financial health, renewals and defensible exposure. KPI cards drill into relevant reference workspaces. Production financial permissions remain mandatory.
- **Revenue Recovery Simulator:** full experience in Analytics, with a CFO shortcut, assumptions, live hypothetical output, baseline comparison, reset and locally saved scenarios. It never edits live records or labels hypothetical recovery as collected revenue.
- **Dashboard personalisation:** role-aware widgets can be rearranged by drag and drop in the reference session. Production layouts must be saved per user and filtered by membership permissions.
- **Customer portal:** branded customer dashboard with resource-specific access to quotes, documents, MAPs, projects, milestones and interactions. Internal CRM and private notes are excluded.
- **Email execution:** contextual right-side compose drawer, preview, draft and explicit send-confirmation flow.
- **Scheduling:** individual and team booking-page previews, calendar/time-zone and double-booking design considerations.
- **AI assistant:** persistent contextual panel with desktop drag/resize/minimise and mobile bottom-sheet presentation. Consequential actions require confirmation.
- **Connected lifecycle:** Lead → Opportunity → Quote/Proposal → Approval → Acceptance/Signature → Onboarding → Project Delivery → Invoice → Payment → Customer Success → Renewal.

## Prototype behaviour and limitations

Implemented reference interactions include navigation, demo persona preview, organisation switching, Settings membership/invitation/role assignment demonstrations, custom role creation preview, search, record details, basic create flows, Leak Radar tab switching, analytics reports, chart tooltips, forecast view, draggable dashboard widgets, simulator controls, saved demo scenarios, email draft/preview/confirmation, portal-link preview and AI assistant interactions.

**Browser verification and screenshots:** Chromium smoke tests passed for the core journeys. The run captured nine screenshots (Dashboard, CFO, Leak Radar, Analytics, Forecast, Settings, NGN CFO, reordered Dashboard and mobile Dashboard). [Open the browser test run and download its screenshot artifact](https://github.com/covalent617-commits/revenueflow-reference/actions/runs/41680693852). The artifact is retained for 14 days.

All business data is illustrative. Local demo changes are held in the browser session only. No production database, payment rail, email provider, calendar, e-signature provider, file storage, authentication service, AI model, or organisation permission service is connected. Provider actions are previews and do not perform external actions.

The reference distinguishes the complete product vision from production implementation. Backend enforcement, tenant isolation, provider integrations, auditability, data retention, document security, legal validation and operational reliability remain implementation requirements.

## Documentation

- [Master V2.0 reference blueprint](docs/V2.0-REFERENCE-BLUEPRINT.md)
- [Reference refinement report](docs/REFERENCE-REFINEMENT-REPORT.md)

