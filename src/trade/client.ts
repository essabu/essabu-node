/**
 * Trade module client. Provides access to CRM, sales, purchasing,
 * inventory, and warehousing API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { CustomersApi } from './api/customers';
import { ProductsApi } from './api/products';
import { SalesOrdersApi } from './api/sales-orders';
import { DeliveriesApi } from './api/deliveries';
import { ReceiptsApi } from './api/receipts';
import { SuppliersApi } from './api/suppliers';
import { PurchaseOrdersApi } from './api/purchase-orders';
import { InventoryApi } from './api/inventory';
import { StockApi } from './api/stock';
import { WarehousesApi } from './api/warehouses';
import { ContactsApi } from './api/contacts';
import { OpportunitiesApi } from './api/opportunities';
import { ActivitiesApi } from './api/activities';
import { CampaignsApi } from './api/campaigns';
import { ContractsApi } from './api/contracts';
import { DocumentsApi } from './api/documents';

export class TradeClient {
  private readonly http: HttpClient;

  private _customers?: CustomersApi;
  private _products?: ProductsApi;
  private _salesOrders?: SalesOrdersApi;
  private _deliveries?: DeliveriesApi;
  private _receipts?: ReceiptsApi;
  private _suppliers?: SuppliersApi;
  private _purchaseOrders?: PurchaseOrdersApi;
  private _inventory?: InventoryApi;
  private _stock?: StockApi;
  private _warehouses?: WarehousesApi;
  private _contacts?: ContactsApi;
  private _opportunities?: OpportunitiesApi;
  private _activities?: ActivitiesApi;
  private _campaigns?: CampaignsApi;
  private _contracts?: ContractsApi;
  private _documents?: DocumentsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/trade');
  }

  get customers(): CustomersApi {
    return (this._customers ??= new CustomersApi(this.http));
  }

  get products(): ProductsApi {
    return (this._products ??= new ProductsApi(this.http));
  }

  get salesOrders(): SalesOrdersApi {
    return (this._salesOrders ??= new SalesOrdersApi(this.http));
  }

  get deliveries(): DeliveriesApi {
    return (this._deliveries ??= new DeliveriesApi(this.http));
  }

  get receipts(): ReceiptsApi {
    return (this._receipts ??= new ReceiptsApi(this.http));
  }

  get suppliers(): SuppliersApi {
    return (this._suppliers ??= new SuppliersApi(this.http));
  }

  get purchaseOrders(): PurchaseOrdersApi {
    return (this._purchaseOrders ??= new PurchaseOrdersApi(this.http));
  }

  get inventory(): InventoryApi {
    return (this._inventory ??= new InventoryApi(this.http));
  }

  get stock(): StockApi {
    return (this._stock ??= new StockApi(this.http));
  }

  get warehouses(): WarehousesApi {
    return (this._warehouses ??= new WarehousesApi(this.http));
  }

  get contacts(): ContactsApi {
    return (this._contacts ??= new ContactsApi(this.http));
  }

  get opportunities(): OpportunitiesApi {
    return (this._opportunities ??= new OpportunitiesApi(this.http));
  }

  get activities(): ActivitiesApi {
    return (this._activities ??= new ActivitiesApi(this.http));
  }

  get campaigns(): CampaignsApi {
    return (this._campaigns ??= new CampaignsApi(this.http));
  }

  get contracts(): ContractsApi {
    return (this._contracts ??= new ContractsApi(this.http));
  }

  get documents(): DocumentsApi {
    return (this._documents ??= new DocumentsApi(this.http));
  }
}
