# @essabu/sdk

[![npm Version](https://img.shields.io/npm/v/@essabu/sdk?style=flat-square)](https://www.npmjs.com/package/@essabu/sdk)
[![Node.js](https://img.shields.io/node/v/@essabu/sdk?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/essabu/essabu-node/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/essabu/essabu-node/actions)

The official Node.js/TypeScript SDK for the [Essabu](https://essabu.com) platform -- a unified SaaS solution for billing, accounting, HR, CRM, payments, project management, asset tracking, and electronic invoicing. Built with TypeScript for full type safety, **zero runtime dependencies**, and a consistent async/await API across all eight platform modules.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [TypeScript Support](#typescript-support)
- [Modules](#modules)
  - [HR](#hr)
  - [Accounting](#accounting)
  - [Identity](#identity)
  - [Trade](#trade)
  - [Payment](#payment)
  - [E-Invoice](#e-invoice)
  - [Project](#project)
  - [Asset](#asset)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Webhooks](#webhooks)
- [Zero Dependencies](#zero-dependencies)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
# npm
npm install @essabu/sdk

# yarn
yarn add @essabu/sdk

# pnpm
pnpm add @essabu/sdk
```

**Requirements:** Node.js 18+ | TypeScript 5.3+ (optional) | Zero runtime dependencies

---

## Quick Start

```typescript
import Essabu from '@essabu/sdk';

const essabu = new Essabu({
  apiKey: 'esa_live_your_api_key',
  tenantId: 'your-tenant-id',
});

// HR -- Create an employee
const employee = await essabu.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean@company.com',
  departmentId: 'dept-001',
});

// Trade -- Create an invoice
const invoice = await essabu.trade.invoices.create({
  customerId: 'cust-001',
  lines: [{ description: 'Consulting', quantity: 10, unitPrice: 150 }],
  currency: 'USD',
});

// Accounting -- Generate a balance sheet
const report = await essabu.accounting.reports.balanceSheet('2026-12-31');

// Identity -- List users
const { data: users, meta } = await essabu.identity.users.list({ pageSize: 20 });

// Payment -- Process a payment
const payment = await essabu.payment.payments.create({
  amount: 5000,
  currency: 'USD',
  method: 'mobile_money',
});

// E-Invoice -- Create an e-invoice
const einvoice = await essabu.einvoice.einvoices.create({
  invoiceId: 'inv-uuid',
  customerTin: '123456789',
  customerName: 'ACME Corp',
  items: [{ description: 'Service', quantity: 1, unitPrice: 500, taxRate: 16 }],
});

// Project -- Create a project and task
const project = await essabu.project.projects.create({
  name: 'Website Redesign',
  startDate: '2026-04-01',
  endDate: '2026-09-30',
});
const task = await essabu.project.tasks.create({
  projectId: project.id,
  title: 'Design mockups',
  priority: 'high',
});

// Asset -- Register a fixed asset
const asset = await essabu.asset.assets.create({
  name: 'Dell PowerEdge R750',
  categoryId: 'cat-it',
  purchasePrice: 8500,
  currency: 'USD',
  depreciationMethod: 'straight_line',
});
```

---

## Configuration

```typescript
const essabu = new Essabu({
  apiKey: 'esa_live_xxx',            // Required
  tenantId: 'your-tenant-id',       // Required
  baseUrl: 'https://api.essabu.com', // Optional (default)
  timeout: 30000,                     // Optional (ms, default: 30000)
  maxRetries: 3,                      // Optional (default: 3)
  apiVersion: '2024-01-01',          // Optional (default: '2024-01-01')
  headers: {                          // Optional custom headers
    'X-Custom-Header': 'value',
  },
});
```

### Environment Variables

```typescript
import Essabu from '@essabu/sdk';

const essabu = new Essabu({
  apiKey: process.env.ESSABU_API_KEY!,
  tenantId: process.env.ESSABU_TENANT_ID!,
  baseUrl: process.env.ESSABU_BASE_URL,
});
```

### Configuration Reference

| Parameter    | Default                  | Description                    |
|--------------|--------------------------|--------------------------------|
| `apiKey`     | --                       | API key (required)             |
| `tenantId`   | --                       | Tenant ID (required)           |
| `baseUrl`    | `https://api.essabu.com` | API base URL                   |
| `timeout`    | `30000`                  | Request timeout (ms)           |
| `maxRetries` | `3`                      | Max retry attempts             |
| `apiVersion` | `2024-01-01`             | API version header             |
| `headers`    | `{}`                     | Custom headers for all requests|

---

## TypeScript Support

The SDK is written in TypeScript and ships with full type definitions. All models, request parameters, and responses are typed:

```typescript
import Essabu from '@essabu/sdk';
import type { Employee } from '@essabu/sdk/hr/models';
import type { PageResponse, PageMeta } from '@essabu/sdk/common/models';

const essabu = new Essabu({ apiKey: '...', tenantId: '...' });

// Fully typed responses
const result: PageResponse<Employee> = await essabu.hr.employees.list();
const emp: Employee = await essabu.hr.employees.retrieve('emp-uuid');

// Type-safe creation
const newEmp = await essabu.hr.employees.create({
  firstName: 'Jean',       // string (required)
  lastName: 'Mukendi',     // string (required)
  email: 'jean@co.com',   // string (required)
  departmentId: 'dept-1', // string (optional)
});
```

Works out of the box with both ESM (`import`) and CommonJS (`require`).

---

## Modules

All modules are accessed via dot notation. They are lazy-loaded -- only initialized when first accessed.

### HR

Employees, departments, contracts, payroll, attendance, and leaves.

```typescript
// Employee lifecycle
const emp = await essabu.hr.employees.create({ firstName: 'Jean', lastName: 'Dupont', email: 'jean@co.com' });
await essabu.hr.employees.activate(emp.id);
await essabu.hr.employees.terminate(emp.id, '2026-12-31', 'Resignation');

// Payroll
const run = await essabu.hr.payroll.create({ period: '2026-03', departmentId: 'dept-uuid' });
await essabu.hr.payroll.process(run.id);
await essabu.hr.payroll.approve(run.id);
const slips = await essabu.hr.payroll.listSlips(run.id);

// Leaves
const leave = await essabu.hr.leaves.create({ employeeId: 'emp-uuid', type: 'annual', startDate: '2026-04-01', endDate: '2026-04-05' });
await essabu.hr.leaves.approve(leave.id);

// Attendance
await essabu.hr.attendance.checkIn('emp-uuid');
await essabu.hr.attendance.checkOut('emp-uuid');

// Contracts
const contract = await essabu.hr.contracts.create({ employeeId: 'emp-uuid', type: 'permanent', startDate: '2026-01-01', salary: 60000 });
await essabu.hr.contracts.sign(contract.id);
```

> **Full reference:** [HR Module Wiki](https://github.com/essabu/essabu-node/wiki/HR-Module)

### Accounting

Accounts, journal entries, fiscal years, taxes, and financial reports.

```typescript
// Chart of accounts
const account = await essabu.accounting.accounts.create({ code: '4010', name: 'Sales', type: 'revenue' });

// Journal entries
const entry = await essabu.accounting.journalEntries.create({
  date: '2026-03-26', reference: 'JV-001',
  lines: [{ accountId: 'acc-1', debit: 1000, credit: 0 }, { accountId: 'acc-2', debit: 0, credit: 1000 }],
});

// Financial reports
const bs = await essabu.accounting.reports.balanceSheet('2026-03-31');
const pnl = await essabu.accounting.reports.incomeStatement('2026-01-01', '2026-03-31');
```

> **Full reference:** [Accounting Module Wiki](https://github.com/essabu/essabu-node/wiki/Accounting-Module)

### Identity

Auth, users, roles, and tenants.

```typescript
const tokens = await essabu.identity.auth.login({ email: 'admin@co.com', password: 'secret' });
const me = await essabu.identity.auth.me();
const user = await essabu.identity.users.create({ email: 'new@co.com', firstName: 'Alice', lastName: 'Martin' });
const role = await essabu.identity.roles.create({ name: 'Accountant', permissions: ['accounting.read'] });
```

> **Full reference:** [Identity Module Wiki](https://github.com/essabu/essabu-node/wiki/Identity-Module)

### Trade

Customers, suppliers, invoices, purchase orders, products, and quotations.

```typescript
const customer = await essabu.trade.customers.create({ name: 'ACME Corp', email: 'contact@acme.com' });
const invoice = await essabu.trade.invoices.create({
  customerId: customer.id,
  lines: [{ description: 'Consulting', quantity: 10, unitPrice: 150 }],
});
const po = await essabu.trade.purchaseOrders.create({
  supplierId: 'sup-uuid',
  lines: [{ productId: 'prod-uuid', quantity: 100, unitPrice: 15 }],
});
```

> **Full reference:** [Trade Module Wiki](https://github.com/essabu/essabu-node/wiki/Trade-Module)

### Payment

Payments, bank accounts, and transactions.

```typescript
const payment = await essabu.payment.payments.create({ amount: 5000, currency: 'USD', method: 'mobile_money' });
const { data: transactions } = await essabu.payment.transactions.list({ pageSize: 50 });
const account = await essabu.payment.bankAccounts.create({ name: 'Main Account', bankName: 'Trust Bank', accountNumber: '123456789' });
```

> **Full reference:** [Payment Module Wiki](https://github.com/essabu/essabu-node/wiki/Payment-Module)

### E-Invoice

Electronic invoicing.

```typescript
const einvoice = await essabu.einvoice.einvoices.create({
  invoiceId: 'inv-uuid', customerTin: '123456789', customerName: 'ACME',
  items: [{ description: 'Service', quantity: 1, unitPrice: 500, taxRate: 16 }],
});
```

> **Full reference:** [E-Invoice Module Wiki](https://github.com/essabu/essabu-node/wiki/EInvoice-Module)

### Project

Projects, tasks, and timesheets.

```typescript
const project = await essabu.project.projects.create({ name: 'Website Redesign', startDate: '2026-04-01', endDate: '2026-09-30' });
const task = await essabu.project.tasks.create({ projectId: project.id, title: 'Design', priority: 'high' });
const entry = await essabu.project.timesheets.create({ taskId: task.id, userId: 'user-uuid', date: '2026-04-01', hours: 8 });
```

> **Full reference:** [Project Module Wiki](https://github.com/essabu/essabu-node/wiki/Project-Module)

### Asset

Assets, categories, and depreciations.

```typescript
const category = await essabu.asset.categories.create({ name: 'IT Equipment', depreciationMethod: 'straight_line', usefulLifeMonths: 60 });
const asset = await essabu.asset.assets.create({ name: 'Server', categoryId: category.id, purchasePrice: 8500, currency: 'USD' });
const dep = await essabu.asset.depreciations.create({ assetId: asset.id, period: '2026-03', amount: 141.67 });
```

> **Full reference:** [Asset Module Wiki](https://github.com/essabu/essabu-node/wiki/Asset-Module)

---

## Pagination

All `list()` methods support pagination, sorting, searching, and filtering.

```typescript
const { data, meta } = await essabu.trade.customers.list({
  page: 2,
  pageSize: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  search: 'acme',
  filters: { status: 'active' },
});

console.log(`Page ${meta.currentPage}/${meta.totalPages}`);
console.log(`Total: ${meta.totalItems}`);
console.log(`Has next: ${meta.hasNextPage}`);
```

### Iterating All Pages

```typescript
let page = 1;
let hasMore = true;

while (hasMore) {
  const { data, meta } = await essabu.hr.employees.list({ page, pageSize: 100 });
  for (const emp of data) {
    console.log(emp.email);
  }
  hasMore = meta.hasNextPage;
  page++;
}
```

### PageMeta Properties

| Property          | Type      | Description                   |
|-------------------|-----------|-------------------------------|
| `currentPage`     | `number`  | Current page number           |
| `pageSize`        | `number`  | Items per page                |
| `totalItems`      | `number`  | Total number of items         |
| `totalPages`      | `number`  | Total number of pages         |
| `hasNextPage`     | `boolean` | Whether a next page exists    |
| `hasPreviousPage` | `boolean` | Whether a previous page exists|

---

## Error Handling

The SDK provides a typed exception hierarchy. All errors extend `EssabuError`.

```typescript
import Essabu, {
  EssabuError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  TimeoutError,
  NetworkError,
} from '@essabu/sdk';

try {
  await essabu.hr.employees.retrieve('nonexistent-id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`Not found: ${error.message}`);
  } else if (error instanceof ValidationError) {
    for (const v of error.violations) {
      console.log(`${v.field}: ${v.message}`);
    }
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof RateLimitError) {
    console.log(`Retry after ${error.retryAfter}s`);
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
  } else if (error instanceof NetworkError) {
    console.log('Network connectivity issue');
  } else if (error instanceof EssabuError) {
    console.log(`API error ${error.statusCode}: ${error.message}`);
    console.log(`Request ID: ${error.requestId}`);
  }
}
```

### Exception Hierarchy

| Exception             | Status | Description                |
|-----------------------|--------|----------------------------|
| `EssabuError`         | any    | Base error class           |
| `AuthenticationError` | 401    | Invalid API key / token    |
| `ForbiddenError`      | 403    | Insufficient permissions   |
| `NotFoundError`       | 404    | Resource not found         |
| `ConflictError`       | 409    | Resource conflict          |
| `ValidationError`     | 422    | Request validation failed  |
| `RateLimitError`      | 429    | Rate limit exceeded        |
| `ServerError`         | 5xx    | Server-side error          |
| `TimeoutError`        | 408    | Request timed out          |
| `NetworkError`        | 0      | Network connectivity error |

---

## Webhooks

Essabu sends webhook events signed with HMAC-SHA256. Verify the `X-Essabu-Signature` header before processing.

```typescript
import express from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';

const app = express();
const WEBHOOK_SECRET = 'whsec_your_webhook_secret';

app.post('/webhooks/essabu', express.raw({ type: 'application/json' }), (req, res) => {
  const payload = req.body.toString();
  const signature = req.headers['x-essabu-signature'] as string;
  const expected = `sha256=${createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('hex')}`;

  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);

  switch (event.type) {
    case 'invoice.created':
      console.log(`New invoice: ${event.data.id}`);
      break;
    case 'payment.succeeded':
      console.log(`Payment: ${event.data.amount}`);
      break;
    default:
      console.log(`Unhandled: ${event.type}`);
  }

  res.json({ received: true });
});
```

> **Full reference:** [Webhooks Wiki](https://github.com/essabu/essabu-node/wiki/Webhooks)

---

## Zero Dependencies

The `@essabu/sdk` package has **zero runtime dependencies**. It uses the built-in Node.js `fetch` API (available since Node 18) for HTTP requests, `crypto` for signature verification, and ships its own lightweight HTTP client. This means:

- No dependency conflicts
- Minimal `node_modules` footprint
- No supply-chain risk from transitive dependencies
- Works in any Node.js 18+ environment without additional setup

---

## Examples

Complete examples are in the [`examples/`](examples/) directory.

| Example | Description | Module |
|---------|-------------|--------|
| [`01-getting-started.ts`](examples/01-getting-started.ts) | Basic setup and first API calls | General |
| [`02-hr-employees.ts`](examples/02-hr-employees.ts) | Employee management and lifecycle | HR |
| [`03-trade-invoices.ts`](examples/03-trade-invoices.ts) | Invoice creation and listing | Trade |
| [`04-accounting-journal.ts`](examples/04-accounting-journal.ts) | Journal entry creation | Accounting |
| [`05-identity-auth.ts`](examples/05-identity-auth.ts) | Authentication flow | Identity |
| [`06-payment-banking.ts`](examples/06-payment-banking.ts) | Payment and banking operations | Payment |
| [`07-project-management.ts`](examples/07-project-management.ts) | Project and task management | Project |
| [`08-error-handling.ts`](examples/08-error-handling.ts) | Error handling patterns | General |

```bash
# Run an example
export ESSABU_API_KEY=esa_test_xxx
export ESSABU_TENANT_ID=your-tenant-id
npx tsx examples/01-getting-started.ts
```

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Ensure type checks pass (`npm run typecheck`)
6. Ensure linting passes (`npm run lint`)
7. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
8. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/essabu/essabu-node.git
cd essabu-node

# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build
npm run build
```

---

## License

This project is licensed under the MIT License -- see the [LICENSE](LICENSE) file for details.

---

**[Wiki](https://github.com/essabu/essabu-node/wiki)** | **[API Docs](https://docs.essabu.com/sdk/node)** | **[Changelog](CHANGELOG.md)** | **[Issues](https://github.com/essabu/essabu-node/issues)**
