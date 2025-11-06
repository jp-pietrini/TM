XSS Prevention:

React automatically escapes JSX content
Sanitize HTML if ever rendering user-generated HTML (use DOMPurify)
Content Security Policy (CSP) headers
No dangerouslySetInnerHTML without sanitization

File Upload Security:

MIME type validation (client and server)
File size limits enforced
Malware scanning (future: ClamAV)
Unique filenames (prevent overwrite attacks)
S3 bucket permissions: Private by default
Executable files blocked (.exe, .sh, .bat, etc.)

API Rate Limiting:

Rate limit per IP address:

Registration: 3 attempts per hour
Login: 5 attempts per 15 minutes
Password reset: 3 attempts per hour
API calls: 100 requests per minute


Use express-rate-limit middleware
Return 429 (Too Many Requests) when exceeded

Authentication Rate Limiting:

Failed login attempts: Lock account after 5 failures for 15 minutes
SMS verification: Max 3 codes per phone per hour
Email verification: Max 3 emails per address per hour

Data Validation:

Zod schemas on every API endpoint
Validate types, formats, ranges
Reject invalid data with 400 Bad Request
Sanitize strings (remove HTML, scripts)

Authorization Checks:

Every protected endpoint checks req.user
Role-based access control:

Client can only access own leads, bookings, reviews
Worker can only access own profile, wallet, purchased leads
Admin can access all data
Customer support can view conversations and disputes


Resource ownership validation:

User can only edit own profile
Worker can only edit own portfolio
Client can only flag own conversations



Environment Variables Security:

All secrets in .env file (never committed to Git)
Production secrets in AWS Secrets Manager or environment config
No hardcoded API keys in code
Required variables:

DATABASE_URL
SESSION_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
SENDGRID_API_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_BUCKET_NAME
CLOUDFRONT_URL



HTTPS Enforcement:

All production traffic over HTTPS (TLS 1.2+)
HTTP redirects to HTTPS
SSL certificate via AWS Certificate Manager
HSTS headers (force HTTPS in browser)

Logging and Monitoring:

Log all authentication attempts
Log all failed requests (400, 401, 403, 404, 500)
Log all payment transactions
Log all admin actions
No sensitive data in logs (passwords, card numbers)
Sentry for error tracking
CloudWatch for infrastructure monitoring

Compliance:

