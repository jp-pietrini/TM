import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger, requestIdMiddleware, responseTimeMiddleware } from './middleware/logger';
import { generalLimiter } from './middleware/rateLimiter';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy - important for rate limiting and logging
app.set('trust proxy', 1);

// Request tracking middleware (add request ID and measure response time)
app.use(requestIdMiddleware);
app.use(responseTimeMiddleware);

// Logging middleware
app.use(logger);

// Security and parsing middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting (applied to all routes except health check)
app.use('/api', generalLimiter);

// Health check endpoint (no rate limit)
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    message: 'TrustMe API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TrustMe API server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
