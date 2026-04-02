/**
 * Example: Create and finalize an invoice using the Accounting module.
 *
 * This demonstrates creating an invoice, adding line items,
 * and processing it through the accounting pipeline.
 *
 * Run: npx tsx examples/create-invoice.ts
 */

import Essabu, { ValidationError, EssabuError } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 1. Create an invoice
    console.log('Creating invoice...');
    const invoice = await essabu.accounting.invoices.create({
      customerId: 'cust_acme_corp',
      invoiceDate: '2024-03-15',
      dueDate: '2024-04-15',
      currency: 'USD',
      items: [
        {
          description: 'Software Development Services - March 2024',
          quantity: 160,
          unitPrice: 75,
          taxRate: 16,
        },
        {
          description: 'Cloud Hosting (Monthly)',
          quantity: 1,
          unitPrice: 250,
          taxRate: 16,
        },
      ],
      notes: 'Payment due within 30 days',
      paymentTermId: 'pt_net30',
    });

    console.log('Invoice created:', invoice);
    const invoiceId = invoice['id'] as string;

    // 2. Retrieve the invoice
    console.log('\nFetching invoice...');
    const fetched = await essabu.accounting.invoices.get(invoiceId);
    console.log('Invoice details:', fetched);

    // 3. List all invoices
    console.log('\nListing recent invoices...');
    const invoices = await essabu.accounting.invoices.list({
      page: 1,
      perPage: 5,
    });
    console.log(`Found ${invoices.totalElements} invoices`);

    for (const inv of invoices.data) {
      console.log(`  - #${inv['invoiceNumber']} | ${inv['statusLabel']} | ${inv['total']} ${inv['currency']}`);
    }

    // 4. List accounts
    console.log('\nListing chart of accounts...');
    const accounts = await essabu.accounting.accounts.list({
      page: 1,
      perPage: 10,
    });
    console.log(`Found ${accounts.totalElements} accounts`);

    for (const acct of accounts.data) {
      console.log(`  - ${acct['code']} ${acct['name']}`);
    }

    // 5. Record a payment for the invoice
    console.log('\nRecording payment...');
    const payment = await essabu.accounting.payments.create({
      invoiceId,
      amount: 12290,
      paymentDate: '2024-03-20',
      paymentMethod: 'bank_transfer',
      reference: 'TRX-2024-0315',
    });
    console.log('Payment recorded:', payment);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation failed:');
      console.error('  Field errors:', error.fieldErrors);
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
