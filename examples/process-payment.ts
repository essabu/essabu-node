/**
 * Example: Process a payment using the Payment module.
 *
 * This demonstrates creating a payment intent, confirming it,
 * and handling the transaction lifecycle -- similar to Stripe's PaymentIntents flow.
 *
 * Run: npx tsx examples/process-payment.ts
 */

import Essabu, { ValidationError, EssabuError, RateLimitError } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 1. Create a payment intent
    console.log('Creating payment intent...');
    const intent = await essabu.payment.paymentIntents.create({
      amount: 15000,           // 150.00 USD (in cents)
      currency: 'USD',
      customerId: 'cust_acme_corp',
      description: 'Invoice #INV-2024-0042',
      paymentMethod: 'mobile_money',
      metadata: {
        invoiceId: 'inv_abc123',
        orderId: 'ord_xyz789',
      },
    });

    console.log('Payment intent created:', intent);
    const intentId = intent['id'] as string;

    // 2. Retrieve the payment intent
    console.log('\nFetching payment intent...');
    const fetched = await essabu.payment.paymentIntents.get(intentId);
    console.log('Status:', fetched['statusLabel']);

    // 3. List recent transactions
    console.log('\nListing recent transactions...');
    const transactions = await essabu.payment.transactions.list({
      page: 1,
      perPage: 10,
    });
    console.log(`Found ${transactions.totalElements} transactions`);

    for (const txn of transactions.data) {
      console.log(
        `  - ${txn['id']} | ${txn['statusLabel']} | ${txn['amount']} ${txn['currency']}`,
      );
    }

    // 4. Create a subscription
    console.log('\nCreating subscription...');
    const subscription = await essabu.payment.subscriptions.create({
      customerId: 'cust_acme_corp',
      planId: 'plan_pro_monthly',
      startDate: '2024-04-01',
      paymentMethod: 'bank_transfer',
    });
    console.log('Subscription created:', subscription);

    // 5. Check financial account balance
    console.log('\nChecking financial accounts...');
    const accounts = await essabu.payment.financialAccounts.list({
      page: 1,
      perPage: 5,
    });
    console.log(`Found ${accounts.totalElements} financial accounts`);

    for (const acct of accounts.data) {
      console.log(`  - ${acct['name']} | Balance: ${acct['balance']} ${acct['currency']}`);
    }

    // 6. Process a refund
    console.log('\nProcessing refund...');
    const refund = await essabu.payment.refunds.create({
      transactionId: 'txn_abc123',
      amount: 5000,           // Partial refund: 50.00 USD
      reason: 'Customer request',
    });
    console.log('Refund created:', refund);
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error(`Rate limited. Retry after ${error.retryAfter} seconds.`);
    } else if (error instanceof ValidationError) {
      console.error('Validation failed:', error.fieldErrors);
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
