import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';

// Load production environment variables
dotenv.config({ path: '.env.production' });

// Production database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.production');
  process.exit(1);
}

async function runMigrations() {
  console.log('🔄 Running migrations on PRODUCTION database...');
  console.log('🌐 Database: trustme-db-production.cxck02yw0v4a.us-east-2.rds.amazonaws.com');

  const migrationClient = postgres(DATABASE_URL, {
    max: 1,
    ssl: 'require'
  });
  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('✅ Production migrations completed successfully!');
  } catch (error) {
    console.error('❌ Production migration failed:', error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

runMigrations();
