import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Attendance, CreateAttendanceRequest, UpdateAttendanceRequest } from '../models';

const BASE_PATH = '/api/hr/attendance';

export class AttendanceApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Attendance>> {
    return this.get<PageResponse<Attendance>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Attendance> {
    const response = await this.get<ApiResponse<Attendance>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateAttendanceRequest): Promise<Attendance> {
    const response = await this.post<ApiResponse<Attendance>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateAttendanceRequest): Promise<Attendance> {
    const response = await this.patch<ApiResponse<Attendance>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async checkIn(employeeId: string): Promise<Attendance> {
    const response = await this.post<ApiResponse<Attendance>>(`${BASE_PATH}/check-in`, { employeeId });
    return response.data;
  }

  async checkOut(employeeId: string): Promise<Attendance> {
    const response = await this.post<ApiResponse<Attendance>>(`${BASE_PATH}/check-out`, { employeeId });
    return response.data;
  }
}
