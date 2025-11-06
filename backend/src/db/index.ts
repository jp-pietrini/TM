import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get database URL from environment
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/trustme_dev';

// Create PostgreSQL connection with pooling
const queryClient = postgres(DATABASE_URL, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Timeout for establishing connection
});

// Create Drizzle instance
export const db = drizzle(queryClient, { schema });

// Export all schema for use in queries
export { schema };

// Utility function to test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await queryClient`SELECT 1 as result`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Utility function to close database connection (for graceful shutdown)
export async function closeConnection(): Promise<void> {
  await queryClient.end();
  console.log('🔌 Database connection closed');
}
