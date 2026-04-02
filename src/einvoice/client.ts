import type { HttpClientInterface } from '../common/models';
import { EInvoicesApi } from './api/einvoices';

/**
 * E-Invoice module client.
 */
export class EInvoiceClient {
  private _einvoices?: EInvoicesApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get einvoices(): EInvoicesApi {
    return (this._einvoices ??= new EInvoicesApi(this.httpClient));
  }
}
