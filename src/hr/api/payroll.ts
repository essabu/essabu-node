import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { PayrollRun, PaySlip, CreatePayrollRunRequest, ProcessPayrollRequest } from '../models';

const BASE_PATH = '/api/hr/payroll';

export class PayrollApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<PayrollRun>> {
    return this.get<PageResponse<PayrollRun>>(`${BASE_PATH}/runs`, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<PayrollRun> {
    const response = await this.get<ApiResponse<PayrollRun>>(`${BASE_PATH}/runs/${id}`);
    return response.data;
  }

  async create(data: CreatePayrollRunRequest): Promise<PayrollRun> {
    const response = await this.post<ApiResponse<PayrollRun>>(`${BASE_PATH}/runs`, data);
    return response.data;
  }

  async process(id: string, data?: ProcessPayrollRequest): Promise<PayrollRun> {
    const response = await this.post<ApiResponse<PayrollRun>>(`${BASE_PATH}/runs/${id}/process`, data);
    return response.data;
  }

  async approve(id: string): Promise<PayrollRun> {
    const response = await this.post<ApiResponse<PayrollRun>>(`${BASE_PATH}/runs/${id}/approve`);
    return response.data;
  }

  async listSlips(runId: string, params?: PageRequest): Promise<PageResponse<PaySlip>> {
    return this.get<PageResponse<PaySlip>>(
      `${BASE_PATH}/runs/${runId}/slips`,
      this.buildPageQuery(params),
    );
  }

  async retrieveSlip(runId: string, slipId: string): Promise<PaySlip> {
    const response = await this.get<ApiResponse<PaySlip>>(`${BASE_PATH}/runs/${runId}/slips/${slipId}`);
    return response.data;
  }
}
