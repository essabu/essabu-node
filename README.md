# @essabu/sdk

Unified TypeScript SDK for the Essabu platform. API with zero runtime dependencies. Requires Node.js 18+.

## Installation

```bash
npm install @essabu/sdk
```

## Quick Start

```typescript
import Essabu from '@essabu/sdk';

const essabu = new Essabu({
  apiKey: 'your-api-key',
  tenantId: 'your-tenant-id',
});

// HR - Create an employee
const employee = await essabu.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean@company.com',
});

// Trade - List invoices
const { data: invoices, meta } = await essabu.trade.invoices.list({
  page: 1,
  pageSize: 25,
});

// Accounting - Generate balance sheet
const report = await essabu.accounting.reports.balanceSheet('2024-12-31');
```

## Modules

| Module | Accessor | Resources |
|--------|----------|-----------|
| HR | `essabu.hr` | employees, contracts, leaves, payroll, departments, attendance |
| Accounting | `essabu.accounting` | accounts, journalEntries, fiscalYears, taxes, reports |
| Identity | `essabu.identity` | users, tenants, roles, auth |
| Trade | `essabu.trade` | customers, suppliers, invoices, purchaseOrders, products, quotations |
| Payment | `essabu.payment` | payments, bankAccounts, transactions |
| E-Invoice | `essabu.einvoice` | einvoices |
| Project | `essabu.project` | projects, tasks, timesheets |
| Asset | `essabu.asset` | assets, categories, depreciations |

## Configuration

```typescript
const essabu = new Essabu({
  apiKey: 'your-api-key',       // Required
  tenantId: 'your-tenant-id',   // Required
  baseUrl: 'https://api.essabu.com', // Optional
  timeout: 30000,                // Optional (ms)
  maxRetries: 3,                 // Optional
  apiVersion: '2024-01-01',     // Optional
  headers: {},                   // Optional custom headers
});
```

## Error Handling

```typescript
import Essabu, { NotFoundError, ValidationError, RateLimitError } from '@essabu/sdk';

try {
  await essabu.hr.employees.retrieve('id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('Not found');
  } else if (error instanceof ValidationError) {
    for (const v of error.violations) {
      console.log(`${v.field}: ${v.message}`);
    }
  } else if (error instanceof RateLimitError) {
    console.log(`Retry after ${error.retryAfter}s`);
  }
}
```

## Pagination

All `list()` methods support pagination:

```typescript
const { data, meta } = await essabu.trade.customers.list({
  page: 2,
  pageSize: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  search: 'acme',
  filters: { status: 'active' },
});

console.log(meta.totalItems, meta.totalPages, meta.hasNextPage);
```

## License

MIT
