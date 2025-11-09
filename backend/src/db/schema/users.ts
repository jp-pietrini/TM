import { pgTable, uuid, varchar, text, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// User role enum
export const userRoleEnum = pgEnum('user_role', ['client', 'worker', 'admin', 'support']);

// Users table - Core authentication and user data
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Authentication
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).unique(),
  passwordHash: text('password_hash'),
  googleId: varchar('google_id', { length: 255 }).unique(), // For Google OAuth

  // User info
  role: userRoleEnum('role').notNull().default('client'),

  // Verification status
  emailVerified: boolean('email_verified').notNull().default(false),
  phoneVerified: boolean('phone_verified').notNull().default(false),

  // Account status
  isActive: boolean('is_active').notNull().default(true),
  isSuspended: boolean('is_suspended').notNull().default(false),
  suspendedUntil: timestamp('suspended_until'),
  suspensionReason: text('suspension_reason'),

  // Profile completion (helps guide onboarding)
  profileCompleted: boolean('profile_completed').notNull().default(false),

  // Terms and conditions
  termsAccepted: boolean('terms_accepted').notNull().default(false),
  termsAcceptedAt: timestamp('terms_accepted_at'),

  // Admin approval (for workers)
  isApproved: boolean('is_approved').notNull().default(false),
  approvedAt: timestamp('approved_at'),
  approvedBy: uuid('approved_by'),
  rejectionReason: text('rejection_reason'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  lastLoginAt: timestamp('last_login_at'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
