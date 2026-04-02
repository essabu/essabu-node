/**
 * Example 4: Accounting - Journal Entries & Reports
 * Create journal entries and generate reports.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a journal entry
  const entry = await essabu.accounting.journalEntries.create({
    date: '2024-03-15',
    description: 'Client payment received',
    lines: [
      { accountId: 'acc-bank', debit: 5000, credit: 0, description: 'Bank deposit' },
      { accountId: 'acc-revenue', debit: 0, credit: 5000, description: 'Service revenue' },
    ],
  });

  console.log(`Journal entry ${entry.reference}: Debit=$${entry.totalDebit}, Credit=$${entry.totalCredit}`);

  // Post the entry
  await essabu.accounting.journalEntries.post_(entry.id);
  console.log('Entry posted');

  // Generate balance sheet
  const balanceSheet = await essabu.accounting.reports.balanceSheet('2024-03-31');
  console.log(`Total Assets: $${balanceSheet.totalAssets}`);

  // Generate income statement
  const income = await essabu.accounting.reports.incomeStatement({
    startDate: '2024-01-01',
    endDate: '2024-03-31',
  });
  console.log(`Net Income: $${income.netIncome}`);

  // Trial balance
  const trial = await essabu.accounting.reports.trialBalance('2024-03-31');
  console.log(`Trial balance: Debit=$${trial.totalDebit}, Credit=$${trial.totalCredit}`);
}

main().catch(console.error);
