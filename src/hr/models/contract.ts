import type { BaseResource } from '../../common/models';

export interface Contract extends BaseResource {
  employeeId: string;
  employeeName: string;
  type: string;
  typeLabel: string;
  startDate: string;
  endDate?: string;
  salary: number;
  currency: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  position?: string;
  departmentId?: string;
  departmentName?: string;
  trialPeriodEnd?: string;
  signedAt?: string;
  terminatedAt?: string;
  terminationReason?: string;
}

export interface CreateContractRequest {
  employeeId: string;
  type: string;
  startDate: string;
  endDate?: string;
  salary: number;
  currency?: string;
  position?: string;
  departmentId?: string;
  trialPeriodEnd?: string;
}

export interface UpdateContractRequest {
  type?: string;
  startDate?: string;
  endDate?: string;
  salary?: number;
  currency?: string;
  position?: string;
  departmentId?: string;
  trialPeriodEnd?: string;
  terminationReason?: string;
}
