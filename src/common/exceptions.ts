/**
 * Unified exception hierarchy for the Essabu SDK.
 *
 * All SDK exceptions inherit from EssabuError, allowing callers
 * to catch a single base type for uniform error handling.
 */

export class EssabuError extends Error {
  public readonly statusCode: number;
  public readonly details: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 0,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = 'EssabuError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends EssabuError {
  public readonly fieldErrors: Record<string, string | string[]>;

  constructor(
    message: string,
    statusCode: number = 422,
    fieldErrors: Record<string, string | string[]> = {},
  ) {
    super(message, statusCode);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export class AuthenticationError extends EssabuError {
  constructor(message: string = 'Unauthorized: invalid or expired API key') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends EssabuError {
  constructor(message: string = 'Forbidden: insufficient permissions') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends EssabuError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends EssabuError {
  public readonly retryAfter: number;

  constructor(
    message: string = 'Rate limit exceeded',
    statusCode: number = 429,
    retryAfter: number = 60,
  ) {
    super(message, statusCode);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class ServerError extends EssabuError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
    this.name = 'ServerError';
  }
}
