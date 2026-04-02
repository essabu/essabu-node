/**
 * Example 6: Payment & Banking
 * Record payments and manage bank accounts.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a bank account
  const bankAccount = await essabu.payment.bankAccounts.create({
    name: 'Main Business Account',
    bankName: 'First National Bank',
    accountNumber: '1234567890',
    iban: 'CD00 1234 5678 9012 3456',
    currency: 'USD',
    isDefault: true,
  });
  console.log(`Bank account created: ${bankAccount.name}`);

  // Record a payment
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

  // Process the payment
  const processed = await essabu.payment.payments.process(payment.id);
  console.log(`Payment processed at: ${processed.processedAt}`);

  // List transactions
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
