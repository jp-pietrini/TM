TrustMe Marketplace - PRD Quick Reference
Version: 1.0 MVP
Last Updated: November 2025
Status: Ready for Development

🎯 Quick Facts

Product: Lead generation marketplace for home services in Mexico City
Business Model: Handymen pay 100 MXN per lead, clients use free
Timeline: 1 month MVP development (solo developer)
Tech Stack: React 18 + TypeScript, Express, PostgreSQL, AWS, Stripe, Twilio
Brand: Sky Blue (#4A90E2), Plus Jakarta Sans font, Apple/Facebook inspired


📑 Document Navigation
Core Features

User Roles - Client, Worker, Admin, Customer Support
Lead System - Creation, purchase, refunds
Wallet & Budget - Balance management, weekly limits
Payment & Escrow - Stripe integration, 5-day hold
Reviews - Detailed rating system
Chat System - In-platform messaging
Search & Discovery - Algorithm and filters

Technical Specs

Database Schema - All tables and relationships
API Endpoints - Routes and responses
Integrations - Stripe, Twilio, AWS
Security - Authentication, authorization, data protection

Design & UX

Design System - Colors, typography, components
User Flows - Step-by-step journeys
Mobile Strategy - PWA first, React Native later

Launch

Success Metrics - KPIs and goals
Launch Plan - Pre-launch, soft launch, public
Future Phases - AI, WhatsApp, companies


👥 User Roles
Client (Service Seeker)
Key Actions: Search workers → Send lead to workers → Chat → Pay → Review
Access: Free, no charges
Mobile Usage: 85%
Worker (Handyman)
Key Actions: Purchase leads → Chat with clients → Get paid → Build portfolio
Costs: 100 MXN per lead (first week free), 300 MXN/week minimum budget
Revenue: Keep 100% of service payment
Admin (Platform Owner)
Key Actions: Approve workers → Monitor platform → Resolve escalations
Access: Full system access
Customer Support (Founders Initially)
Key Actions: Handle tickets → Resolve disputes → Moderate content
Hours: 9 AM - 9 PM

💰 Lead System
Lead Creation (Client)
Process:

Client searches for service
Views worker profiles
Selects 1-6 workers to send lead to
Fills detailed form (description, photos, budget, availability)
Provides contact info (creates account if new)
Lead sent to selected workers

Lead Cost: Free for client
Lead Purchase (Worker)
Before Purchase - Worker Sees:

✅ Full job description and photos
✅ Location (zone only, not exact address)
✅ Budget range, urgency, timeline
✅ If client is new or has review history
❌ Client name, email, WhatsApp, exact address

Purchase: Click "Buy Lead - 100 MXN" → Deducted from wallet → Chat opens
After Purchase - Before Client Response:

✅ Client first name
✅ Chat access
❌ Still no email, WhatsApp, exact address

After Client Responds to First Message:

✅ Full name, email, WhatsApp, exact address visible
✅ Lead becomes non-refundable

Lead Refund Policy
Refundable: Client doesn't respond within 48 hours → Automatic refund
Non-Refundable: Client responded (even if picks different worker)
Refund Process: Automatic, 100 MXN returned to wallet + weekly budget

💳 Wallet & Budget
Wallet Balance
Minimum: 100 MXN to purchase leads
Recommended: 300+ MXN
Add Funds: Card (instant), OXXO (1-2h), Bank transfer (minutes)
Withdrawals: Bank transfer (future feature)
Weekly Budget
Purpose: Control spending, prevent overspending
Minimum: 300 MXN/week (after first free week)
Reset: Every Monday 00:00
Behavior: Once budget spent, cannot buy more leads until Monday or increase budget
First Week Free
New Workers: All leads FREE for first 7 days
After 7 Days: Must add 300 MXN minimum, weekly budget applies
Transactions Types

deposit - Add funds (+)
lead_purchase - Buy lead (-)
refund - Unresponsive client (+)
payment_received - Client paid for service (+)
withdrawal - Bank transfer (-)


💸 Payment & Escrow
Payment Request Flow

Worker sends payment request (amount, description, service date)
Client receives notification + email
Client pays via Stripe Checkout (amount + ~3% Stripe fee)
Money enters escrow (held by TrustMe)
Worker performs service
Both parties confirm completion
5-day hold period starts
On day 6: Automatic release to worker's wallet (if no dispute)

Escrow Protection
Purpose: Protect client from poor work, protect worker from non-payment
Hold Period: 5 days after both confirm completion
During Hold: Client can raise dispute
No Dispute: Auto-release on day 6
With Dispute: Money frozen until customer support resolves
Stripe Integration
Products: Checkout (client payment), Connect (future - worker payouts)
MVP Approach: Funds to TrustMe account, manual/internal payouts
Webhook: checkout.session.completed → Update payment status

⭐ Reviews
Requirements
Who: Only clients who paid via Stripe
When: After both parties confirm service complete
Once: One review per booking (cannot edit)
Review Components (Required)

Overall rating (1-5 stars)
Title (10-100 chars)
Description (100-1000 chars)
Would recommend (yes/no)
Would hire again (yes/no)

Optional Components

Quality, communication, punctuality, professionalism, value ratings (each 1-5)
Photos (up to 10)

Review Incentive
Block Next Search: Client must review last service before creating new lead (skippable after 30 days)
Worker Response
Can Respond: Max 500 characters
Best Practices: Thank client, address concerns, stay professional

💬 Chat System
When Chat Starts
Trigger: Worker purchases lead → Chat opens automatically
Message Types

Text (up to 5,000 chars)
Image (up to 5 MB)
Video (up to 50 MB)
Voice (up to 2 minutes)
File (up to 10 MB)

Contact Info Visibility
Before Client Response: Worker sees first name only
After Client Response: Full name, email, WhatsApp visible
Flag Conversation
Either Party Can Flag: Inappropriate, spam, harassment, scam
Action: Customer support reviews
Message Retention
Forever: All messages kept (dispute evidence)
Users Can: Delete entire chat (both sides)

🔍 Search & Discovery
Search Inputs

Service category (required)
Subcategory
Location (zone or zip code)
Availability (days + time slots)
Urgency level

Ranking Algorithm
Weights:

Service match: 40%
Distance: 25%
Rating: 15%
Availability match: 10%
Response time: 5%
Price competitiveness: 5%

Boosts:

Verified profiles: +5 to +15 points
Has portfolio: +5 points
Verified portfolio: +10 points
Active recently: +5 points

Penalties:

Active dispute: -20 points
Low ratings: -5 per low review

Filters

Price range
Minimum rating (3+, 4+, 4.5+)
Distance radius (km)
Verified badge only
Number of completed tasks (5+, 10+, 25+, 50+)

Sort Options

Best match (default - algorithm score)
Distance (closest first)
Rating (highest first)
Price (lowest first)
Most reviews


🗄️ Database Schema
Core Tables

users - All user accounts (email, password, role, profile)
worker_profiles - Worker details (description, areas, availability, approval)
services - Service categories (name, description, keywords)
worker_services - Worker offerings (pricing, services)
portfolio_projects - Portfolio entries (title, description, category, verification)
portfolio_media - Portfolio images/videos (url, sort order)
leads - Job postings (category, description, budget, urgency, status)
lead_media - Lead photos/videos
lead_recipients - Which workers received lead
lead_purchases - Which workers bought lead (refund status)
conversations - Chat threads (lead, client, worker)
messages - Chat messages (type, content, media, read status)
wallet_transactions - Wallet activity (deposits, purchases, refunds)
weekly_budgets - Spending limits (limit, spent, week start)
payment_requests - Service payments (amount, status, Stripe ID)
escrow_payments - Held funds (completion status, release date, dispute)
reviews - Service reviews (ratings, comments, photos)
review_media - Review photos
disputes - Payment disputes (type, status, resolution, refund)
dispute_evidence - Dispute photos/docs
support_tickets - Help requests (subject, category, status)
support_messages - Ticket responses
flagged_conversations - Reported chats (reason, status)

Key Relationships

users → worker_profiles (1:1)
worker_profiles → portfolio_projects (1:many)
portfolio_projects → portfolio_media (1:many)
leads → lead_purchases (1:many)
lead_purchases → conversations (1:1)
conversations → messages (1:many)
payment_requests → escrow_payments (1:1)
escrow_payments → disputes (1:1, optional)
reviews → review_media (1:many)


🔌 API Endpoints
Authentication

POST /api/auth/register - Create account
POST /api/auth/login - Login
POST /api/auth/logout - Logout
GET /api/auth/me - Current user
POST /api/auth/verify-email - Verify email
POST /api/auth/verify-phone - Verify WhatsApp
POST /api/auth/forgot-password - Request reset
POST /api/auth/reset-password/:token - Reset password

Workers

POST /api/workers/profile - Create/update profile
GET /api/workers/profile - Own profile
GET /api/workers/:id - Public profile
GET /api/workers/search - Search workers

Portfolio

GET /api/portfolio/projects - List projects
POST /api/portfolio/projects - Create project
PATCH /api/portfolio/projects/:id - Update project
DELETE /api/portfolio/projects/:id - Delete project
POST /api/portfolio/projects/:id/verify - Client verify

Leads

POST /api/leads - Create lead
GET /api/leads/mine - Client's leads
GET /api/leads/available - Available for worker
GET /api/leads/:id - Lead details
POST /api/leads/:id/purchase - Buy lead

Chat

GET /api/conversations - All conversations
GET /api/conversations/:id/messages - Messages
POST /api/conversations/:id/messages - Send message
POST /api/conversations/:id/flag - Flag conversation

Wallet

GET /api/wallet/balance - Current balance
GET /api/wallet/transactions - History
POST /api/wallet/deposit - Add funds
PATCH /api/wallet/budget - Update budget

Payments

POST /api/payments/request - Create request
GET /api/payments/:id - Request details
POST /api/payments/:id/pay - Pay via Stripe
POST /api/payments/:id/confirm-complete - Mark complete

Reviews

POST /api/reviews - Submit review
GET /api/reviews/worker/:workerId - Worker's reviews
POST /api/reviews/:id/respond - Worker response

Disputes

POST /api/disputes - Create dispute
GET /api/disputes/:id - Dispute details
POST /api/disputes/:id/evidence - Upload evidence
PATCH /api/disputes/:id/resolve - Resolve (support)

Support

POST /api/support/tickets - Create ticket
GET /api/support/tickets/:id - Ticket details
POST /api/support/tickets/:id/messages - Reply

Admin

GET /api/admin/approval-queue - Pending approvals
PATCH /api/admin/workers/:id/approve - Approve worker
PATCH /api/admin/workers/:id/reject - Reject worker
GET /api/admin/metrics - Platform stats

Webhooks

POST /api/webhooks/stripe - Stripe events
POST /api/webhooks/twilio - Twilio events


🔐 Security
Authentication

Bcrypt password hashing (10 rounds)
Session-based (PostgreSQL store)
httpOnly + secure + SameSite cookies
30-day session expiration

Authorization

Role-based access control
Resource ownership validation
Protected routes middleware

Input Validation

Zod schemas on all endpoints
SQL injection prevention (Drizzle ORM)
XSS prevention (React escaping)
File type/size validation

Rate Limiting

Registration: 3/hour per IP
Login: 5/15min per IP
Password reset: 3/hour per IP
API: 100/min per IP

File Upload Security

MIME type validation
5 MB limit (images), 50 MB (videos)
Unique filenames (UUID)
S3 private buckets
CloudFront signed URLs (future)


🎨 Design System
Colors
Primary: Sky Blue #4A90E2
Secondary: Light Blue #7DB3F5
Dark: #2C6BB3
Success: Green #10B981
Error: Red #EF4444
Warning: Yellow #F59E0B
Text: Black #000000, Gray #6B7280
Background: White #FFFFFF, Off-White #F9FAFB
Typography
Font: Plus Jakarta Sans
Weights: Regular (400), Medium (500), SemiBold (600), Bold (700)
Sizes: Hero 48px, H1 36px, H2 30px, H3 24px, Body 16px
Spacing
Base: 4px
Scale: xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48), 3xl(64)
Components

