/**
 * Example 6: Payment & Banking
 * Record payments and manage bank accounts.
 */
import Essabu from '@essabu/sdk';

async function main() {
  /**
   * Initialize the SDK client with API key and tenant ID. All subsequent API calls
   * will be authenticated and scoped to this tenant automatically.
   */
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  /**
   * Create a bank account with a display name, bank name, account number, IBAN,
   * currency, and default flag. Setting `isDefault` to true makes this the primary
   * account for payment processing. Returns the created BankAccount object with
   * a generated UUID.
   */
  const bankAccount = await essabu.payment.bankAccounts.create({
    name: 'Main Business Account',
    bankName: 'First National Bank',
    accountNumber: '1234567890',
    iban: 'CD00 1234 5678 9012 3456',
    currency: 'USD',
    isDefault: true,
  });
  console.log(`Bank account created: ${bankAccount.name}`);

  /**
   * Create an incoming payment specifying the type, amount, currency, payment method,
   * customer reference, date, description, and linked bank account. Returns the created
   * Payment object in pending status with a generated reference number. Throws a
   * ValidationError if required fields are missing or the bank account ID is invalid.
   */
  const payment = await essabu.payment.payments.create({
    type: 'incoming',
    amount: 5000,
    currency: 'USD',
    method: 'bank_transfer',
    customerId: 'cust-123',
    date: '2024-03-15',
    description: 'Invoice #INV-001 payment',
    bankAccountId: bankAccount.id,
  });
  console.log(`Payment ${payment.reference}: $${payment.amount} (${payment.statusLabel})`);

  /**
   * Process the payment to execute it through the configured payment gateway. Transitions
   * the payment status from pending to processed and records the processing timestamp.
   * Returns the updated Payment object. Throws a ValidationError if the payment is
   * not in pending status.
   */
  const processed = await essabu.payment.payments.process(payment.id);
  console.log(`Payment processed at: ${processed.processedAt}`);

  /**
   * List recent transactions with pagination, sorted by date in descending order.
   * Returns a PageResponse containing transaction records with type (credit/debit),
   * amount, date, and description. Use this to build transaction history views or
   * reconciliation dashboards.
   */
  const { data: transactions } = await essabu.payment.transactions.list({
    pageSize: 5,
    sortBy: 'date',
    sortOrder: 'desc',
  });

  for (const tx of transactions) {
    const sign = tx.type === 'credit' ? '+' : '-';
    console.log(`${tx.date}: ${sign}$${tx.amount} - ${tx.description}`);
  }
}

main().catch(console.error);
