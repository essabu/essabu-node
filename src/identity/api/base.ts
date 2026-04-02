import type { HttpClient } from '../../common/http-client';
import type { PageResponse } from '../../common/models';

export class CrudApi<T> {
  constructor(
    protected readonly http: HttpClient,
    protected readonly basePath: string,
  ) {}

  async list(params?: Record<string, string | number>): Promise<PageResponse<T>> {
    const queryParams: Record<string, unknown> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) queryParams[key] = value;
      }
    }
    return this.http.get(
      this.basePath,
      Object.keys(queryParams).length > 0 ? queryParams : undefined,
    );
  }

  async get(id: string): Promise<T> {
    return this.http.get(`${this.basePath}/${id}`);
  }

  async create(data: Record<string, unknown>): Promise<T> {
    return this.http.post(this.basePath, data);
  }

  async update(id: string, data: Record<string, unknown>): Promise<T> {
    return this.http.patch(`${this.basePath}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`);
  }
}
