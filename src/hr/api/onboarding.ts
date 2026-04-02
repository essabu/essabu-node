import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const BASE_PATH = '/onboarding-plans';

export class OnboardingApi extends BaseHrApi {
  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(BASE_PATH, data);
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/${id}`);
  }

  async list(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(BASE_PATH, page));
  }

  async update(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${BASE_PATH}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete(`${BASE_PATH}/${id}`);
  }
}
