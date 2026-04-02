import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class TripLogsApi extends BaseAssetApi {
  async list(vehicleId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/vehicles/${vehicleId}/trip-logs`, params);
  }

  async get(vehicleId: string, tripLogId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/vehicles/${vehicleId}/trip-logs/${tripLogId}`);
  }

  async create(vehicleId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/vehicles/${vehicleId}/trip-logs`, data);
  }
}
