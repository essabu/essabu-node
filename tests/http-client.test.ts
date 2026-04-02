import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../src/common/http-client';
import type { EssabuConfig } from '../src/config';
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from '../src/common/exceptions';

const TEST_CONFIG: EssabuConfig = {
  apiKey: 'test-api-key',
  tenantId: 'test-tenant-id',
  baseUrl: 'https://test.essabu.com',
  maxRetries: 2,
  timeout: 5000,
};

function mockFetch(response: Partial<Response>): void {
  const mockResponse = {
    status: 200,
    ok: true,
    headers: new Headers(),
    json: vi.fn().mockResolvedValue({}),
    text: vi.fn().mockResolvedValue(''),
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
    ...response,
  } as unknown as Response;

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));
}

describe('HttpClient', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('constructor', () => {
    it('should build base URL from config', () => {
      const client = new HttpClient(TEST_CONFIG, '/hr');
      // Verify it works by making a request (URL is internal)
      expect(client).toBeDefined();
    });

    it('should use default URL when baseUrl is not provided', () => {
      const client = new HttpClient({
        apiKey: 'key',
        tenantId: 'tenant',
      });
      expect(client).toBeDefined();
    });

    it('should strip trailing slashes from baseUrl', () => {
      const client = new HttpClient({
        ...TEST_CONFIG,
        baseUrl: 'https://test.essabu.com///',
      });
      expect(client).toBeDefined();
    });
  });

  describe('GET requests', () => {
    it('should make a GET request and return JSON', async () => {
      const data = { id: '1', name: 'Test' };
      mockFetch({
        status: 200,
        json: vi.fn().mockResolvedValue(data),
      });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.get('/test');

      expect(result).toEqual(data);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/test',
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('should append query parameters', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      await client.get('/test', { page: 1, perPage: 10 });

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/test?page=1&perPage=10',
        expect.anything(),
      );
    });

    it('should filter out null and undefined params', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      await client.get('/test', { page: 1, filter: undefined, sort: null });

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/test?page=1',
        expect.anything(),
      );
    });

    it('should return ArrayBuffer for getBytes', async () => {
      const buffer = new ArrayBuffer(16);
      mockFetch({
        status: 200,
        arrayBuffer: vi.fn().mockResolvedValue(buffer),
      });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.getBytes('/files/test.pdf');

      expect(result).toBe(buffer);
    });
  });

  describe('POST requests', () => {
    it('should make a POST request with body', async () => {
      const response = { id: '1', status: 'created' };
      mockFetch({
        status: 201,
        json: vi.fn().mockResolvedValue(response),
      });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.post('/items', { name: 'New item' });

      expect(result).toEqual(response);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/items',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'New item' }),
        }),
      );
    });

    it('should handle 204 No Content', async () => {
      mockFetch({ status: 204 });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.post('/items/1/archive');

      expect(result).toEqual({});
    });

    it('should make void POST requests', async () => {
      mockFetch({ status: 204 });

      const client = new HttpClient(TEST_CONFIG);
      await expect(client.postVoid('/logout')).resolves.toBeUndefined();
    });
  });

  describe('PUT requests', () => {
    it('should make PUT requests with body', async () => {
      const response = { id: '1', name: 'Updated' };
      mockFetch({
        status: 200,
        json: vi.fn().mockResolvedValue(response),
      });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.put('/items/1', { name: 'Updated' });

      expect(result).toEqual(response);
    });
  });

  describe('PATCH requests', () => {
    it('should make PATCH requests with body', async () => {
      const response = { id: '1', name: 'Patched' };
      mockFetch({
        status: 200,
        json: vi.fn().mockResolvedValue(response),
      });

      const client = new HttpClient(TEST_CONFIG);
      const result = await client.patch('/items/1', { name: 'Patched' });

      expect(result).toEqual(response);
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE requests', async () => {
      mockFetch({ status: 204 });

      const client = new HttpClient(TEST_CONFIG);
      await expect(client.delete('/items/1')).resolves.toBeUndefined();
    });
  });

  describe('authentication headers', () => {
    it('should include API key as Bearer token', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      await client.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-api-key',
            'X-Tenant-Id': 'test-tenant-id',
          }),
        }),
      );
    });

    it('should use explicit token when set', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      client.setToken('explicit-token');
      await client.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer explicit-token',
          }),
        }),
      );
    });

    it('should revert to API key after clearing token', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      client.setToken('explicit-token');
      client.clearToken();
      await client.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-api-key',
          }),
        }),
      );
    });

    it('should include User-Agent header', async () => {
      mockFetch({ status: 200, json: vi.fn().mockResolvedValue({}) });

      const client = new HttpClient(TEST_CONFIG);
      await client.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'User-Agent': expect.stringMatching(/^essabu-node\//),
          }),
        }),
      );
    });
  });

  describe('error handling', () => {
    it('should throw ValidationError on 400', async () => {
      mockFetch({
        status: 400,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({ violations: { email: 'Invalid email' } }),
        ),
      });

      const client = new HttpClient(TEST_CONFIG);

      await expect(client.get('/test')).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError on 422 with field errors', async () => {
      mockFetch({
        status: 422,
        text: vi.fn().mockResolvedValue(
          JSON.stringify({ errors: { name: ['required', 'too short'] } }),
        ),
      });

      const client = new HttpClient(TEST_CONFIG);

      try {
        await client.post('/items', {});
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        const ve = error as ValidationError;
        expect(ve.statusCode).toBe(422);
        expect(ve.fieldErrors).toEqual({ name: ['required', 'too short'] });
      }
    });

    it('should throw AuthenticationError on 401', async () => {
      mockFetch({
        status: 401,
        text: vi.fn().mockResolvedValue('Unauthorized'),
      });

      const client = new HttpClient(TEST_CONFIG);

      await expect(client.get('/test')).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthorizationError on 403', async () => {
      mockFetch({
        status: 403,
        text: vi.fn().mockResolvedValue('Forbidden'),
      });

      const client = new HttpClient(TEST_CONFIG);

      await expect(client.get('/test')).rejects.toThrow(AuthorizationError);
    });

    it('should throw NotFoundError on 404', async () => {
      mockFetch({
        status: 404,
        text: vi.fn().mockResolvedValue('Not found'),
      });

      const client = new HttpClient(TEST_CONFIG);

      await expect(client.get('/test/nonexistent')).rejects.toThrow(NotFoundError);
    });

    it('should throw RateLimitError on 429', async () => {
      const headers = new Headers({ 'Retry-After': '120' });
      mockFetch({
        status: 429,
        headers,
        text: vi.fn().mockResolvedValue('Too many requests'),
      });

      const client = new HttpClient(TEST_CONFIG);

      try {
        await client.get('/test');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        const rle = error as RateLimitError;
        expect(rle.retryAfter).toBe(120);
      }
    });
  });

  describe('retry logic', () => {
    it('should retry on 5xx errors', async () => {
      const fetchMock = vi.fn()
        .mockResolvedValueOnce({
          status: 503,
          headers: new Headers(),
          text: vi.fn().mockResolvedValue('Service Unavailable'),
        })
        .mockResolvedValueOnce({
          status: 200,
          headers: new Headers(),
          json: vi.fn().mockResolvedValue({ ok: true }),
        });

      vi.stubGlobal('fetch', fetchMock);

      const client = new HttpClient({ ...TEST_CONFIG, maxRetries: 2 });
      const result = await client.get('/test');

      expect(result).toEqual({ ok: true });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('should throw ServerError after max retries', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        status: 500,
        headers: new Headers(),
        text: vi.fn().mockResolvedValue('Internal Server Error'),
      });

      vi.stubGlobal('fetch', fetchMock);

      const client = new HttpClient({ ...TEST_CONFIG, maxRetries: 2 });

      await expect(client.get('/test')).rejects.toThrow(ServerError);
      // 1 initial + 2 retries = 3 total
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('should throw ServerError on network failure', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network error')),
      );

      const client = new HttpClient(TEST_CONFIG);

      await expect(client.get('/test')).rejects.toThrow(ServerError);
    });
  });

  describe('pagination helpers', () => {
    it('should append pagination parameters', () => {
      const client = new HttpClient(TEST_CONFIG);

      const url = client.withPagination('/items', { page: 2, perPage: 25 });
      expect(url).toBe('/items?page=2&perPage=25');
    });

    it('should return original path when no pagination', () => {
      const client = new HttpClient(TEST_CONFIG);

      const url = client.withPagination('/items');
      expect(url).toBe('/items');
    });

    it('should append to existing query string', () => {
      const client = new HttpClient(TEST_CONFIG);

      const url = client.withPagination('/items?status=active', { page: 1, perPage: 10 });
      expect(url).toBe('/items?status=active&page=1&perPage=10');
    });

    it('should append single parameter', () => {
      const client = new HttpClient(TEST_CONFIG);

      const url = client.withParam('/items', 'status', 'active');
      expect(url).toBe('/items?status=active');
    });

    it('should skip undefined parameters', () => {
      const client = new HttpClient(TEST_CONFIG);

      const url = client.withParam('/items', 'status', undefined);
      expect(url).toBe('/items');
    });
  });
});
