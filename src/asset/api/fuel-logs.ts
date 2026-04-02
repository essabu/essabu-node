import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class FuelLogsApi extends BaseAssetApi {
  async list(vehicleId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/vehicles/${vehicleId}/fuel-logs`, params);
  }

  async get(vehicleId: string, fuelLogId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/vehicles/${vehicleId}/fuel-logs/${fuelLogId}`);
  }

  async create(vehicleId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/vehicles/${vehicleId}/fuel-logs`, data);
  }
}
