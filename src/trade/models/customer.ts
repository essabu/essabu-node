import type { BaseResource } from '../../common/models';

export interface Customer extends BaseResource {
  name: string;
  email?: string;
  phone?: string;
  taxId?: string;
  type: string;
  typeLabel: string;
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

export interface CreateCustomerRequest {
  name: string;
  email?: string;
  phone?: string;
  taxId?: string;
  type?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  contactPerson?: string;
  notes?: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
  taxId?: string;
  type?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  contactPerson?: string;
  notes?: string;
}
