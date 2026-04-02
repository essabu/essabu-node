import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const BASE_PATH = '/reports';

export class ReportsApi extends BaseHrApi {
  async list(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(BASE_PATH, page));
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/${id}`);
  }

  async generate(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(BASE_PATH, data);
  }

  async download(id: string): Promise<ArrayBuffer> {
    return this.http.getBytes(`${BASE_PATH}/${id}/download`);
  }
}
