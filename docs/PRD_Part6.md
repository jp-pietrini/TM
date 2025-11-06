9. Integration Requirements
9.1 Stripe Integration
Stripe Account Setup:

Create Stripe account (trustme.mx)
Enable test mode for development
Obtain API keys:

Publishable key (frontend)
Secret key (backend)
Webhook signing secret



Stripe Products to Use:
1. Stripe Checkout:

Client payment collection
Hosted payment page (Stripe handles card details)
Supports cards, wallets (Apple Pay, Google Pay)

2. Stripe Connect (Future - Full Escrow):

For holding and distributing funds
TrustMe as platform (Connect platform)
Workers as connected accounts (Express accounts)
Transfer funds to workers after escrow release

MVP Approach (Simpler):

Use standard Stripe Checkout
Funds go to TrustMe's Stripe balance
Manually transfer to workers via bank (or build internal wallet payout)
Later: Migrate to full Stripe Connect

Stripe Checkout Implementation:
Backend:

Create Checkout Session:

Call stripe.checkout.sessions.create
Set payment amount, currency (MXN)
Set success and cancel URLs
Include metadata (payment_request_id, worker_id, client_id)
Return session URL to frontend



Frontend:
2. Redirect to Stripe Checkout:

User clicks "Pay Now"
Redirect to Stripe Checkout URL
User enters card details on Stripe page
Stripe processes payment

Backend:
3. Handle Webhook:

Stripe sends checkout.session.completed webhook
Verify webhook signature
Extract metadata
Update payment_request status to "paid"
Create escrow_payment record
Send confirmation emails

Webhook Endpoint:

URL: POST /api/webhooks/stripe
Verify signature using webhook secret
Handle events:

checkout.session.completed
payment_intent.succeeded
charge.refunded



Refund Handling:

Call stripe.refunds.create with payment_intent_id
Partial or full refund supported
Update escrow_payment status to "refunded"
Send notification to both parties

Testing:

Use Stripe test mode and test cards
Test card: 4242 4242 4242 4242 (successful payment)
Trigger webhooks manually via Stripe dashboard

9.2 Twilio Integration
Twilio Account Setup:

Create Twilio account
Obtain credentials:

Account SID
Auth Token


Purchase Twilio phone number (optional, for SMS)

Twilio Products to Use:
1. Twilio SendGrid (Email):

For transactional emails
Better deliverability than self-hosted SMTP
Setup:

Create SendGrid account (can be under Twilio)
Verify sender email (or domain)
Obtain API key
Create email templates (optional, or use HTML in code)



SendGrid API Usage:

Backend: @sendgrid/mail npm package
Send email via API:

typescript  import sgMail from '@sendgrid/mail';
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'client@example.com',
    from: 'noreply@trustme.mx',
    subject: 'Payment Request from Handyman',
    html: '<p>You have a payment request...</p>',
  };

  await sgMail.send(msg);
2. Twilio Verify API (SMS/WhatsApp Verification):

For phone number verification
Sends 6-digit code via SMS
Setup:

Create Verify Service in Twilio Console
Obtain Service SID



Verify API Usage:

Backend: twilio npm package

Send Verification Code:
typescriptimport twilio from 'twilio';
const client = twilio(accountSid, authToken);

await client.verify.v2
  .services(verifySid)
  .verifications
  .create({ to: '+525512345678', channel: 'sms' });
Check Verification Code:
typescriptconst verification = await client.verify.v2
  .services(verifySid)
  .verificationChecks
  .create({ to: '+525512345678', code: '123456' });

if (verification.status === 'approved') {
  // Code is correct
}
Twilio Costs:

SendGrid: Free tier (100 emails/day), then $15/month (40k emails)
Verify API: ~$0.05 per verification
Estimate for MVP: $50-100/month

Testing:

SendGrid: Use test mode, check email in inbox
Verify API: Use test phone numbers provided by Twilio

9.3 AWS Integration
AWS Services to Use:
1. S3 (File Storage):

Create S3 buckets:

trustme-profiles-{env} (profile pictures)
trustme-portfolios-{env} (portfolio media)
trustme-leads-{env} (lead photos/videos)
trustme-messages-{env} (chat attachments)
trustme-reviews-{env} (review photos)


Bucket settings:

Private (not public access)
Versioning enabled (backup)
Lifecycle rules (delete old files after X days, if needed)



