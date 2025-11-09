import dotenv from 'dotenv';
dotenv.config(); // Load env vars first

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

// Google OAuth Strategy Configuration
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // Extract user info from Google profile
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error('No email found in Google profile'), undefined);
          }

          // Check if user already exists with this Google ID
          let user = await db.query.users.findFirst({
            where: eq(users.googleId, profile.id),
          });

          if (user) {
            // User exists, return user
            return done(null, user);
          }

          // Check if user exists with this email (linking existing account)
          user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (user) {
            // Link Google account to existing user
            const [updatedUser] = await db
              .update(users)
              .set({
                googleId: profile.id,
                emailVerified: true, // Google-verified email
              })
              .where(eq(users.id, user.id))
              .returning();

            return done(null, updatedUser);
          }

          // Create new user with Google account
          const [newUser] = await db
            .insert(users)
            .values({
              email,
              googleId: profile.id,
              role: 'client', // Default role for OAuth users
              emailVerified: true, // Google-verified email
              isActive: true,
              profileCompleted: false,
              termsAccepted: false, // Will need to accept on first login
              isApproved: true, // Clients are auto-approved
            })
            .returning({
              id: users.id,
              email: users.email,
              googleId: users.googleId,
              role: users.role,
              emailVerified: users.emailVerified,
              phoneVerified: users.phoneVerified,
              profileCompleted: users.profileCompleted,
              isApproved: users.isApproved,
              isActive: users.isActive,
              isSuspended: users.isSuspended,
              termsAccepted: users.termsAccepted,
              createdAt: users.createdAt,
            });

          return done(null, newUser);
        } catch (error) {
          console.error('Error in Google OAuth strategy:', error);
          return done(error as Error, undefined);
        }
      }
    )
  );
} else {
  console.warn('Google OAuth not configured - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not set');
}

// Serialize user to session (not using sessions in JWT-based auth, but required by Passport)
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        passwordHash: false, // Exclude password hash
      },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
