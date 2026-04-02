# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-26

### Added

- Unified SDK merging all 8 Essabu JS/TS SDKs into a single package
- Stripe-like API: `essabu.hr.employees.create(...)`, `essabu.accounting.invoices.list()`
- **HR module**: employees, departments, positions, contracts, attendance, leaves, shifts, payrolls, expenses, recruitment, performance, onboarding, documents, disciplinary, benefits, loans, timesheets, skills, reports, webhooks, config, history
- **Accounting module**: accounts, balances, invoices, quotes, journals, payments, credit notes, journal entries, payment terms, fiscal years, periods, currencies, tax rates, exchange rates, wallets, reports, inventory, purchase orders, suppliers, stock management, price lists, insurance
- **Identity module**: auth (login, register, 2FA), users, profiles, companies, tenants, roles, permissions, branches, API keys, sessions
- **Trade module**: customers, products, sales orders, deliveries, receipts, suppliers, purchase orders, inventory, stock, warehouses, contacts, opportunities, activities, campaigns, contracts, documents
- **Payment module**: payment intents, payment accounts, transactions, refunds, subscriptions, subscription plans, financial accounts, loan products, loan applications, loan repayments, collaterals, KYC profiles, KYC documents, reports
- **E-Invoice module**: invoice normalization, submissions, verification, compliance, statistics
- **Project module**: projects, milestones, tasks, task comments, resource allocations, reports
- **Asset module**: assets, depreciations, maintenance schedules, maintenance logs, vehicles, fuel logs, trip logs
- Shared HTTP client with retry logic, timeout, and error handling
- Unified exception hierarchy (EssabuError, ValidationError, AuthenticationError, etc.)
- Pagination helpers (firstPage, pageOf, toQueryString)
- TypeScript strict mode with full type definitions
- ESM and CJS dual output
- 5 GitHub Actions workflows (CI, Release, CodeQL, Dependency Review, Docs)
