# @essabu/sdk

[![npm version](https://img.shields.io/npm/v/@essabu/sdk.svg)](https://www.npmjs.com/package/@essabu/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@essabu/sdk.svg)](https://www.npmjs.com/package/@essabu/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official unified JavaScript/TypeScript SDK for the **Essabu** platform. One package, 8 modules, full TypeScript support.

## Installation

```bash
npm install @essabu/sdk
# or
yarn add @essabu/sdk
# or
pnpm add @essabu/sdk
```

## Quick Start

```typescript
import Essabu from '@essabu/sdk';

const essabu = new Essabu({
  apiKey: 'sk_live_...',
  tenantId: 'tenant_...',
});

// Create an employee
const employee = await essabu.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean.mukendi@example.com',
});

// Create an invoice
const invoice = await essabu.accounting.invoices.create({
  customerId: 'cust_acme',
  invoiceDate: '2024-03-15',
  dueDate: '2024-04-15',
  currency: 'USD',
  items: [{ description: 'Consulting', quantity: 10, unitPrice: 150 }],
});

// Process a payment
const payment = await essabu.payment.paymentIntents.create({
  amount: 15000,
  currency: 'USD',
  paymentMethod: 'mobile_money',
});

// Authenticate a user
const tokens = await essabu.identity.auth.login('user@example.com', 'password');
```

## Modules

| Module | Access | Description |
|--------|--------|-------------|
| **HR** | `essabu.hr` | Employees, payroll, leaves, attendance, recruitment, training |
| **Accounting** | `essabu.accounting` | Chart of accounts, invoices, journals, payments, fiscal years |
| **Identity** | `essabu.identity` | Authentication, users, roles, permissions, API keys, sessions |
| **Trade** | `essabu.trade` | CRM contacts, customers, sales orders, inventory, warehousing |
| **Payment** | `essabu.payment` | Payment intents, subscriptions, loans, KYC, financial accounts |
| **E-Invoice** | `essabu.einvoice` | Invoice normalization, government submission, compliance |
| **Project** | `essabu.project` | Projects, tasks, milestones, resource allocation |
| **Asset** | `essabu.asset` | Assets, depreciation, maintenance, fleet management |

Each module is **lazily initialized** on first access -- no overhead for unused modules.

## Configuration

```typescript
const essabu = new Essabu({
  apiKey: 'sk_live_...',           // Required - your API key
  tenantId: 'tenant_...',         // Required - your tenant ID
  baseUrl: 'https://...',         // Optional - custom API URL
  environment: 'sandbox',         // Optional - 'production' | 'sandbox'
  timeout: 30000,                 // Optional - request timeout in ms (default: 30000)
  maxRetries: 3,                  // Optional - retries on 5xx errors (default: 3)
});
```

### Environments

| Environment | Base URL |
|-------------|----------|
| Production (default) | `https://api.essabu.com` |
| Sandbox | `https://sandbox-api.essabu.com` |
| Custom | Any URL via `baseUrl` option |

## Usage Examples

### HR Module

```typescript
// List employees with pagination
const employees = await essabu.hr.employees.list({ page: 1, perPage: 25 });

// Create an employee
const employee = await essabu.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean@example.com',
  departmentId: 'dept_engineering',
});

// Get employee leave balances
const balances = await essabu.hr.employees.getLeaveBalances('emp_123');

// Calculate payroll
await essabu.hr.payrolls.calculate('payroll_march');

// Submit leave request
await essabu.hr.leaves.create({
  employeeId: 'emp_123',
  type: 'annual',
  startDate: '2024-04-01',
  endDate: '2024-04-05',
});
```

### Accounting Module

```typescript
// Create an invoice
const invoice = await essabu.accounting.invoices.create({
  customerId: 'cust_1',
  items: [{ description: 'Service', quantity: 1, unitPrice: 1000 }],
});

// Record a payment
await essabu.accounting.payments.create({
  invoiceId: 'inv_123',
  amount: 1000,
  paymentMethod: 'bank_transfer',
});

// List chart of accounts
const accounts = await essabu.accounting.accounts.list({ page: 1 });

// Journal entries
await essabu.accounting.journalEntries.create({
  journalId: 'jrnl_1',
  entries: [
    { accountId: 'acct_cash', debit: 1000 },
    { accountId: 'acct_revenue', credit: 1000 },
  ],
});
```

### Trade Module (CRM)

```typescript
// Create a contact
const contact = await essabu.trade.contacts.create({
  firstName: 'Marie',
  lastName: 'Kabongo',
  email: 'marie@acme.cd',
  company: 'Acme Corp',
});

// Create an opportunity
const opportunity = await essabu.trade.opportunities.create({
  name: 'Acme Corp - ERP Deal',
  contactId: contact.id,
  value: 75000,
  stage: 'qualification',
});

// Close the deal
await essabu.trade.opportunities.update('opp_123', {
  stage: 'closed_won',
});

// Create a sales order
await essabu.trade.salesOrders.create({
  customerId: 'cust_1',
  items: [{ productId: 'prod_1', quantity: 10, unitPrice: 50 }],
});
```

### Payment Module

```typescript
// Create a payment intent
const intent = await essabu.payment.paymentIntents.create({
  amount: 15000,
  currency: 'USD',
  paymentMethod: 'mobile_money',
});

// Create a subscription
await essabu.payment.subscriptions.create({
  customerId: 'cust_1',
  planId: 'plan_pro',
});

// Apply for a loan
await essabu.payment.loanApplications.create({
  loanProductId: 'prod_micro',
  amount: 5000,
  term: 12,
});
```

### E-Invoice Module

```typescript
// Normalize an invoice
const normalized = await essabu.einvoice.invoices.normalize({
  supplier: { tin: 'A123', name: 'My Company' },
  customer: { tin: 'B456', name: 'Client Corp' },
  items: [{ description: 'Service', quantity: 1, unitPrice: 1000 }],
});

// Submit to government
const submission = await essabu.einvoice.submissions.submit(normalized.invoiceId);

// Check submission status
const status = await essabu.einvoice.submissions.checkStatus(submission.submissionId);

// Generate compliance report
const report = await essabu.einvoice.compliance.generateReport({
  startDate: '2024-01-01',
  endDate: '2024-03-31',
});
```

### Identity Module

```typescript
// Login
const tokens = await essabu.identity.auth.login('user@example.com', 'password');

// Refresh token
const newTokens = await essabu.identity.auth.refresh(tokens.refreshToken);

// Enable 2FA
const twoFa = await essabu.identity.auth.enable2fa();

// Manage roles
const roles = await essabu.identity.roles.list({ page: 1 });

// Manage API keys
const apiKeys = await essabu.identity.apiKeys.list({ page: 1 });
```

## Pagination

All list endpoints support pagination:

```typescript
import { firstPage, pageOf } from '@essabu/sdk';

// Default: page 1, 20 items per page
const page1 = await essabu.hr.employees.list(firstPage());

// Custom pagination
const page3 = await essabu.hr.employees.list(pageOf(3, 50));

// With sorting
const sorted = await essabu.hr.employees.list({
  page: 1,
  perPage: 25,
  sort: 'lastName',
  direction: 'asc',
});

// Response structure
console.log(page1.data);           // Array of items
console.log(page1.page);           // Current page number
console.log(page1.perPage);        // Items per page
console.log(page1.totalElements);  // Total items across all pages
console.log(page1.totalPages);     // Total number of pages
```

## Error Handling

The SDK provides a structured error hierarchy:

```typescript
import {
  EssabuError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from '@essabu/sdk';

try {
  await essabu.hr.employees.create({ /* ... */ });
} catch (error) {
  if (error instanceof ValidationError) {
    // 400/422 - Field-level validation errors
    console.error('Fields:', error.fieldErrors);
    // { firstName: 'required', email: ['invalid format', 'already taken'] }
  } else if (error instanceof AuthenticationError) {
    // 401 - Invalid or expired API key/token
    console.error('Please check your credentials');
  } else if (error instanceof AuthorizationError) {
    // 403 - Insufficient permissions
    console.error('Access denied');
  } else if (error instanceof NotFoundError) {
    // 404 - Resource not found
    console.error('Resource does not exist');
  } else if (error instanceof RateLimitError) {
    // 429 - Rate limit exceeded
    console.error(`Retry after ${error.retryAfter} seconds`);
  } else if (error instanceof ServerError) {
    // 5xx - Server error (after retries exhausted)
    console.error('Server error:', error.message);
  } else if (error instanceof EssabuError) {
    // Other API errors
    console.error(`HTTP ${error.statusCode}: ${error.message}`);
  }
}
```

## Webhook Handling

Handle real-time events from Essabu (similar to Stripe webhooks):

```typescript
import crypto from 'node:crypto';
import express from 'express';

const app = express();

// IMPORTANT: Use raw body for signature verification
app.post(
  '/webhooks/essabu',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const payload = req.body.toString();
    const signature = req.headers['x-essabu-signature'] as string;
    const secret = process.env.ESSABU_WEBHOOK_SECRET!;

    // Verify signature
    const parts = signature.split(',');
    const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
    const sig = parts.find(p => p.startsWith('v1='))?.slice(3);

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${timestamp}.${payload}`)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(sig!, 'hex'), Buffer.from(expected, 'hex'))) {
      return res.status(400).send('Invalid signature');
    }

    const event = JSON.parse(payload);

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
      case 'invoice.paid':
        // Handle paid invoice
        break;
      case 'employee.created':
        // Handle new employee
        break;
    }

    res.json({ received: true });
  },
);
```

See [`examples/webhook-handler.ts`](./examples/webhook-handler.ts) for a complete implementation.

## Tree-Shakable Imports

Import only the modules you need:

```typescript
// Full SDK
import Essabu from '@essabu/sdk';

