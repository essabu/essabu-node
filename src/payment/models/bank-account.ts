import type { BaseResource } from '../../common/models';

export interface BankAccount extends BaseResource {
  name: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
  currency: string;
  balance: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface CreateBankAccountRequest {
  name: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  swift?: string;
  currency?: string;
  isDefault?: boolean;
}

export interface UpdateBankAccountRequest {
  name?: string;
  bankName?: string;
  iban?: string;
  swift?: string;
  isDefault?: boolean;
  isActive?: boolean;
}
