import type { BaseResource } from '../../common/models';

export interface Timesheet extends BaseResource {
  projectId: string;
  projectName: string;
  taskId?: string;
  taskTitle?: string;
  userId: string;
  userName: string;
  date: string;
  hours: number;
  description?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  billable: boolean;
  rate?: number;
  amount?: number;
  approvedBy?: string;
  approvedAt?: string;
}

export interface CreateTimesheetRequest {
  projectId: string;
  taskId?: string;
  date: string;
  hours: number;
  description?: string;
  billable?: boolean;
}

export interface UpdateTimesheetRequest {
  date?: string;
  hours?: number;
  description?: string;
  billable?: boolean;
  taskId?: string;
}
