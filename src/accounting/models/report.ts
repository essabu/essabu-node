export interface BalanceSheet {
  date: string;
  currency: string;
  assets: ReportSection;
  liabilities: ReportSection;
  equity: ReportSection;
  totalAssets: number;
  totalLiabilitiesAndEquity: number;
}

export interface IncomeStatement {
  startDate: string;
  endDate: string;
  currency: string;
  revenue: ReportSection;
  expenses: ReportSection;
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
}

export interface TrialBalance {
  date: string;
  currency: string;
  accounts: TrialBalanceAccount[];
  totalDebit: number;
  totalCredit: number;
}

export interface TrialBalanceAccount {
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface ReportSection {
  label: string;
  items: ReportLineItem[];
  total: number;
}

export interface ReportLineItem {
  accountId: string;
  accountCode: string;
  accountName: string;
  amount: number;
}

export interface ReportPeriod {
  startDate: string;
  endDate: string;
}
