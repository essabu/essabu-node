import type { BaseResource } from '../../common/models';

export interface JournalEntry extends BaseResource {
  reference: string;
  date: string;
  description: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  totalDebit: number;
  totalCredit: number;
  currency: string;
  lines: JournalEntryLine[];
  attachments?: string[];
  postedAt?: string;
  postedBy?: string;
}

export interface JournalEntryLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface CreateJournalEntryRequest {
  reference?: string;
  date: string;
  description: string;
  lines: CreateJournalEntryLineRequest[];
}

export interface CreateJournalEntryLineRequest {
  accountId: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface UpdateJournalEntryRequest {
  date?: string;
  description?: string;
  lines?: CreateJournalEntryLineRequest[];
}
