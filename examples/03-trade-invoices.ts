/**
 * Example 3: Trade - Invoice Workflow
 * Create, issue, and manage invoices.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a customer first
  const customer = await essabu.trade.customers.create({
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    taxId: 'CD-123456',
  });

  // Create an invoice
  const invoice = await essabu.trade.invoices.create({
    customerId: customer.id,
    date: '2024-03-15',
    dueDate: '2024-04-15',
    notes: 'Monthly consulting services',
    lines: [
      { description: 'Software Development', quantity: 40, unitPrice: 150 },
      { description: 'Code Review', quantity: 8, unitPrice: 200 },
    ],
  });

  console.log(`Invoice ${invoice.number}: $${invoice.total} (${invoice.statusLabel})`);

  // Issue the invoice
  const issued = await essabu.trade.invoices.issue(invoice.id);
  console.log(`Invoice issued at: ${issued.issuedAt}`);

  // Send by email
  await essabu.trade.invoices.sendByEmail(invoice.id, 'billing@acme.com');
  console.log('Invoice sent by email');

  // Mark as paid
  const paid = await essabu.trade.invoices.markPaid(invoice.id);
  console.log(`Invoice status: ${paid.statusLabel}`);
}

main().catch(console.error);
