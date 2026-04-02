import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Timesheet, CreateTimesheetRequest, UpdateTimesheetRequest } from '../models';

const BASE_PATH = '/api/project/timesheets';

export class TimesheetsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Timesheet>> {
    return this.get<PageResponse<Timesheet>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Timesheet> {
    const response = await this.get<ApiResponse<Timesheet>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateTimesheetRequest): Promise<Timesheet> {
    const response = await this.post<ApiResponse<Timesheet>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateTimesheetRequest): Promise<Timesheet> {
    const response = await this.patch<ApiResponse<Timesheet>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async approve(id: string): Promise<Timesheet> {
    const response = await this.post<ApiResponse<Timesheet>>(`${BASE_PATH}/${id}/approve`);
    return response.data;
  }

  async reject(id: string, reason?: string): Promise<Timesheet> {
    const response = await this.post<ApiResponse<Timesheet>>(`${BASE_PATH}/${id}/reject`, { reason });
    return response.data;
  }
}