Buttons: Primary (blue), Secondary (outline), Tertiary (text)
Cards: White bg, 12px radius, subtle shadow
Forms: 8px radius, 2px blue focus border
Badges: Pill shape, semantic colors
Modal: Centered, 600px max width
Toast: Top-right, auto-dismiss 5s

Responsive
Breakpoints: Mobile <640px, Tablet 640-1024px, Desktop >1024px
Strategy: Mobile-first, 44px touch targets
Inspiration: Apple (clean, minimal), Facebook (familiar patterns)

🚀 User Flows
Client Flow

Search → Enter service, zone, availability
Browse → View workers (cards with ratings, distance)
Select → Pick 1-6 workers to send lead
Create Lead → Fill form (description, photos, budget)
Provide Contact → Name, email, WhatsApp (account created)
Wait → Workers purchase lead, send messages
Chat → Discuss with workers who bought lead
Hire → Agree on price with one worker
Pay → Worker sends Stripe payment request
Service → Worker performs service
Confirm → Both mark complete → 5-day hold
Review → Rate and review worker

Worker Flow

Register → Create account, verify email/WhatsApp
Profile → Add description, services, areas, availability, portfolio
Approval → Admin reviews and approves
Wallet → Add 300 MXN (first week free)
Budget → Set weekly spending limit
Browse Leads → See matching leads in dashboard
Purchase → Buy lead for 100 MXN → Chat opens
Message → Send first message to client
Wait 48h → Client responds (reveals contact info) OR no response (refund)
Negotiate → Discuss price, scope, timing
Send Payment → Create payment request via Stripe
Deliver → Perform service
Complete → Mark complete → Wait for client confirmation
Get Paid → 5 days after completion → Money to wallet
Respond → Reply to client's review