S3 Upload Process:

Backend uses AWS SDK (@aws-sdk/client-s3)
Upload file:

typescript  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

  const s3 = new S3Client({ region: 'us-east-1' });

  await s3.send(new PutObjectCommand({
    Bucket: 'trustme-profiles-prod',
    Key: `profiles/${userId}/${filename}`,
    Body: fileBuffer,
    ContentType: mimeType,
  }));

  const url = `https://${cloudFrontDomain}/${key}`;
2. CloudFront (CDN):

Create CloudFront distribution pointing to S3 bucket
Faster global delivery of images/videos
Automatic caching
Custom domain: cdn.trustme.mx
URL format: https://cdn.trustme.mx/profiles/12345/photo.jpg

3. RDS PostgreSQL (Database):

Create RDS PostgreSQL instance
Instance type: t3.micro (for MVP, can scale up)
Multi-AZ: No (for MVP, enable later for high availability)
Automated backups: Enabled (7-day retention)
Encryption: Enabled
Connection:

Backend connects via DATABASE_URL environment variable
Format: postgresql://user:pass@host:5432/dbname



4. EC2 or ECS (Backend Hosting):
Option A: EC2 (Simpler for MVP):

Launch EC2 instance (t3.small)
Install Node.js
Deploy code via SSH or CI/CD
Use PM2 for process management
Nginx as reverse proxy

Option B: ECS Fargate (Better for scaling):

Containerize backend with Docker
Push Docker image to ECR (AWS container registry)
Deploy to ECS Fargate (serverless containers)
Auto-scaling capabilities
Load balancer in front

Recommendation for MVP: EC2 for simplicity, migrate to ECS after product-market fit
5. Route 53 (DNS):

Register domain: trustme.mx
Create hosted zone
Point domain to:

Frontend: Vercel or S3+CloudFront
Backend API: Load balancer or EC2 elastic IP
CDN: CloudFront distribution



6. Certificate Manager (SSL):

Request SSL certificate for:

trustme.mx
www.trustme.mx
api.trustme.mx
cdn.trustme.mx


Attach to load balancer and CloudFront

7. CloudWatch (Monitoring):

Log groups for:

Backend API logs
Error logs
Access logs


Metrics:

CPU usage
Memory usage
Request count
Error rate


Alarms:

High error rate
High CPU usage
Database connection issues



AWS IAM (Access Management):

Create IAM user for backend application
Grant permissions:

S3: PutObject, GetObject, DeleteObject
SES: SendEmail (if using SES instead of SendGrid)


Never use root account credentials
Use least-privilege principle

AWS Costs Estimate (Monthly - MVP):

S3: ~$5 (1000 GB storage, 100k requests)
CloudFront: ~$10 (100 GB transfer)
RDS: ~$25 (db.t3.micro, 20 GB storage)
EC2: ~$15 (t3.small, 8 GB storage)
Route 53: ~$1 (hosted zone + queries)
Total: ~$56/month (scales with usage)

9.4 Google Analytics Integration
Setup:

Create Google Analytics 4 property
Obtain Measurement ID (G-XXXXXXXXXX)
Add to frontend environment variables

Implementation:

Use react-ga4 npm package
Initialize in app root:

typescript  import ReactGA from 'react-ga4';

  ReactGA.initialize('G-XXXXXXXXXX');
Events to Track:

Page views (automatic)
Custom events (manual):

user_registered
profile_created
lead_created
lead_purchased
payment_completed
review_submitted
etc.



Example Custom Event:
typescriptReactGA.event({
  category: 'Lead',
  action: 'Lead Purchased',
  label: leadId,
  value: 100, // cost in MXN
});
Privacy:

Cookie consent banner (required in many jurisdictions)
Users can opt out
Anonymize IPs (GDPR compliance)

9.5 Sentry Integration (Error Tracking)
Setup:

Create Sentry account
Create project (Node.js for backend, React for frontend)
Obtain DSN (Data Source Name)

Backend Integration:
typescriptimport * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Capture errors automatically
app.use(Sentry.Handlers.errorHandler());
Frontend Integration:
typescriptimport * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.1, // 10% of transactions
});
Benefits:

Automatic error capture
Stack traces
User context (who experienced error)
Breadcrumbs (what led to error)
Release tracking
Email alerts for new errors


10. Success Metrics
10.1 Launch Goals (First 30 Days)
User Acquisition:

