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

```typescript
async list(params?: PageRequest): Promise<PageResponse<Tax>>
async retrieve(id: string): Promise<Tax>
async create(data: CreateTaxRequest): Promise<Tax>
async update(id: string, data: UpdateTaxRequest): Promise<Tax>
async remove(id: string): Promise<void>
```

## ReportsApi

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

```typescript
const tax = await client.accounting.taxes.create({
  name: 'VAT 16%',
  rate: 16.0,
  type: 'percentage',
});
```

### Financial Reports

```typescript
const bs = await client.accounting.reports.balanceSheet('2026-03-31');
const pnl = await client.accounting.reports.incomeStatement({
  startDate: '2026-01-01',
  endDate: '2026-03-31',
});
const tb = await client.accounting.reports.trialBalance('2026-03-31');
```
