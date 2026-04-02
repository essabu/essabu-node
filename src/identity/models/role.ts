import type { BaseResource } from '../../common/models';

export interface Role extends BaseResource {
  name: string;
  slug: string;
  description?: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

export interface CreateRoleRequest {
  name: string;
  slug?: string;
  description?: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface Permission {
  id: string;
  name: string;
  slug: string;
  group: string;
  description?: string;
}
