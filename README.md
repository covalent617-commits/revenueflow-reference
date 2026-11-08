# RevenueFlow V2.0 — Full Product Reference

This repository contains the complete V2.0 product reference experience and master blueprint. It is a design and interaction prototype, not a production RevenueFlow deployment.

## Preview

Published reference site: https://covalent617-commits.github.io/revenueflow-reference/

This additive refinement was merged into `main` on 3 November 2026 through [PR #2](https://github.com/covalent617-commits/revenueflow-reference/pull/2), with browser verification and screenshot automation merged through [PR #3](https://github.com/covalent617-commits/revenueflow-reference/pull/3). The active V1 application repository and its Cline refinement programme are separate and were not modified.

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
- The signed-in profile and workspace switcher show each accepted membership role as read-only context. There is no self-service role selector; role administration belongs in Settings and is shown only for Owner/Admin demo memberships.

## Visual identity and chart language

The interface preserves deep navy and layered blue surfaces while restoring a controlled semantic palette:

- Green / teal: positive performance, success, collections and improvement.
- Amber / orange: warning, attention and pending action.
- Red / coral: critical risk, loss, overdue and negative outcomes.
- Blue / cyan: information, active selection and analytical series.
- Purple: secondary analytical categories and specialised intelligence.

Leak Radar restores its circular risk-distribution visual. It represents active case counts by severity (critical, high and medium), not a composite score. The three primary tabs remain exactly Sales Intelligence, Customer Intelligence and Process Intelligence.

Charts use differentiated series, visible points, date labels, units, legends, hover/focus tooltips and actual-versus-forecast distinctions. The reference includes line, bar, grouped bar, stacked bar, area, stacked area, scatter and accessible table presentations where the source dataset supports them. Won is teal and Lost is coral. Every visualisation keeps its measure, series, unit and reporting period clear. All values remain illustrative.

## Flagship experiences

- **CFO Dashboard:** complete founder-review preview, not hidden behind a demo role restriction. It covers booked revenue, cash collected, receivables, expenses, margins, forecast, project costs, commissions, customer financial health, renewals and defensible exposure. KPI cards drill into relevant reference workspaces. Production financial permissions remain mandatory.
- **Revenue Recovery Simulator:** full experience in Analytics, with a CFO shortcut, assumptions, live hypothetical output, baseline comparison, reset and locally saved scenarios. It never edits live records or labels hypothetical recovery as collected revenue.
- **Dashboard personalisation:** role-aware widgets can be rearranged by drag and drop in the reference session. Production layouts must be saved per user and filtered by membership permissions.
- **Customer portal:** branded customer dashboard with resource-specific access to quotes, documents, MAPs, projects, milestones and interactions. Internal CRM and private notes are excluded.
- **Email execution:** contextual right-side compose drawer, preview, draft and explicit send-confirmation flow.
- **Scheduling:** individual and team booking-page previews, calendar/time-zone and double-booking design considerations.
- **AI assistant:** persistent contextual panel with desktop drag/resize/minimise and mobile bottom-sheet presentation. Consequential actions require confirmation.
- **Account Command Centre:** membership-scoped workspace overview, account notifications and a cross-workspace search preview that identifies the source workspace.
- **Plans & Usage:** four draft tiers, three-seat minimum, 30-day trial and explicitly unapproved pricing; no permanent free plan or silent overage.
- **Workflow Studio:** one governed engine preview with triggers, conditions, approval, idempotency, bounded retries and execution history.
- **Document Intelligence:** source-linked extraction fields, confidence, human corrections and verification boundaries.
- **Operational workspaces:** record detail, related-workspace links, session-only record creation and CSV export for tabular preview workspaces.
- **Connected lifecycle:** Lead → Opportunity → Quote/Proposal → Approval → Acceptance/Signature → Onboarding → Project Delivery → Invoice → Payment → Customer Success → Renewal.

## Prototype behaviour and limitations

Implemented reference interactions include navigation, membership-aware organisation switching, Settings invitation/role assignment demonstrations, custom role creation preview, global and account-level search, record details, session-only create flows, related-workspace navigation, CSV export, Leak Radar tab switching, report-specific Analytics, chart presentation controls, chart expansion, chart tooltips, forecast view, draggable dashboard widgets, simulator controls, saved demo scenarios, email draft/preview/confirmation, portal-link preview, workflow and document verification previews, and AI assistant interactions.

**Browser verification and screenshots:** The current acceptance suite covers organisation memberships and record scoping, AI context, CFO, Leak Radar, all 12 Analytics reports, forecast chart controls, NGN display, Settings, dashboard rearrangement, account search, plans, workflow and document previews, import dry-run, integration scopes, workspace record creation/detail/CSV export and mobile rendering. The latest run is being verified; do not treat source validation or successful deployment as a substitute for a passing browser run.

All business data is illustrative. Local demo changes are held in the browser session only. No production database, payment rail, email provider, calendar, e-signature provider, file storage, authentication service, AI model, or organisation permission service is connected. Provider actions are previews and do not perform external actions.

The reference distinguishes the complete product vision from production implementation. Backend enforcement, tenant isolation, provider integrations, auditability, data retention, document security, legal validation and operational reliability remain implementation requirements.

## Documentation

- [Master V2.0 reference blueprint](docs/V2.0-REFERENCE-BLUEPRINT.md)
- [Reference refinement report](docs/REFERENCE-REFINEMENT-REPORT.md)

