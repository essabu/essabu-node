/**
 * HR module client. Provides access to all HR API resources.
 *
 * @example
 * ```ts
 * const hr = essabu.hr;
 * const employees = await hr.employees.list();
 * await hr.payrolls.calculate(payrollId);
 * ```
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { EmployeesApi } from './api/employees';
import { DepartmentsApi } from './api/departments';
import { PositionsApi } from './api/positions';
import { ContractsApi } from './api/contracts';
import { AttendanceApi } from './api/attendance';
import { LeavesApi } from './api/leaves';
import { ShiftsApi } from './api/shifts';
import { ShiftSchedulesApi } from './api/shift-schedules';
import { TrainingApi } from './api/training';
import { PayrollsApi } from './api/payrolls';
import { ExpensesApi } from './api/expenses';
import { RecruitmentApi } from './api/recruitment';
import { PerformanceApi } from './api/performance';
import { OnboardingApi } from './api/onboarding';
import { DocumentsApi } from './api/documents';
import { DisciplinaryApi } from './api/disciplinary';
import { BenefitsApi } from './api/benefits';
import { LoansApi } from './api/loans';
import { TimesheetsApi } from './api/timesheets';
import { SkillsApi } from './api/skills';
import { ReportsApi } from './api/reports';
import { WebhooksApi } from './api/webhooks';
import { ConfigApi } from './api/config';
import { HistoryApi } from './api/history';

export class HrClient {
  private readonly http: HttpClient;

  private _employees?: EmployeesApi;
  private _departments?: DepartmentsApi;
  private _positions?: PositionsApi;
  private _contracts?: ContractsApi;
  private _attendance?: AttendanceApi;
  private _leaves?: LeavesApi;
  private _shifts?: ShiftsApi;
  private _shiftSchedules?: ShiftSchedulesApi;
  private _training?: TrainingApi;
  private _payrolls?: PayrollsApi;
  private _expenses?: ExpensesApi;
  private _recruitment?: RecruitmentApi;
  private _performance?: PerformanceApi;
  private _onboarding?: OnboardingApi;
  private _documents?: DocumentsApi;
  private _disciplinary?: DisciplinaryApi;
  private _benefits?: BenefitsApi;
  private _loans?: LoansApi;
  private _timesheets?: TimesheetsApi;
  private _skills?: SkillsApi;
  private _reports?: ReportsApi;
  private _webhooks?: WebhooksApi;
  private _config?: ConfigApi;
  private _history?: HistoryApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/hr');
  }

  get employees(): EmployeesApi {
    return (this._employees ??= new EmployeesApi(this.http));
  }

  get departments(): DepartmentsApi {
    return (this._departments ??= new DepartmentsApi(this.http));
  }

  get positions(): PositionsApi {
    return (this._positions ??= new PositionsApi(this.http));
  }

  get contracts(): ContractsApi {
    return (this._contracts ??= new ContractsApi(this.http));
  }

  get attendance(): AttendanceApi {
    return (this._attendance ??= new AttendanceApi(this.http));
  }

  get leaves(): LeavesApi {
    return (this._leaves ??= new LeavesApi(this.http));
  }

  get shifts(): ShiftsApi {
    return (this._shifts ??= new ShiftsApi(this.http));
  }

  get shiftSchedules(): ShiftSchedulesApi {
    return (this._shiftSchedules ??= new ShiftSchedulesApi(this.http));
  }

  get training(): TrainingApi {
    return (this._training ??= new TrainingApi(this.http));
  }

  get payrolls(): PayrollsApi {
    return (this._payrolls ??= new PayrollsApi(this.http));
  }

  get expenses(): ExpensesApi {
    return (this._expenses ??= new ExpensesApi(this.http));
  }

  get recruitment(): RecruitmentApi {
    return (this._recruitment ??= new RecruitmentApi(this.http));
  }

  get performance(): PerformanceApi {
    return (this._performance ??= new PerformanceApi(this.http));
  }

  get onboarding(): OnboardingApi {
    return (this._onboarding ??= new OnboardingApi(this.http));
  }

  get documents(): DocumentsApi {
    return (this._documents ??= new DocumentsApi(this.http));
  }

  get disciplinary(): DisciplinaryApi {
    return (this._disciplinary ??= new DisciplinaryApi(this.http));
  }

  get benefits(): BenefitsApi {
    return (this._benefits ??= new BenefitsApi(this.http));
  }

  get loans(): LoansApi {
    return (this._loans ??= new LoansApi(this.http));
  }

  get timesheets(): TimesheetsApi {
    return (this._timesheets ??= new TimesheetsApi(this.http));
  }

  get skills(): SkillsApi {
    return (this._skills ??= new SkillsApi(this.http));
  }

  get reports(): ReportsApi {
    return (this._reports ??= new ReportsApi(this.http));
  }

  get webhooks(): WebhooksApi {
    return (this._webhooks ??= new WebhooksApi(this.http));
  }

  get config(): ConfigApi {
    return (this._config ??= new ConfigApi(this.http));
  }

  get history(): HistoryApi {
    return (this._history ??= new HistoryApi(this.http));
  }
}
