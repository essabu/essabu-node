# HR Module

Human Resources management: employees, departments, contracts, payroll, attendance, and leaves.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `EmployeesApi` | `/api/hr/employees` | Employee lifecycle management |
| `DepartmentsApi` | `/api/hr/departments` | Organizational departments |
| `ContractsApi` | `/api/hr/contracts` | Employment contracts |
| `PayrollApi` | `/api/hr/payroll` | Payroll runs and processing |
| `AttendanceApi` | `/api/hr/attendance` | Time and attendance tracking |
| `LeavesApi` | `/api/hr/leaves` | Leave requests and approvals |

## EmployeesApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Employee>>
    // GET /api/hr/employees

async retrieve(id: string): Promise<Employee>
    // GET /api/hr/employees/{id}

async create(data: CreateEmployeeRequest): Promise<Employee>
    // POST /api/hr/employees

async update(id: string, data: UpdateEmployeeRequest): Promise<Employee>
    // PATCH /api/hr/employees/{id}

async remove(id: string): Promise<void>
    // DELETE /api/hr/employees/{id}

async activate(id: string): Promise<Employee>
    // POST /api/hr/employees/{id}/activate

async deactivate(id: string): Promise<Employee>
    // POST /api/hr/employees/{id}/deactivate

async terminate(id: string, terminationDate: string, reason?: string): Promise<Employee>
    // POST /api/hr/employees/{id}/terminate
```

## DepartmentsApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Department>>
async retrieve(id: string): Promise<Department>
async create(data: CreateDepartmentRequest): Promise<Department>
async update(id: string, data: UpdateDepartmentRequest): Promise<Department>
async remove(id: string): Promise<void>
```

## ContractsApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Contract>>
async retrieve(id: string): Promise<Contract>
async create(data: CreateContractRequest): Promise<Contract>
async update(id: string, data: UpdateContractRequest): Promise<Contract>
async remove(id: string): Promise<void>

async sign(id: string): Promise<Contract>
    // POST /api/hr/contracts/{id}/sign

async terminate(id: string, reason: string): Promise<Contract>
    // POST /api/hr/contracts/{id}/terminate

async renew(id: string, endDate: string): Promise<Contract>
    // POST /api/hr/contracts/{id}/renew
```

## PayrollApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<PayrollRun>>
    // GET /api/hr/payroll/runs

async retrieve(id: string): Promise<PayrollRun>
    // GET /api/hr/payroll/runs/{id}

async create(data: CreatePayrollRunRequest): Promise<PayrollRun>
    // POST /api/hr/payroll/runs

async process(id: string, data?: ProcessPayrollRequest): Promise<PayrollRun>
    // POST /api/hr/payroll/runs/{id}/process

async approve(id: string): Promise<PayrollRun>
    // POST /api/hr/payroll/runs/{id}/approve

async listSlips(runId: string, params?: PageRequest): Promise<PageResponse<PaySlip>>
    // GET /api/hr/payroll/runs/{runId}/slips

async retrieveSlip(runId: string, slipId: string): Promise<PaySlip>
    // GET /api/hr/payroll/runs/{runId}/slips/{slipId}
```

## AttendanceApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Attendance>>
async retrieve(id: string): Promise<Attendance>
async create(data: CreateAttendanceRequest): Promise<Attendance>
async update(id: string, data: UpdateAttendanceRequest): Promise<Attendance>
async remove(id: string): Promise<void>

async checkIn(employeeId: string): Promise<Attendance>
    // POST /api/hr/attendance/check-in

async checkOut(employeeId: string): Promise<Attendance>
    // POST /api/hr/attendance/check-out
```

## LeavesApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Leave>>
async retrieve(id: string): Promise<Leave>
async create(data: CreateLeaveRequest): Promise<Leave>
async update(id: string, data: UpdateLeaveRequest): Promise<Leave>
async remove(id: string): Promise<void>

async approve(id: string, data?: ApproveLeaveRequest): Promise<Leave>
    // POST /api/hr/leaves/{id}/approve

async reject(id: string, data: RejectLeaveRequest): Promise<Leave>
    // POST /api/hr/leaves/{id}/reject

async cancel(id: string): Promise<Leave>
    // POST /api/hr/leaves/{id}/cancel
```

## Code Examples

### Employee Management

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

// List employees
const employees = await client.hr.employees.list({ page: 1, pageSize: 20 });

// Create
const emp = await client.hr.employees.create({
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@company.com',
  departmentId: 'dept-uuid',
  hireDate: '2026-01-15',
});

// Lifecycle actions
await client.hr.employees.activate(emp.id);
await client.hr.employees.deactivate(emp.id);
await client.hr.employees.terminate(emp.id, '2026-12-31', 'Resignation');
```

### Payroll

```typescript
const run = await client.hr.payroll.create({ period: '2026-03', departmentId: 'dept-uuid' });
await client.hr.payroll.process(run.id);
await client.hr.payroll.approve(run.id);
const slips = await client.hr.payroll.listSlips(run.id);
```

### Leaves

```typescript
const leave = await client.hr.leaves.create({
  employeeId: 'emp-uuid',
  type: 'annual',
  startDate: '2026-04-01',
  endDate: '2026-04-05',
});
await client.hr.leaves.approve(leave.id);
```

### Attendance

```typescript
await client.hr.attendance.checkIn('emp-uuid');
await client.hr.attendance.checkOut('emp-uuid');
```

### Contracts

```typescript
const contract = await client.hr.contracts.create({
  employeeId: 'emp-uuid',
  type: 'permanent',
  startDate: '2026-01-01',
  salary: 60000,
});
await client.hr.contracts.sign(contract.id);
await client.hr.contracts.renew(contract.id, '2028-01-01');
```
