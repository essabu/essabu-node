import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { ProjectTask, CreateProjectTaskRequest, UpdateProjectTaskRequest } from '../models';

const BASE_PATH = '/api/project/tasks';

export class TasksApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<ProjectTask>> {
    return this.get<PageResponse<ProjectTask>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<ProjectTask> {
    const response = await this.get<ApiResponse<ProjectTask>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateProjectTaskRequest): Promise<ProjectTask> {
    const response = await this.post<ApiResponse<ProjectTask>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateProjectTaskRequest): Promise<ProjectTask> {
    const response = await this.patch<ApiResponse<ProjectTask>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async complete(id: string): Promise<ProjectTask> {
    const response = await this.post<ApiResponse<ProjectTask>>(`${BASE_PATH}/${id}/complete`);
    return response.data;
  }

  async reopen(id: string): Promise<ProjectTask> {
    const response = await this.post<ApiResponse<ProjectTask>>(`${BASE_PATH}/${id}/reopen`);
    return response.data;
  }

  async assign(id: string, assigneeId: string): Promise<ProjectTask> {
    const response = await this.post<ApiResponse<ProjectTask>>(`${BASE_PATH}/${id}/assign`, { assigneeId });
    return response.data;
  }
}
