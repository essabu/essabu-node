import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { JournalEntry, CreateJournalEntryRequest, UpdateJournalEntryRequest } from '../models';

const BASE_PATH = '/api/accounting/journal-entries';

export class JournalEntriesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<JournalEntry>> {
    return this.get<PageResponse<JournalEntry>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<JournalEntry> {
    const response = await this.get<ApiResponse<JournalEntry>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateJournalEntryRequest): Promise<JournalEntry> {
    const response = await this.post<ApiResponse<JournalEntry>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateJournalEntryRequest): Promise<JournalEntry> {
    const response = await this.patch<ApiResponse<JournalEntry>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async post_(id: string): Promise<JournalEntry> {
    const response = await this.post<ApiResponse<JournalEntry>>(`${BASE_PATH}/${id}/post`);
    return response.data;
  }

  async reverse(id: string, date?: string): Promise<JournalEntry> {
    const response = await this.post<ApiResponse<JournalEntry>>(`${BASE_PATH}/${id}/reverse`, { date });
    return response.data;
  }
}
