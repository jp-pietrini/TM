import { pgTable, uuid, varchar, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

// Verification type enum
export const verificationTypeEnum = pgEnum('verification_type', ['email', 'phone', 'password_reset']);

// User verifications table - for email, phone, and password reset tokens
export const userVerifications = pgTable('user_verifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // Verification details
  type: verificationTypeEnum('type').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),

  // For phone verification (Twilio)
  verificationSid: varchar('verification_sid', { length: 255 }),

  // Status
  isUsed: boolean('is_used').notNull().default(false),
  expiresAt: timestamp('expires_at').notNull(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  usedAt: timestamp('used_at'),
});

export type UserVerification = typeof userVerifications.$inferSelect;
export type NewUserVerification = typeof userVerifications.$inferInsert;
