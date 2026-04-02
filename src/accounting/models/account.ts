import type { BaseResource } from '../../common/models';

export interface Account extends BaseResource {
  code: string;
  name: string;
  type: string;
  typeLabel: string;
  parentId?: string;
  parentName?: string;
  balance: number;
  currency: string;
  isActive: boolean;
  description?: string;
  level: number;
}

export interface CreateAccountRequest {
  code: string;
  name: string;
  type: string;
  parentId?: string;
  currency?: string;
  description?: string;
}

export interface UpdateAccountRequest {
  name?: string;
  parentId?: string;
  description?: string;
  isActive?: boolean;
}
