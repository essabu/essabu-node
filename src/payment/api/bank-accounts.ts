import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { BankAccount, CreateBankAccountRequest, UpdateBankAccountRequest } from '../models';

const BASE_PATH = '/api/payment/bank-accounts';

export class BankAccountsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<BankAccount>> {
    return this.get<PageResponse<BankAccount>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<BankAccount> {
    const response = await this.get<ApiResponse<BankAccount>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateBankAccountRequest): Promise<BankAccount> {
    const response = await this.post<ApiResponse<BankAccount>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateBankAccountRequest): Promise<BankAccount> {
    const response = await this.patch<ApiResponse<BankAccount>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
