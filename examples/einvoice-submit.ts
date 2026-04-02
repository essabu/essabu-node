/**
 * Example: E-Invoice normalization and government submission.
 *
 * This demonstrates the complete e-invoicing workflow:
 * normalize invoice -> verify compliance -> submit to government -> check status.
 *
 * Run: npx tsx examples/einvoice-submit.ts
 */

import Essabu, { ValidationError, EssabuError } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 1. Normalize an invoice to the standard format
    console.log('Step 1: Normalizing invoice...');
    const normalized = await essabu.einvoice.invoices.normalize({
      supplier: {
        tin: 'A1234567',
        name: 'Essabu Technologies SARL',
        address: '45 Avenue Lumumba, Lubumbashi, DRC',
        phone: '+243810000000',
        email: 'billing@essabu.com',
      },
      customer: {
        tin: 'B7654321',
        name: 'Acme Corporation',
        address: '12 Boulevard du 30 Juin, Kinshasa, DRC',
        phone: '+243820000000',
        email: 'accounts@acme.cd',
      },
      items: [
        {
          description: 'ERP SaaS License - Annual',
          quantity: 1,
          unitPrice: 12000,
          taxRate: 16,
        },
        {
          description: 'Implementation & Training',
          quantity: 40,
          unitPrice: 150,
          taxRate: 16,
        },
        {
          description: 'Premium Support (12 months)',
          quantity: 1,
          unitPrice: 3600,
          taxRate: 16,
        },
      ],
      invoiceDate: '2024-03-15',
      currency: 'USD',
      notes: 'Annual license renewal with training package',
    });

    console.log('Invoice normalized successfully!');
    console.log(`  Invoice ID: ${normalized.invoiceId}`);
    console.log(`  Invoice #: ${normalized.invoiceNumber}`);
    console.log(`  Subtotal: ${normalized.subtotal} ${normalized.currency}`);
    console.log(`  Tax total: ${normalized.taxTotal} ${normalized.currency}`);
    console.log(`  Total: ${normalized.total} ${normalized.currency}`);
    console.log(`  Normalized at: ${normalized.normalizedAt}`);
    if (normalized.signature) {
      console.log(`  Signature: ${normalized.signature.slice(0, 20)}...`);
    }

    // 2. Verify compliance before submission
    console.log('\nStep 2: Verifying compliance...');
    const verification = await essabu.einvoice.verification.verify(normalized.invoiceId);

    if (verification.isValid) {
      console.log('Invoice is compliant and ready for submission!');
    } else {
      console.error('Invoice is NOT compliant:');
      if (verification.errors) {
        for (const err of verification.errors) {
          console.error(`  - ${err}`);
        }
      }
      return; // Stop if not compliant
    }

    // 3. Submit to the government tax authority
    console.log('\nStep 3: Submitting to government...');
    const submission = await essabu.einvoice.submissions.submit(
      normalized.invoiceId,
      { source: 'erp', batchId: 'batch_2024_q1' },
    );

    console.log('Submission created!');
    console.log(`  Submission ID: ${submission.submissionId}`);
    console.log(`  Status: ${submission.statusLabel}`);
    console.log(`  Submitted at: ${submission.submittedAt}`);

    // 4. Poll for submission status
    console.log('\nStep 4: Checking submission status...');

    // In production, you would use webhooks instead of polling.
    // This is just for demonstration purposes.
    const maxAttempts = 5;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const status = await essabu.einvoice.submissions.checkStatus(
        submission.submissionId,
      );

      console.log(`  Attempt ${attempt}: ${status.statusLabel}`);

      if (status.status === 'accepted') {
        console.log('\nInvoice accepted by the government!');
        break;
      } else if (status.status === 'rejected') {
        console.error('\nInvoice rejected by the government:');
        if (status.errors) {
          for (const err of status.errors) {
            console.error(`  - ${err}`);
          }
        }
        break;
      }

      // Wait 2 seconds before next check
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // 5. Generate a compliance report
    console.log('\nStep 5: Generating compliance report...');
    const report = await essabu.einvoice.compliance.generateReport({
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      format: 'summary',
    });

    console.log('Compliance report generated!');
    console.log(`  Period: ${report.startDate} to ${report.endDate}`);
    console.log(`  Total invoices: ${report.totalInvoices}`);
    console.log(`  Compliant: ${report.compliantCount}`);
    console.log(`  Non-compliant: ${report.nonCompliantCount}`);
    console.log(`  Compliance rate: ${report.complianceRate}%`);
    if (report.downloadUrl) {
      console.log(`  Download: ${report.downloadUrl}`);
    }

    // 6. View statistics
    console.log('\nStep 6: Viewing e-invoice statistics...');
    const stats = await essabu.einvoice.statistics.get({
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      groupBy: 'month',
    });

    console.log('E-Invoice Statistics:');
    console.log(`  Total invoices: ${stats.totalInvoices}`);
    console.log(`  Total amount: ${stats.totalAmount} ${stats.currency}`);
    console.log(`  Total tax: ${stats.totalTax} ${stats.currency}`);
    console.log(`  Submitted: ${stats.submittedCount}`);
    console.log(`  Accepted: ${stats.acceptedCount}`);
    console.log(`  Rejected: ${stats.rejectedCount}`);
    console.log(`  Pending: ${stats.pendingCount}`);

    // 7. List all submissions
    console.log('\nStep 7: Listing recent submissions...');
    const submissions = await essabu.einvoice.submissions.list({
      page: 1,
      perPage: 10,
    });
    console.log(`Found ${(submissions as Record<string, unknown>)['totalElements']} submissions`);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation failed:');
      for (const [field, message] of Object.entries(error.fieldErrors)) {
        console.error(`  ${field}: ${message}`);
      }
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
