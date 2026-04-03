/**
 * Base error class for all Essabu SDK errors.
 */
export class EssabuError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly requestId?: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    requestId?: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'EssabuError';
    this.statusCode = statusCode;
    this.code = code;
    this.requestId = requestId;
    this.details = details;

    // Maintain proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Thrown when the request is malformed or invalid (400).
 */
export class BadRequestError extends EssabuError {
  constructor(message = 'Bad request', requestId?: string) {
    super(message, 400, 'bad_request', requestId);
    this.name = 'BadRequestError';
  }
}

/**
 * Thrown when authentication fails (401).
 */
export class AuthenticationError extends EssabuError {
  constructor(message = 'Invalid API key or expired token', requestId?: string) {
    super(message, 401, 'authentication_error', requestId);
    this.name = 'AuthenticationError';
  }
}

/**
 * Thrown when the client lacks permissions (403).
 */
export class ForbiddenError extends EssabuError {
  constructor(message = 'Insufficient permissions', requestId?: string) {
    super(message, 403, 'forbidden', requestId);
    this.name = 'ForbiddenError';
  }
}

/**
 * Thrown when a requested resource is not found (404).
 */
export class NotFoundError extends EssabuError {
  constructor(message = 'Resource not found', requestId?: string) {
    super(message, 404, 'not_found', requestId);
    this.name = 'NotFoundError';
  }
}

/**
 * Thrown when request validation fails (422).
 */
export class ValidationError extends EssabuError {
  public readonly violations: FieldViolation[];

  constructor(
    message = 'Validation failed',
    violations: FieldViolation[] = [],
    requestId?: string,
  ) {
    super(message, 422, 'validation_error', requestId, { violations });
    this.name = 'ValidationError';
    this.violations = violations;
  }
}

export interface FieldViolation {
  field: string;
  message: string;
  code?: string;
}

/**
 * Thrown when the client sends a conflicting request (409).
 */
export class ConflictError extends EssabuError {
  constructor(message = 'Resource conflict', requestId?: string) {
    super(message, 409, 'conflict', requestId);
    this.name = 'ConflictError';
  }
}

/**
 * Thrown when the rate limit is exceeded (429).
 */
export class RateLimitError extends EssabuError {
  public readonly retryAfter?: number;

  constructor(message = 'Rate limit exceeded', retryAfter?: number, requestId?: string) {
    super(message, 429, 'rate_limit', requestId, { retryAfter });
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Thrown when the server returns 5xx errors.
 */
export class ServerError extends EssabuError {
  constructor(message = 'Internal server error', statusCode = 500, requestId?: string) {
    super(message, statusCode, 'server_error', requestId);
    this.name = 'ServerError';
  }
}

/**
 * Thrown when a request times out.
 */
export class TimeoutError extends EssabuError {
  constructor(message = 'Request timed out', requestId?: string) {
    super(message, 408, 'timeout', requestId);
    this.name = 'TimeoutError';
  }
}

/**
 * Thrown when a network error occurs.
 */
export class NetworkError extends EssabuError {
  constructor(message = 'Network error', requestId?: string) {
    super(message, 0, 'network_error', requestId);
    this.name = 'NetworkError';
  }
}