Admin Flow

Login → Access admin dashboard
Approval Queue → See pending workers
Review → Check profile, portfolio, verification
Decide → Approve, request changes, or reject
Monitor → Watch platform metrics (users, revenue, disputes)
Support → Handle escalated disputes
Users → Suspend/ban problematic users


🔗 Integrations
Stripe (Payments)
Products: Checkout, Connect (future)
Keys: Publishable, Secret, Webhook signing
Webhooks: checkout.session.completed
Testing: Test mode, test cards (4242...)
Twilio (Email & SMS)
SendGrid (Email): Transactional emails, 18 templates
Verify API (SMS): WhatsApp number verification, 6-digit codes
Cost: ~$50-100/month estimated
AWS (Infrastructure)
S3: File storage (profiles, portfolios, leads, reviews, messages)
CloudFront: CDN for fast delivery
RDS: PostgreSQL database
EC2/ECS: Backend hosting
Route 53: DNS
Certificate Manager: SSL/TLS
CloudWatch: Monitoring and logs
Estimated Cost: ~$56/month MVP
Google Analytics
GA4: Track events, conversions, user behavior
Events: user_registered, lead_created, payment_completed, etc.
Sentry (Errors)
Frontend + Backend: Error tracking, stack traces, alerts

📊 Success Metrics
Launch Goals (First 30 Days)

