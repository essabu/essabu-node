import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Transaction, ReconcileTransactionRequest } from '../models';

const BASE_PATH = '/api/payment/transactions';

export class TransactionsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Transaction>> {
    return this.get<PageResponse<Transaction>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Transaction> {
    const response = await this.get<ApiResponse<Transaction>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async reconcile(id: string, data: ReconcileTransactionRequest): Promise<Transaction> {
    const response = await this.post<ApiResponse<Transaction>>(`${BASE_PATH}/${id}/reconcile`, data);
    return response.data;
  }

  async unreconcile(id: string): Promise<Transaction> {
    const response = await this.post<ApiResponse<Transaction>>(`${BASE_PATH}/${id}/unreconcile`);
    return response.data;
  }
}
