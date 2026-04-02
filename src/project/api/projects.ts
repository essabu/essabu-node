import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class ProjectsApi extends BaseProjectApi {
  async list(params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get('/projects', params);
  }

  async get(projectId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/projects/${projectId}`);
  }

  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post('/projects', data);
  }

  async update(projectId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/projects/${projectId}`, data);
  }

  async delete(projectId: string): Promise<void> {
    return this.http.delete(`/projects/${projectId}`);
  }
}