// Individual module clients
import { HrClient } from '@essabu/sdk/hr';
import { AccountingClient } from '@essabu/sdk/accounting';
import { IdentityClient } from '@essabu/sdk/identity';

// Types only
import type { EssabuConfig, PageRequest, PageResponse } from '@essabu/sdk';

// Error classes
import { EssabuError, ValidationError } from '@essabu/sdk';
```

## TypeScript Support

The SDK is written in TypeScript with strict mode enabled. Full type definitions are included.

```typescript
import type {
  EssabuConfig,
  PageRequest,
  PageResponse,
  BaseResource,
  StatusResource,
} from '@essabu/sdk';

// All responses are fully typed
const employees: PageResponse = await essabu.hr.employees.list();

// Configuration is type-checked
const config: EssabuConfig = {
  apiKey: 'sk_live_...',
  tenantId: 'tenant_...',
  environment: 'sandbox',   // Autocomplete: 'production' | 'sandbox'
};
```

## Examples

Complete, runnable examples are available in the [`examples/`](./examples) directory:

| Example | Description |
|---------|-------------|
| [`create-employee.ts`](./examples/create-employee.ts) | Create and manage employees with the HR module |
| [`create-invoice.ts`](./examples/create-invoice.ts) | Create and finalize invoices |
| [`process-payment.ts`](./examples/process-payment.ts) | Payment intents, subscriptions, refunds |
| [`webhook-handler.ts`](./examples/webhook-handler.ts) | Express/Fastify webhook handler with signature verification |
| [`authentication.ts`](./examples/authentication.ts) | Login, token refresh, 2FA, session management |
| [`loan-application.ts`](./examples/loan-application.ts) | Complete lending lifecycle (KYC -> application -> repayment) |
| [`einvoice-submit.ts`](./examples/einvoice-submit.ts) | E-invoice normalization and government submission |
| [`crm-pipeline.ts`](./examples/crm-pipeline.ts) | CRM pipeline: contact -> opportunity -> sales order |

Run any example:

```bash
npx tsx examples/create-employee.ts
```

## Requirements

- **Node.js** >= 18.0.0 (uses native `fetch`)
- **TypeScript** >= 5.3 (for type definitions)

## Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Run tests in watch mode: `npm run test:watch`
5. Build: `npm run build`
6. Lint: `npm run lint`
7. Type check: `npm run typecheck`

### Project Structure

```
src/
  client.ts              # Main Essabu class (entry point)
  config.ts              # Configuration types and URL resolution
  common/
    http-client.ts       # HTTP client with retry, timeout, error mapping
    auth.ts              # Authentication header management
    exceptions.ts        # Error hierarchy (EssabuError, ValidationError, ...)
    models.ts            # Shared types (PageRequest, PageResponse, ...)
  hr/                    # HR module (employees, payroll, leaves, ...)
  accounting/            # Accounting module (invoices, journals, ...)
  identity/              # Identity module (auth, users, roles, ...)
  trade/                 # Trade module (CRM, sales, inventory, ...)
  payment/               # Payment module (intents, subscriptions, loans, ...)
  einvoice/              # E-Invoice module (normalization, submission, ...)
  project/               # Project module (projects, tasks, milestones, ...)
  asset/                 # Asset module (assets, depreciation, fleet, ...)
tests/
  client.test.ts         # Main client tests
  http-client.test.ts    # HTTP client tests (retry, errors, auth)
  hr/                    # HR module tests
  accounting/            # Accounting module tests
  identity/              # Identity module tests
  common/                # Shared utility tests (webhooks, ...)
examples/                # Runnable TypeScript examples
```

## License

[MIT](./LICENSE)
