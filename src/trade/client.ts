import type { HttpClientInterface } from '../common/models';
import { CustomersApi } from './api/customers';
import { SuppliersApi } from './api/suppliers';
import { InvoicesApi } from './api/invoices';
import { PurchaseOrdersApi } from './api/purchase-orders';
import { ProductsApi } from './api/products';
import { QuotationsApi } from './api/quotations';

/**
 * Trade module client.
 */
export class TradeClient {
  private _customers?: CustomersApi;
  private _suppliers?: SuppliersApi;
  private _invoices?: InvoicesApi;
  private _purchaseOrders?: PurchaseOrdersApi;
  private _products?: ProductsApi;
  private _quotations?: QuotationsApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get customers(): CustomersApi {
    return (this._customers ??= new CustomersApi(this.httpClient));
  }

  get suppliers(): SuppliersApi {
    return (this._suppliers ??= new SuppliersApi(this.httpClient));
  }

  get invoices(): InvoicesApi {
    return (this._invoices ??= new InvoicesApi(this.httpClient));
  }

  get purchaseOrders(): PurchaseOrdersApi {
    return (this._purchaseOrders ??= new PurchaseOrdersApi(this.httpClient));
  }

  get products(): ProductsApi {
    return (this._products ??= new ProductsApi(this.httpClient));
  }

  get quotations(): QuotationsApi {
    return (this._quotations ??= new QuotationsApi(this.httpClient));
  }
}
