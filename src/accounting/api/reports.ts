import { BaseApi } from '../../common/models';
import type { BalanceSheet, IncomeStatement, TrialBalance, ReportPeriod } from '../models';

const BASE_PATH = '/api/accounting/reports';

export class ReportsApi extends BaseApi {
  async balanceSheet(date?: string): Promise<BalanceSheet> {
    return this.get<BalanceSheet>(`${BASE_PATH}/balance-sheet`, date ? { date } : undefined);
  }

  async incomeStatement(period: ReportPeriod): Promise<IncomeStatement> {
    return this.get<IncomeStatement>(`${BASE_PATH}/income-statement`, {
      startDate: period.startDate,
      endDate: period.endDate,
    });
  }

  async trialBalance(date?: string): Promise<TrialBalance> {
    return this.get<TrialBalance>(`${BASE_PATH}/trial-balance`, date ? { date } : undefined);
  }
}
