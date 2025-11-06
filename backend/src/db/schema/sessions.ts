import { pgTable, uuid, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

// Sessions table - for tracking active JWT sessions
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // Session data
  token: text('token').notNull().unique(), // JWT token or session identifier
  refreshToken: text('refresh_token').unique(), // For refresh token flow (optional)

  // Device/browser info
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }), // IPv6 max length

  // Status
  isValid: boolean('is_valid').notNull().default(true),
  expiresAt: timestamp('expires_at').notNull(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastActivityAt: timestamp('last_activity_at').notNull().defaultNow(),
  revokedAt: timestamp('revoked_at'),
});

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
