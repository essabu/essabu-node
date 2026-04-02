import type { HttpClient } from '../../common/http-client';
import type { PageResponse } from '../../common/models';

export class BaseCrudApi {
  constructor(
    protected readonly http: HttpClient,
    protected readonly resourcePath: string,
  ) {}

  async list(params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(this.resourcePath, params);
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${this.resourcePath}/${id}`);
  }

  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(this.resourcePath, data);
  }

  async update(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`${this.resourcePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete(`${this.resourcePath}/${id}`);
  }
}
