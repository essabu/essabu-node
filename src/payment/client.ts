/**
 * Payment module client. Provides access to payment processing,
 * subscriptions, lending, and KYC API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { PaymentIntentsApi } from './api/payment-intents';
import { PaymentAccountsApi } from './api/payment-accounts';
import { TransactionsApi } from './api/transactions';
import { RefundsApi } from './api/refunds';
import { SubscriptionsApi } from './api/subscriptions';
import { SubscriptionPlansApi } from './api/subscription-plans';
import { FinancialAccountsApi } from './api/financial-accounts';
import { LoanProductsApi } from './api/loan-products';
import { LoanApplicationsApi } from './api/loan-applications';
import { LoanRepaymentsApi } from './api/loan-repayments';
import { CollateralsApi } from './api/collaterals';
import { KycProfilesApi } from './api/kyc-profiles';
import { KycDocumentsApi } from './api/kyc-documents';
import { ReportsApi } from './api/reports';

export class PaymentClient {
  private readonly http: HttpClient;

  private _paymentIntents?: PaymentIntentsApi;
  private _paymentAccounts?: PaymentAccountsApi;
  private _transactions?: TransactionsApi;
  private _refunds?: RefundsApi;
  private _subscriptions?: SubscriptionsApi;
  private _subscriptionPlans?: SubscriptionPlansApi;
  private _financialAccounts?: FinancialAccountsApi;
  private _loanProducts?: LoanProductsApi;
  private _loanApplications?: LoanApplicationsApi;
  private _loanRepayments?: LoanRepaymentsApi;
  private _collaterals?: CollateralsApi;
  private _kycProfiles?: KycProfilesApi;
  private _kycDocuments?: KycDocumentsApi;
  private _reports?: ReportsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/payment');
  }

  get paymentIntents(): PaymentIntentsApi {
    return (this._paymentIntents ??= new PaymentIntentsApi(this.http));
  }

  get paymentAccounts(): PaymentAccountsApi {
    return (this._paymentAccounts ??= new PaymentAccountsApi(this.http));
  }

  get transactions(): TransactionsApi {
    return (this._transactions ??= new TransactionsApi(this.http));
  }

  get refunds(): RefundsApi {
    return (this._refunds ??= new RefundsApi(this.http));
  }

  get subscriptions(): SubscriptionsApi {
    return (this._subscriptions ??= new SubscriptionsApi(this.http));
  }

  get subscriptionPlans(): SubscriptionPlansApi {
    return (this._subscriptionPlans ??= new SubscriptionPlansApi(this.http));
  }

  get financialAccounts(): FinancialAccountsApi {
    return (this._financialAccounts ??= new FinancialAccountsApi(this.http));
  }

  get loanProducts(): LoanProductsApi {
    return (this._loanProducts ??= new LoanProductsApi(this.http));
  }

  get loanApplications(): LoanApplicationsApi {
    return (this._loanApplications ??= new LoanApplicationsApi(this.http));
  }

  get loanRepayments(): LoanRepaymentsApi {
    return (this._loanRepayments ??= new LoanRepaymentsApi(this.http));
  }

  get collaterals(): CollateralsApi {
    return (this._collaterals ??= new CollateralsApi(this.http));
  }

  get kycProfiles(): KycProfilesApi {
    return (this._kycProfiles ??= new KycProfilesApi(this.http));
  }

  get kycDocuments(): KycDocumentsApi {
    return (this._kycDocuments ??= new KycDocumentsApi(this.http));
  }

  get reports(): ReportsApi {
    return (this._reports ??= new ReportsApi(this.http));
  }
}
