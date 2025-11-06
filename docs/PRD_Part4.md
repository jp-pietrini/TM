5.2 Lead Refund Policy
Refund Eligibility:
Scenario 1: Client Never Responds (Refundable)

Handyman purchases lead
Handyman sends first message(s) in chat
48 hours pass
Client never responds to handyman's message(s)
System automatically:

Issues 100 MXN refund to handyman wallet
Marks lead as "unresponsive"
Sends notification to handyman
Credits back to weekly budget spent



Scenario 2: Client Responds (Non-Refundable)

Handyman purchases lead
Handyman sends message
Client responds within 48 hours
Contact info becomes visible
Lead is now non-refundable
Even if client later:

Stops responding
Picks different handyman
Cancels job
Changes mind


No refund issued (handyman got access to qualified lead)

Scenario 3: Client Picks Another Handyman (Non-Refundable)

3 handymen purchase same lead
All 3 chat with client
Client decides to hire Handyman A
Handymen B and C do not get refund
Reason: They had the opportunity, client responded, lead was legitimate

48-Hour Countdown:

Starts when: Handyman purchases lead
Ends: 48 hours later (same time, 2 days later)
Visible to handyman: "Refund available for 36 hours" (countdown timer)
Reminder sent at 36 hours: "Client hasn't responded yet. Refund available for 12 more hours."
At 48 hours:

If no response: Auto-refund
If response occurred: Lead locked, no refund



Refund Process:

Automatic (no handyman action needed)
100 MXN returned to wallet
Weekly budget "spent" amount reduced by 100 MXN
Transaction history updated: "Refund - Unresponsive Client"
Handyman can leave feedback: "Was this lead legitimate?" (helps platform quality)

Manual Refund Requests (Future):

Handyman can request refund if:

Lead was fake/spam
Lead already filled before they purchased
Technical issue prevented communication


Customer support reviews and decides

5.3 Weekly Budget System
Budget Purpose:

Prevent handymen from overspending
Predictable costs
Control lead flow
Can be adjusted weekly

Minimum Budget:

After first free week: 300 MXN per week minimum
Equivalent to 3 leads minimum per week
Cannot set budget below 300 MXN

Budget Behavior:
Weekly Reset:

Every Monday at 00:00 (midnight)
"Spent this week" resets to 0 MXN
Budget limit remains unchanged
Notification sent: "Your weekly budget has reset"

Spending Against Budget:

Each lead purchase deducts from weekly spent
Example:

Monday: Buy 2 leads (200 MXN spent, 300 MXN remaining)
Tuesday: Buy 1 lead (300 MXN spent, 200 MXN remaining)
Wednesday: Buy 3 leads (600 MXN spent, 0 MXN remaining - but budget allows 500 MXN total)
Wait: Can't buy, budget reached
Thursday-Sunday: No purchases possible
Next Monday: Reset, can buy again



Budget Limit Reached:

When spent = budget limit
System blocks new lead purchases
Handyman sees: "Weekly budget reached. Increase budget or wait until Monday."
Options:

Increase budget (takes effect immediately if increasing)
Wait until Monday (countdown shown)
Pause lead notifications (stop seeing leads until resumed)



Adjusting Budget:
Increasing Budget:

Handyman can increase anytime
Example: Currently 500 MXN, increase to 700 MXN
Takes effect immediately
Can purchase more leads right away

Decreasing Budget:

Cannot decrease below current week's spending
Example: Spent 400 MXN this week, cannot decrease below 400 MXN this week
Can schedule decrease for next week
System: "New budget of 300 MXN will take effect Monday, Nov 11"

Budget Tracking:

Always visible in dashboard
Progress bar showing spent vs. limit
Remaining amount clearly displayed
Weekly reset countdown timer

Refunds Impact on Budget:

If lead refunded (unresponsive client):

Weekly spent reduced by 100 MXN
Example: Spent 500 MXN, refund 100 MXN → Now spent 400 MXN
Budget becomes available again



5.4 Wallet Balance Management
Wallet Balance:

Prepaid credits for purchasing leads
Displayed prominently: "450 MXN"
Color-coded:

Green: > 300 MXN (healthy)
Yellow: 100-300 MXN (low)
Red: < 100 MXN (very low, cannot buy leads)



Minimum Balance Requirement:

Must have at least 100 MXN to purchase a lead
If balance < 100 MXN: System blocks lead purchase
Alert shown: "Insufficient balance. Add at least 100 MXN."

Recommended Balance:

Platform suggests: Keep balance > 300 MXN
Ensures ability to purchase multiple leads
Avoids missing opportunities

Adding Funds:
Payment Methods:

Credit/Debit Card (Stripe):

Instant balance update
Card saved for future (optional)
No processing fee (TrustMe absorbs)
Accepts: Visa, Mastercard, Amex


OXXO Payment:

Generate voucher with barcode
Pay at any OXXO store in cash
Balance updates in 1-2 hours
No fee


Bank Transfer (SPEI):

Transfer from online banking
Unique reference number for tracking
Balance updates in minutes (automated)
No fee



Deposit Amounts:

Minimum: 300 MXN
Maximum: 10,000 MXN per transaction
No maximum total balance

Auto-Reload Feature:

Optional automation
Handyman enables: "Auto-reload when balance < 200 MXN"
Set reload amount: 500 MXN (or custom)
Uses saved card
Email notification when reload occurs
Can disable anytime

Low Balance Warnings:
When Balance < 200 MXN:

In-platform notification: "Low balance. Add funds soon."
Email sent (once)
Dashboard banner with "Add Funds" button

When Balance < 100 MXN:

Stronger warning: "Cannot purchase leads. Add funds now."
Cannot buy leads until balance ≥ 100 MXN
Prominent banner blocking lead purchase page

Withdrawing Funds (Future Feature):

Handyman can withdraw balance to bank account
Minimum withdrawal: 100 MXN
No withdrawal fee
Processing time: 1-2 business days
Requires bank account verification (one-time setup)

Balance Protection:

Cannot go negative
All deductions validated before processing
If insufficient funds: Transaction denied
Wallet balance is real money (can be withdrawn)

5.5 Payment Escrow System
Escrow Purpose:

Protect client from poor service
Protect handyman from non-payment
Allow time for issues to surface
Platform-mediated dispute resolution

Escrow Flow:
1. Payment Request Creation:

