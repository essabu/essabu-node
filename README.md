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

Install the SDK using your preferred package manager. The package has zero runtime dependencies and requires Node.js 18 or later. TypeScript 5.3+ is recommended but optional -- the SDK ships compiled JavaScript alongside type definitions.

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

Initialize the SDK client with your API key and tenant ID, then call any module through dot notation. Each module method returns a typed Promise that resolves to the created or fetched resource. The example below demonstrates creating an employee, an invoice, generating a balance sheet, listing users, processing a payment, creating an e-invoice, setting up a project with a task, and registering a fixed asset.

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

Create an Essabu client instance by passing a configuration object. The `apiKey` and `tenantId` fields are required. All other options have sensible defaults -- you can override the base URL, request timeout, retry count, API version, and inject custom headers that will be sent with every request.

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

You can load configuration values from environment variables instead of hardcoding them. This is the recommended approach for production deployments. The non-null assertion operator (`!`) tells TypeScript the value will be defined at runtime.

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

Import the SDK along with the specific model and pagination types you need. The generic `PageResponse<T>` wrapper provides typed access to both the data array and pagination metadata. All create and update methods enforce required fields at compile time, so missing parameters are caught before runtime.

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

Manage the full employee lifecycle from creation through activation and termination. Run payroll for a given period and department, then process and approve the run to generate pay slips. Create leave requests and approve them, and track daily attendance with check-in and check-out. Create, sign, and renew employment contracts.

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

Create accounts in the chart of accounts, then record double-entry journal entries with balanced debit and credit lines. Generate financial reports -- balance sheet as of a specific date, income statement for a date range, and trial balance -- to get a snapshot of the organization's financial position.

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

Authenticate users with email and password to receive access and refresh tokens. Create new user accounts, define roles with granular permissions, and manage the current tenant. The `me()` method returns the currently authenticated user's profile.

```typescript
const tokens = await essabu.identity.auth.login({ email: 'admin@co.com', password: 'secret' });
const me = await essabu.identity.auth.me();
const user = await essabu.identity.users.create({ email: 'new@co.com', firstName: 'Alice', lastName: 'Martin' });
const role = await essabu.identity.roles.create({ name: 'Accountant', permissions: ['accounting.read'] });
```

> **Full reference:** [Identity Module Wiki](https://github.com/essabu/essabu-node/wiki/Identity-Module)

### Trade

Customers, suppliers, invoices, purchase orders, products, and quotations.

Create customers and suppliers, then build invoices and purchase orders with line items. Invoices follow a lifecycle: create, issue, send by email, and mark as paid. Purchase orders can be approved and received. Quotations can be accepted, rejected, or converted directly into invoices.

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

Record incoming and outgoing payments with a specified amount, currency, and method. List recent transactions with pagination, and register bank accounts for reconciliation. Payments can be processed, cancelled, or refunded after creation.

```typescript
const payment = await essabu.payment.payments.create({ amount: 5000, currency: 'USD', method: 'mobile_money' });
const { data: transactions } = await essabu.payment.transactions.list({ pageSize: 50 });
const account = await essabu.payment.bankAccounts.create({ name: 'Main Account', bankName: 'Trust Bank', accountNumber: '123456789' });
```

> **Full reference:** [Payment Module Wiki](https://github.com/essabu/essabu-node/wiki/Payment-Module)

### E-Invoice

Electronic invoicing.

Create an electronic invoice by linking it to an existing trade invoice, providing the customer's TIN, name, and itemized lines with tax rates. The e-invoice can then be validated and submitted to the tax authority. Returns the created EInvoice object with its assigned status and unique identifier.

```typescript
const einvoice = await essabu.einvoice.einvoices.create({
  invoiceId: 'inv-uuid', customerTin: '123456789', customerName: 'ACME',
  items: [{ description: 'Service', quantity: 1, unitPrice: 500, taxRate: 16 }],
});
```

> **Full reference:** [E-Invoice Module Wiki](https://github.com/essabu/essabu-node/wiki/EInvoice-Module)

### Project

Projects, tasks, and timesheets.

Create a project with a name, start date, and end date, then add tasks with a title and priority level. Log time entries against tasks for a specific user and date. Projects support member management, archiving, and task workflow actions like completion and reassignment.

```typescript
const project = await essabu.project.projects.create({ name: 'Website Redesign', startDate: '2026-04-01', endDate: '2026-09-30' });
const task = await essabu.project.tasks.create({ projectId: project.id, title: 'Design', priority: 'high' });
const entry = await essabu.project.timesheets.create({ taskId: task.id, userId: 'user-uuid', date: '2026-04-01', hours: 8 });
```

> **Full reference:** [Project Module Wiki](https://github.com/essabu/essabu-node/wiki/Project-Module)

### Asset

Assets, categories, and depreciations.

Define asset categories with a depreciation method and useful life, then register individual fixed assets under those categories. Record periodic depreciation entries to track asset value over time. Assets can be activated, updated, and eventually disposed of.

```typescript
const category = await essabu.asset.categories.create({ name: 'IT Equipment', depreciationMethod: 'straight_line', usefulLifeMonths: 60 });
const asset = await essabu.asset.assets.create({ name: 'Server', categoryId: category.id, purchasePrice: 8500, currency: 'USD' });
const dep = await essabu.asset.depreciations.create({ assetId: asset.id, period: '2026-03', amount: 141.67 });
```

> **Full reference:** [Asset Module Wiki](https://github.com/essabu/essabu-node/wiki/Asset-Module)

---

## Pagination

All `list()` methods support pagination, sorting, searching, and filtering.

Retrieve a paginated list of resources by passing page number, page size, sort field, sort order, a search keyword, and optional filters. The response contains a `data` array with the matching items and a `meta` object with pagination metadata including the current page, total pages, total items, and navigation flags.

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

Loop through all pages of a resource by incrementing the page number until `hasNextPage` is false. Each iteration fetches the next batch of results. This pattern is useful for data exports or synchronization tasks where you need to process every record.

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

Import the specific error classes you need to handle. Wrap your SDK calls in a try/catch block and use `instanceof` checks to determine the error type. Each error class exposes relevant properties -- `ValidationError` has a `violations` array, `RateLimitError` has a `retryAfter` value in seconds, and all errors include a `statusCode`, `message`, and optional `requestId` for debugging.

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

Set up an Express endpoint to receive webhook events. Parse the raw request body and compute an HMAC-SHA256 signature using your webhook secret. Compare it against the `X-Essabu-Signature` header using a timing-safe comparison to prevent timing attacks. Once verified, parse the JSON payload and route events by their `type` field to the appropriate handler logic.

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

To run an example, set the required environment variables and execute the file using `tsx`. Each example is self-contained and demonstrates a specific module's functionality. Replace the placeholder values with your actual API key and tenant ID.

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

Clone the repository and install dependencies to get started. The project uses standard npm scripts for testing, type checking, linting, and building. All checks must pass before submitting a pull request.

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
