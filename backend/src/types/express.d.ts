import { JWTPayload } from '../utils/auth';

declare global {
  namespace Express {
    // Make User compatible with both JWT and Passport usage
    interface User {
      id: string;
      email: string;
      role: 'client' | 'worker' | 'admin' | 'support';
      userId?: string; // Alias for id to match JWTPayload
      [key: string]: any; // Allow additional properties from database
    }

    interface Request {
      user?: JWTPayload;
    }
  }
}
