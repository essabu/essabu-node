import { describe, it, expect, vi } from 'vitest';
import { BaseApi } from '../src/common/models';
import type { HttpClientInterface, RequestOptions } from '../src/common/models';

class TestApi extends BaseApi {
  async testGet<T>(path: string): Promise<T> {
    return this.get<T>(path);
  }

  async testPost<T>(path: string, body: unknown): Promise<T> {
    return this.post<T>(path, body);
  }

  async testPatch<T>(path: string, body: unknown): Promise<T> {
    return this.patch<T>(path, body);
  }

  async testDelete(path: string): Promise<void> {
    return this.delete(path);
  }

  testBuildPageQuery(params?: Parameters<BaseApi['buildPageQuery']>[0]) {
    return this.buildPageQuery(params);
  }
}

describe('BaseApi', () => {
  const mockClient: HttpClientInterface = {
    request: vi.fn(),
  };

  const api = new TestApi(mockClient);

  it('should delegate GET to httpClient', async () => {
    vi.mocked(mockClient.request).mockResolvedValueOnce({ data: [] });
    await api.testGet('/test');
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'GET', path: '/test' }),
    );
  });

  it('should delegate POST with body', async () => {
    vi.mocked(mockClient.request).mockResolvedValueOnce({ data: {} });
    await api.testPost('/test', { name: 'x' });
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', path: '/test', body: { name: 'x' } }),
    );
  });

  it('should build page query with all params', () => {
    const query = api.testBuildPageQuery({
      page: 2,
      pageSize: 10,
      sortBy: 'name',
      sortOrder: 'desc',
      search: 'test',
      filters: { status: 'active', priority: 1 },
    });

    expect(query).toEqual({
      page: 2,
      pageSize: 10,
      sortBy: 'name',
      sortOrder: 'desc',
      search: 'test',
      'filter[status]': 'active',
      'filter[priority]': 1,
    });
  });

  it('should return empty object for undefined params', () => {
    expect(api.testBuildPageQuery()).toEqual({});
  });
});