Handyman and client agree on price via chat
Handyman creates payment request in platform
Amount: Agreed price in MXN
Description: Service details
Expected service date

2. Client Payment:

Client receives notification and email
Clicks "Pay Now"
Enters card details in Stripe checkout
Pays: [Service Amount] + [Stripe Fee ~3%]
Example: 1,000 MXN service + 30 MXN fee = 1,030 MXN total

3. Funds Enter Escrow:

Money goes to TrustMe Stripe Connect account
NOT immediately to handyman
Status: "Payment Received - In Escrow"
Both parties notified
Service can now proceed

4. Service Delivery:

Handyman performs work
Client receives service
Communication continues in platform chat

5. Service Completion - Dual Confirmation:
Handyman Marks Complete:

Handyman clicks "Mark as Complete" in platform
Optional: Upload completion photos
Status: "Awaiting Client Confirmation"

Client Confirms:

Client receives notification: "Confirm service completion"
Client clicks "Yes, service complete and satisfactory"
Status changes to: "Complete - 5 Day Hold"

6. 5-Day Escrow Hold:

Payment held for 5 additional days
Protects client if hidden issues appear
Example: Plumbing leak reappears, electrical problem comes back
Countdown shown to both parties: "Payment release in 4 days"

Days 1-5:

Money frozen in escrow
Client can still raise dispute
Handyman cannot access funds yet
Both parties can communicate

Day 6 (Automatic Release):

If no dispute raised:

Money automatically released from escrow
Transferred to handyman's wallet
Handyman notified: "Payment received: 1,000 MXN"
Transaction complete



7. Dispute Scenarios:
Scenario A: Dispute Raised During Hold:

Client clicks "Report Issue" (Days 1-5)
Payment remains in escrow (frozen)
Customer support investigates
Resolution options:

Full refund to client
Partial refund (split)
Payment to handyman (dispute rejected)
Require re-do (extended escrow)



Scenario B: No Dispute:

5 days pass
Both parties satisfied
Automatic release to handyman

Escrow Edge Cases:
Client Never Confirms Completion:

Handyman marked complete
Client doesn't respond for 7 days
System auto-confirms: "Service presumed complete"
5-day hold starts from Day 7
Payment released on Day 12
Protects handyman from unresponsive clients

Client Disputes After Release:

Payment already released to handyman
Very difficult to reverse
Customer support still investigates
May require handyman to return for fix
Platform may issue goodwill refund (rare)
Policy: Raise disputes within 5-day window

Multiple Services / Partial Payments:

Each payment request has separate escrow
Example: Handyman quotes 2,000 MXN total

Client pays 1,000 MXN upfront (Escrow 1)
Client pays 1,000 MXN on completion (Escrow 2)


Each escrow has its own 5-day hold

5.6 Review Requirements and Rules
Review Eligibility:
Who Can Leave Reviews:

Only clients who paid via Stripe payment request
Only after both parties confirmed service complete
Only once per booking (cannot edit/delete once submitted)

When Reviews Can Be Left:
Timing 1: After Completion Confirmation:

Both parties marked service as complete
Review prompt appears immediately to client
Client can leave review anytime after this point

Timing 2: During Escrow Hold:

Client can leave review during 5-day hold
Review does not affect escrow (separate processes)
Can leave review even if disputing (but dispute noted)

Timing 3: After Payment Release:

Client can still leave review after payment released
No time limit (can review months later)
But encouraged to review within 7 days

Review Incentive:

After leaving review, client can immediately search for new services
If tries to search without reviewing:

Modal blocks: "Help grow our community by reviewing your last service"
Can skip after 30 days (auto-expires)
Gentle nudge, not hard requirement



Review Components (All Required):
1. Overall Star Rating:

Scale: 1-5 stars
1 star = Terrible
2 stars = Poor
3 stars = Okay
4 stars = Good
5 stars = Excellent
Must select one (required)

2. Review Title:

Short summary (10-100 characters)
Example: "Excellent plumbing work!"
Required field

3. Detailed Description:

Comprehensive feedback (100-1000 characters)
Prompted with questions:

How was the quality of work?
Was the handyman professional?
Did they arrive on time?
Would you recommend them?


Required field

4. Specific Category Ratings (Optional but Encouraged):

Quality of Work: 1-5 stars
Communication: 1-5 stars
Punctuality: 1-5 stars
Professionalism: 1-5 stars
Value for Money: 1-5 stars

5. Recommendation Checkbox (Required):

☑ Yes, I would recommend to others
☐ No, I would not recommend
Binary choice

6. Would Hire Again Checkbox (Required):

☑ Yes, I would hire them again
☐ No, I would not hire again
Binary choice

7. Photos of Completed Work (Optional but Encouraged):

Upload up to 10 photos
Before/after photos especially valuable
Helps future clients see quality
Auto-compressed if large

Review Submission:

Client clicks "Submit Review"
All required fields validated
Review published immediately (no moderation delay)
Visible on handyman profile instantly
Handyman receives notification

Review Display:
On Handyman Profile:

All reviews visible (no hiding)
Newest first (default sort)
Can sort by: Newest, Highest Rated, Lowest Rated
Each review shows:

Client name (or Anonymous if opted)
Overall star rating
Review title and description
Specific ratings (if provided)
Recommendation badges
Photos
Date left
Handyman response (if any)



In Search Results:

Handyman's average rating displayed prominently
Number of reviews (e.g., "4.8 ⭐ (127 reviews)")
Recent reviews snippet (top 2)

Review Impact:
On Handyman Ranking:

Higher average rating = higher in search results
More reviews = more trustworthy (weighted in algorithm)
Recent reviews weighted more than old reviews
Recommendation rate affects trust score

On Platform Trust:

Verified reviews (only from completed transactions)
Transparency (all reviews visible, even negative)
Both parties see who's reviewed whom

Review Moderation:
Fake Review Prevention:

Reviews only from verified Stripe payments
Both parties must confirm service completion
Cannot review without actual transaction
Admin can flag suspicious reviews

Reporting Fake Reviews:

"Report this review" button on each review
Reasons: Fake, Inappropriate, Spam, Not related to service
Customer support investigates
Can remove if fraudulent
User suspended if repeatedly faking reviews

Prohibited Content:

Personal attacks
Profanity (excessive)
Discriminatory language
Unrelated content
Contact information (email, phone)
Competitor advertising

Handyman Response:
Response Capability:

Handyman can respond to any review
One response per review
Character limit: 500 characters
Response appears under review

Response Best Practices:

Thank the client
Address concerns professionally
Offer to fix issues
Stay positive and professional
Don't be defensive

Example Good Response:
"Thank you for the wonderful review, María! It was a pleasure fixing your kitchen plumbing. I'm glad you're happy with the results. Looking forward to helping you again in the future!"
Example Poor Response (Avoid):
"Your complaint is unfair. I did excellent work and you're just trying to get a discount. This review is fake." (Unprofessional, defensive)
No Editing Reviews:

Once submitted, reviews cannot be edited
Cannot be deleted by client or handyman
Permanent record
Encourages honest, thoughtful reviews upfront

Review Disputes:

If handyman believes review is fake/unfair:

Can respond publicly (professional rebuttal)
Can contact customer support (request investigation)
If proven fake: Review removed
If legitimate: Review stays



5.7 Portfolio Verification Rules
Portfolio Verification Purpose:

Build trust through client-verified work
Reduce fake/stolen portfolio images
Provide social proof
Encourage legitimate portfolios

Verification Flow:
1. Handyman Adds Portfolio Project:

Uploads project with photos/videos
Optionally enters client email
If email entered: Verification request sent

2. Client Receives Verification Request:

Email subject: "Verify your service experience"
Contains:

Handyman name
Project title
Service category
Date completed
Primary photo thumbnail
Call-to-action: "Verify This Work"



3. Client Clicks Link:

Redirected to verification page
Must log in (if has account) or verify as guest

4. Client Reviews Project:

Sees all project details
Photos and description
Makes decision: Verify or Decline

5. Client Verifies:

Clicks "Yes, this work was done for me"
Optional: Rate the work (1-5 stars)
Optional: Add comment
Project marked: "✓ Verified by Client"

6. Client Declines:

Clicks "No, I don't recognize this work"
Must provide reason
Project marked: "⚠ Verification Declined"
Admin receives alert (potential fraud)

7. No Response:

Client never clicks link (common)
After 7 days: Project remains "🕐 Pending Verification"
Still visible on profile, but less trustworthy

Verification Status Labels:
✓ Verified by Client (Green Badge):

Client confirmed work was done for them
Highest trust level
Weighted heavily in search ranking
Client name shown (or "Verified Client" if anonymous)

🕐 Pending Verification (Gray Badge):

Client email entered but not yet verified
Awaiting client response
Medium trust level
Still displayed on profile

No Badge (White/Neutral):

No client email entered
No verification requested
Lowest trust level (but not necessarily fake)
Some handymen may not have client emails

⚠ Verification Declined (Red Badge):

Client said work wasn't done for them
Hidden from public profile automatically
Admin reviews for potential fraud
Multiple declines = account review

Verification Impact:
On Search Ranking:

Handymen with verified portfolios rank higher
Verification weighting in algorithm:

Verified projects: +10 points each
Pending: +3 points each
Unverified: +1 point each
Declined: -20 points each



On Trust:

Green verified badge visible in search results
Profile shows: "85% of portfolio verified"
Clients feel more confident hiring
Reduces risk of fake portfolios

Portfolio Fraud Detection:
Admin Review Triggers:

2+ declined verifications
Stock photo detection (future: reverse image search)
Same photo used by multiple handymen
Suspicious patterns (all projects same date, etc.)

Admin Actions:

Investigate portfolio
Contact handyman for explanation
Remove fake projects
Warn handyman
Suspend account if repeated fraud
Ban if egregious fraud

Portfolio Guidelines:

Photos must be of actual work performed
Cannot use stock images or other people's work
Cannot claim work done by someone else
Cannot use AI-generated images as real work (future concern)

5.8 User Approval and Verification Rules
Admin Approval Required:

All new handymen must be approved before appearing in search
Approval is manual (admin reviews each profile)
Approval timeframe goal: Within 24-48 hours

Light Verification (MVP):
Email Verification (Required):

Send verification email on registration
User clicks link to verify
Must verify before profile can be submitted for approval

WhatsApp Verification (Required):

Send 6-digit SMS code to WhatsApp number
User enters code in platform
Must verify before profile can be submitted for approval

Profile Approval (Required):

Admin reviews:

Profile completeness
Description quality (appropriate language, professional)
Services and pricing (reasonable, not absurd)
Service areas (at least 1, not too many)
Portfolio (if present, not clearly fake)


Admin decision: Approve / Request Changes / Reject

Heavy Verification (Future Phase):
ID Verification:

Upload government-issued ID (INE card in Mexico)
Selfie with ID
OCR extraction + face matching (via Truora or similar)
Verifies: Name, age, citizenship

Background Check:

Criminal record check (if legally possible in Mexico)
Previous fraud on platform
Cross-reference with watchlists

Professional License:

For services requiring licenses (electrical work, etc.)
Upload license photo
Verify with issuing authority

Verification Status Badges:
On Handyman Profile:

✓ Email Verified (always shown)
✓ WhatsApp Verified (always shown)
✓ Admin Approved (always shown)
✓ ID Verified (future)
✓ Background Check Passed (future)
✓ Licensed Professional (future)

Trust Score:

Calculated from:

Verification levels completed
Portfolio verification rate
Average review rating
Number of completed jobs
Response time
Dispute rate


Displayed as: "95% Trust Score"

Admin Rejection:
Rejection Reasons:

Fake profile
Inappropriate content
Duplicate account
Does not meet quality standards
Fraudulent behavior
Business not legitimate

Rejection Actions:

Account marked: "Rejected"
Detailed reason sent to user
Cannot reapply for 6 months
If fraud: Permanent ban

5.9 Communication Rules
Chat Communication:
When Chat Starts:

Only after handyman purchases lead
One chat per lead per handyman
Client can have multiple chats (if sent to multiple handymen)

First Message Sender:

Usually handyman sends first message
Client can also initiate if they want
No restriction on who goes first

Contact Info Visibility Trigger:

Client must respond to handyman's first message
Any reply from client triggers contact info reveal
WhatsApp number becomes visible in chat header
Email visible in profile sidebar
Lead becomes non-refundable

Message Types Allowed:

