import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../src/common/http-client';
import {
  BadRequestError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
  NetworkError,
} from '../src/common/exceptions';

describe('HttpClient', () => {
  const config = {
    apiKey: 'test-key',
    tenantId: 'test-tenant',
    baseUrl: 'https://api.test.com',
    maxRetries: 0, // Disable retries for tests
  };

  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient(config);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a GET request with correct headers', async () => {
    const mockResponse = { data: { id: '1', name: 'Test' } };
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const result = await client.request({ method: 'GET', path: '/api/test' });

    expect(fetch).toHaveBeenCalledOnce();
    const [url, options] = vi.mocked(fetch).mock.calls[0]!;
    expect(url).toBe('https://api.test.com/api/test');
    expect((options?.headers as Record<string, string>)['Authorization']).toBe('Bearer test-key');
    expect((options?.headers as Record<string, string>)['X-Tenant-Id']).toBe('test-tenant');
    expect(result).toEqual(mockResponse);
  });

  it('should include query parameters in URL', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    await client.request({
      method: 'GET',
      path: '/api/test',
      query: { page: 1, search: 'hello' },
    });

    const [url] = vi.mocked(fetch).mock.calls[0]!;
    expect(url).toContain('page=1');
    expect(url).toContain('search=hello');
  });

  it('should send JSON body on POST', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ data: {} }), { status: 201 }),
    );

    await client.request({
      method: 'POST',
      path: '/api/test',
      body: { name: 'Test' },
    });

    const [, options] = vi.mocked(fetch).mock.calls[0]!;
    expect(options?.body).toBe(JSON.stringify({ name: 'Test' }));
  });

  it('should return undefined for 204 No Content', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 204 }),
    );

    const result = await client.request({ method: 'DELETE', path: '/api/test/1' });
    expect(result).toBeUndefined();
  });

  it('should throw BadRequestError on 400', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Invalid request body' }), { status: 400 }),
    );

    await expect(client.request({ method: 'POST', path: '/api/test' }))
      .rejects.toThrow(BadRequestError);
  });

  it('should throw AuthenticationError on 401', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 }),
    );

    await expect(client.request({ method: 'GET', path: '/api/test' }))
      .rejects.toThrow(AuthenticationError);
  });

  it('should throw NotFoundError on 404', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Not found' }), { status: 404 }),
    );

    await expect(client.request({ method: 'GET', path: '/api/test/999' }))
      .rejects.toThrow(NotFoundError);
  });

  it('should throw ValidationError on 422 with violations', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          message: 'Validation failed',
          violations: [{ field: 'email', message: 'Invalid email' }],
        }),
        { status: 422 },
      ),
    );

    try {
      await client.request({ method: 'POST', path: '/api/test' });
      expect.unreachable('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).violations).toHaveLength(1);
      expect((error as ValidationError).violations[0]?.field).toBe('email');
    }
  });

  it('should throw RateLimitError on 429', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Too many requests' }), { status: 429 }),
    );

    await expect(client.request({ method: 'GET', path: '/api/test' }))
      .rejects.toThrow(RateLimitError);
  });

  it('should throw ServerError on 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Server error' }), { status: 500 }),
    );

    await expect(client.request({ method: 'GET', path: '/api/test' }))
      .rejects.toThrow(ServerError);
  });

  it('should throw NetworkError on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('fetch failed'));

    await expect(client.request({ method: 'GET', path: '/api/test' }))
      .rejects.toThrow(NetworkError);
  });
});