Handymen: 50+ approved profiles (start with 35 already committed)
Clients: 100+ registered clients
Client-to-handyman ratio: ~2:1 (healthy marketplace)

Engagement:

Leads created: 50+ leads
Lead purchase rate: 60%+ (% of leads that get at least one purchase)
Leads with multiple purchases: 30%+ (good competition)

Transaction:

Payments processed: 20+ services paid via Stripe
Services completed: 15+ (some in progress at end of month)
Reviews submitted: 10+ (building social proof)

Quality:

Average handyman rating: 4.0+ stars
Dispute rate: <10% of completed services
Refund rate: <20% of purchased leads

10.2 Key Performance Indicators (KPIs)
User Growth:

New handyman registrations per week
New client registrations per week
Handyman approval rate (% approved vs. rejected)
Handyman activation rate (% approved who purchase first lead within 7 days)

Marketplace Health:

Lead creation rate (leads per day)
Lead fill rate (% of leads that get purchased)
Average leads purchased per handyman per week
Time to first purchase (how fast leads get bought)
Repeat client rate (% who create 2+ leads)

Revenue:

Total leads sold (volume)
Revenue from lead sales (volume × 100 MXN)
Average revenue per handyman (ARPU)
Gross Merchandise Value (GMV - total client payments)

Quality & Trust:

Average handyman rating
Review submission rate (% of completed services reviewed)
Positive review rate (% of reviews 4+ stars)
Dispute rate
Dispute resolution time

Engagement:

Daily active handymen (logged in, active)
Daily active clients (searched, created lead)
Messages sent per conversation (engagement depth)
Session duration
Bounce rate

10.3 Analytics Dashboard
For Founders (Admin Dashboard):
Overview Tab:

Total users (clients, handymen)
Total leads created this month
Total revenue this month
Active conversations
Pending approvals

Users Tab:

New registrations (line graph over time)
User breakdown (pie chart: clients vs. handymen)
Approval queue size
User retention (cohort analysis)

Marketplace Tab:

Leads created vs. leads purchased (line graph)
Lead purchase rate (%)
Average time to first purchase
Top service categories
Top zones

Revenue Tab:

Daily/weekly/monthly revenue (line graph)
Revenue by service category
Average transaction value
Top earning handymen

Quality Tab:

Average rating (gauge)
Review count
Dispute count and rate
Resolution time
Refund rate

For Handymen (Personal Stats):

Leads purchased this week/month
Wallet balance and spending
Conversion rate (purchases → completed services)
Average rating
Reviews count
Earnings this month

For Clients (Personal Stats):

Leads created
Services hired
Reviews left
Favorite handymen

10.4 A/B Testing Opportunities (Future)
Pricing Tests:

Lead price: 100 MXN vs. 80 MXN vs. 120 MXN
Dynamic pricing: Higher for urgent leads
Subscription model: Flat monthly fee vs. per-lead

UX Tests:

Search results layout: Grid vs. List
Profile layout: Side-by-side vs. Stacked
Lead creation: 3 steps vs. 4 steps
Payment flow: In-app vs. External Stripe page

Messaging Tests:

CTA copy: "Request Service" vs. "Hire Now" vs. "Get Quote"
Urgency: "Only 3 handymen available" vs. No urgency
Social proof: "127 reviews" vs. "Trusted by 127 clients"


11. Launch Plan
11.1 Pre-Launch (Week -1)
Technical Checklist:

☐ All features complete and tested
☐ Database migrated and seeded with services
☐ AWS infrastructure configured
☐ Stripe connected (test mode working)
☐ Twilio configured (email and SMS)
☐ Domain configured (trustme.mx pointing to app)
☐ SSL certificates installed
☐ Error monitoring (Sentry) enabled
☐ Analytics (GA4) tracking
☐ Performance testing (load testing with 100 concurrent users)
☐ Security audit (basic checks: SQL injection, XSS, etc.)

Content Checklist:

☐ Legal pages: Terms, Privacy, Cookies (Spanish)
☐ Help center: FAQs
☐ Email templates: All 18 transactional emails
☐ Welcome emails for clients and handymen
☐ Admin approval queue tested

User Onboarding:

☐ Onboard 35 committed handymen:

Register accounts
Complete profiles
Admin approves
Add wallet funds (first week free)


