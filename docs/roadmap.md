# TrustMe Development Roadmap

**Document Version:** 1.0
**Last Updated:** November 5, 2025
**Timeline:** 4 weeks to MVP + Future Phases
**Developer:** Solo developer with Claude Code

---

## Table of Contents
1. [Overview](#overview)
2. [Phase 0: Foundation (Days 1-3)](#phase-0-foundation-days-1-3)
3. [Phase 1: Core Infrastructure (Days 4-7)](#phase-1-core-infrastructure-days-4-7)
4. [Phase 2: User Management (Days 8-10)](#phase-2-user-management-days-8-10)
5. [Phase 3: Lead System (Days 11-14)](#phase-3-lead-system-days-11-14)
6. [Phase 4: Wallet & Payments (Days 15-18)](#phase-4-wallet--payments-days-15-18)
7. [Phase 5: Communication (Days 19-21)](#phase-5-communication-days-19-21)
8. [Phase 6: Admin & Support (Days 22-24)](#phase-6-admin--support-days-22-24)
9. [Phase 7: Polish & Launch Prep (Days 25-28)](#phase-7-polish--launch-prep-days-25-28)
10. [Phase 8: Launch Week](#phase-8-launch-week)
11. [Post-MVP Phases](#post-mvp-phases)
12. [Dependencies Map](#dependencies-map)
13. [Risk Mitigation](#risk-mitigation)

---

## Overview

This roadmap breaks down the TrustMe MVP development into 8 phases over 28 days, followed by launch week and post-MVP expansion phases. Each phase builds on the previous one, with clear deliverables and success criteria.

**Key Principles:**
- Mobile-first development (85% of users on mobile)
- Core functionality before polish
- Integrate third-party services early to catch issues
- Test with real data from day 1
- Daily deployments to staging environment

**Timeline Summary:**
- **Days 1-3:** Foundation (environment, database, auth skeleton)
- **Days 4-7:** Core infrastructure (API, file uploads, email/SMS)
- **Days 8-10:** User management (registration, profiles, verification)
- **Days 11-14:** Lead system (creation, purchase, refunds)
- **Days 15-18:** Wallet & payments (budget, Stripe, escrow)
- **Days 19-21:** Communication (chat, notifications)
- **Days 22-24:** Admin & support (dashboards, moderation)
- **Days 25-28:** Polish & launch prep (UI, testing, performance)
- **Week 5:** Soft launch with 35 committed handymen

---

## Phase 0: Foundation (Days 1-3)

**Goal:** Set up development environment and core project structure

### Day 1: Environment Setup
**Tasks:**
1. Initialize Git repository
2. Set up frontend project (Vite + React 18 + TypeScript)
3. Set up backend project (Express + TypeScript)
4. Configure Tailwind CSS with design system colors
5. Install and configure core dependencies
6. Set up environment variables structure (.env.example files)
7. Configure ESLint and Prettier
8. Set up basic folder structure

**Deliverables:**
- ✅ Both projects run locally
- ✅ Hot reload working on both frontend and backend
- ✅ TypeScript compiling without errors
- ✅ Git repository with initial commit

**Success Criteria:**
- `npm run dev` works for both projects
- Can make a simple API call from frontend to backend
- Code formatting is automated

### Day 2: Database Foundation
**Tasks:**
1. Set up local PostgreSQL database
2. Install and configure Drizzle ORM
3. Create initial migration script
4. Implement core database tables:
   - users
   - profiles
   - user_verifications
   - sessions
5. Write database connection module
6. Create seed data script for testing
7. Test database migrations (up and down)

**Deliverables:**
- ✅ Database schema for user management
- ✅ Migration system working
- ✅ Seed data available for local testing
- ✅ Database connection pooling configured

**Success Criteria:**
- Can run migrations without errors
- Can seed database with test data
- Can query database from backend code

### Day 3: Authentication Skeleton
**Tasks:**
1. Implement JWT token generation and validation
2. Create authentication middleware
3. Build password hashing utilities (bcrypt)
4. Create session management system
5. Implement basic login endpoint (no UI yet)
6. Implement basic registration endpoint (no UI yet)
7. Set up protected route middleware
8. Create auth context on frontend (skeleton)

**Deliverables:**
- ✅ JWT authentication working
- ✅ Session management functional
- ✅ Protected API routes
- ✅ Auth utilities module

**Success Criteria:**
- Can register a user via API
- Can login and receive JWT token
- Protected routes reject unauthenticated requests
- Sessions persist correctly

**Reference:** See PRD_Part1.md § 2.1-2.4 for user roles and authentication requirements

---

## Phase 1: Core Infrastructure (Days 4-7)

**Goal:** Build essential infrastructure that all features depend on

### Day 4: API Architecture
**Tasks:**
1. Set up Express router structure
2. Implement error handling middleware
3. Create validation middleware (Zod)
4. Build response formatting utilities
5. Implement rate limiting (express-rate-limit)
6. Create API documentation structure
7. Set up CORS properly
8. Implement request logging

**Deliverables:**
- ✅ RESTful API structure
- ✅ Global error handling
- ✅ Input validation system
- ✅ Rate limiting active

**Success Criteria:**
- All API responses follow consistent format
- Validation errors return helpful messages
- Rate limiting prevents abuse
- Errors are logged properly

### Day 5: File Upload System
**Tasks:**
1. Set up AWS S3 bucket (or local equivalent for dev)
2. Configure multer for file uploads
3. Implement image validation (file type, size)
4. Build image processing pipeline (sharp for resizing)
5. Create file upload endpoint
6. Implement file deletion functionality
7. Set up CloudFront CDN configuration (or local proxy)
8. Create file upload React component

**Deliverables:**
- ✅ File upload working end-to-end
- ✅ Images resized and optimized
- ✅ Files served via CDN
- ✅ Reusable upload component

**Success Criteria:**
- Can upload images from frontend
- Images are resized to multiple sizes
- Uploaded files are accessible via CDN
- Invalid files are rejected with clear errors

### Day 6: Email & SMS Integration
**Tasks:**
1. Set up Twilio SendGrid account
2. Create email templates (HTML + plain text):
   - Welcome email
   - Email verification
   - Password reset
   - New lead notification
   - Refund notification
3. Implement email sending service
4. Set up Twilio Verify API
5. Create SMS verification endpoints
6. Test email delivery in sandbox mode
7. Test SMS verification flow
8. Create email/SMS queue system (basic)

**Deliverables:**
- ✅ Email system functional
- ✅ SMS verification working
- ✅ All email templates created
- ✅ Queue system for async sending

**Success Criteria:**
- Welcome emails send on registration
- SMS verification codes arrive within 30 seconds
- Email templates render correctly on mobile
- Failed sends are logged and retried

### Day 7: Frontend Foundation
**Tasks:**
1. Set up React Router
2. Create layout components (Header, Footer, Navigation)
3. Implement design system components:
   - Button (primary, secondary, tertiary)
   - Input fields (text, email, password, phone)
   - Card component
   - Badge component
   - Loading states
4. Create responsive navigation (mobile menu)
5. Set up React Query for data fetching
6. Implement toast notification system
7. Create error boundary components
8. Build loading skeleton components

**Deliverables:**
- ✅ Complete component library
- ✅ Responsive layouts
- ✅ Navigation system
- ✅ Data fetching setup

**Success Criteria:**
- All components match design system
- Navigation works on mobile and desktop
- Loading states provide good UX
- Error boundaries catch and display errors gracefully

**Reference:** See PRD_Part5.md § 7 for complete design system specifications

---

## Phase 2: User Management (Days 8-10)

**Goal:** Complete user registration, authentication, and profile management

### Day 8: Registration & Login UI
**Tasks:**
1. Build registration form:
   - Email/phone input
   - Password with strength indicator
   - Role selection (Client vs Worker)
   - Terms acceptance checkbox
2. Build login form:
   - Email/phone or username
   - Password
   - Remember me option
   - Forgot password link
3. Implement form validation (client-side)
4. Create password reset flow (request + reset pages)
5. Build email/phone verification page
6. Implement social login preparation (Google - future)
7. Add loading states and error handling
8. Create onboarding welcome screen

**Deliverables:**
- ✅ Complete registration flow (UI + API)
- ✅ Complete login flow (UI + API)
- ✅ Password reset functional
- ✅ Email/phone verification working

**Success Criteria:**
- Users can register as Client or Worker
- Email/phone verification required before access
- Password reset works end-to-end
- All forms have proper validation and error messages

### Day 9: Profile System
**Tasks:**
1. Create database tables:
   - worker_profiles
   - client_profiles
   - service_categories
   - worker_services
2. Build Worker profile creation form:
   - Business name
   - Service categories (multi-select)
   - Service areas (multi-select)
   - Years of experience
   - Short bio (500 chars)
3. Build Worker profile view (public)
4. Build Client profile form (minimal):
   - Name
   - Location
   - Phone number
5. Implement profile photo upload
6. Create profile edit functionality
7. Build profile completion progress indicator
8. Implement profile visibility toggle

**Deliverables:**
- ✅ Worker profile creation functional
- ✅ Client profile creation functional
- ✅ Profile viewing (public + private)
- ✅ Profile editing

**Success Criteria:**
- Workers can create detailed profiles
- Clients can create minimal profiles
- Profile photos upload and display correctly
- Profile completion encourages users to add more info

### Day 10: Portfolio & Verification
**Tasks:**
1. Create database tables:
   - portfolio_items
   - portfolio_verifications
2. Build portfolio upload interface:
   - Image upload (multiple)
   - Description per photo
   - Service category tag
   - Date completed
3. Implement portfolio gallery view
4. Create verification request system:
   - Workers can request verification
   - System generates verification links
   - Clients can verify via link
5. Build verification badge display
6. Implement portfolio approval queue (admin)
7. Create portfolio editing interface
8. Add portfolio to profile view

**Deliverables:**
- ✅ Portfolio system functional
- ✅ Verification request system
- ✅ Admin approval queue
- ✅ Verification badges display

**Success Criteria:**
- Workers can upload portfolio photos
- Verification links work correctly
- Verified portfolio items display badge
- Portfolio displays attractively on profile

**Reference:** See PRD_Part1.md § 3.4-3.5 for registration and portfolio verification flows

---

## Phase 3: Lead System (Days 11-14)

**Goal:** Build the core lead creation, purchase, and refund system

### Day 11: Lead Creation & Database
**Tasks:**
1. Create database tables:
   - leads
   - lead_purchases
   - lead_refunds
2. Build lead creation form (Client):
   - Service category dropdown
   - Location (address autocomplete)
   - Description (1000 chars max)
   - Photo upload (optional, up to 3)
   - Urgency selector
   - Budget range
3. Implement location autocomplete (Google Places API)
4. Create lead validation logic
5. Build lead submission API endpoint
6. Implement lead notification system (email to workers)
7. Create lead storage and indexing
8. Test lead creation flow end-to-end

**Deliverables:**
- ✅ Lead creation form functional
- ✅ Lead data stored correctly
- ✅ Notifications sent to matching workers
- ✅ Lead validation working

**Success Criteria:**
- Clients can create leads with all required fields
- Photos upload correctly
- Workers receive email notifications for relevant leads
- Invalid leads are rejected with helpful errors

### Day 12: Lead Discovery & Search
**Tasks:**
1. Build worker dashboard (My Leads page)
2. Implement lead listing API with filters:
   - Service category
   - Location radius
   - Budget range
   - Urgency
   - Date range
3. Create lead search UI:
   - Filter sidebar (mobile: modal)
   - Lead cards with key info
   - Map view toggle (future - skip for MVP)
4. Implement search ranking algorithm:
   - Service match (30%)
   - Location proximity (25%)
   - Response time (20%)
   - Profile completeness (10%)
   - Ratings (10%)
   - Verified portfolio (5%)
5. Create lead detail view (before purchase)
6. Build "Available Leads" feed
7. Implement real-time lead updates (new leads appear)
8. Add pagination or infinite scroll

**Deliverables:**
- ✅ Lead discovery page functional
- ✅ Search and filtering working
- ✅ Ranking algorithm implemented
- ✅ Lead detail modal

**Success Criteria:**
- Workers see leads matching their services
- Search filters work correctly
- Ranking shows most relevant leads first
- New leads appear without page refresh

### Day 13: Lead Purchase System
**Tasks:**
1. Create lead purchase modal:
   - Lead details summary
   - Price display (100 MXN)
   - Current wallet balance
   - Purchase confirmation
2. Implement lead purchase API endpoint:
   - Check wallet balance
   - Deduct 100 MXN
   - Create lead_purchase record
   - Update lead status
   - Grant chat access
3. Build purchase validation:
   - Sufficient wallet balance
   - Lead still available
   - Worker not already purchased
   - Worker's weekly budget not exceeded
4. Create purchase confirmation screen
5. Implement "My Purchased Leads" view
6. Build lead status tracking:
   - New (just purchased)
   - In contact (worker sent message)
   - Hired (client confirmed)
   - Not hired (client declined)
   - Refunded
7. Create lead analytics (worker dashboard)
8. Test purchase flow thoroughly

**Deliverables:**
- ✅ Lead purchase flow functional
- ✅ Wallet integration working
- ✅ Purchase history view
- ✅ Status tracking system

**Success Criteria:**
- Workers can purchase leads with one click
- Wallet balance updates immediately
- Chat access granted after purchase
- Purchase history shows all purchased leads

### Day 14: Refund System
**Tasks:**
1. Build refund request API:
   - Automatic refund (client no response in 48h)
   - Manual refund request (with reason)
   - Admin approval for manual refunds
2. Create refund validation logic:
   - Within 48-hour window
   - No client response (automatic)
   - Valid reason (manual)
3. Implement automatic refund cron job:
   - Runs every hour
   - Checks leads purchased 48+ hours ago
   - No client messages sent
   - Creates refund automatically
4. Build refund UI (worker):
   - Request refund button
   - Reason dropdown
   - Refund status indicator
5. Create refund approval queue (admin)
6. Implement refund processing:
   - Return 100 MXN to wallet
   - Update lead_purchase record
   - Revoke chat access
   - Send notification
7. Build refund history view
8. Test all refund scenarios

**Deliverables:**
- ✅ Automatic refund system working
- ✅ Manual refund request functional
- ✅ Admin refund approval queue
- ✅ Refund processing complete

**Success Criteria:**
- Refunds process automatically after 48h if no client response
- Workers can request manual refunds with reason
- Admins can approve/reject refund requests
- Refunded money returns to wallet correctly

**Reference:** See PRD_Part1.md § 3.1-3.3 for lead flows and PRD_Part3.md § 5.2 for refund policy

---

## Phase 4: Wallet & Payments (Days 15-18)

**Goal:** Implement wallet system, Stripe integration, and payment escrow

### Day 15: Wallet Foundation
**Tasks:**
1. Create database tables:
   - wallets
   - wallet_transactions
   - weekly_budgets
   - payment_escrows
2. Build wallet service layer:
   - Get balance
   - Add funds
   - Deduct funds
   - Get transaction history
   - Check budget availability
3. Create wallet dashboard UI:
   - Current balance display
   - Weekly budget tracker
   - Transaction history
   - Add funds button
4. Implement transaction logging:
   - Lead purchases
   - Refunds
   - Deposits
   - Withdrawals
   - Escrow holds/releases
5. Build transaction detail view
6. Create weekly budget system:
   - Set minimum (300 MXN)
   - Track spending
   - Pause on budget exceeded
   - Reset weekly
7. Implement budget warning notifications
8. Test wallet balance calculations

**Deliverables:**
- ✅ Wallet system functional
- ✅ Transaction history working
- ✅ Weekly budget tracking
- ✅ Balance calculations accurate

**Success Criteria:**
- Wallet balance is always accurate
- All transactions are logged
- Weekly budget prevents overspending
- Transaction history shows all activity

### Day 16: Stripe Integration (Deposits)
**Tasks:**
1. Set up Stripe account (test mode)
2. Install Stripe SDK (frontend + backend)
3. Create Stripe customer on user registration
4. Build add funds flow:
   - Amount selection (100, 300, 500, custom)
   - Stripe Checkout session creation
   - Redirect to Stripe
   - Success/cancel callbacks
5. Implement Stripe webhooks:
   - checkout.session.completed
   - payment_intent.succeeded
   - payment_intent.failed
6. Create webhook endpoint (/api/webhooks/stripe)
7. Implement webhook signature verification
8. Build deposit processing:
   - Update wallet balance
   - Create transaction record
   - Send confirmation email
9. Create first week free logic:
   - Flag new users
   - Grant 300 MXN credit
   - Skip first charge
10. Test deposit flow end-to-end

**Deliverables:**
- ✅ Stripe Checkout integration
- ✅ Webhook handling
- ✅ Deposit processing
- ✅ First week free system

**Success Criteria:**
- Workers can add funds via Stripe
- Webhook events are processed correctly
- Wallet balance updates after successful payment
- New users get first week free (300 MXN credit)

### Day 17: Payment Escrow System
**Tasks:**
1. Build escrow creation on job start:
   - Client marks worker as "hired"
   - System calculates amount (agreed price)
   - Creates escrow hold via Stripe
   - Stores escrow record
2. Implement escrow hold (Stripe Payment Intents):
   - Authorize card without charging
   - 5-day hold period
   - Associate with lead/worker
3. Create escrow release flow:
   - Automatic after 5 days
   - Manual early release (client confirms)
   - Release to worker's account
4. Build escrow dispute system:
   - Client can dispute
   - Hold extended
   - Admin review required
5. Implement Stripe Connect setup:
   - Worker onboarding to Stripe Connect
   - Account verification
   - Payout configuration
6. Create escrow dashboard (worker):
   - Pending escrows
   - Released payments
   - Payout history
7. Build automatic release cron job
8. Test escrow flows thoroughly

**Deliverables:**
- ✅ Escrow hold system working
- ✅ Automatic release functional
- ✅ Stripe Connect integration
- ✅ Payout system operational

**Success Criteria:**
- Escrow holds client payment securely
- Payments release to worker after 5 days or client confirmation
- Workers can connect Stripe account
- Disputes pause escrow release

### Day 18: Wallet Management Features
**Tasks:**
1. Build weekly budget management:
   - Set/update weekly budget (min 300 MXN)
   - Pause budget (stop showing new leads)
   - Resume budget
   - Budget reset logic (every Monday)
2. Create low balance warnings:
   - Under 300 MXN: yellow warning
   - Under 100 MXN: red warning + email
   - Zero balance: account paused
3. Implement automatic pause:
   - Weekly budget exceeded
   - Balance insufficient
   - Manual pause by worker
4. Build budget settings page:
   - Weekly limit slider
   - Auto-recharge toggle (future)
   - Email preferences
5. Create withdrawal system (if needed):
   - Request withdrawal
   - Minimum amount (500 MXN)
   - Processing time (3-5 days)
   - Transfer to bank account
6. Implement spending analytics:
   - Weekly spending chart
   - Cost per lead
   - ROI metrics
7. Build budget notification system
8. Test all wallet edge cases

**Deliverables:**
- ✅ Budget management functional
- ✅ Auto-pause system working
- ✅ Withdrawal system (if needed)
- ✅ Spending analytics

**Success Criteria:**
- Workers can set and manage weekly budgets
- Account pauses automatically when budget exceeded
- Low balance warnings appear timely
- Spending analytics help workers understand ROI

**Reference:** See PRD_Part2.md § 3.8 and § 4.5 for wallet flows and specifications

---

## Phase 5: Communication (Days 19-21)

**Goal:** Build in-platform chat with media support and notifications

### Day 19: Chat Infrastructure
**Tasks:**
1. Create database tables:
   - conversations
   - messages
   - message_attachments
   - notifications
2. Set up WebSocket server (Socket.io):
   - Connection handling
   - Room management
   - Authentication middleware
   - Event handlers
3. Build chat service layer:
   - Create conversation
   - Send message
   - Get conversation history
   - Mark as read
   - Get unread count
4. Implement real-time messaging:
   - Message sent event
   - Message received event
   - Typing indicator
   - Online status
5. Create message validation:
   - Max length (2000 chars)
   - Spam detection (rate limit)
   - Inappropriate content filter (basic)
6. Build message storage:
   - Text messages
   - Timestamps
   - Read receipts
7. Implement conversation access control:
   - Only participants can view
   - Lead purchase required
   - Block after refund
8. Test WebSocket connection stability

**Deliverables:**
- ✅ WebSocket server operational
- ✅ Real-time messaging working
- ✅ Message storage functional
- ✅ Access control enforced

**Success Criteria:**
- Messages arrive in real-time
- Typing indicators work smoothly
- Only authorized users can access conversations
- Messages persist correctly

### Day 20: Chat UI & Media
**Tasks:**
1. Build chat interface:
   - Conversation list (inbox)
   - Message thread view
   - Message input with auto-expand
   - Send button
2. Create conversation list item:
   - Participant name/photo
   - Last message preview
   - Timestamp
   - Unread count badge
   - Lead service category badge
3. Implement message bubbles:
   - Sent (right, blue)
   - Received (left, gray)
   - Timestamps
   - Read receipts
   - Delivery status
4. Build media message support:
   - Photo upload in chat
   - Photo preview
   - Photo gallery view
   - File size validation (5MB max)
5. Create rich message features:
   - Link detection and formatting
   - Emoji support
   - Line breaks
6. Implement infinite scroll (load older messages)
7. Build mobile-optimized chat:
   - Full-screen on mobile
   - Swipe to go back
   - Keyboard handling
8. Add typing indicator UI
9. Create notification dot (unread messages)
10. Test chat on mobile devices

**Deliverables:**
- ✅ Complete chat UI
- ✅ Media upload working
- ✅ Mobile-optimized experience
- ✅ Read receipts functional

**Success Criteria:**
- Chat interface is intuitive and responsive
- Photos send and display correctly
- Mobile chat experience is smooth
- Unread indicators help users find new messages

### Day 21: Notifications System
**Tasks:**
1. Create notification service:
   - In-app notifications
   - Email notifications
   - SMS notifications (critical only)
   - Push notifications (future)
2. Build notification types:
   - New lead available
   - Lead purchased
   - New message received
   - Refund processed
   - Payment received
   - Budget warning
   - Account paused
   - New review received
3. Implement notification preferences:
   - Email on/off per type
   - SMS on/off (critical only)
   - In-app always on
4. Create notification UI:
   - Notification dropdown/modal
   - Notification count badge
   - Mark as read
   - Clear all
5. Build notification detail view
6. Implement notification delivery:
   - Real-time via WebSocket
   - Email via SendGrid
   - SMS via Twilio
7. Create notification queue:
   - Batch sending
   - Rate limiting
   - Retry logic
8. Build notification history page
9. Test all notification scenarios

**Deliverables:**
- ✅ Complete notification system
- ✅ Multi-channel delivery
- ✅ Notification preferences
- ✅ Notification UI

**Success Criteria:**
- Users receive timely notifications
- Notification preferences are respected
- In-app notifications appear in real-time
- Email/SMS notifications are not spammy

**Reference:** See PRD_Part2.md § 4.3 for chat system specifications

---

## Phase 6: Admin & Support (Days 22-24)

**Goal:** Build admin approval system and customer support dashboard

### Day 22: Admin Approval Dashboard
**Tasks:**
1. Create admin role and permissions system
2. Build admin navigation/layout
3. Create worker approval queue:
   - List pending workers
   - View worker profile
   - View portfolio items
   - Approve/reject with reason
4. Implement approval actions:
   - Approve worker (activate account)
   - Reject worker (send email with reason)
   - Request more info
5. Build portfolio approval queue:
   - List unverified portfolio items
   - View full-size images
   - Approve/reject individual items
   - Bulk approve
6. Create admin dashboard homepage:
   - Pending approvals count
   - Recent activity
   - Quick stats
7. Implement admin activity logging:
   - All approve/reject actions
   - Timestamp and admin ID
   - Reason for rejection
8. Build admin notification system:
   - New worker registered
   - New portfolio uploaded
9. Test admin workflows

**Deliverables:**
- ✅ Admin approval dashboard
- ✅ Worker approval system
- ✅ Portfolio approval system
- ✅ Activity logging

**Success Criteria:**
- Admins can review and approve workers efficiently
- Rejection reasons are logged and sent to workers
- Portfolio items can be approved individually
- Dashboard shows clear pending counts

### Day 23: Customer Support Dashboard
**Tasks:**
1. Create customer support role
2. Build support navigation/layout
3. Create support ticket system:
   - Tickets table (database)
   - Create ticket API
   - List tickets (open, in progress, closed)
   - Assign ticket to support agent
   - Add internal notes
   - Respond to ticket (sends email)
   - Close/reopen ticket
4. Build ticket UI:
   - Ticket list with filters
   - Ticket detail view
   - Response composer
   - Status update buttons
5. Create dispute management:
   - List active disputes
   - View dispute details
   - View conversation history
   - Approve/reject refund
   - Extend escrow hold
   - Add resolution notes
6. Implement flagged conversations:
   - List conversations flagged by users
   - View full conversation
   - Take action (warning, suspend user, close)
   - Mark as resolved
7. Build user lookup tool:
   - Search by email, phone, name
   - View user profile
   - View user activity (leads, purchases, messages)
   - View transaction history
   - Suspend/unsuspend account
8. Create support analytics:
   - Average response time
   - Tickets resolved
   - Open tickets count
9. Test support workflows

**Deliverables:**
- ✅ Support ticket system
- ✅ Dispute management
- ✅ Flagged conversation review
- ✅ User lookup tool

**Success Criteria:**
- Support agents can manage tickets efficiently
- Disputes can be reviewed and resolved
- Flagged conversations are actionable
- User lookup provides comprehensive information

### Day 24: Moderation & Safety
**Tasks:**
1. Build content moderation system:
   - Inappropriate content filter (keyword-based)
   - Spam detection
   - Scam pattern detection
2. Implement user reporting:
   - Report button in chat
   - Report reasons dropdown
   - Report submission
3. Create report review queue:
   - List reports
   - View reported content
   - Take action (warning, suspend, ban)
   - Mark as resolved
4. Build user suspension system:
   - Temporary suspension (days)
   - Permanent ban
   - Suspension reasons
   - Appeal process (manual)
5. Implement rate limiting (enhanced):
   - Message sending limits
   - Lead creation limits
   - Report submission limits
6. Create safety rules page:
   - Community guidelines
   - Acceptable use policy
   - Consequences for violations
7. Build admin safety settings:
   - Configure keyword filters
   - Set rate limits
   - Manage blocked users list
8. Test moderation scenarios

**Deliverables:**
- ✅ Content moderation system
- ✅ User reporting functional
- ✅ Suspension system working
- ✅ Safety policies documented

**Success Criteria:**
- Inappropriate content is filtered automatically
- Users can report violations easily
- Admins can suspend problematic users
- Community guidelines are clear

**Reference:** See PRD_Part2.md § 4.4 and PRD_Part3.md § 4.6 for admin/support specifications

---

## Phase 7: Polish & Launch Prep (Days 25-28)

**Goal:** Final polish, testing, performance optimization, and production deployment

### Day 25: Reviews & Ratings
**Tasks:**
1. Create database tables:
   - reviews
   - review_responses
2. Build review submission:
   - Review form (post-job completion)
   - Rating (1-5 stars)
   - Written review (500 chars max)
   - Photo upload (optional)
   - Review categories (quality, communication, value)
3. Implement review validation:
   - Must have active conversation
   - Job must be completed
   - One review per lead
4. Create review display:
   - Reviews on worker profile
   - Average rating calculation
   - Review sorting (most recent, highest rated)
   - Review count badge
5. Build review response:
   - Workers can respond once
   - Response length limit (300 chars)
6. Implement review moderation:
   - Report review button
   - Admin review queue
   - Remove inappropriate reviews
7. Create review reminders:
   - Email 24h after job marked complete
   - In-app notification
8. Build review analytics (worker dashboard):
   - Average rating over time
   - Review breakdown by category
9. Test review flow end-to-end

**Deliverables:**
- ✅ Review system functional
- ✅ Review display on profiles
- ✅ Review responses working
- ✅ Review moderation

**Success Criteria:**
- Clients can leave reviews after job completion
- Reviews display attractively on worker profiles
- Workers can respond to reviews
- Average rating is accurate

### Day 26: UI/UX Polish
**Tasks:**
1. Conduct full UI audit:
   - Consistent spacing
   - Consistent colors
   - Consistent typography
   - Consistent button styles
2. Implement micro-interactions:
   - Hover effects
   - Focus states
   - Click feedback
   - Smooth transitions
3. Optimize loading states:
   - Skeleton screens
   - Progress indicators
   - Spinner placement
4. Improve error handling:
   - User-friendly error messages
   - Actionable next steps
   - Error illustrations
5. Build empty states:
   - No leads available
   - No messages yet
   - No portfolio items
   - First-time user prompts
6. Create onboarding tooltips:
   - First-time user guide
   - Feature highlights
   - Contextual help
7. Implement accessibility improvements:
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast check
8. Mobile optimization pass:
   - Touch target sizes (44x44px min)
   - Scroll behavior
   - Form inputs (prevent zoom)
   - Bottom navigation
9. Add loading animations
10. Test on multiple devices

**Deliverables:**
- ✅ Polished UI across all pages
- ✅ Smooth animations
- ✅ Excellent mobile experience
- ✅ Accessibility improvements

**Success Criteria:**
- UI feels professional and cohesive
- All interactions have feedback
- Empty states guide users
- Mobile experience is delightful

### Day 27: Testing & Bug Fixes
**Tasks:**
1. Write and run E2E tests:
   - User registration flow
   - Lead creation and purchase
   - Chat messaging
   - Wallet deposit
   - Review submission
2. Conduct security testing:
   - SQL injection attempts
   - XSS attempts
   - CSRF protection verification
   - Authentication bypass attempts
   - Authorization checks
3. Perform load testing:
   - Concurrent users
   - Message throughput
   - Database query performance
4. Test payment flows thoroughly:
   - Successful payments
   - Failed payments
   - Webhook failures
   - Refund processing
5. Cross-browser testing:
   - Chrome
   - Safari (iOS)
   - Firefox
   - Edge
6. Create bug tracking spreadsheet
7. Fix all critical bugs
8. Fix high-priority bugs
9. Document known issues (low priority)
10. Test with real data:
    - Create test leads
    - Simulate user interactions
    - Test edge cases

**Deliverables:**
- ✅ E2E test suite
- ✅ Security verified
- ✅ Performance tested
- ✅ All critical bugs fixed

**Success Criteria:**
- All critical user flows work flawlessly
- No security vulnerabilities found
- Application handles load well
- Known issues are documented

### Day 28: Production Deployment
**Tasks:**
1. Set up production infrastructure:
   - AWS EC2/ECS instance
   - PostgreSQL RDS database
   - S3 bucket for uploads
   - CloudFront CDN
   - Route 53 domain setup
   - SSL certificate (AWS Certificate Manager)
2. Configure production environment:
   - Environment variables
   - Database connection
   - Stripe production keys
   - Twilio production keys
   - AWS credentials
3. Set up CI/CD pipeline:
   - GitHub Actions
   - Automated testing
   - Automated deployment
4. Implement monitoring:
   - Sentry error tracking
   - CloudWatch logs
   - Uptime monitoring
   - Performance monitoring
5. Create database backup strategy:
   - Automated daily backups
   - Backup retention policy
   - Restore testing
6. Build admin tools:
   - Database query interface (careful)
   - Manual refund processing
   - User impersonation (for support)
7. Create deployment documentation:
   - Deployment checklist
   - Rollback procedure
   - Environment setup guide
8. Deploy to production:
   - Run database migrations
   - Deploy backend
   - Deploy frontend
   - Verify all services
9. Configure monitoring alerts:
   - Error rate threshold
   - Response time threshold
   - Database connection failures
   - Payment failures
10. Final smoke test in production

**Deliverables:**
- ✅ Production environment live
- ✅ Monitoring and alerts active
- ✅ Backups configured
- ✅ CI/CD pipeline working

**Success Criteria:**
- Application is live at production URL
- All services are operational
- Monitoring is capturing data
- SSL certificate is valid
- Backups are running

**Reference:** See PRD_Part6.md § 9.3 for AWS infrastructure details

---

## Phase 8: Launch Week

**Goal:** Soft launch with 35 committed handymen and first clients

### Pre-Launch (Day 29)
**Tasks:**
1. Final production verification:
   - All features working
   - No critical bugs
   - Performance acceptable
2. Prepare launch communications:
   - Email to 35 handymen
   - Social media posts
   - WhatsApp messages
3. Create launch checklist:
   - Support team ready
   - Monitoring alerts configured
   - Payment system verified
   - Backup plan ready
4. Final data verification:
   - Seed production database (categories, locations)
   - Verify admin accounts
   - Test user accounts ready
5. Prepare support resources:
   - FAQ document
   - Known issues list
   - Support contact info

### Launch Day (Day 30)
**Tasks:**
1. Send invitations to 35 handymen:
   - Personalized emails
   - Registration links
   - First week free reminder
2. Monitor systems closely:
   - Watch error rates
   - Check server load
   - Monitor payment webhooks
3. Be ready for immediate support:
   - Respond to questions quickly
   - Fix any critical issues immediately
   - Document feedback
4. Track launch metrics:
   - Registration rate
   - Profile completion rate
   - First lead creation
   - First lead purchase
5. Celebrate first transactions! 🎉

### Week 1 Post-Launch
**Tasks:**
1. Daily check-ins with early users
2. Gather feedback systematically
3. Fix bugs as they appear
4. Monitor key metrics:
   - Daily active users
   - Leads created
   - Leads purchased
   - Conversion rate (lead to hire)
   - Average response time
5. Adjust marketing based on data
6. Plan iterations based on feedback

**Success Criteria:**
- 20+ handymen registered in first week
- 10+ client leads created in first week
- 5+ leads purchased in first week
- Zero critical bugs
- Positive user feedback

**Reference:** See PRD_Part6.md § 11 for complete launch plan

---

## Post-MVP Phases

### Phase 9: AI Integration (Months 2-3)

**Goal:** Implement AI-powered features to improve matching and user experience

**Major Features:**
1. **AI Lead Matching**
   - Semantic search for leads
   - Improved ranking algorithm using ML
   - Predict lead quality
   - Suggest optimal pricing

2. **AI Chatbot Support**
   - Answer common questions
   - Help with navigation
   - Escalate to human support when needed
   - Available 24/7

3. **Smart Notifications**
   - Predict best time to send notifications
   - Personalize notification content
   - Reduce notification fatigue

4. **Content Moderation AI**
   - Automatic inappropriate content detection
   - Spam filtering
   - Scam detection
   - Reduce manual moderation work

**Timeline:** 8 weeks
**Dependencies:** MVP stable and launched
**Success Criteria:** 20% improvement in lead conversion rate

### Phase 10: WhatsApp Integration (Month 3)

**Goal:** Enable WhatsApp as communication channel

**Major Features:**
1. **WhatsApp Business API Integration**
   - Send lead notifications via WhatsApp
   - Allow clients to create leads via WhatsApp
   - Chat with workers via WhatsApp
   - Sync with in-platform chat

2. **WhatsApp Templates**
   - Welcome message
   - Lead notification
   - Payment confirmation
   - Review request

3. **WhatsApp Analytics**
   - Message delivery rates
   - Response rates
   - User preferences

**Timeline:** 4 weeks
**Dependencies:** Twilio WhatsApp Business approval
**Success Criteria:** 50% of users prefer WhatsApp communication

### Phase 11: Company Accounts (Months 4-5)

**Goal:** Allow property managers and companies to use platform

**Major Features:**
1. **Company Account Type**
   - Multiple users per account
   - Billing to company
   - Lead history and analytics
   - Team management

2. **Bulk Lead Creation**
   - Create multiple leads at once
   - Template leads
   - Scheduled posting

3. **Company Dashboard**
   - Team activity
   - Spending analytics
   - Worker relationships
   - Invoice management

4. **Volume Discounts**
   - Pricing tiers based on lead volume
   - Monthly contracts
   - Dedicated account manager (high volume)

**Timeline:** 8 weeks
**Dependencies:** Core platform stable
**Success Criteria:** 10 company accounts in first 2 months

### Phase 12: Subscription Model (Month 6+)

**Goal:** Offer subscription tiers for workers

**Major Features:**
1. **Subscription Tiers**
   - Basic: Current pay-per-lead model
   - Pro: 800 MXN/month, 10 leads included + discounted additional
   - Premium: 1500 MXN/month, 25 leads included + priority ranking

2. **Subscription Benefits**
   - Priority in search results
   - Featured badge on profile
   - Advanced analytics
   - Early access to new leads
   - Reduced lead prices

3. **Subscription Management**
   - Upgrade/downgrade
   - Cancel anytime
   - Billing history
   - Auto-renewal

**Timeline:** 6 weeks
**Dependencies:** Payment system working flawlessly
**Success Criteria:** 30% of active workers on paid subscription

### Phase 13: Marketplace Features (Months 7-9)

**Goal:** Expand to full marketplace with additional features

**Major Features:**
1. **Emergency Services**
   - 2-hour response guarantee
   - Premium pricing
   - Verified emergency workers
   - Real-time GPS tracking

2. **Scheduled Services**
   - Book future appointments
   - Recurring services
   - Calendar integration
   - Automatic reminders

3. **Service Packages**
   - Pre-defined service bundles
   - Fixed pricing
   - One-click booking
   - Popular combinations

4. **Worker Teams**
   - Workers can form teams
   - Share leads
   - Combined profiles
   - Team reviews

**Timeline:** 12 weeks
**Dependencies:** Stable user base, proven model
**Success Criteria:** 20% of jobs are scheduled or packages

### Phase 14: Geographic Expansion (Month 10+)

**Goal:** Expand beyond Mexico City

**Major Features:**
1. **New Cities**
   - Guadalajara
   - Monterrey
   - Puebla
   - Queretaro

2. **Multi-City Support**
   - Location-based routing
   - City-specific categories
   - Regional pricing
   - Local payment methods

3. **Franchise Model (Future)**
   - Local operators
   - Shared platform
   - Localized marketing
   - Revenue sharing

**Timeline:** Ongoing
**Dependencies:** Mexico City success
**Success Criteria:** Replicate Mexico City success in 2+ cities

---

## Dependencies Map

```
Phase 0 (Foundation)
    ↓
Phase 1 (Infrastructure)
    ↓
    ├─→ Phase 2 (User Management)
    │       ↓
    ├─→ Phase 3 (Lead System) ← depends on Phase 2
    │       ↓
    ├─→ Phase 4 (Wallet & Payments) ← depends on Phase 3
    │       ↓
    └─→ Phase 5 (Communication) ← depends on Phase 3
            ↓
        Phase 6 (Admin & Support) ← depends on all above
            ↓
        Phase 7 (Polish) ← depends on all above
            ↓
        Phase 8 (Launch)
            ↓
        Post-MVP Phases (9-14)
```

**Critical Path:**
1. Foundation → Infrastructure → User Management → Lead System
2. Lead System → Wallet → Communication
3. All above → Admin/Support → Polish → Launch

**Parallel Work Opportunities:**
- Day 6-7: Email/SMS can be done in parallel with frontend foundation
- Day 11-12: Lead creation and search can be developed simultaneously
- Day 19-20: Chat infrastructure and UI can progress in parallel
- Day 22-23: Admin and Support dashboards can be built simultaneously

---

## Risk Mitigation

### Technical Risks

**Risk:** Stripe webhook failures cause wallet balance issues
**Mitigation:**
- Implement idempotent webhook processing
- Log all webhook events
- Build manual reconciliation tool
- Set up webhook failure alerts
- Regular balance audits

**Risk:** Real-time chat doesn't scale
**Mitigation:**
- Use battle-tested Socket.io
- Implement connection pooling
- Add horizontal scaling early
- Monitor WebSocket connections
- Fall back to polling if needed

**Risk:** Database performance degrades
**Mitigation:**
- Index all frequently queried fields
- Use database query monitoring
- Implement caching (Redis) if needed
- Regular query optimization
- Plan for database scaling

**Risk:** File uploads overwhelm server
**Mitigation:**
- Use S3 direct upload (pre-signed URLs)
- Limit file sizes strictly
- Implement image compression
- Use CDN for delivery
- Monitor storage costs

### Business Risks

**Risk:** Not enough leads created by clients
**Mitigation:**
- Make lead creation extremely easy
- Offer incentives for first lead
- Reach out to property managers
- Create educational content
- Monitor lead creation funnel

**Risk:** Workers don't purchase leads
**Mitigation:**
- Make first week free compelling
- Show lead quality metrics
- Provide success stories
- Offer money-back guarantee (refund policy)
- Gather feedback on lead quality

**Risk:** Refund rate too high
**Mitigation:**
- Educate clients on responding quickly
- Send reminders to clients
- Improve lead matching quality
- Analyze refund reasons
- Adjust refund policy if needed

**Risk:** Payment processing issues
**Mitigation:**
- Test Stripe integration thoroughly
- Have support ready for payment questions
- Monitor payment success rates
- Provide alternative payment methods (future)
- Clear communication about charges

### Timeline Risks

**Risk:** Features take longer than estimated
**Mitigation:**
- Build MVP features only
- Cut scope if behind schedule
- Have clear feature priorities
- Use third-party services when possible
- Accept technical debt for MVP

**Risk:** Integration delays (Stripe, Twilio, AWS)
**Mitigation:**
- Set up accounts early
- Read documentation thoroughly
- Use sandbox/test modes extensively
- Have backup plans for critical services
- Allocate buffer time

**Risk:** Bugs delay launch
**Mitigation:**
- Test continuously throughout development
- Fix bugs immediately
- Prioritize critical bugs
- Accept minor bugs for MVP
- Plan post-launch bug fix sprint

---

## Next Steps After This Roadmap

Once you complete this roadmap, you should:

1. **Create tracking.md** - Living document showing current development status
2. **Start Phase 0** - Begin with foundation setup
3. **Daily Updates** - Update tracking.md with progress
4. **Weekly Reviews** - Assess if timeline is realistic, adjust as needed
5. **User Feedback** - Gather feedback from 35 committed handymen early
6. **Iterate** - Use real user data to inform post-MVP priorities

---

**Last Updated:** November 5, 2025
**Total Timeline:** 28 days to MVP + 1 week launch + ongoing post-MVP phases
**Status:** Ready to begin Phase 0