Text (up to 5,000 characters)
Photos (up to 10 MB each)
Videos (up to 50 MB each)
Voice messages (up to 2 minutes)
Files (up to 10 MB each)

Prohibited Content:

Asking for payment outside platform
Sharing external links to competitors
Spam or promotional content
Harassment or inappropriate language
Scam attempts
Discriminatory content

Flagging System:

Either party can flag conversation
Reasons: Inappropriate content, Spam, Harassment, Scam, Other
Customer support reviews flagged conversations
Can remove messages or suspend users

Message Retention:

Chat history kept forever (unless user deletes account)
Important for dispute resolution
Users can delete entire chat (both sides see as deleted)
Individual messages cannot be deleted permanently

5.10 Search Ranking Algorithm
Algorithm Purpose:

Surface best-fit handymen for each client search
Balance multiple factors (not just price or rating)
Fair to all handymen (new and established)

Ranking Factors (Weighted):
1. Service Match (40% weight):

Exact match: Handyman offers exact category/subcategory (full points)
Partial match: Handyman offers category but not specific subcategory (half points)
Portfolio relevance: Has completed similar jobs shown in portfolio (bonus points)
Verified portfolio projects in this category (extra bonus)

2. Distance (25% weight):

Calculated from client's location to handyman's location (via zip code)
Closer = higher score
Formula: (Max Distance - Actual Distance) / Max Distance
Example: Within 2 km = 100%, Within 10 km = 60%, Within 20 km = 20%

3. Rating (15% weight):

Average star rating from all reviews
Scale: 0-5 stars
Formula: (Rating / 5) × 100
Example: 4.5 rating = 90% of points
Minimum 3 reviews required for rating to count (new handymen get neutral score)

4. Availability Match (10% weight):

Handyman's availability overlaps with client's needs
Perfect overlap = 100% of points
Partial overlap = 50% of points
No overlap = 0% (but not excluded from results)

5. Response Time (5% weight):

Average time handyman takes to respond to messages
Faster = higher score
Calculated from past chat history
Formula: (24 hours - Avg Response Time) / 24 hours
Example: Responds in 1 hour = 96% of points

6. Price Competitiveness (5% weight):

Handyman's rates compared to category average
Not necessarily lowest, but reasonable
Formula: (Avg Category Price - Handyman Price) / Avg Category Price
Prevents race to bottom (very cheap prices might indicate poor quality)

Combined Score:

Each handyman gets score: 0-100
Sorted by score (highest first)
Ties broken by: Most recent activity (recently active handymen ranked higher)

Additional Ranking Boosts:
Verification Boosts:

Email verified: +2 points
WhatsApp verified: +2 points
Admin approved: +5 points
ID verified (future): +5 points
Background check (future): +5 points

Portfolio Boost:

Has portfolio: +5 points
Has verified portfolio projects: +10 points
Recent portfolio additions: +3 points

Activity Boost:

Active in last 7 days: +5 points
Completed job in last 30 days: +5 points

Penalty Factors:
Dispute Penalty:

Active dispute: -20 points
Resolved dispute (in client favor): -10 points (decays over time)
Resolved dispute (in handyman favor): No penalty

Review Penalty:

Review below 3 stars: -5 points per low review (capped at -20)
Flagged for inappropriate behavior: -15 points

Availability Penalty:

Not available in next 7 days: -5 points
Account paused (not accepting leads): -50 points (effectively removes from search)

New Handyman Handling:

No reviews yet: Neutral rating (not penalized)
No completed jobs yet: Neutral activity (not penalized)
Portfolio optional: No penalty if empty
Given fair chance to appear in results
But established handymen with good track records will rank higher

Algorithm Transparency:

Handymen cannot see exact algorithm
Can see general ranking factors (in help center)
Platform can adjust weights based on data (improve over time)


6. Technical Requirements
6.1 Technology Stack
Frontend:

Framework: React 18 with TypeScript
Build Tool: Vite (fast builds, hot reload)
Routing: React Router v6
State Management:

React Context API for global state
TanStack Query (React Query) for server state and caching


Forms: React Hook Form with Zod validation
UI Components: Custom components + Headless UI (modals, dropdowns)
Styling: Tailwind CSS
Icons: Heroicons or Lucide React
Date/Time: date-fns for date manipulation
Image Handling:

react-easy-crop for profile picture cropping
react-dropzone for drag-and-drop uploads



Backend:

Runtime: Node.js (LTS version)
Framework: Express.js with TypeScript
Database: PostgreSQL
ORM: Drizzle ORM (type-safe, lightweight)
Authentication:

Passport.js with local strategy (email/password)
express-session for session management
bcrypt for password hashing


Validation: Zod schemas (shared with frontend)
File Upload: Multer for multipart/form-data
Email:

Twilio SendGrid for transactional emails
Nodemailer as fallback


SMS: Twilio Verify API for WhatsApp/phone verification
Payment: Stripe (Checkout + Connect for escrow)
API Documentation: OpenAPI/Swagger (optional, for future API consumers)

Infrastructure (AWS):

Compute:

EC2 instance(s) for backend API (or)
ECS Fargate for containerized deployment (recommended for scaling)


Database:

RDS PostgreSQL (managed database)
Automated backups enabled
Read replicas for scaling (future)


Object Storage:

S3 for file uploads (images, videos, documents)
CloudFront CDN for fast global delivery


Load Balancer: Application Load Balancer (ALB) for distributing traffic
DNS: Route 53 for domain management
SSL/TLS: AWS Certificate Manager (ACM) for HTTPS
Monitoring:

CloudWatch for logs and metrics
Sentry for error tracking (frontend + backend)


CI/CD:

GitHub Actions for automated testing and deployment
Deploy on push to main branch



Development Tools:

Version Control: Git + GitHub
Code Editor: VS Code (recommended)
Package Manager: npm or yarn
Linting: ESLint for TypeScript
Formatting: Prettier
Testing:

Vitest for unit/integration tests
Playwright or Cypress for E2E tests (future)



6.2 Database Architecture
Database: PostgreSQL (version 14+)
Core Tables (New System - Clean Slate):
1. users

