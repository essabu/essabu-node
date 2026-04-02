import type { BaseResource } from '../../common/models';

export interface Transaction extends BaseResource {
  bankAccountId: string;
  bankAccountName: string;
  type: string;
  typeLabel: string;
  amount: number;
  currency: string;
  date: string;
  description?: string;
  reference?: string;
  category?: string;
  isReconciled: boolean;
  reconciledAt?: string;
  paymentId?: string;
}

export interface ReconcileTransactionRequest {
  paymentId: string;
}
