import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class MilestonesApi extends BaseProjectApi {
  async list(projectId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/projects/${projectId}/milestones`, params);
  }

  async get(projectId: string, milestoneId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/projects/${projectId}/milestones/${milestoneId}`);
  }

  async create(projectId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/projects/${projectId}/milestones`, data);
  }

  async update(projectId: string, milestoneId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.patch(`/projects/${projectId}/milestones/${milestoneId}`, data);
  }

  async delete(projectId: string, milestoneId: string): Promise<void> {
    return this.http.delete(`/projects/${projectId}/milestones/${milestoneId}`);
  }
}
