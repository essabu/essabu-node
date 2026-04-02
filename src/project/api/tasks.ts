import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class TasksApi extends BaseProjectApi {
  async list(projectId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/projects/${projectId}/tasks`, params);
  }

  async get(projectId: string, taskId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/projects/${projectId}/tasks/${taskId}`);
  }

  async create(projectId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/projects/${projectId}/tasks`, data);
  }

  async update(projectId: string, taskId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/projects/${projectId}/tasks/${taskId}`, data);
  }

  async delete(projectId: string, taskId: string): Promise<void> {
    return this.http.delete(`/projects/${projectId}/tasks/${taskId}`);
  }
}
