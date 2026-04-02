# Payment Module

Payment processing, bank accounts, and transaction management.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `PaymentsApi` | `/api/payment/payments` | Payment processing |
| `BankAccountsApi` | `/api/payment/bank-accounts` | Bank account management |
| `TransactionsApi` | `/api/payment/transactions` | Transaction records and reconciliation |

## PaymentsApi

Provides full CRUD operations for payments along with processing, cancellation, and refund actions. Create a payment with an amount, currency, customer reference, and payment method. The `process()` method initiates payment execution through the configured payment gateway. The `cancel()` method voids an unprocessed payment with an optional reason. The `refund()` method issues a full or partial refund for a processed payment.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Payment>>
    // GET /api/payment/payments

async retrieve(id: string): Promise<Payment>
    // GET /api/payment/payments/{id}

async create(data: CreatePaymentRequest): Promise<Payment>
    // POST /api/payment/payments

async update(id: string, data: UpdatePaymentRequest): Promise<Payment>
    // PATCH /api/payment/payments/{id}

async remove(id: string): Promise<void>
    // DELETE /api/payment/payments/{id}

async process(id: string): Promise<Payment>
    // POST /api/payment/payments/{id}/process

async cancel(id: string, reason?: string): Promise<Payment>
    // POST /api/payment/payments/{id}/cancel

async refund(id: string, amount?: number): Promise<Payment>
    // POST /api/payment/payments/{id}/refund
```

## BankAccountsApi

Manages bank accounts with standard CRUD operations. Create bank accounts with a display name, bank name, account number, and currency. Bank accounts are used as the source or destination for payment processing and transaction reconciliation. Supports pagination on the list endpoint.

```typescript
async list(params?: PageRequest): Promise<PageResponse<BankAccount>>
async retrieve(id: string): Promise<BankAccount>
async create(data: CreateBankAccountRequest): Promise<BankAccount>
async update(id: string, data: UpdateBankAccountRequest): Promise<BankAccount>
async remove(id: string): Promise<void>
```

## TransactionsApi

Provides read-only access to transaction records with reconciliation capabilities. List transactions with pagination and retrieve individual records by ID. The `reconcile()` method matches a transaction to an accounting entry by specifying the target account and date. The `unreconcile()` method removes the reconciliation link, allowing re-matching.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Transaction>>
    // GET /api/payment/transactions

async retrieve(id: string): Promise<Transaction>
    // GET /api/payment/transactions/{id}

async reconcile(id: string, data: ReconcileTransactionRequest): Promise<Transaction>
    // POST /api/payment/transactions/{id}/reconcile

async unreconcile(id: string): Promise<Transaction>
    // POST /api/payment/transactions/{id}/unreconcile
```

## Code Examples

### Payment Processing

Create an incoming payment specifying the amount, currency, customer, payment method, description, and associated bank account. Process the payment to execute it through the payment gateway. Cancel an unprocessed payment with a reason. Issue a partial refund by providing an amount, or omit it for a full refund. All methods return the updated Payment object.

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

// Create a payment
const payment = await client.payment.payments.create({
  amount: 5000,
  currency: 'USD',
  customerId: 'cust-uuid',
  method: 'bank_transfer',
  description: 'Invoice #INV-001',
});

// Process the payment
await client.payment.payments.process(payment.id);

// Cancel a payment
await client.payment.payments.cancel(payment.id, 'Customer request');

// Refund (partial or full)
await client.payment.payments.refund(payment.id, 2500);
await client.payment.payments.refund(payment.id); // full refund
```

### Bank Accounts

List all registered bank accounts, create a new one with bank details and currency, update the display name, or remove it. Bank accounts serve as the link between the payment module and external banking systems. The `create()` method returns the BankAccount object with its generated UUID.

```typescript
const accounts = await client.payment.bankAccounts.list();
const account = await client.payment.bankAccounts.create({
  name: 'Main Operating Account',
  bankName: 'Trust Bank',
  accountNumber: '123456789',
  currency: 'USD',
});
await client.payment.bankAccounts.update(account.id, { name: 'Updated Name' });
await client.payment.bankAccounts.remove(account.id);
```

### Transactions and Reconciliation

List transactions with pagination and sorting, and retrieve a specific transaction by its UUID. Reconcile a transaction by matching it to an accounting entry with a target account ID and date. Use `unreconcile()` to remove the match if a correction is needed. Reconciliation links payment transactions to the accounting ledger.

```typescript
const transactions = await client.payment.transactions.list({ page: 1, pageSize: 50 });
const txn = await client.payment.transactions.retrieve('txn-uuid');

// Reconcile a transaction
await client.payment.transactions.reconcile('txn-uuid', {
  matchedAccountId: 'acc-uuid',
  date: '2026-03-26',
});

// Undo reconciliation
await client.payment.transactions.unreconcile('txn-uuid');
```

### List and Filter Payments

Retrieve a paginated list of payments with optional page and page size parameters. Additional filters can be applied through query parameters for status, date range, or customer. Retrieve a specific payment by its UUID to view full details including status, amount, and processing timestamps.

```typescript
// All completed payments
const completed = await client.payment.payments.list({
  page: 1,
  pageSize: 20,
  // Additional filters can be passed via query params
});

// Retrieve a specific payment
const details = await client.payment.payments.retrieve('pay-uuid');
```