id: SERIAL PRIMARY KEY
email: VARCHAR(255) UNIQUE NOT NULL
password_hash: VARCHAR(255) NOT NULL (bcrypt)
role: ENUM('client', 'worker', 'customer_support', 'admin')
full_name: VARCHAR(255) NOT NULL
phone: VARCHAR(20) (WhatsApp number)
profile_image_url: VARCHAR(500)
email_verified: BOOLEAN DEFAULT FALSE
phone_verified: BOOLEAN DEFAULT FALSE
status: ENUM('active', 'suspended', 'banned') DEFAULT 'active'
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
last_login_at: TIMESTAMP

2. worker_profiles

id: SERIAL PRIMARY KEY
user_id: INTEGER REFERENCES users(id) UNIQUE
description: TEXT (20-400 chars)
service_areas: TEXT[] (array of CDMX zones)
availability: JSONB (weekly schedule matrix)
approval_status: ENUM('pending', 'approved', 'rejected', 'changes_requested')
approved_by: INTEGER REFERENCES users(id) (admin who approved)
approved_at: TIMESTAMP
rejection_reason: TEXT
admin_notes: TEXT
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

3. services

id: SERIAL PRIMARY KEY
name: VARCHAR(100) NOT NULL
category: VARCHAR(100) NOT NULL
description: TEXT
keywords: TEXT[] (for search matching)

4. worker_services

id: SERIAL PRIMARY KEY
worker_id: INTEGER REFERENCES worker_profiles(id)
service_id: INTEGER REFERENCES services(id)
pricing_type: ENUM('hourly', 'fixed')
price_amount: DECIMAL(10,2)
minimum_charge: DECIMAL(10,2)
UNIQUE(worker_id, service_id)

5. portfolio_projects

id: SERIAL PRIMARY KEY
worker_id: INTEGER REFERENCES worker_profiles(id)
title: VARCHAR(200) NOT NULL
description: TEXT
service_category: VARCHAR(100)
completed_month: INTEGER (1-12)
completed_year: INTEGER
verification_status: ENUM('unverified', 'pending', 'verified', 'declined')
client_email: VARCHAR(255) (for verification)
verified_at: TIMESTAMP
sort_order: INTEGER DEFAULT 0
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

6. portfolio_media

id: SERIAL PRIMARY KEY
project_id: INTEGER REFERENCES portfolio_projects(id) ON DELETE CASCADE
media_type: ENUM('image', 'video')
media_url: VARCHAR(500) NOT NULL
description: TEXT
sort_order: INTEGER DEFAULT 0
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

7. leads

id: SERIAL PRIMARY KEY
client_id: INTEGER REFERENCES users(id)
service_category: VARCHAR(100) NOT NULL
service_subcategory: VARCHAR(100)
title: VARCHAR(200) NOT NULL
description: TEXT NOT NULL
location_zone: VARCHAR(100) NOT NULL
zip_code: VARCHAR(10)
budget_min: DECIMAL(10,2)
budget_max: DECIMAL(10,2)
urgency: ENUM('regular', 'soon', 'urgent', 'emergency')
preferred_time: ENUM('morning', 'afternoon', 'evening', 'flexible')
deadline: DATE
availability: JSONB (days and time slots)
status: ENUM('active', 'expired', 'cancelled') DEFAULT 'active'
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
expires_at: TIMESTAMP

8. lead_media

id: SERIAL PRIMARY KEY
lead_id: INTEGER REFERENCES leads(id) ON DELETE CASCADE
media_type: ENUM('image', 'video')
media_url: VARCHAR(500) NOT NULL
sort_order: INTEGER DEFAULT 0
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

9. lead_recipients

id: SERIAL PRIMARY KEY
lead_id: INTEGER REFERENCES leads(id)
worker_id: INTEGER REFERENCES worker_profiles(id)
sent_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
UNIQUE(lead_id, worker_id)

10. lead_purchases

id: SERIAL PRIMARY KEY
lead_id: INTEGER REFERENCES leads(id)
worker_id: INTEGER REFERENCES worker_profiles(id)
purchase_amount: DECIMAL(10,2) NOT NULL (100 MXN default)
status: ENUM('purchased', 'refunded') DEFAULT 'purchased'
client_responded: BOOLEAN DEFAULT FALSE
client_response_at: TIMESTAMP
refund_eligible_until: TIMESTAMP (48 hours after purchase)
refunded_at: TIMESTAMP
purchased_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
UNIQUE(lead_id, worker_id)

11. conversations

id: SERIAL PRIMARY KEY
lead_id: INTEGER REFERENCES leads(id)
client_id: INTEGER REFERENCES users(id)
worker_id: INTEGER REFERENCES users(id)
status: ENUM('active', 'archived', 'flagged')
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

12. messages

id: SERIAL PRIMARY KEY
conversation_id: INTEGER REFERENCES conversations(id)
sender_id: INTEGER REFERENCES users(id)
message_type: ENUM('text', 'image', 'video', 'voice', 'file')
content: TEXT (text messages)
media_url: VARCHAR(500) (for non-text messages)
is_read: BOOLEAN DEFAULT FALSE
read_at: TIMESTAMP
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

13. wallet_transactions

id: SERIAL PRIMARY KEY
worker_id: INTEGER REFERENCES worker_profiles(id)
transaction_type: ENUM('deposit', 'lead_purchase', 'refund', 'withdrawal', 'payment_received')
amount: DECIMAL(10,2) NOT NULL
balance_after: DECIMAL(10,2) NOT NULL
reference_id: INTEGER (lead_id, payment_id, etc.)
description: TEXT
status: ENUM('pending', 'completed', 'failed')
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

14. weekly_budgets

id: SERIAL PRIMARY KEY
worker_id: INTEGER REFERENCES worker_profiles(id)
week_start_date: DATE NOT NULL (Monday)
budget_limit: DECIMAL(10,2) NOT NULL
spent_amount: DECIMAL(10,2) DEFAULT 0
is_paused: BOOLEAN DEFAULT FALSE
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
UNIQUE(worker_id, week_start_date)

15. payment_requests

id: SERIAL PRIMARY KEY
conversation_id: INTEGER REFERENCES conversations(id)
worker_id: INTEGER REFERENCES worker_profiles(id)
client_id: INTEGER REFERENCES users(id)
amount: DECIMAL(10,2) NOT NULL
description: TEXT
expected_service_date: DATE
status: ENUM('pending', 'paid', 'declined', 'cancelled')
stripe_payment_intent_id: VARCHAR(255)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

16. escrow_payments

