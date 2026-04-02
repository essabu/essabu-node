import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Project, CreateProjectRequest, UpdateProjectRequest } from '../models';

const BASE_PATH = '/api/project/projects';

export class ProjectsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Project>> {
    return this.get<PageResponse<Project>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Project> {
    const response = await this.get<ApiResponse<Project>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateProjectRequest): Promise<Project> {
    const response = await this.post<ApiResponse<Project>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    const response = await this.patch<ApiResponse<Project>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async archive(id: string): Promise<Project> {
    const response = await this.post<ApiResponse<Project>>(`${BASE_PATH}/${id}/archive`);
    return response.data;
  }

  async unarchive(id: string): Promise<Project> {
    const response = await this.post<ApiResponse<Project>>(`${BASE_PATH}/${id}/unarchive`);
    return response.data;
  }

  async addMember(id: string, userId: string, role?: string): Promise<void> {
    await this.post(`${BASE_PATH}/${id}/members`, { userId, role });
  }

  async removeMember(id: string, userId: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}/members/${userId}`);
  }
}
