import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class VehiclesApi extends BaseAssetApi {
  async list(params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get('/vehicles', params);
  }

  async get(vehicleId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/vehicles/${vehicleId}`);
  }

  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post('/vehicles', data);
  }

  async update(vehicleId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/vehicles/${vehicleId}`, data);
  }

  async delete(vehicleId: string): Promise<void> {
    return this.http.delete(`/vehicles/${vehicleId}`);
  }
}
