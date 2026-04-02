import type { BaseResource } from '../../common/models';

export interface PayrollRun extends BaseResource {
  period: string;
  month: number;
  year: number;
  status: string;
  statusLabel: string;
  statusColor: string;
  totalGross: number;
  totalNet: number;
  totalDeductions: number;
  totalContributions: number;
  currency: string;
  employeeCount: number;
  processedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface PaySlip extends BaseResource {
  payrollRunId: string;
  employeeId: string;
  employeeName: string;
  period: string;
  grossSalary: number;
  netSalary: number;
  deductions: number;
  contributions: number;
  currency: string;
  lines: PaySlipLine[];
}

export interface PaySlipLine {
  label: string;
  type: 'earning' | 'deduction' | 'contribution';
  amount: number;
  rate?: number;
  base?: number;
}

export interface CreatePayrollRunRequest {
  month: number;
  year: number;
}

export interface ProcessPayrollRequest {
  confirm?: boolean;
}
