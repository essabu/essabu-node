import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const BASE_PATH = '/history';

export class HistoryApi extends BaseHrApi {
  async list(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(BASE_PATH, page));
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/${id}`);
  }
}
