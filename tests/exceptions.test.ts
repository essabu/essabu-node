import { describe, it, expect } from 'vitest';
import {
  EssabuError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  ConflictError,
  RateLimitError,
  ServerError,
  TimeoutError,
  NetworkError,
} from '../src/common/exceptions';

describe('Exceptions', () => {
  it('should create EssabuError with all properties', () => {
    const error = new EssabuError('test', 400, 'bad_request', 'req-123', { foo: 'bar' });
    expect(error.message).toBe('test');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('bad_request');
    expect(error.requestId).toBe('req-123');
    expect(error.details).toEqual({ foo: 'bar' });
    expect(error).toBeInstanceOf(Error);
  });

  it('should create AuthenticationError with defaults', () => {
    const error = new AuthenticationError();
    expect(error.statusCode).toBe(401);
    expect(error.code).toBe('authentication_error');
    expect(error.name).toBe('AuthenticationError');
  });

  it('should create ForbiddenError', () => {
    const error = new ForbiddenError();
    expect(error.statusCode).toBe(403);
  });

  it('should create NotFoundError', () => {
    const error = new NotFoundError();
    expect(error.statusCode).toBe(404);
  });

  it('should create ValidationError with violations', () => {
    const error = new ValidationError('Bad data', [
      { field: 'email', message: 'Required' },
    ]);
    expect(error.statusCode).toBe(422);
    expect(error.violations).toHaveLength(1);
  });

  it('should create ConflictError', () => {
    const error = new ConflictError();
    expect(error.statusCode).toBe(409);
  });

  it('should create RateLimitError with retryAfter', () => {
    const error = new RateLimitError('slow down', 30);
    expect(error.statusCode).toBe(429);
    expect(error.retryAfter).toBe(30);
  });

  it('should create ServerError', () => {
    const error = new ServerError('down', 503);
    expect(error.statusCode).toBe(503);
  });

  it('should create TimeoutError', () => {
    const error = new TimeoutError();
    expect(error.statusCode).toBe(408);
  });

  it('should create NetworkError', () => {
    const error = new NetworkError();
    expect(error.statusCode).toBe(0);
  });
});
