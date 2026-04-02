import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { FiscalYear, CreateFiscalYearRequest } from '../models';

const BASE_PATH = '/api/accounting/fiscal-years';

export class FiscalYearsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<FiscalYear>> {
    return this.get<PageResponse<FiscalYear>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<FiscalYear> {
    const response = await this.get<ApiResponse<FiscalYear>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateFiscalYearRequest): Promise<FiscalYear> {
    const response = await this.post<ApiResponse<FiscalYear>>(BASE_PATH, data);
    return response.data;
  }

  async close(id: string): Promise<FiscalYear> {
    const response = await this.post<ApiResponse<FiscalYear>>(`${BASE_PATH}/${id}/close`);
    return response.data;
  }

  async reopen(id: string): Promise<FiscalYear> {
    const response = await this.post<ApiResponse<FiscalYear>>(`${BASE_PATH}/${id}/reopen`);
    return response.data;
  }
}
