/**
 * Asset module client. Provides access to asset management,
 * depreciation, maintenance, and fleet management API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { AssetsApi } from './api/assets';
import { DepreciationsApi } from './api/depreciations';
import { MaintenanceSchedulesApi } from './api/maintenance-schedules';
import { MaintenanceLogsApi } from './api/maintenance-logs';
import { VehiclesApi } from './api/vehicles';
import { FuelLogsApi } from './api/fuel-logs';
import { TripLogsApi } from './api/trip-logs';

export class AssetClient {
  private readonly http: HttpClient;

  private _assets?: AssetsApi;
  private _depreciations?: DepreciationsApi;
  private _maintenanceSchedules?: MaintenanceSchedulesApi;
  private _maintenanceLogs?: MaintenanceLogsApi;
  private _vehicles?: VehiclesApi;
  private _fuelLogs?: FuelLogsApi;
  private _tripLogs?: TripLogsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/asset');
  }

  get assets(): AssetsApi {
    return (this._assets ??= new AssetsApi(this.http));
  }

  get depreciations(): DepreciationsApi {
    return (this._depreciations ??= new DepreciationsApi(this.http));
  }

  get maintenanceSchedules(): MaintenanceSchedulesApi {
    return (this._maintenanceSchedules ??= new MaintenanceSchedulesApi(this.http));
  }

  get maintenanceLogs(): MaintenanceLogsApi {
    return (this._maintenanceLogs ??= new MaintenanceLogsApi(this.http));
  }

  get vehicles(): VehiclesApi {
    return (this._vehicles ??= new VehiclesApi(this.http));
  }

  get fuelLogs(): FuelLogsApi {
    return (this._fuelLogs ??= new FuelLogsApi(this.http));
  }

  get tripLogs(): TripLogsApi {
    return (this._tripLogs ??= new TripLogsApi(this.http));
  }
}