GDPR/CCPA-style data handling (Mexico's LFPDPPP)
Users can request data export
Users can request account deletion (anonymize, don't hard delete)
Privacy policy and terms of service (legally reviewed)
Cookie consent banner
Clear data usage explanations


7. Design System
7.1 Brand Identity
Brand Name: TrustMe
Tagline: "Encuentra al experto que necesitas" (Find the expert you need)
Brand Values:

Trust and transparency
Simplicity and ease of use
Quality craftsmanship
Local community focus
Fairness for both clients and workers

Brand Personality:

Professional yet approachable
Clean and modern
Trustworthy and reliable
Friendly and helpful

7.2 Color Palette
Primary Color: Sky Blue

Main Sky Blue: #4A90E2 (vibrant, trustworthy)
Light Sky Blue: #7DB3F5 (hover states, accents)
Dark Sky Blue: #2C6BB3 (text on light backgrounds)

Neutral Colors:

Pure Black: #000000 (primary text)
Dark Gray: #1F2937 (secondary text, headings)
Medium Gray: #6B7280 (tertiary text, labels)
Light Gray: #E5E7EB (borders, dividers)
Off-White: #F9FAFB (backgrounds, cards)
Pure White: #FFFFFF (main background)

Semantic Colors:

Success Green: #10B981 (approvals, confirmations)
Error Red: #EF4444 (errors, rejections)
Warning Yellow: #F59E0B (warnings, attention needed)
Info Blue: #3B82F6 (informational messages)

Usage Guidelines:

Primary blue for main actions (buttons, links, active states)
Neutral grays for text hierarchy
Semantic colors sparingly (only when meaningful)
White space is generous (not cluttered)

7.3 Typography
Primary Font: Plus Jakarta Sans
Font Weights Used:

Regular (400): Body text
Medium (500): Subheadings, labels
SemiBold (600): Headings, emphasis
Bold (700): Primary headings, hero text

Type Scale:

Hero: 48px / 3rem (desktop), 36px / 2.25rem (mobile) - Bold
H1: 36px / 2.25rem (desktop), 30px / 1.875rem (mobile) - SemiBold
H2: 30px / 1.875rem (desktop), 24px / 1.5rem (mobile) - SemiBold
H3: 24px / 1.5rem - SemiBold
H4: 20px / 1.25rem - Medium
Body Large: 18px / 1.125rem - Regular
Body: 16px / 1rem - Regular (default)
Body Small: 14px / 0.875rem - Regular
Caption: 12px / 0.75rem - Regular

Line Heights:

Headlines: 1.2 (tight, impactful)
Body text: 1.6 (readable, comfortable)
Labels: 1.4 (compact)

Letter Spacing:

Headlines: -0.02em (tighter)
Body: 0em (default)
All caps labels: 0.05em (wider for readability)

Spanish Language Support:

Font includes all Spanish characters: á, é, í, ó, ú, ñ, ü, ¡, ¿
Proper rendering of accented characters

7.4 Spacing System
Base Unit: 4px (0.25rem)
Spacing Scale:

xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)

Consistent Spacing:

Card padding: 24px (lg)
Section padding: 48px (2xl) desktop, 24px (lg) mobile
Element gaps: 16px (md) default
Form field spacing: 20px
Button padding: 12px vertical, 24px horizontal

Container Max Width:

Main content: 1280px
Narrow content (forms): 640px

7.5 Component Library
Buttons:
Primary Button:

Background: Sky Blue (#4A90E2)
Text: White
Padding: 12px 24px
Border radius: 8px
Font: SemiBold 16px
Hover: Darker blue (#2C6BB3)
Disabled: Light gray with 50% opacity

Secondary Button:

Background: White
Text: Sky Blue
Border: 2px solid Sky Blue
Same size as primary
Hover: Light blue background (#F0F7FF)

Tertiary/Text Button:

Background: Transparent
Text: Sky Blue
Underline on hover
No border

Danger Button:

Background: Red (#EF4444)
Text: White
Used for destructive actions (delete, reject)

Button States:

Default
Hover (darker/lighter shade)
Active (pressed - slight transform)
Disabled (grayed out, cursor not-allowed)
Loading (spinner + disabled)

Form Inputs:
Text Input:

Border: 1px solid Light Gray
Border radius: 8px
Padding: 12px 16px
Font: 16px Regular
Focus: Blue border (2px) + shadow
Error: Red border + error message below
Disabled: Gray background

Textarea:

Same styling as text input
Minimum height: 120px
Resizable vertically

Dropdown/Select:

Same styling as text input
Chevron icon on right
Options panel with white background
Selected option highlighted

Checkbox:

Size: 20px square
Border: 2px solid gray
Checked: Blue background with white checkmark
Border radius: 4px

Radio Button:

Size: 20px circle
Border: 2px solid gray
Checked: Blue background with white dot inside

File Upload:

Dashed border box
"Drag and drop or click to upload" text
Icon: Upload cloud
File preview thumbnails after selection

Cards:
Default Card:

Background: White
Border: 1px solid Light Gray
Border radius: 12px
Padding: 24px
Shadow: Subtle (0px 2px 8px rgba(0,0,0,0.08))
Hover: Shadow increases (0px 4px 16px rgba(0,0,0,0.12))

Profile Card (Search Results):

Horizontal layout
Profile photo left (80x80 rounded)
Content middle (name, rating, description)
Action button right
Hover: Lift effect (transform translateY(-2px))

Badges:
Status Badges:

Pill shape (fully rounded)
Padding: 4px 12px
Font: 12px SemiBold
Colors:

Success: Green background, dark green text
Pending: Yellow background, dark yellow text
Error: Red background, dark red text
Info: Blue background, dark blue text
Neutral: Gray background, dark gray text



Verification Badges:

Small icons with text
✓ icon in green
Font: 12px Regular
"Verified" text

Modal/Dialog:

Overlay: Semi-transparent black (rgba(0,0,0,0.5))
Content: White card centered
Max width: 600px
Padding: 32px
Close button: X in top-right
Actions: Buttons at bottom-right

Toast Notifications:

Fixed position: Top-right corner
Background: White
Border-left: 4px solid (color based on type)
Padding: 16px
Shadow: Medium
Auto-dismiss after 5 seconds
Can be manually closed (X button)

Loading States:
Spinner:

Circular spinner (CSS animation)
Color: Sky Blue
Sizes: Small (16px), Medium (32px), Large (48px)

Skeleton Loader:

Gray rounded rectangles
Animated shimmer effect
Matches shape of loading content

Progress Bar:

Height: 8px
Background: Light Gray
Fill: Sky Blue
Border radius: 4px
Smooth animation

Icons:

Icon library: Heroicons or Lucide React
Sizes: 16px (small), 20px (default), 24px (large)
Stroke width: 2px
Color: Inherit from parent text color

Star Rating:

5 stars
Filled: Yellow (#FCD34D)
Empty: Light Gray
Half-star support for averages
Size: 20px per star

7.6 Layout Patterns
Dashboard Layout:

Sidebar (desktop): 280px wide, fixed left
Main content: Remaining width, scrollable
Mobile: Bottom navigation (sticky)

Search Results:

Grid layout (desktop): 2-3 columns
List layout (mobile): Single column, stacked cards

Profile Page:

Two column (desktop):

Left: Sticky sidebar with key info (33%)
Right: Scrollable content (67%)


Single column (mobile): Stacked sections

Wizard/Multi-step Form:

Progress indicator at top (steps 1, 2, 3, 4)
One section visible at a time
"Back" and "Next" buttons at bottom
Can jump to previous steps

Chat Interface:

Left sidebar: Conversation list (33%)
Right: Selected conversation (67%)
Mobile: Toggle between list and conversation

7.7 Responsive Breakpoints
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md to lg)
Desktop: > 1024px (lg+)
Mobile-First Approach:

Design for mobile first
Enhance for larger screens
Touch targets: Minimum 44x44px
Larger fonts on mobile (easier to read)
Simplified navigation on mobile

Tablet Adjustments:

2-column layouts
Slightly larger cards
Side-by-side forms

Desktop Enhancements:

3-column grids
Hover states (not on mobile)
More information density
Larger images

7.8 Inspiration References
Apple.com:

Clean, minimalist design
Generous white space
Focus on content, not decoration
Clear hierarchy
High-quality images
Smooth animations (subtle, purposeful)

Facebook App (Mobile):

Familiar card-based layout
Infinite scroll for feeds
Bottom navigation for main sections
Quick actions (like, comment, share)
Simple, intuitive interactions

Amazon Product Listings:

Product comparison shopping experience
Clear pricing and ratings
Filter sidebar
Sort options
Quick view vs. detail view
Add to cart / contact actions

Design Principles to Emulate:

Clarity over cleverness: Easy to understand
Consistency: Same patterns throughout app
Feedback: Users always know what's happening (loading, success, error)
Forgiveness: Easy to undo actions, confirmations for destructive actions
Accessibility: Readable text, sufficient contrast, keyboard navigation

7.9 Accessibility (A11y)
Color Contrast:

Text on backgrounds: Minimum WCAG AA (4.5:1 for normal text, 3:1 for large text)
Test with tools (WebAIM Contrast Checker)

Focus States:

Keyboard navigation support
Visible focus outline (blue, 2px)
Logical tab order

Screen Reader Support:

Semantic HTML (nav, main, article, aside)
ARIA labels where needed
Alt text for all images
Form labels properly associated

Touch Targets:

Minimum 44x44px for mobile
Spacing between clickable elements

Text Resizing:

Layout doesn't break when text size increased
Relative units (rem, em) not fixed pixels


8. Data Model Requirements
8.1 User Data
users table:
Required Fields:

Email (unique, indexed)
Password hash (never store plaintext)
Full name
Role (client, worker, customer_support, admin)

Optional Fields:

Phone (for WhatsApp)
Profile image URL
Address fields (street, unit, municipality, state, zip)
Last login timestamp
Account status (active, suspended, banned)

Validations:

Email: Valid email format, max 255 characters
Password: Minimum 8 characters (enforced at registration)
Full name: 2-100 characters
Phone: Valid phone number format (E.164 format with +52 country code)

Constraints:

Email must be unique
Role must be one of enum values
Created timestamp defaults to current time

8.2 Worker Profile Data
worker_profiles table:
Core Fields:

User ID (foreign key, unique - one profile per user)
Description (20-400 characters)
Service areas (array of CDMX zones)
Availability (JSONB - weekly schedule)
Approval status (pending, approved, rejected, changes_requested)
Approved by (admin user ID)
Approved timestamp
Rejection reason (if rejected)

Availability JSON Structure:
json{
  "monday": ["morning", "afternoon"],
  "tuesday": ["morning", "afternoon", "evening"],
  "wednesday": ["afternoon", "evening"],
  "thursday": [],
  "friday": ["morning"],
  "saturday": ["morning", "afternoon"],
  "sunday": []
}
Service Areas Enum Values:

Polanco
Condesa
Roma Norte
Roma Sur
Escandón
Del Valle
Santa Fe
Coyoacán
Nápoles
San Ángel
Lomas de Chapultepec

Validations:

Description: 20-400 characters
Service areas: At least 1, maximum 11 (all zones)
Availability: Valid JSON structure
Approval status: One of enum values

8.3 Lead Data
leads table:
Core Fields:

Client ID (foreign key)
Service category (string)
Service subcategory (string, optional)
Title (max 200 characters)
Description (required, text)
Location zone (CDMX zone enum)
Zip code (optional, for distance calculation)
Budget range (min and max, both optional)
Urgency level (enum: regular, soon, urgent, emergency)
Preferred time (enum: morning, afternoon, evening, flexible)
Deadline (date, optional)
Availability (JSONB - days and time slots)
Status (enum: active, expired, cancelled)
Created timestamp
Expires timestamp (auto-calculated: created + 30 days)

Availability JSON Structure:
json{
  "monday": ["morning"],
  "tuesday": ["morning", "afternoon"],
  "friday": ["evening"]
}
Validations:

Title: 10-200 characters
Description: 50-2000 characters
Budget min/max: If both provided, min < max
Service category: Must exist in services table
Zone: Valid CDMX zone
Urgency: One of enum values

Relationships:

One lead → Many lead_recipients (handymen who received it)
One lead → Many lead_purchases (handymen who bought it)
One lead → Many lead_media (photos/videos)

8.4 Lead Purchase Data
lead_purchases table:
Core Fields:

Lead ID (foreign key)
Worker ID (foreign key)
Purchase amount (default 100 MXN)
Status (enum: purchased, refunded)
Client responded (boolean, default false)
Client response timestamp (null until response)
Refund eligible until (timestamp: purchase time + 48 hours)
Refunded timestamp (null unless refunded)
Purchased timestamp

Unique Constraint:

Combination of (lead_id, worker_id) must be unique
One worker can only purchase same lead once

Business Logic:

When created: Status = purchased, refund_eligible_until = now + 48 hours
When client responds: client_responded = true, client_response_at = now
If 48 hours pass with no response: Auto-refund (cron job)
Refund: status = refunded, refunded_at = now

Relationships:

One lead_purchase → One conversation (created on purchase)
One lead_purchase → Many wallet_transactions (purchase deduction, possible refund credit)

8.5 Wallet Data
wallet_transactions table:
Core Fields:

Worker ID (foreign key)
Transaction type (enum: deposit, lead_purchase, refund, withdrawal, payment_received)
Amount (positive or negative)
Balance after (running balance)
Reference ID (lead ID, payment ID, etc.)
Description (human-readable)
Status (enum: pending, completed, failed)
Created timestamp

Transaction Types:

deposit: Worker adds funds (positive amount)
lead_purchase: Worker buys lead (negative amount)
refund: Lead refunded (positive amount)
withdrawal: Worker withdraws to bank (negative amount)
payment_received: Client paid for service (positive amount)

Running Balance Calculation:

Each transaction records balance_after
Current balance = most recent balance_after
Balance never goes negative (enforced at application level)

Example Transactions:

ID | Type          | Amount | Balance After | Description
1  | deposit       | +500   | 500           | Added funds via card
2  | lead_purchase | -100   | 400           | Purchased lead #123
3  | lead_purchase | -100   | 300           | Purchased lead #124
4  | refund        | +100   | 400           | Refund lead #123 (unresponsive)
5  | payment_received | +1000 | 1400        | Payment from client for service

Constraints:

Amount cannot be zero
Balance_after must be >= 0

8.6 Weekly Budget Data
weekly_budgets table:
Core Fields:

Worker ID (foreign key)
Week start date (Monday of week)
Budget limit (amount in MXN)
Spent amount (running total for week)
Is paused (boolean - if true, no lead purchases allowed)
Created timestamp

Unique Constraint:

Combination of (worker_id, week_start_date) must be unique

Business Logic:

Week starts Monday 00:00
Week ends Sunday 23:59
Spent amount incremented on each lead purchase
Spent amount decremented on refund (credited back)
New week auto-creates on Monday (cron job)
Budget limit carries over from previous week (unless manually changed)

Example:

Week Start  | Budget Limit | Spent | Remaining
2024-11-04  | 500         | 300   | 200
2024-11-11  | 500         | 0     | 500 (new week, reset)

8.7 Conversation Data
conversations table:
Core Fields:

Lead ID (foreign key)
Client ID (foreign key)
Worker ID (foreign key)
Status (enum: active, archived, flagged)
Created timestamp
Updated timestamp (last message time)

Unique Constraint:

Combination of (lead_id, worker_id) must be unique
One conversation per lead per worker

Business Logic:

Created when worker purchases lead
Updated timestamp changes on every new message
Status changes to "flagged" if either party flags conversation
Never deleted (even after service complete - for record keeping)

Relationships:

One conversation → Many messages
One conversation → One lead_purchase

8.8 Message Data
messages table:
Core Fields:

Conversation ID (foreign key)
Sender ID (foreign key to users)
Message type (enum: text, image, video, voice, file)
Content (text for text messages, null for media)
Media URL (null for text messages, S3 URL for media)
Is read (boolean)
Read timestamp (null until read)
Created timestamp

Validations:

Content: Required if message_type = text, max 5000 characters
Media URL: Required if message_type != text
Message type: One of enum values

Business Logic:

First message from worker after lead purchase → Triggers contact info visibility check
Client's first response → Sets lead_purchase.client_responded = true, reveals contact info
Unread count = COUNT(*) WHERE is_read = false AND sender_id != current_user_id

File Size Limits (Enforced at Upload):

Images: 5 MB
Videos: 50 MB
Voice: 2 MB (~2 minutes)
Files: 10 MB

8.9 Payment Request Data
payment_requests table:
Core Fields:

Conversation ID (foreign key)
Worker ID (foreign key)
Client ID (foreign key)
Amount (MXN)
Description (service details)
Expected service date (optional)
Status (enum: pending, paid, declined, cancelled)
Stripe payment intent ID (from Stripe)
Created timestamp

Validations:

Amount: Positive, maximum 50,000 MXN (reasonable limit)
Description: 10-500 characters

Status Flow:

Created: Status = pending
Client pays: Status = paid, stripe_payment_intent_id set
Client declines: Status = declined
Worker cancels: Status = cancelled

Relationships:

One payment_request → One escrow_payment (if paid)

8.10 Escrow Payment Data
escrow_payments table:
Core Fields:

Payment request ID (foreign key)
Amount (MXN)
Stripe transfer ID (for release to worker)
Status (enum: held, released, refunded)
Completion confirmed by worker (boolean)
Completion confirmed by client (boolean)
Completion confirmed timestamp (when both confirm)
Release date (completion confirmed + 5 days)
Released timestamp (when money released)
Dispute ID (foreign key, null unless dispute raised)
Created timestamp

Business Logic:

Created when payment_request status = paid
Status = held initially
Both parties must confirm completion
After both confirm: completion_confirmed_at = now, release_date = now + 5 days
On release_date: Auto-release (cron job) if no dispute
If dispute raised: dispute_id set, money frozen
After dispute resolved: Either release or refund based on resolution

Status Transitions:

held → released (normal flow, no dispute)
held → refunded (dispute resolved in client favor)
held remains until dispute resolved if dispute raised

8.11 Review Data
reviews table:
Core Fields:

Payment request ID (foreign key)
Client ID (foreign key)
Worker ID (foreign key)
Overall rating (1-5, required)
Title (required, 10-100 characters)
Description (required, 100-1000 characters)
Quality rating (1-5, optional)
Communication rating (1-5, optional)
Punctuality rating (1-5, optional)
Professionalism rating (1-5, optional)
Value rating (1-5, optional)
Would recommend (boolean, required)
Would hire again (boolean, required)
Worker response (text, optional, max 500 characters)
Worker responded timestamp
Created timestamp

Validations:

Overall rating: Integer 1-5
All specific ratings: Integer 1-5 or null
Title: 10-100 characters
Description: 100-1000 characters
Worker response: Max 500 characters

Unique Constraint:

One review per payment_request (client can only review once per service)

Relationships:

One review → Many review_media (photos)

Average Rating Calculation:

Worker's average = AVG(overall_rating) for all their reviews
Displayed as decimal (e.g., 4.8)
Minimum 3 reviews before average is meaningful

8.12 Dispute Data
disputes table:
Core Fields:

Reference number (unique, e.g., #DIS-00001)
Escrow payment ID (foreign key)
Raised by (user ID)
Dispute type (enum: payment, quality, no_show, fraud, other)
Priority (enum: low, medium, high, critical)
Description (text, required)
Desired resolution (text, optional)
Status (enum: open, in_progress, resolved, escalated)
Assigned to (customer support user ID)
Resolution (text, what was decided)
Resolution type (enum: full_refund, partial_refund, payment_to_worker, redo, other)
Refund amount (if partial refund)
Created timestamp
Resolved timestamp

Validations:

Reference number: Format #DIS-XXXXX (auto-generated, sequential)
Description: 50-2000 characters
Dispute type: One of enum values
Priority: Auto-assigned based on type (no_show, fraud = high)

Status Flow:

open → in_progress (when support starts working)
in_progress → resolved (when decision made)
in_progress → escalated (if complex, needs admin)
escalated → resolved (after admin decides)

Relationships:

One dispute → Many dispute_evidence (photos, documents)
One dispute → One escrow_payment (payment frozen during dispute)

8.13 Support Ticket Data
support_tickets table:
Core Fields:

Reference number (unique, e.g., #TM-00001)
User ID (foreign key - who created ticket)
Subject (max 255 characters)
Description (text)
Category (enum: technical, account, policy, guidance, payment, other)
Priority (enum: low, medium, high, urgent)
Status (enum: open, in_progress, waiting_user, resolved)
Assigned to (customer support user ID)
Created timestamp
Resolved timestamp

Validations:

Reference number: Format #TM-XXXXX (auto-generated, sequential)
Subject: 10-255 characters
Description: 50-2000 characters

Relationships:

One support_ticket → Many support_messages (conversation thread)

8.14 Data Retention Policies
Permanent Storage (Never Delete):

Users (anonymize on account deletion)
Worker profiles
Leads
Conversations and messages (dispute evidence)
Payment requests and escrow payments (financial records)
Reviews (historical record)
Disputes (legal/compliance)
Wallet transactions (financial records)

Time-Limited Storage:

Sessions: 30 days idle, then expire
Email verification tokens: 24 hours
Phone verification codes: 5 minutes
Password reset tokens: 1 hour
Flagged conversations: 90 days after resolution, then archive

Account Deletion:

User requests deletion
Personal info anonymized:

Name → "Deleted User"
Email → "deleted_{timestamp}@trustme.mx"
Phone → null
Profile image → removed


Historical data preserved (reviews, transactions) but anonymized
Cannot re-register with same email (prevent circumventing bans)
