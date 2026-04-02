import type { BaseResource } from '../../common/models';

export interface Department extends BaseResource {
  name: string;
  code?: string;
  description?: string;
  parentId?: string;
  parentName?: string;
  managerId?: string;
  managerName?: string;
  employeeCount: number;
}

export interface CreateDepartmentRequest {
  name: string;
  code?: string;
  description?: string;
  parentId?: string;
  managerId?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  code?: string;
  description?: string;
  parentId?: string;
  managerId?: string;
}
