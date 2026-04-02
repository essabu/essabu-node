import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../models';

const BASE_PATH = '/api/trade/customers';

export class CustomersApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Customer>> {
    return this.get<PageResponse<Customer>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Customer> {
    const response = await this.get<ApiResponse<Customer>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateCustomerRequest): Promise<Customer> {
    const response = await this.post<ApiResponse<Customer>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateCustomerRequest): Promise<Customer> {
    const response = await this.patch<ApiResponse<Customer>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