☐ Create test clients for internal testing
☐ Run end-to-end test: Create lead → Purchase → Chat → Payment → Review

Marketing Materials:

☐ Landing page copy finalized
☐ Social media accounts created (Facebook, Instagram)
☐ Initial social media posts drafted
☐ WhatsApp business account (for support)

11.2 Soft Launch (Week 1-2)
Goal: Test with real users in controlled environment
Phase:

Invite-only
Friends and family
10-20 test clients (real people with real needs)
35 handymen already onboarded

Activities:

Handymen receive leads from test clients
Monitor all transactions closely
Daily check-ins with users (gather feedback)
Fix bugs immediately
Adjust pricing if needed (100 MXN lead cost)
Refine UX based on feedback

Success Criteria for Moving to Public Launch:

☐ 10+ successful transactions (lead → payment → service → review)
☐ No critical bugs
☐ Positive feedback from handymen and clients
☐ Dispute resolution process tested (at least 1 dispute handled)
☐ Refund process tested (at least 1 refund issued)

11.3 Public Launch (Week 3)
Announcement:

Post on social media (Facebook groups in CDMX)
Handyman WhatsApp groups (word of mouth)
Local CDMX Facebook marketplace posts
Nextdoor / local community apps

Launch Message (Spanish):
"🚀 TrustMe ya está aquí! Encuentra al experto que necesitas en CDMX. Plomeros, electricistas, pintores y más. Solo pagas cuando contratas. Primera semana GRATIS para profesionales. Regístrate en trustme.mx"
Initial Marketing Focus:

Target: Roma Norte, Condesa, Polanco (affluent neighborhoods)
Both clients and handymen in same zones
Organic growth (word of mouth)
No paid ads yet (prove concept first)

Launch Week Activities:

Monitor user registrations daily
Personally reach out to new users (welcome messages)
Respond to support tickets within 1 hour
Fix bugs and issues immediately
Collect feedback via in-app surveys

Metrics to Watch:

New user registrations per day
Lead creation rate
Lead purchase rate
Payment completion rate
User feedback (survey responses)

11.4 Post-Launch (Week 4+)
Stabilization:

Continue monitoring metrics
Weekly feedback sessions with active users
Prioritize bug fixes and UX improvements
Build waiting list of feature requests

Growth Initiatives:

Referral program (future): Clients get discount, handymen get credits
Handyman incentives: Bonus for first 10 completed jobs
Client incentives: Discount on second lead (future)
Content marketing: Blog posts about home repair tips (SEO)
Local partnerships: Hardware stores, real estate agents

Iteration:

Release minor updates weekly
Gather data on most requested services
Identify underserved zones (expand coverage)
Optimize search algorithm based on conversion data


12. Future Phases
12.1 Phase 2: Enhanced Features (Month 2-3)
AI Integration:

Smart lead matching (AI scores each worker for each lead)
Pricing recommendations (AI suggests fair price based on history)
Search query understanding (NLP: "leaking sink" → Plombing category)
Fraud detection (AI flags suspicious patterns)

WhatsApp Integration:

Official WhatsApp Business API
Send lead notifications via WhatsApp
Send booking confirmations via WhatsApp
Allow chat responses via WhatsApp (synced with in-platform chat)

Native Mobile Apps:

React Native apps for iOS and Android
Push notifications
Better camera integration
Offline support (cache data)

Advanced Search:

More filters (price range, distance radius, verified only)
Save searches (get alerts for matching leads)
Map view (see handymen on map)

Portfolio Enhancements:

Video portfolios (full project walkthroughs)
3D model uploads (future: AR previews)
Portfolio showcase on social media (shareable)

12.2 Phase 3: Company Accounts (Month 4-5)
Company Role:

Companies register (with business documents)
Admin approval process (stricter than individuals)
Company profiles (team size, years in business, insurance)
Worker management (invite workers, assign jobs, track performance)

Company Features:

Receive leads (like individuals)
Assign leads to specific workers
Company portfolio (separate from worker portfolios)
Company reviews (separate from worker reviews)
Team calendar (see all workers' availability)
Commission tracking (company pays workers, keeps percentage)

Client Experience:

Choose between individual workers and companies
Companies offer guarantees and insurance
Higher prices but more reliability

12.3 Phase 4: Subscription Model (Month 6+)
Handyman Subscriptions:

Basic: 300 MXN/month - 5 leads
Pro: 700 MXN/month - Unlimited leads + featured profile
Premium: 1,500 MXN/month - Unlimited + priority placement + analytics

Hybrid Model:

Freemium: Pay per lead (current model)
Subscription: Flat monthly fee
Handymen choose based on volume

Benefits for Platform:

Predictable recurring revenue
Reduce friction (no payment per lead)
Higher lifetime value per handyman

12.4 Phase 5: Expanded Services (Month 7-9)
New Service Categories:

Home cleaning (deep cleaning, regular cleaning)
Moving services (packing, transport, unpacking)
Landscaping (gardening, tree trimming)
Pet care (grooming, walking, sitting)
Tutoring (home tutors, language lessons)
Event services (catering, photography, DJs)

Geographic Expansion:

Beyond CDMX:

Guadalajara
Monterrey
Puebla
Querétaro


Eventually: All major Mexican cities

International Expansion (Future):

Latin America (similar markets: Colombia, Argentina, Chile)
Localize for each country (currency, language, regulations)

12.5 Phase 6: Marketplace Features (Month 10-12)
Booking Management:

Calendar integration (Google Calendar, iCal)
Recurring bookings (weekly cleaning, monthly maintenance)
Multi-day projects (track progress, milestones, partial payments)
Team bookings (multiple workers on same job)

Scheduling:

Real-time availability (workers update calendar)
Smart scheduling (AI suggests best times)
Automated reminders (day before service)
Rescheduling (client or worker can request)

Contracts & Agreements:

Digital contracts (terms of service, payment schedule)
E-signatures (both parties sign before starting)
Scope of work documentation
Change order requests (if scope changes)

Insurance & Guarantees:

Platform-backed guarantee ("TrustMe Guarantee")
Insurance offerings (partner with insurance company)
Warranty tracking (90-day warranty on work)
Dispute prevention (clear expectations upfront)

12.6 Phase 7: Advanced Analytics (Ongoing)
Handyman Analytics:

Earnings dashboard (trends, projections)
Performance insights (conversion rate, response time)
Market insights (demand by service, pricing trends)
Competitor analysis (anonymous benchmarking)

Client Analytics:

Spending insights (how much spent on services)
Service history (all past jobs)
Preferred handymen (favorites list)
Recommendations (based on past hires)

Platform Analytics:

Churn prediction (which users likely to leave)
Lifetime value calculation (LTV by user segment)
Cohort analysis (retention over time)
A/B test results (continuous optimization)

12.7 Phase 8: Community Features (Future)
Handyman Community:

Forums (tips, best practices, advice)
Training resources (videos, courses)
Certifications (platform-verified skills)
Mentorship (experienced handymen help new ones)

Client Community:

Reviews beyond handymen (review service types, share experiences)
DIY tips (when to hire vs. DIY)
Referrals (recommend to friends)
Loyalty program (points for reviews, referrals)

Social Features:

Share completed projects (social proof)
Before/after galleries (public showcase)
Handyman of the month (recognition)
Success stories (blog posts, case studies)


Appendix A: API Endpoint Reference
[Detailed API documentation would go here - routes, parameters, responses]
Appendix B: Database Schema Diagram
[Visual ERD diagram would go here - showing all tables and relationships]
Appendix C: User Flow Diagrams
[Visual flowcharts would go here - for each major user journey]
Appendix D: Wireframes and Mockups
[Design mockups would go here - key screens and interactions]
Appendix E: Test Cases
[Comprehensive test scenarios would go here - functional, integration, e2e]

Document Version History
Version 1.0 - November 2025

Initial comprehensive PRD for MVP
All core features documented
Based on conversations with founder
Ready for development handoff


End of Product Requirements Document

This PRD provides a complete specification of what needs to be built for TrustMe Marketplace MVP. It includes:
✅ Complete feature specifications (search, leads, wallet, payments, reviews, etc.)
✅ Detailed user flows (every step documented)
✅ Business logic rules (lead pricing, refunds, escrow, budgets, etc.)
✅ Technical requirements (stack, database, APIs, integrations)
✅ Design system (colors, typography, components)
✅ Data models (all tables, fields, relationships, validations)
✅ Integration guides (Stripe, Twilio, AWS, analytics)
✅ Success metrics (KPIs, goals, dashboards)
✅ Launch plan (pre-launch, soft launch, public launch)
✅ Future roadmap (phases 2-8)
