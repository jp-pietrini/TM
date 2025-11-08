import { Response } from 'express';

/**
 * Standard API response format
 */
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

/**
 * Send a successful response
 */
export function sendSuccess<T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = 200
): void {
  const response: ApiResponse<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message && { message }),
  };

  res.status(statusCode).json(response);
}

/**
 * Send an error response
 */
export function sendError(
  res: Response,
  error: string,
  statusCode: number = 400,
  details?: any
): void {
  const response: ApiResponse = {
    success: false,
    error,
    ...(details && { details }),
  };

  res.status(statusCode).json(response);
}

/**
 * Send a validation error response
 */
export function sendValidationError(
  res: Response,
  errors: any[]
): void {
  res.status(400).json({
    success: false,
    error: 'Validation failed',
    details: errors,
  });
}

/**
 * Send a not found response
 */
export function sendNotFound(
  res: Response,
  resource: string = 'Resource'
): void {
  res.status(404).json({
    success: false,
    error: `${resource} not found`,
  });
}

/**
 * Send an unauthorized response
 */
export function sendUnauthorized(
  res: Response,
  message: string = 'Authentication required'
): void {
  res.status(401).json({
    success: false,
    error: message,
  });
}

/**
 * Send a forbidden response
 */
export function sendForbidden(
  res: Response,
  message: string = 'Access denied'
): void {
  res.status(403).json({
    success: false,
    error: message,
  });
}

/**
 * Send an internal server error response
 */
export function sendServerError(
  res: Response,
  message: string = 'Internal server error',
  error?: Error
): void {
  const response: ApiResponse = {
    success: false,
    error: message,
  };

  // Include error details in development mode
  if (process.env.NODE_ENV === 'development' && error) {
    response.details = {
      message: error.message,
      stack: error.stack,
    };
  }

  res.status(500).json(response);
}