Handymen: 50+ approved (start with 35)
Clients: 100+ registered
Leads: 50+ created
Purchase Rate: 60%+ of leads bought
Payments: 20+ services paid
Services: 15+ completed
Reviews: 10+ submitted
Quality: 4.0+ avg rating, <10% dispute rate

Key KPIs
Growth: New registrations/week, approval rate, activation rate
Marketplace: Lead creation rate, fill rate, time to purchase
Revenue: Total leads sold, revenue from leads, GMV
Quality: Avg rating, review rate, dispute rate, resolution time
Engagement: DAU, messages per conversation, session duration

📅 Launch Plan
Pre-Launch (Week -1)

✅ All features complete and tested
✅ Infrastructure configured (AWS, Stripe, Twilio)
✅ Legal pages (Spanish)
✅ 35 handymen onboarded and approved
✅ End-to-end testing

Soft Launch (Week 1-2)

Invite-only (10-20 test clients + 35 handymen)
Monitor closely, fix bugs immediately
Daily user check-ins
Success: 10+ transactions, no critical bugs

Public Launch (Week 3)

Announce on social media (CDMX Facebook groups)
Target: Roma Norte, Condesa, Polanco
Organic growth (no paid ads yet)
Daily monitoring and support

Post-Launch (Week 4+)

