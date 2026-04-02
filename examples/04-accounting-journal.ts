/**
 * Example 4: Accounting - Journal Entries & Reports
 * Create journal entries and generate reports.
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
   * Create a double-entry journal entry with a date, description, and balanced debit/credit
   * lines. Each line references an account ID and specifies either a debit or credit amount.
   * The total debits must equal total credits. Returns the created JournalEntry with a
   * generated reference number. Throws a ValidationError if the entry is unbalanced.
   */
  const entry = await essabu.accounting.journalEntries.create({
    date: '2024-03-15',
    description: 'Client payment received',
    lines: [
      { accountId: 'acc-bank', debit: 5000, credit: 0, description: 'Bank deposit' },
      { accountId: 'acc-revenue', debit: 0, credit: 5000, description: 'Service revenue' },
    ],
  });

  console.log(`Journal entry ${entry.reference}: Debit=$${entry.totalDebit}, Credit=$${entry.totalCredit}`);

  /**
   * Post the journal entry to make it permanent in the general ledger. Posted entries
   * become immutable and affect account balances in financial reports. Returns the
   * updated JournalEntry with its status changed to "posted". Throws a ValidationError
   * if the entry is already posted.
   */
  await essabu.accounting.journalEntries.post_(entry.id);
  console.log('Entry posted');

  /**
   * Generate a balance sheet report as of a specific date. Returns the BalanceSheet
   * object with total assets, liabilities, and equity computed from all posted journal
   * entries up to the given date. Throws a NotFoundError if no fiscal year covers
   * the requested date.
   */
  const balanceSheet = await essabu.accounting.reports.balanceSheet('2024-03-31');
  console.log(`Total Assets: $${balanceSheet.totalAssets}`);

  /**
   * Generate an income statement for a date range defined by startDate and endDate.
   * Returns revenue, expenses, and net income for the specified period. Only posted
   * journal entries within the range are included in the calculation.
   */
  const income = await essabu.accounting.reports.incomeStatement({
    startDate: '2024-01-01',
    endDate: '2024-03-31',
  });
  console.log(`Net Income: $${income.netIncome}`);

  /**
   * Generate a trial balance as of a specific date, listing all accounts with their
   * cumulative debit and credit totals. The total debits should equal total credits
   * if the books are balanced. Returns the TrialBalance object with account-level
   * detail and summary totals.
   */
  const trial = await essabu.accounting.reports.trialBalance('2024-03-31');
  console.log(`Trial balance: Debit=$${trial.totalDebit}, Credit=$${trial.totalCredit}`);
}

main().catch(console.error);
