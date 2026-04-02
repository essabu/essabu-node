import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Contract, CreateContractRequest, UpdateContractRequest } from '../models';

const BASE_PATH = '/api/hr/contracts';

export class ContractsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Contract>> {
    return this.get<PageResponse<Contract>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Contract> {
    const response = await this.get<ApiResponse<Contract>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateContractRequest): Promise<Contract> {
    const response = await this.post<ApiResponse<Contract>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateContractRequest): Promise<Contract> {
    const response = await this.patch<ApiResponse<Contract>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async sign(id: string): Promise<Contract> {
    const response = await this.post<ApiResponse<Contract>>(`${BASE_PATH}/${id}/sign`);
    return response.data;
  }

  async terminate(id: string, reason: string): Promise<Contract> {
    const response = await this.post<ApiResponse<Contract>>(`${BASE_PATH}/${id}/terminate`, { reason });
    return response.data;
  }

  async renew(id: string, endDate: string): Promise<Contract> {
    const response = await this.post<ApiResponse<Contract>>(`${BASE_PATH}/${id}/renew`, { endDate });
    return response.data;
  }
}
