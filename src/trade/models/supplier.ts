import type { BaseResource } from '../../common/models';

export interface Supplier extends BaseResource {
  name: string;
  email?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  contactPerson?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  balance: number;
  currency: string;
  notes?: string;
}

export interface CreateSupplierRequest {
  name: string;
  email?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  contactPerson?: string;
  notes?: string;
}

export interface UpdateSupplierRequest {
  name?: string;
  email?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  contactPerson?: string;
  notes?: string;
}