id: SERIAL PRIMARY KEY
payment_request_id: INTEGER REFERENCES payment_requests(id)
amount: DECIMAL(10,2) NOT NULL
stripe_transfer_id: VARCHAR(255)
status: ENUM('held', 'released', 'refunded')
completion_confirmed_by_worker: BOOLEAN DEFAULT FALSE
completion_confirmed_by_client: BOOLEAN DEFAULT FALSE
completion_confirmed_at: TIMESTAMP
release_date: DATE (5 days after confirmation)
released_at: TIMESTAMP
dispute_id: INTEGER REFERENCES disputes(id)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

17. reviews

id: SERIAL PRIMARY KEY
payment_request_id: INTEGER REFERENCES payment_requests(id)
client_id: INTEGER REFERENCES users(id)
worker_id: INTEGER REFERENCES worker_profiles(id)
overall_rating: INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5)
title: VARCHAR(200) NOT NULL
description: TEXT NOT NULL
quality_rating: INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5)
communication_rating: INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5)
punctuality_rating: INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5)
professionalism_rating: INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5)
value_rating: INTEGER CHECK (value_rating >= 1 AND value_rating <= 5)
would_recommend: BOOLEAN NOT NULL
would_hire_again: BOOLEAN NOT NULL
worker_response: TEXT
worker_responded_at: TIMESTAMP
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

18. review_media

id: SERIAL PRIMARY KEY
review_id: INTEGER REFERENCES reviews(id) ON DELETE CASCADE
media_url: VARCHAR(500) NOT NULL
sort_order: INTEGER DEFAULT 0
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

19. disputes

