# Accounting Module

Chart of accounts, journal entries, fiscal years, taxes, and financial reports.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `AccountsApi` | `/api/accounting/accounts` | Chart of accounts |
| `JournalEntriesApi` | `/api/accounting/journal-entries` | Journal entries |
| `FiscalYearsApi` | `/api/accounting/fiscal-years` | Fiscal year management |
| `TaxesApi` | `/api/accounting/taxes` | Tax rate definitions |
| `ReportsApi` | `/api/accounting/reports` | Financial reports |

## AccountsApi

Provides full CRUD operations for the chart of accounts. List accounts with pagination, retrieve a single account by ID, create a new account with a code, name, and type, update an existing account, or soft-delete it. All methods return the Account model except `remove()` which returns void.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Account>>
    // GET /api/accounting/accounts

async retrieve(id: string): Promise<Account>
    // GET /api/accounting/accounts/{id}

async create(data: CreateAccountRequest): Promise<Account>
    // POST /api/accounting/accounts

async update(id: string, data: UpdateAccountRequest): Promise<Account>
    // PATCH /api/accounting/accounts/{id}

async remove(id: string): Promise<void>
    // DELETE /api/accounting/accounts/{id}
```

## JournalEntriesApi

Manages double-entry journal entries with balanced debit and credit lines. In addition to standard CRUD operations, the `post_()` method transitions an entry from draft to posted status, making it immutable. The `reverse()` method creates a new reversing entry as of an optional date, useful for period-end corrections.

```typescript
async list(params?: PageRequest): Promise<PageResponse<JournalEntry>>
async retrieve(id: string): Promise<JournalEntry>
async create(data: CreateJournalEntryRequest): Promise<JournalEntry>
async update(id: string, data: UpdateJournalEntryRequest): Promise<JournalEntry>
async remove(id: string): Promise<void>

async post_(id: string): Promise<JournalEntry>
    // POST /api/accounting/journal-entries/{id}/post

async reverse(id: string, date?: string): Promise<JournalEntry>
    // POST /api/accounting/journal-entries/{id}/reverse
```

## FiscalYearsApi

Manages fiscal year periods for the organization. Create a fiscal year with start and end dates, then close it at period-end to prevent further journal entries. A closed fiscal year can be reopened if adjustments are needed. Listing returns all fiscal years with their open/closed status.

```typescript
async list(params?: PageRequest): Promise<PageResponse<FiscalYear>>
async retrieve(id: string): Promise<FiscalYear>
async create(data: CreateFiscalYearRequest): Promise<FiscalYear>

async close(id: string): Promise<FiscalYear>
    // POST /api/accounting/fiscal-years/{id}/close

async reopen(id: string): Promise<FiscalYear>
    // POST /api/accounting/fiscal-years/{id}/reopen
```

## TaxesApi

Provides CRUD operations for tax rate definitions. Create tax entries with a name, rate, and type (percentage or fixed). These tax definitions are referenced by invoice lines and e-invoices to compute tax amounts automatically. Throws a `ConflictError` if you try to remove a tax that is in use.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Tax>>
async retrieve(id: string): Promise<Tax>
async create(data: CreateTaxRequest): Promise<Tax>
async update(id: string, data: UpdateTaxRequest): Promise<Tax>
async remove(id: string): Promise<void>
```

## ReportsApi

Generates financial reports based on posted journal entries. The `balanceSheet()` method returns assets, liabilities, and equity as of a given date. The `incomeStatement()` method returns revenue and expenses for a date range. The `trialBalance()` method lists all accounts with their debit and credit totals as of a date. All three methods throw a `NotFoundError` if no fiscal year covers the requested period.

```typescript
async balanceSheet(date?: string): Promise<BalanceSheet>
    // GET /api/accounting/reports/balance-sheet

async incomeStatement(period: ReportPeriod): Promise<IncomeStatement>
    // GET /api/accounting/reports/income-statement

async trialBalance(date?: string): Promise<TrialBalance>
    // GET /api/accounting/reports/trial-balance
```

## Code Examples

### Chart of Accounts

Create, list, update, and delete accounts in the chart of accounts. The `list()` method accepts optional pagination parameters and returns a `PageResponse` with the accounts array and metadata. The `create()` method requires a unique account code, a display name, a type (asset, liability, equity, revenue, expense), and an optional currency. The `update()` and `remove()` methods operate on a specific account by its UUID.

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

const accounts = await client.accounting.accounts.list({ page: 1, pageSize: 50 });
const account = await client.accounting.accounts.create({
  code: '4010',
  name: 'Ventes de marchandises',
  type: 'revenue',
  currency: 'USD',
});
await client.accounting.accounts.update(account.id, { name: 'Updated Name' });
await client.accounting.accounts.remove(account.id);
```

### Journal Entries

Create a journal entry with a date, reference, and balanced debit/credit lines. Each line references an account ID and specifies either a debit or credit amount. After creation, post the entry to make it permanent in the ledger. Use `reverse()` to create a counter-entry as of a specified date for corrections.

```typescript
const entry = await client.accounting.journalEntries.create({
  date: '2026-03-26',
  reference: 'JV-001',
  lines: [
    { accountId: 'acc-debit', debit: 1000, credit: 0 },
    { accountId: 'acc-credit', debit: 0, credit: 1000 },
  ],
});

// Post the entry
await client.accounting.journalEntries.post_(entry.id);

// Reverse an entry
await client.accounting.journalEntries.reverse(entry.id, '2026-03-31');
```

### Fiscal Years

Create a fiscal year by providing a name and start/end date range. Close the fiscal year at period-end to lock it against further journal entries. Reopen it if you need to post late adjustments. Returns the updated FiscalYear object with its current status.

```typescript
const fy = await client.accounting.fiscalYears.create({
  name: 'FY 2026',
  startDate: '2026-01-01',
  endDate: '2026-12-31',
});
await client.accounting.fiscalYears.close(fy.id);
await client.accounting.fiscalYears.reopen(fy.id);
```

### Taxes

Create a tax definition with a display name, a percentage rate, and a type. The created tax can be referenced by invoice lines to automatically compute tax amounts. Returns the Tax object with its generated UUID.

```typescript
const tax = await client.accounting.taxes.create({
  name: 'VAT 16%',
  rate: 16.0,
  type: 'percentage',
});
```

### Financial Reports

Generate the three core financial reports. The balance sheet returns assets, liabilities, and equity totals as of a given date. The income statement returns revenue, expenses, and net income for a date range specified by `startDate` and `endDate`. The trial balance lists all accounts with their cumulative debit and credit balances as of a date.

```typescript
const bs = await client.accounting.reports.balanceSheet('2026-03-31');
const pnl = await client.accounting.reports.incomeStatement({
  startDate: '2026-01-01',
  endDate: '2026-03-31',
});
const tb = await client.accounting.reports.trialBalance('2026-03-31');
```
