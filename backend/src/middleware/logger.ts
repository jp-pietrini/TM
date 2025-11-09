import morgan from 'morgan';
import { Request, Response } from 'express';

/**
 * Custom morgan token for user ID (if authenticated)
 */
morgan.token('user-id', (req: Request) => {
  return req.user?.userId || 'anonymous';
});

/**
 * Development logging format
 * Includes method, URL, status, response time, and content length
 */
export const devLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    skip: (req) => req.url === '/health', // Skip health check logs
  }
);

/**
 * Production logging format
 * Includes timestamp, method, URL, status, response time, user ID, and IP
 */
export const productionLogger = morgan(
  ':date[iso] :method :url :status :response-time ms - :user-id - :remote-addr',
  {
    skip: (req) => req.url === '/health', // Skip health check logs
  }
);

/**
 * Choose logger based on environment
 */
export const logger =
  process.env.NODE_ENV === 'production' ? productionLogger : devLogger;

/**
 * Request ID middleware
 * Adds a unique request ID to each request for tracing
 */
export function requestIdMiddleware(
  req: Request,
  res: Response,
  next: () => void
): void {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
}

/**
 * Response time middleware
 * Tracks response time (logged by morgan, not added as header to avoid conflicts)
 */
export function responseTimeMiddleware(
  req: Request,
  _res: Response,
  next: () => void
): void {
  const start = Date.now();

  // Store start time for morgan to use
  req.headers['x-start-time'] = start.toString();

  next();
}
