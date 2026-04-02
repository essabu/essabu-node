import { BaseProjectApi } from './base';
import type { PageResponse } from '../../common/models';

export class ReportsApi extends BaseProjectApi {
  async list(projectId: string, params?: Record<string, unknown>): Promise<PageResponse> {
    return this.http.get(`/projects/${projectId}/reports`, params);
  }

  async get(projectId: string, reportId: string): Promise<Record<string, unknown>> {
    return this.http.get(`/projects/${projectId}/reports/${reportId}`);
  }

  async create(projectId: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(`/projects/${projectId}/reports`, data);
  }
}
