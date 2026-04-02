import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class MaintenanceSchedulesApi extends BaseAssetApi {
  async list(assetId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/assets/${assetId}/maintenance-schedules`, params);
  }

  async get(assetId: string, scheduleId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/assets/${assetId}/maintenance-schedules/${scheduleId}`);
  }

  async create(assetId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/assets/${assetId}/maintenance-schedules`, data);
  }

  async update(assetId: string, scheduleId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/assets/${assetId}/maintenance-schedules/${scheduleId}`, data);
  }

  async delete(assetId: string, scheduleId: string): Promise<void> {
    return this.http.delete(`/assets/${assetId}/maintenance-schedules/${scheduleId}`);
  }
}
