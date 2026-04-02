import type { BaseResource } from '../../common/models';

export interface ProjectTask extends BaseResource {
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  assigneeId?: string;
  assigneeName?: string;
  priority: string;
  priorityLabel: string;
  priorityColor: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  dueDate?: string;
  completedAt?: string;
  estimatedHours?: number;
  loggedHours: number;
  parentId?: string;
  tags?: string[];
}

export interface CreateProjectTaskRequest {
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  priority?: string;
  dueDate?: string;
  estimatedHours?: number;
  parentId?: string;
  tags?: string[];
}

export interface UpdateProjectTaskRequest {
  title?: string;
  description?: string;
  assigneeId?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
  estimatedHours?: number;
  parentId?: string;
  tags?: string[];
}
