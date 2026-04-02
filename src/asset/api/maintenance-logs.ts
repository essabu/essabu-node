import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class MaintenanceLogsApi extends BaseAssetApi {
  async list(assetId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/assets/${assetId}/maintenance-logs`, params);
  }

  async get(assetId: string, logId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/assets/${assetId}/maintenance-logs/${logId}`);
  }

  async create(assetId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/assets/${assetId}/maintenance-logs`, data);
  }
}
