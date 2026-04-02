/**
 * Example 3: Trade - Invoice Workflow
 * Create, issue, and manage invoices.
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
   * Create a new customer record with a name, email, and tax ID. The returned Customer
   * object contains a generated UUID that will be used to link invoices to this customer.
   * Throws a ValidationError if required fields are missing.
   */
  const customer = await essabu.trade.customers.create({
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    taxId: 'CD-123456',
  });

  /**
   * Create a sales invoice linked to the customer, with a date, due date, notes, and
   * line items. Each line specifies a description, quantity, and unit price. The total
   * is computed server-side. Returns the Invoice object in draft status with the
   * calculated total and a generated invoice number.
   */
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

  /**
   * Issue the invoice to finalize it, transitioning its status from draft to issued.
   * This assigns the official invoice number and records the issuance timestamp.
   * Returns the updated Invoice object. Throws a ValidationError if the invoice
   * is not in draft status.
   */
  const issued = await essabu.trade.invoices.issue(invoice.id);
  console.log(`Invoice issued at: ${issued.issuedAt}`);

  /**
   * Send the invoice to the specified email address as a PDF attachment. If no email
   * is provided, it defaults to the customer's email on file. Returns void on success.
   * Throws a NotFoundError if the invoice does not exist.
   */
  await essabu.trade.invoices.sendByEmail(invoice.id, 'billing@acme.com');
  console.log('Invoice sent by email');

  /**
   * Mark the invoice as paid, recording the payment receipt. The payment date defaults
   * to the current date if not specified. Returns the updated Invoice object with
   * its status changed to "paid". Throws a ValidationError if the invoice has not
   * been issued yet.
   */
  const paid = await essabu.trade.invoices.markPaid(invoice.id);
  console.log(`Invoice status: ${paid.statusLabel}`);
}

main().catch(console.error);
