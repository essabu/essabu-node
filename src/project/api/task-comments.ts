import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class TaskCommentsApi extends BaseProjectApi {
  async list(taskId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/tasks/${taskId}/comments`, params);
  }

  async get(taskId: string, commentId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/tasks/${taskId}/comments/${commentId}`);
  }

  async create(taskId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/tasks/${taskId}/comments`, data);
  }

  async update(taskId: string, commentId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/tasks/${taskId}/comments/${commentId}`, data);
  }

  async delete(taskId: string, commentId: string): Promise<void> {
    return this.http.delete(`/tasks/${taskId}/comments/${commentId}`);
  }
}