Weekly updates
Feedback collection
Feature prioritization
Growth initiatives


🔮 Future Phases
Phase 2 (Month 2-3): AI & WhatsApp

AI lead matching and pricing recommendations
WhatsApp Business API integration
Native mobile apps (React Native)

Phase 3 (Month 4-5): Companies

Company accounts (multiple workers)
Worker management (assign jobs, track)
Company portfolios and reviews

Phase 4 (Month 6+): Subscriptions

Handyman subscription plans (Basic, Pro, Premium)
Hybrid model (pay-per-lead OR subscription)

Phase 5 (Month 7-9): Expansion

New service categories (cleaning, moving, landscaping)
New cities (Guadalajara, Monterrey, Puebla)

Phase 6 (Month 10-12): Advanced Features

Calendar integration, recurring bookings
Digital contracts and e-signatures
Platform guarantee and insurance


🔍 Quick Search Keywords
By Topic:

Lead pricing: "100 MXN", "lead purchase", "refund"
Payments: "Stripe", "escrow", "5-day hold"
Wallet: "balance", "weekly budget", "300 MXN minimum"
Chat: "contact info", "WhatsApp visibility", "48 hours"
Reviews: "rating", "stars", "would recommend"
Search: "algorithm", "ranking", "filters"
Database: "schema", "tables", "relationships"
API: "endpoints", "routes", "webhooks"
Design: "colors", "typography", "components"
Security: "authentication", "authorization", "validation"

By User Role:

Client: "search", "send lead", "pay", "review"
Worker: "purchase lead", "wallet", "budget", "portfolio"
Admin: "approve", "reject", "metrics", "suspend"
Support: "dispute", "ticket", "flag", "resolution"

By Feature:

Users: "registration", "login", "profile", "verification"
Leads: "create", "purchase", "refund", "48 hours"
Payments: "Stripe", "escrow", "release", "dispute"
Reviews: "rating", "comment", "photos", "response"
Chat: "messages", "media", "contact info", "flag"
Portfolio: "projects", "media", "verification"


📞 Quick References
Brand Color: #4A90E2 (Sky Blue)
Font: Plus Jakarta Sans
Lead Price: 100 MXN
Weekly Min Budget: 300 MXN
First Week: FREE leads
Refund Window: 48 hours
Escrow Hold: 5 days
Min Balance: 100 MXN to buy lead
Max Lead Recipients: 6 workers
Review Min: 100 chars description
Support Hours: 9 AM - 9 PM
Client Mobile Usage: 85%
Launch Timeline: 1 month MVP

Document Purpose: Quick navigation and search reference for comprehensive PRD
For: Claude Code development assistance
Full PRD: See complete document for detailed specifications
