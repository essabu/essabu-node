import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class ResourceAllocationsApi extends BaseProjectApi {
  async list(projectId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/projects/${projectId}/resource-allocations`, params);
  }

  async get(projectId: string, allocationId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/projects/${projectId}/resource-allocations/${allocationId}`);
  }

  async create(projectId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/projects/${projectId}/resource-allocations`, data);
  }

  async update(projectId: string, allocationId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/projects/${projectId}/resource-allocations/${allocationId}`, data);
  }

  async delete(projectId: string, allocationId: string): Promise<void> {
    return this.http.delete(`/projects/${projectId}/resource-allocations/${allocationId}`);
  }
}
