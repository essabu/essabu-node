import type { HttpClientInterface } from '../common/models';
import { PaymentsApi } from './api/payments';
import { BankAccountsApi } from './api/bank-accounts';
import { TransactionsApi } from './api/transactions';

/**
 * Payment module client.
 */
export class PaymentClient {
  private _payments?: PaymentsApi;
  private _bankAccounts?: BankAccountsApi;
  private _transactions?: TransactionsApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get payments(): PaymentsApi {
    return (this._payments ??= new PaymentsApi(this.httpClient));
  }

  get bankAccounts(): BankAccountsApi {
    return (this._bankAccounts ??= new BankAccountsApi(this.httpClient));
  }

  get transactions(): TransactionsApi {
    return (this._transactions ??= new TransactionsApi(this.httpClient));
  }
}
