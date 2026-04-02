import type { BaseResource } from '../../common/models';

export interface Tax extends BaseResource {
  name: string;
  code: string;
  rate: number;
  type: string;
  typeLabel: string;
  isActive: boolean;
  isDefault: boolean;
  description?: string;
}

export interface CreateTaxRequest {
  name: string;
  code: string;
  rate: number;
  type: string;
  description?: string;
  isDefault?: boolean;
}

export interface UpdateTaxRequest {
  name?: string;
  rate?: number;
  description?: string;
  isActive?: boolean;
  isDefault?: boolean;
}
