# API Reference

## Client

### `new Essabu(config: EssabuConfig)`

Creates a new SDK client instance.

**Config options:**
- `apiKey` (string, required) - API key for authentication
- `tenantId` (string, required) - Tenant identifier
- `baseUrl` (string, default: `https://api.essabu.com`) - Base API URL
- `timeout` (number, default: `30000`) - Request timeout in ms
- `maxRetries` (number, default: `3`) - Max retries on transient failures
- `apiVersion` (string, default: `2024-01-01`) - API version header
- `headers` (Record<string, string>) - Custom headers

## Common Patterns

### CRUD Operations

All resource APIs follow the same pattern:

Every resource exposes five standard methods: `list()` for paginated retrieval, `retrieve()` for fetching a single item by ID, `create()` for adding a new resource, `update()` for partial modification, and `remove()` for soft-deletion. All methods return typed Promises. The `list()` method returns a `PageResponse<T>` wrapper containing both data and pagination metadata.

```typescript
// List with pagination
const { data, meta } = await essabu.module.resource.list({ page: 1, pageSize: 25 });

// Retrieve by ID
const item = await essabu.module.resource.retrieve('id');

// Create
const created = await essabu.module.resource.create({ ... });

// Update
const updated = await essabu.module.resource.update('id', { ... });

// Delete
await essabu.module.resource.remove('id');
```

### Pagination

The `PageRequest` interface defines all pagination, sorting, searching, and filtering parameters. Page numbers are 1-based, and the default page size is 25 with a maximum of 100. The `PageResponse<T>` generic wrapper contains the typed data array and a `meta` object with full pagination state including total counts and navigation booleans.

```typescript
interface PageRequest {
  page?: number;        // 1-based
  pageSize?: number;    // default: 25, max: 100
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, string | number | boolean>;
}

interface PageResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
```

## Error Types

| Error | Status | When |
|-------|--------|------|
| `AuthenticationError` | 401 | Invalid/expired API key |
| `ForbiddenError` | 403 | Insufficient permissions |
| `NotFoundError` | 404 | Resource not found |
| `ConflictError` | 409 | Resource conflict |
| `ValidationError` | 422 | Request validation failed |
| `RateLimitError` | 429 | Rate limit exceeded |
| `ServerError` | 5xx | Server-side error |
| `TimeoutError` | 408 | Request timed out |
| `NetworkError` | 0 | Network connectivity issue |

All errors extend `EssabuError` which provides:
- `statusCode: number`
- `code: string`
- `requestId?: string`
- `details?: Record<string, unknown>`

## Modules

### HR (`essabu.hr`)

- `employees` - Employee CRUD + activate, deactivate, terminate
- `contracts` - Contract CRUD + sign, terminate, renew
- `leaves` - Leave CRUD + approve, reject, cancel
- `payroll` - Payroll runs + process, approve, list/retrieve slips
- `departments` - Department CRUD
- `attendance` - Attendance CRUD + checkIn, checkOut

### Accounting (`essabu.accounting`)

- `accounts` - Chart of accounts CRUD
- `journalEntries` - Journal entry CRUD + post_, reverse
- `fiscalYears` - Fiscal year management + close, reopen
- `taxes` - Tax configuration CRUD
- `reports` - balanceSheet, incomeStatement, trialBalance

### Identity (`essabu.identity`)

- `users` - User CRUD + me, changePassword, activate, deactivate
- `tenants` - Tenant CRUD + current
- `roles` - Role CRUD + listPermissions
- `auth` - login, refreshToken, logout, forgotPassword, resetPassword, verifyEmail

### Trade (`essabu.trade`)

- `customers` - Customer CRUD
- `suppliers` - Supplier CRUD
- `invoices` - Invoice CRUD + issue, markPaid, cancel, duplicate, sendByEmail
- `purchaseOrders` - PO CRUD + approve, receive, cancel
- `products` - Product CRUD
- `quotations` - Quotation CRUD + accept, reject, convertToInvoice, sendByEmail

### Payment (`essabu.payment`)

- `payments` - Payment CRUD + process, cancel, refund
- `bankAccounts` - Bank account CRUD
- `transactions` - Transaction list/retrieve + reconcile, unreconcile

### E-Invoice (`essabu.einvoice`)

- `einvoices` - E-Invoice CRUD + submit, validate, downloadXml, downloadPdf

### Project (`essabu.project`)

- `projects` - Project CRUD + archive, unarchive, addMember, removeMember
- `tasks` - Task CRUD + complete, reopen, assign
- `timesheets` - Timesheet CRUD + approve, reject

### Asset (`essabu.asset`)

- `assets` - Asset CRUD + dispose, activate
- `categories` - Asset category CRUD
- `depreciations` - Depreciation list/retrieve + run, post_
