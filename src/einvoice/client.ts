/**
 * E-Invoice module client. Provides access to invoice normalization,
 * submission, verification, compliance, and statistics API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { InvoicesApi } from './api/invoices';
import { SubmissionsApi } from './api/submissions';
import { VerificationApi } from './api/verification';
import { ComplianceApi } from './api/compliance';
import { StatisticsApi } from './api/statistics';

export class EInvoiceClient {
  private readonly http: HttpClient;

  private _invoices?: InvoicesApi;
  private _submissions?: SubmissionsApi;
  private _verification?: VerificationApi;
  private _compliance?: ComplianceApi;
  private _statistics?: StatisticsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/einvoice');
  }

  get invoices(): InvoicesApi {
    return (this._invoices ??= new InvoicesApi(this.http));
  }

  get submissions(): SubmissionsApi {
    return (this._submissions ??= new SubmissionsApi(this.http));
  }

  get verification(): VerificationApi {
    return (this._verification ??= new VerificationApi(this.http));
  }

  get compliance(): ComplianceApi {
    return (this._compliance ??= new ComplianceApi(this.http));
  }

  get statistics(): StatisticsApi {
    return (this._statistics ??= new StatisticsApi(this.http));
  }
}
