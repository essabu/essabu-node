import { BaseAssetApi } from './base';
import type { PageResponse } from '../../common/models';

export class DepreciationsApi extends BaseAssetApi {
  async list(assetId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/assets/${assetId}/depreciations`, params);
  }

  async get(assetId: string, depreciationId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/assets/${assetId}/depreciations/${depreciationId}`);
  }

  async create(assetId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/assets/${assetId}/depreciations`, data);
  }
}
