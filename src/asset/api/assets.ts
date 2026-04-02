import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class AssetsApi extends BaseAssetApi {
  async list(params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get('/assets', params);
  }

  async get(assetId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/assets/${assetId}`);
  }

  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post('/assets', data);
  }

  async update(assetId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/assets/${assetId}`, data);
  }

  async delete(assetId: string): Promise<void> {
    return this.http.delete(`/assets/${assetId}`);
  }
}
