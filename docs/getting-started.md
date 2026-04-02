# Getting Started

## Installation

```bash
npm install @essabu/sdk
# or
yarn add @essabu/sdk
# or
pnpm add @essabu/sdk
```

## Authentication

All API calls require an API key and tenant ID. You can obtain these from the Essabu dashboard.

```typescript
import Essabu from '@essabu/sdk';

const essabu = new Essabu({
  apiKey: 'your-api-key',
  tenantId: 'your-tenant-id',
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string` | - | **Required.** API key for authentication |
| `tenantId` | `string` | - | **Required.** Tenant identifier |
| `baseUrl` | `string` | `https://api.essabu.com` | Base URL of the API |
| `environment` | `'production' \| 'sandbox'` | `'production'` | Environment shortcut |
| `timeout` | `number` | `30000` | Request timeout in ms |
| `maxRetries` | `number` | `3` | Retries on 5xx errors |

## Basic Usage

### HR Module

```typescript
// List employees
const employees = await essabu.hr.employees.list();

// Create an employee
const employee = await essabu.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean.mukendi@example.com',
});

// Calculate payroll
await essabu.hr.payrolls.calculate('payroll-id');
```

### Accounting Module

```typescript
// Create an invoice
const invoice = await essabu.accounting.invoices.create({
  customerId: 'customer-id',
  items: [{ description: 'Service', amount: 100 }],
});

// List accounts
const accounts = await essabu.accounting.accounts.list();
```

### Identity Module

```typescript
// Login
const tokens = await essabu.identity.auth.login('email@example.com', 'password');

// Set the token for subsequent requests
essabu.identity.setToken(tokens.accessToken);
```

## Pagination

All list endpoints support pagination:

```typescript
import { firstPage, pageOf } from '@essabu/sdk';

// First page (page 1, 20 items)
const page1 = await essabu.hr.employees.list(firstPage());

// Custom page
const page3 = await essabu.hr.employees.list(pageOf(3, 50));

// With parameters
const filtered = await essabu.trade.customers.list({
  page: 1,
  perPage: 10,
  sort: 'name',
});
```

## Error Handling

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
  await essabu.hr.employees.create({ firstName: '' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Field errors:', error.fieldErrors);
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid or expired API key');
  } else if (error instanceof AuthorizationError) {
    console.error('Insufficient permissions');
  } else if (error instanceof NotFoundError) {
    console.error('Resource not found');
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}s`);
  } else if (error instanceof ServerError) {
    console.error('Server error:', error.message);
  }
}
```

## Sandbox Environment

For testing, use the sandbox environment:

```typescript
const essabu = new Essabu({
  apiKey: 'sandbox-key',
  tenantId: 'sandbox-tenant',
  environment: 'sandbox',
});
```
