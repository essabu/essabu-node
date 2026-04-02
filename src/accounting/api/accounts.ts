import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Account, CreateAccountRequest, UpdateAccountRequest } from '../models';

const BASE_PATH = '/api/accounting/accounts';

export class AccountsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Account>> {
    return this.get<PageResponse<Account>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Account> {
    const response = await this.get<ApiResponse<Account>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateAccountRequest): Promise<Account> {
    const response = await this.post<ApiResponse<Account>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateAccountRequest): Promise<Account> {
    const response = await this.patch<ApiResponse<Account>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
