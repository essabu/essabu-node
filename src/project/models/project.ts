import type { BaseResource } from '../../common/models';

export interface Project extends BaseResource {
  name: string;
  code?: string;
  description?: string;
  customerId?: string;
  customerName?: string;
  managerId?: string;
  managerName?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  spent: number;
  currency: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  progress: number;
  memberCount: number;
  taskCount: number;
}

export interface CreateProjectRequest {
  name: string;
  code?: string;
  description?: string;
  customerId?: string;
  managerId?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  currency?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  code?: string;
  description?: string;
  customerId?: string;
  managerId?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
}
