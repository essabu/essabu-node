import type { HttpClientInterface } from '../common/models';
import { EmployeesApi } from './api/employees';
import { ContractsApi } from './api/contracts';
import { LeavesApi } from './api/leaves';
import { PayrollApi } from './api/payroll';
import { DepartmentsApi } from './api/departments';
import { AttendanceApi } from './api/attendance';

/**
 * HR module client.
 * Provides access to employees, contracts, leaves, payroll, departments, and attendance.
 */
export class HrClient {
  private _employees?: EmployeesApi;
  private _contracts?: ContractsApi;
  private _leaves?: LeavesApi;
  private _payroll?: PayrollApi;
  private _departments?: DepartmentsApi;
  private _attendance?: AttendanceApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get employees(): EmployeesApi {
    return (this._employees ??= new EmployeesApi(this.httpClient));
  }

  get contracts(): ContractsApi {
    return (this._contracts ??= new ContractsApi(this.httpClient));
  }

  get leaves(): LeavesApi {
    return (this._leaves ??= new LeavesApi(this.httpClient));
  }

  get payroll(): PayrollApi {
    return (this._payroll ??= new PayrollApi(this.httpClient));
  }

  get departments(): DepartmentsApi {
    return (this._departments ??= new DepartmentsApi(this.httpClient));
  }

  get attendance(): AttendanceApi {
    return (this._attendance ??= new AttendanceApi(this.httpClient));
  }
}