id: SERIAL PRIMARY KEY
reference_number: VARCHAR(50) UNIQUE NOT NULL (e.g., #DIS-00001)
escrow_payment_id: INTEGER REFERENCES escrow_payments(id)
raised_by: INTEGER REFERENCES users(id)
dispute_type: ENUM('payment', 'quality', 'no_show', 'fraud', 'other')
priority: ENUM('low', 'medium', 'high', 'critical')
description: TEXT NOT NULL
desired_resolution: TEXT
status: ENUM('open', 'in_progress', 'resolved', 'escalated')
assigned_to: INTEGER REFERENCES users(id) (customer support)
resolution: TEXT
resolution_type: ENUM('full_refund', 'partial_refund', 'payment_to_worker', 'redo', 'other')
refund_amount: DECIMAL(10,2)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
resolved_at: TIMESTAMP

20. dispute_evidence

id: SERIAL PRIMARY KEY
dispute_id: INTEGER REFERENCES disputes(id) ON DELETE CASCADE
uploaded_by: INTEGER REFERENCES users(id)
media_type: ENUM('image', 'video', 'document')
media_url: VARCHAR(500) NOT NULL
description: TEXT
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

21. support_tickets

id: SERIAL PRIMARY KEY
reference_number: VARCHAR(50) UNIQUE NOT NULL (e.g., #TM-00001)
user_id: INTEGER REFERENCES users(id)
subject: VARCHAR(255) NOT NULL
description: TEXT NOT NULL
category: ENUM('technical', 'account', 'policy', 'guidance', 'payment', 'other')
priority: ENUM('low', 'medium', 'high', 'urgent')
status: ENUM('open', 'in_progress', 'waiting_user', 'resolved')
assigned_to: INTEGER REFERENCES users(id) (customer support)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
resolved_at: TIMESTAMP

22. support_messages

id: SERIAL PRIMARY KEY
ticket_id: INTEGER REFERENCES support_tickets(id)
sender_id: INTEGER REFERENCES users(id)
message: TEXT NOT NULL
is_internal: BOOLEAN DEFAULT FALSE (support team notes)
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

23. flagged_conversations

id: SERIAL PRIMARY KEY
reference_number: VARCHAR(50) UNIQUE NOT NULL (e.g., #FLAG-00001)
conversation_id: INTEGER REFERENCES conversations(id)
flagged_by: INTEGER REFERENCES users(id)
reason: ENUM('inappropriate', 'spam', 'harassment', 'scam', 'other')
description: TEXT
status: ENUM('pending', 'under_review', 'resolved', 'dismissed')
reviewed_by: INTEGER REFERENCES users(id) (customer support)
resolution: TEXT
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
reviewed_at: TIMESTAMP

Indexes for Performance:
sql-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Worker searches
CREATE INDEX idx_worker_profiles_user_id ON worker_profiles(user_id);
CREATE INDEX idx_worker_profiles_approval_status ON worker_profiles(approval_status);
CREATE INDEX idx_worker_services_worker_id ON worker_services(worker_id);

-- Lead searches
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_service_category ON leads(service_category);
CREATE INDEX idx_leads_location_zone ON leads(location_zone);
CREATE INDEX idx_lead_purchases_worker_id ON lead_purchases(worker_id);

-- Conversations
CREATE INDEX idx_conversations_client_id ON conversations(client_id);
CREATE INDEX idx_conversations_worker_id ON conversations(worker_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);

-- Reviews
CREATE INDEX idx_reviews_worker_id ON reviews(worker_id);

-- Full-text search (future)
CREATE INDEX idx_services_name_trgm ON services USING gin(name gin_trgm_ops);
6.3 API Architecture
API Base URL:

Development: http://localhost:5000/api
Production: https://api.trustme.mx/api

Authentication:

Session-based authentication (cookies)
req.user available in all protected routes
Middleware: requireAuth, requireRole('worker'), etc.

API Response Format:
Success Response:
json{
  "success": true,
  "data": { /* response data */ }
}
Error Response:
json{
  "success": false,
  "error": {
    "message": "Error message here",
    "code": "ERROR_CODE",
    "details": { /* optional additional details */ }
  }
}
Core API Endpoints:
Authentication:

POST /api/auth/register - Register new user
POST /api/auth/login - Login
POST /api/auth/logout - Logout
GET /api/auth/me - Get current user
POST /api/auth/verify-email - Verify email with token
POST /api/auth/verify-phone - Verify phone with SMS code
POST /api/auth/forgot-password - Initiate password reset
POST /api/auth/reset-password/:token - Complete password reset

Users:

GET /api/users/:id - Get user profile (public)
PATCH /api/users/profile - Update own profile
POST /api/users/profile-image - Upload profile picture

Workers:

POST /api/workers/profile - Create/update worker profile
GET /api/workers/profile - Get own worker profile
GET /api/workers/:id - Get public worker profile
GET /api/workers/search - Search workers (with filters)
PATCH /api/workers/availability - Update availability
POST /api/workers/services - Add service
DELETE /api/workers/services/:id - Remove service

Portfolio:

GET /api/portfolio/projects - Get worker's projects
POST /api/portfolio/projects - Create project (with media)
PATCH /api/portfolio/projects/:id - Update project
DELETE /api/portfolio/projects/:id - Delete project
POST /api/portfolio/projects/:id/verify - Client verifies project

Leads:

POST /api/leads - Create lead (client)
GET /api/leads/mine - Get client's leads
GET /api/leads/available - Get available leads for worker
GET /api/leads/:id - Get lead details
POST /api/leads/:id/purchase - Purchase lead (worker)
GET /api/leads/:id/recipients - See who received lead (client)

Conversations & Messages:

GET /api/conversations - Get all conversations (for current user)
GET /api/conversations/:id - Get conversation details
GET /api/conversations/:id/messages - Get messages in conversation
POST /api/conversations/:id/messages - Send message (text/media)
PATCH /api/messages/:id/read - Mark message as read
POST /api/conversations/:id/flag - Flag conversation

Wallet:

GET /api/wallet/balance - Get current balance
GET /api/wallet/transactions - Get transaction history
POST /api/wallet/deposit - Add funds (creates Stripe session)
PATCH /api/wallet/budget - Update weekly budget
PATCH /api/wallet/auto-reload - Configure auto-reload
POST /api/wallet/withdraw - Request withdrawal (future)

Payments:

POST /api/payments/request - Create payment request (worker)
GET /api/payments/:id - Get payment request details
POST /api/payments/:id/pay - Pay via Stripe (client)
POST /api/payments/:id/confirm-complete - Confirm service complete
GET /api/payments/escrow/:id - Get escrow status

Reviews:

POST /api/reviews - Submit review (client)
GET /api/reviews/worker/:workerId - Get worker's reviews
POST /api/reviews/:id/respond - Respond to review (worker)
POST /api/reviews/:id/flag - Report fake review

Disputes:

POST /api/disputes - Create dispute
GET /api/disputes/:id - Get dispute details
POST /api/disputes/:id/evidence - Upload evidence
PATCH /api/disputes/:id/resolve - Resolve dispute (support)

Support:

POST /api/support/tickets - Create support ticket
GET /api/support/tickets/:id - Get ticket details
POST /api/support/tickets/:id/messages - Add message to ticket
PATCH /api/support/tickets/:id/status - Update ticket status (support)

Admin:

GET /api/admin/approval-queue - Get pending approvals
PATCH /api/admin/workers/:id/approve - Approve worker
PATCH /api/admin/workers/:id/reject - Reject worker
GET /api/admin/users - Search/list users
GET /api/admin/metrics - Platform metrics
PATCH /api/admin/users/:id/suspend - Suspend user

Webhooks:

POST /api/webhooks/stripe - Stripe webhook (payment events)
POST /api/webhooks/twilio - Twilio webhook (SMS delivery)

6.4 File Upload Strategy
Storage:

AWS S3 for all uploaded files
CloudFront CDN for fast delivery
Separate buckets:

trustme-profiles (profile pictures)
trustme-portfolios (portfolio media)
trustme-leads (lead photos/videos)
trustme-reviews (review photos)
trustme-messages (chat attachments)



Upload Process:

Client selects file
Frontend validates:

File type (MIME type check)
File size (5 MB for images, 50 MB for videos)


Frontend sends to backend via multipart/form-data
Backend (Multer):

Receives file
Validates again (server-side)
Generates unique filename (UUID + extension)
Uploads to S3
Returns public CloudFront URL


URL saved in database

File Naming Convention:

Format: {category}/{userId}/{timestamp}-{uuid}.{ext}
Example: portfolios/12345/1699123456789-a1b2c3d4.jpg
Prevents collisions
Organizes by user and category

Image Processing (Future Enhancement):

Resize images to multiple sizes:

Thumbnail: 200x200
Medium: 800x800
Large: 1200x1200


Use AWS Lambda + Sharp library
Automatic on S3 upload (via S3 event trigger)
Saves bandwidth and improves load times

Security:

S3 bucket: Private (not publicly accessible)
CloudFront signed URLs (future: for sensitive content)
CORS configured to allow frontend domain only
File type validation (prevent executable uploads)
Virus scanning (future: ClamAV on Lambda)

6.5 Email System
Email Provider: Twilio SendGrid
SMTP Alternative: Nodemailer fallback (if SendGrid fails)
Email Templates:
Transactional Emails:

Welcome Email (on registration)
Email Verification (with verification link)
Password Reset (with reset token link)
Profile Approved (handyman approved by admin)
Profile Rejected (handyman rejected, with reasons)
Lead Purchased (to client: handyman bought your lead)
Lead Refunded (to worker: unresponsive client, refunded)
Payment Request Received (to client: handyman sent payment request)
Payment Received (to worker: client paid, money in escrow)
Service Completion Confirmed (to both: service marked complete)
Payment Released (to worker: money released from escrow)
Review Received (to worker: client left review)
Dispute Created (to both parties: dispute opened)
Dispute Resolved (to both parties: resolution decided)
Support Ticket Update (to user: support responded)
Low Wallet Balance (to worker: balance below 200 MXN)
Weekly Budget Reset (to worker: new week started)
Portfolio Verification Request (to client: verify work)

Email Template Structure:

HTML template with inline CSS
Plain text fallback
Dynamic content via template variables
TrustMe branding (logo, colors)
Footer with unsubscribe link (legally required)

Email Sending Logic:

All emails sent asynchronously (background jobs)
Retry logic (up to 3 attempts)
Logging (success/failure)
User can opt out of non-critical emails (in settings)

Email Verification Flow:

User registers
Generate unique verification token (32 bytes, random)
Store token hash in database with expiration (24 hours)
Send email with link: https://trustme.mx/verify-email?token={token}
User clicks link
Backend validates token, marks email as verified
Redirect to success page

6.6 SMS/WhatsApp Verification
Provider: Twilio Verify API
WhatsApp Number Verification Flow:

User enters WhatsApp number in registration
Frontend sends to backend: POST /api/auth/verify-phone
Backend:

Clean phone number (remove spaces, dashes)
Add country code +52 (Mexico)
Call Twilio Verify API: Send code


Twilio sends 6-digit code via SMS to WhatsApp number
User receives code
User enters code in platform
Frontend sends: POST /api/auth/verify-phone/confirm with code
Backend:

Validates code with Twilio Verify API
If correct: Marks phone as verified
If incorrect: Returns error (max 3 attempts)


Success: Phone verified

Verification Code:

6 digits (e.g., 123456)
Valid for 5 minutes
Max 3 attempts
After 3 failed attempts: Must request new code

Security:

Rate limiting: Max 3 verification requests per phone per hour
Prevents spam/abuse
Logs all verification attempts

6.7 Stripe Integration (Payments & Escrow)
Stripe Products Used:

Stripe Checkout: Client payment collection
Stripe Connect: Escrow and payouts to workers
Stripe Webhooks: Real-time payment events

Payment Request Flow:
1. Worker Creates Payment Request:

Worker clicks "Send Payment Request" in conversation
Fills form: Amount, Description, Service Date
POST /api/payments/request
Backend creates payment_requests record
Status: "pending"

2. Backend Creates Stripe Checkout Session:

Call Stripe API: stripe.checkout.sessions.create
Line items: Service description + amount
Success URL: https://trustme.mx/payment/success?session_id={CHECKOUT_SESSION_ID}
Cancel URL: https://trustme.mx/payment/cancel
Metadata: { payment_request_id, worker_id, client_id }
Returns: Stripe Checkout URL

3. Client Receives Payment Request:

In-platform notification + email
Email contains "Pay Now" button
Button links to Stripe Checkout URL

4. Client Pays via Stripe:

Redirected to Stripe Checkout page
Enters card details securely (Stripe handles)
Stripe charges card: Amount + Stripe fee (~3%)
Example: 1,000 MXN service + 30 MXN fee = 1,030 MXN total charged

5. Payment Success:

Stripe redirects to success URL
Stripe sends webhook: checkout.session.completed
Backend receives webhook:

Extracts metadata (payment_request_id)
Updates payment_requests.status = 'paid'
Creates escrow_payments record
Money held in TrustMe Stripe Connect account
Status: "held"
Notifies both parties: "Payment received"



Escrow Logic:
While in Escrow:

Money sits in TrustMe's Stripe balance
Not accessible to worker yet
Client protected

Service Completion:

Both parties confirm service complete
escrow_payments.completion_confirmed_by_worker = true
escrow_payments.completion_confirmed_by_client = true
escrow_payments.completion_confirmed_at = NOW()
escrow_payments.release_date = NOW() + 5 days

5-Day Hold:

Countdown: 5 days from completion confirmation
Client can raise dispute during this time
If no dispute: Auto-release on Day 6

Automatic Release (Day 6):

Cron job runs daily at midnight
Checks escrow_payments where:

status = 'held'
release_date <= TODAY
dispute_id IS NULL


For each eligible payment:

Call Stripe API: Transfer funds to worker's Stripe Connect account
Or: Add to worker's TrustMe wallet (internal ledger)
Update escrow_payments.status = 'released'
Create wallet_transactions record
Notify worker: "Payment released: 1,000 MXN"



Dispute Scenario:

Dispute raised during hold
escrow_payments.dispute_id = {dispute_id}
Money remains frozen
Customer support decides resolution:

Full refund to client: Stripe refund API
Partial refund: Split transfer (client + worker)
Payment to worker: Release as normal



Stripe Connect Setup:

Workers connect Stripe account (future) OR
Workers add debit card for payouts (current MVP approach)
TrustMe holds funds, pays out via Stripe transfers or bank transfer

Stripe Webhook Handling:

POST /api/webhooks/stripe
Verify webhook signature (security)
Handle events:

checkout.session.completed - Payment successful
payment_intent.succeeded - Backup confirmation
transfer.created - Payout to worker
charge.refunded - Refund processed



Security:

All webhook payloads verified using Stripe signature
Idempotency: Prevent duplicate processing
Logging: All Stripe interactions logged

6.8 Real-Time Features (Future WebSocket)
Current MVP: Polling (simple, no WebSocket)
Polling Intervals:

New messages: Frontend polls GET /api/conversations/:id/messages every 10 seconds
Notifications: Frontend polls GET /api/notifications every 30 seconds
Not ideal for scale, but sufficient for MVP

Future Phase 2: WebSocket (Socket.io)

Real-time message delivery
Typing indicators
Online/offline status
Instant notifications
Better user experience

6.9 Analytics and Tracking
Analytics Provider: Google Analytics 4 (GA4)
Events to Track:
User Behavior:

user_registered - { role: 'client' | 'worker' }
profile_created - { role: 'worker' }
profile_approved - { worker_id }
search_performed - { category, zone, filters }
worker_profile_viewed - { worker_id, source: 'search' | 'direct' }
lead_created - { category, urgency, budget_range }
lead_purchased - { lead_id, worker_id, amount }
message_sent - { conversation_id, media_type }
payment_request_sent - { amount }
payment_completed - { amount }
service_completed - { payment_id }
review_submitted - { rating, worker_id }

Conversion Funnel:

Search → Profile View → Lead Created → Lead Purchased → Payment → Service Complete → Review

Custom Dimensions:

User ID
User Role
Service Category
CDMX Zone

Metrics Dashboard (Admin):

Daily/weekly/monthly stats
User acquisition (new registrations)
Lead creation rate
Lead purchase rate (conversion)
Revenue (total, by category)
Average rating by worker
Dispute rate
Refund rate

Implementation:

react-ga4 package for React frontend
Track page views automatically
Track custom events on key actions
Privacy-compliant (GDPR/CCPA - user can opt out)

6.10 Security Measures
Password Security:

Bcrypt hashing (10 salt rounds minimum)
Minimum password length: 8 characters
Password strength indicator in UI
No password storage in plaintext ever

Session Security:

Session cookies: httpOnly, secure (HTTPS only), SameSite=Lax
Session expiration: 30 days idle
Session stored in PostgreSQL (server-side)
CSRF protection via cookie headers

SQL Injection Prevention:

Drizzle ORM parameterized queries (no raw SQL)
All user inputs sanitized
Zod validation on all endpoints
