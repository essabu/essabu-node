import type { BaseResource } from '../../common/models';

export interface Leave extends BaseResource {
  employeeId: string;
  employeeName: string;
  type: string;
  typeLabel: string;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: string;
  rejectedReason?: string;
}

export interface CreateLeaveRequest {
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface UpdateLeaveRequest {
  type?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}

export interface ApproveLeaveRequest {
  comment?: string;
}

export interface RejectLeaveRequest {
  reason: string;
}
