TrustMe Marketplace - Product Requirements Document (PRD)
Version: 1.0 - MVP Specification
Date: November 2025
Project: TrustMe CDMX Lead Generation Platform
Timeline: 1 Month MVP Development
Status: Ready for Development

Executive Summary
Product Vision
TrustMe is a lead generation marketplace connecting clients in Mexico City with skilled handymen for repair and construction services. Unlike commission-based platforms, TrustMe operates on a lead purchase model where handymen pay for qualified leads, and clients use the platform completely free.
Market Opportunity
Mexico City currently lacks a dominant Thumbtack-style platform for home services. With 35 handymen already committed to joining and strong demand for trustworthy service providers, TrustMe fills a critical gap in the market.
Business Model

Revenue Source: Handymen purchase leads at 100 MXN per lead (dynamic pricing)
Client Experience: Completely free to search, compare, and hire
Lead Model: Non-exclusive (each lead sold to multiple handymen selected by client)
First Week Incentive: New handymen receive free leads for their first week
Ongoing Requirement: Minimum 300 MXN weekly budget after first week

MVP Scope
Timeline: 1 month development
Developer Resources: Solo founder/developer
User Roles: Clients, Workers (Handymen), Admin
Core Value Proposition: Safe, transparent way to find and hire verified handymen with client-verifiable portfolios and detailed reviews

Table of Contents

Product Overview
User Roles & Personas
Core User Flows
Feature Specifications
Business Logic & Rules
Technical Requirements
Design System
Data Model Requirements
Integration Requirements
Success Metrics
Launch Plan
Future Phases


1. Product Overview
1.1 Platform Purpose
TrustMe connects clients needing home repair and construction services with skilled, verified handymen in Mexico City. The platform emphasizes trust through verified portfolios, detailed reviews, and transparent communication.
1.2 Key Differentiators
For Clients:

Completely free to use
Compare handymen like shopping on Amazon
See verified portfolios with client confirmations
Detailed reviews with photos
Transparent pricing
Secure payment with 5-day protection period

For Handymen:

Only pay for qualified leads
See full job details before purchasing
First week of leads completely free
Keep 100% of service payment (no commission)
Build verified portfolio
Control weekly spending with budget caps
48-hour refund if client doesn't respond

1.3 Service Categories
Initial MVP covers Mexico City (CDMX) with these service categories:
Primary Categories:

Plomería (Plumbing)

Leak repairs
Drain unclogging
Faucet replacement
Bathroom/kitchen installation
Joint sealing
Water network installation
Float mechanism replacement


Electricidad (Electrical)

Component replacement
Component installation
Minor repairs
Conduit installation
General electrical work


Pintura (Painting)

Surface painting
Surface repair
Sealant application
Varnish and finishes
Facade painting


Instalación de electrodomésticos (Appliance Installation)
Ensamblado de muebles (Furniture Assembly)
Reparación y mantenimiento (Repair & Maintenance)
Herrería (Metalwork)
Limpieza profunda (Deep Cleaning)
Valoración para compraventa (Property Valuation)

1.4 Geographic Scope
Initial Launch: All CDMX zones simultaneously
Supported Zones:

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

Distance Calculation: Based on zip codes, showing distance in kilometers between handyman and job location.

2. User Roles & Personas
2.1 Client (Service Seeker)
Primary Characteristics:

Individual or household needing repair/construction services
85% will access platform via mobile device
Values trust, transparency, and convenience
Willing to provide detailed information for better matches
Price-conscious but values quality

Key Needs:

Quick way to find qualified handymen
Ability to compare multiple options
See verified work examples
Read authentic reviews
Communicate safely within platform
Secure payment with protection period

User Journey Stages:

Discovery (has a problem, searches for solution)
Search (finds platform, enters service details)
Comparison (reviews handyman profiles)
Selection (picks handymen to send lead to)
Communication (chats with handymen who bought lead)
Hiring (selects one, agrees on price)
Payment (pays via Stripe with escrow)
Service (receives service)
Review (leaves detailed feedback)
Return (comes back for future needs)

2.2 Worker (Handyman / Service Provider)
Primary Characteristics:

Independent service provider with specialized skills
May use mobile or desktop (more desktop than clients)
Building reputation and customer base
Values predictable lead flow
Concerned about lead quality and cost
Wants to showcase expertise

Key Needs:

Qualified leads in their service area
See full job details before committing payment
Control over spending (weekly budgets)
Safe communication with clients
Showcase verified work
Fair refund policy if leads are unresponsive
Keep 100% of service payment

User Journey Stages:

Discovery (learns about platform)
Registration (creates account)
Profile Creation (adds services, availability, portfolio)
Approval (admin reviews and approves)
Verification (verifies email and WhatsApp)
Wallet Setup (adds funds, sets weekly budget)
Lead Browsing (sees matching leads)
Lead Purchase (buys qualified leads)
Communication (chats with client)
Service Delivery (performs work)
Payment Receipt (receives payment to wallet)
Review Response (responds to client review)
Portfolio Update (adds completed work)

2.3 Admin
Primary Characteristics:

Platform operator (founder initially)
Responsible for quality control
Monitors platform health
Ensures fair marketplace

Key Responsibilities:

Approve/reject handyman applications
Monitor user behavior for fraud
View platform metrics and revenue
Handle escalated issues
Manage customer support operations
Monitor chat conversations when needed
Issue refunds when appropriate

Key Needs:

Clear approval queue
User behavior statistics
Revenue and lead purchase metrics
Fraud detection alerts
Easy access to user profiles and conversations

2.4 Customer Support (Phase 1 - Founders Operate)
Primary Characteristics:

Founders initially, dedicated staff later
First line of dispute resolution
User assistance and guidance
Available 9 AM - 9 PM

Key Responsibilities:

Read chat conversations between users
Mediate disputes
Answer user questions (email, in-platform, phone)
Issue refunds when policy allows
Flag fraudulent behavior to admin
Maintain support reference numbers for tracking

Support Channels:

Email support
In-platform chat support
Phone support


3. Core User Flows
3.1 Client Search and Lead Creation Flow
Flow Name: Client Finds and Hires Handyman
Entry Point: Client lands on homepage or directly searches
Success Criteria: Client successfully sends lead to handymen
Step-by-Step Flow:
Step 1: Service Search

Client navigates to search
Selects service category from dropdown
Selects specific subcategory
Specifies service area (which specific aspects they need help with)
Enters location (zone selection or address)
Sets availability preferences (days and time slots)
Indicates urgency level

Step 2: View Search Results

System displays matching handymen
Results sorted by algorithm (distance, rating, response time, price, availability, specialization)
Client sees for each handyman:

Profile photo
Name
Star rating (0-5)
Number of reviews
Distance from job location (in km)
Number of completed tasks
Starting prices for services
Verification badges
Brief description
Availability indicators



Filter Options Available:

Price range slider
Minimum rating (4+ stars only, etc.)
Distance radius (within 5km, 10km, etc.)
Verified badge only
Individual vs Company (future)
Number of tasks completed (minimum threshold)

Step 3: Profile Comparison (Amazon-Style)

Client scrolls through results (like product listings)
Clicks on handyman to view full profile
Profile shows:

Full description
All services offered with prices
Complete portfolio with client-verified projects
All reviews with photos and details
Service areas covered
Availability calendar
Response time average


Client can open multiple profiles in tabs to compare
Client bookmarks favorites (future feature)

Step 4: Lead Creation - Select Handymen

Client clicks "Request Service" or "Send Lead"
Opens lead creation wizard
Client selects handymen to send lead to (minimum 1, maximum 6)
System shows: "This lead will be sent to X handymen. Each will pay 100 MXN to view your contact details after you respond to them."

Step 5: Lead Creation - Add Details

Client fills out detailed form:

Job title/summary
Detailed description (what needs to be done)
Upload photos (up to 10)
Upload videos (up to 3)
Budget range (optional: minimum and maximum)
Preferred start time (morning, afternoon, evening)
Deadline (if any)
Special requirements (notes)



Step 6: Lead Creation - Contact Information

Client enters:

Full name
Email address
WhatsApp phone number
Confirms zone/address (shown to handymen as zone only initially)



Important Note: If client is new, this step creates their user account automatically
Step 7: Lead Confirmation

Client reviews summary of lead
Sees list of handymen who will receive it
Confirms understanding that handymen pay to view contact details
Option to send to additional handymen (up to 6 total)
Clicks "Send Lead"

Step 8: Post-Submission

Client receives confirmation message
Email confirmation sent
Client can track lead status in their dashboard
Waits for handymen to purchase lead and initiate contact

Decision Points:

If client doesn't find suitable handyman: Can modify search criteria or post as open lead (future)
If client needs multiple services: Can create multiple leads
If client wants to cancel lead: Can cancel before any handyman purchases (future feature)

3.2 Handyman Receives and Purchases Lead Flow
Flow Name: Handyman Buys Lead and Contacts Client
Entry Point: Handyman logs into dashboard
Success Criteria: Handyman purchases lead and initiates chat with client
Step-by-Step Flow:
Step 1: Lead Notification

Handyman receives notification (in-platform, email)
Notification shows:

Service category and subcategory
Location (zone only, not exact address)
Urgency level
Budget range (if provided)
Number of handymen this lead was sent to
"New Lead: [Service] in [Zone]"



Step 2: View Lead Details (Before Purchase)

Handyman clicks notification, opens lead detail page
Can see everything EXCEPT client contact information:

Full job description
All photos and videos uploaded by client
Location (zone level, not exact address)
Budget range
Urgency level
Deadline
Preferred timing
Availability requirements



Information NOT visible:

Client name
Client email
Client WhatsApp number
Client exact address

Also Shows:

Number of other handymen who received this lead
Whether client is new or has previous ratings/reviews
If returning client: Their average rating they give, number of completed hires

Step 3: Purchase Decision

Handyman reviews lead quality
Checks own availability
Assesses if job matches expertise
Reviews current wallet balance
Decides to purchase or skip

If Wallet Balance Insufficient:

System shows: "Insufficient balance. Add funds to purchase."
Redirects to wallet top-up page

If Weekly Budget Reached:

System shows: "Weekly budget limit reached. Increase budget or wait until next week."

Step 4: Purchase Lead

Handyman clicks "Buy Lead - 100 MXN"
Confirmation modal: "This will deduct 100 MXN from your wallet. Proceed?"
Handyman confirms
System:

Deducts 100 MXN from wallet
Creates transaction record
Opens chat between handyman and client
Makes lead "owned" by handyman



Step 5: Initial Contact Window

Chat window opens automatically
Handyman can now see:

Client name (still no email/WhatsApp yet)
Chat interface
Option to send first message



Handyman Sends First Message:

Handyman types message (e.g., "Hi [Name]! I saw your request for [service]. I'd love to help. Can we discuss the details?")
Sends message
System tracks: "First message sent, awaiting client response"

Important: Contact information (email, WhatsApp) is still HIDDEN until client responds
Step 6: Waiting for Client Response

Handyman waits for client to respond
48-hour countdown starts
Handyman can send follow-up messages
Cannot see WhatsApp number yet

Scenario A: Client Responds Within 48 Hours

Client sends reply in chat
System immediately reveals:

Client WhatsApp number (becomes visible in chat header)
Client email


Notification to handyman: "Client responded! Contact info now visible."
Lead becomes non-refundable
Conversation continues

Scenario B: Client Never Responds (48 Hours Pass)

48 hours elapse with no client response
System automatically:

Marks lead as "unresponsive"
Issues 100 MXN refund to handyman wallet
Sends notification: "Lead refunded - client did not respond"


Chat remains accessible but archived
Handyman can leave note about experience (feedback to platform)

Step 7: Active Conversation (After Client Responds)

Handyman and client discuss job details
Can exchange:

Text messages
Photos
Videos
Voice messages
Files/documents


Client may be chatting with multiple handymen simultaneously
Handyman negotiates:

Exact scope of work
Price/quote
Timeline
Any special requirements



Step 8: Agreement and Payment Request

Handyman and client agree on price and timing
Handyman clicks "Send Payment Request"
Enters:

Service description
Agreed amount
Expected service date


Creates Stripe payment request
Client receives:

In-platform notification
Email with payment link
Option to accept or decline



Step 9: Client Pays

Client clicks payment link
Enters card details in Stripe checkout
Pays [Amount + Stripe fees]
Payment enters escrow (held for 5 days after service completion)

Step 10: Service Delivery

Service scheduled
Handyman performs work
Both parties use in-platform chat to coordinate

Step 11: Service Completion

Handyman marks job as "Complete" in platform
Client receives notification to confirm completion
Client confirms: "Yes, service is complete"
5-day countdown starts (escrow period)

Step 12: Payment Release

After 5 days (if no dispute):

Money transfers from escrow to handyman's wallet
Handyman can withdraw to bank account or keep in wallet


Handyman receives notification: "Payment received: [Amount]"

Step 13: Review Request

Client receives prompt to leave review
Handyman receives notification when client leaves review
Handyman can respond to review

3.3 Client Multiple Chat Management
Scenario: Client sent lead to 3 handymen, all 3 purchased it
Client Dashboard View:

Shows 3 active chats
Each chat clearly labeled with handyman name, photo, rating
Client can easily switch between chats
Unread message indicators
Last message preview

Client Experience:

Receives notification when each handyman messages
Responds to each at own pace
Compares quotes and professionalism
Eventually picks one
Informs others: "Thank you, but I've selected another provider"

Other Handymen Status:

Handymen who weren't selected:

Lead is marked "client chose another provider"
No refund (because conversation did occur)
Lead stays in their history
Can view conversation
Learn from experience



3.4 Handyman Registration and Approval Flow
Flow Name: Handyman Joins Platform
Entry Point: Handyman visits registration page
Success Criteria: Handyman approved and can purchase leads
Step 1: Registration

Handyman clicks "Join as Service Provider"
Fills registration form:

Full name
Email address
WhatsApp phone number
Password
Confirms password
Agrees to terms of service


Submits form
System creates user account with role: "Worker"
Status: "Pending Profile"

Step 2: Email Verification

System sends verification email immediately
Handyman clicks link in email
Email verified, redirected to profile creation

Step 3: WhatsApp Verification

System sends 6-digit code via SMS to WhatsApp number
Handyman enters code in platform
WhatsApp number verified

Step 4: Profile Creation Wizard
Part A: Basic Information

Upload profile photo (with cropping tool)
Write professional description (20-400 characters)

What services you offer
Years of experience
Specializations
Professional approach



Part B: Services Offered

Select service categories:

Plumbing
Electrical
Painting
Appliance Installation
Furniture Assembly
Repair & Maintenance
Metalwork
Deep Cleaning
Property Valuation


For each category, select subcategories
For each subcategory, select specific service areas
Enter pricing for each service:

Hourly rate OR
Fixed price per service
Minimum job price



Part C: Service Areas

Select zones in CDMX where willing to work
Minimum 1 zone, can select multiple
Distance radius (will travel up to X km)

Part D: Availability

Weekly schedule:

Days available (Monday - Sunday)
Time slots per day (Morning, Afternoon, Evening)
Can set as "Flexible" or specific hours



Part E: Portfolio (Optional for Approval)

Add portfolio projects:

Project title
Description
Service category
Upload photos (up to 10 per project)
Upload videos (up to 3 per project)
Completion date (month/year)
Optional: Enter client email for verification



Important: Portfolio not required for approval, but strongly encouraged
Step 5: Submit for Approval

Handyman reviews all information
Clicks "Submit for Admin Approval"
Profile goes to "Pending Approval" status
Cannot see leads or purchase until approved

Step 6: Admin Review

Admin sees handyman in approval queue
Reviews:

Profile completeness
Description quality (appropriate, professional)
Services and pricing (reasonable)
Portfolio (if provided)
Email and WhatsApp verified (checks)



Admin Decision Options:
Option A: Approve

Admin clicks "Approve"
Handyman status changes to "Approved"
Handyman receives:

Email notification: "Congratulations! Your profile is approved."
In-platform notification


Handyman can now:

Set up wallet
View matching leads
Purchase leads



Option B: Request Changes

Admin clicks "Request Changes"
Enters specific feedback:

"Please improve your description - add more details about experience"
"Please add pricing for at least 3 services"
"Please verify your WhatsApp number"


Handyman receives notification
Can edit profile and resubmit
Goes back to approval queue

Option C: Reject

Admin clicks "Reject"
Enters detailed reason
Handyman receives notification
Account flagged
Cannot reapply for 6 months (fraud prevention)

Step 7: Wallet Setup (After Approval)

Handyman redirected to wallet setup
Must add minimum 300 MXN to start (after first free week)
Payment methods:

Credit/debit card (save for auto-reload)
OXXO payment
Bank transfer (SPEI)



Step 8: Weekly Budget Configuration

Handyman sets weekly budget limit
Minimum: 300 MXN per week
Maximum: Unlimited (or handyman sets own cap)
Can pause lead purchases anytime
Can adjust budget weekly

Step 9: First Week Free

New handymen get first 7 days of free leads
No limit on number of leads during free week
After 7 days:

Must have minimum 300 MXN in wallet
Weekly budget rule applies



Step 10: Active Handyman

Status: "Approved" and "Active"
Appears in client search results
Receives lead notifications
Can purchase leads
Can build portfolio
Can receive reviews

3.5 Portfolio Verification Flow
Flow Name: Client Verifies Handyman's Portfolio Work
Entry Point: Handyman adds portfolio project with client email
Success Criteria: Client confirms work was done for them
Step 1: Handyman Creates Portfolio Entry

Handyman logged in, goes to Profile > Portfolio
Clicks "Add New Project"
Fills out project form:

Project title (e.g., "Kitchen Plumbing Repair")
Description (what was done)
Service category
Completion date
Upload photos
Upload videos (optional)


Optional but powerful: "Enter client email for verification"
Handyman enters: client@example.com
Submits portfolio project

Step 2: Verification Request Sent

System sends email to client@example.com:

Subject: "Verify your service experience with [Handyman Name] on TrustMe"
Body:
"Hi,
[Handyman Name] has added a project to their TrustMe portfolio and indicated you were the client for this work:
Project: [Project Title]
Service: [Category]
Date: [Month/Year]
[Photo thumbnail]
This work was done for you? Please verify to help build trust on our platform.
[View Project & Verify]
If you don't recognize this work, please let us know.
Thanks,
TrustMe Team"
Step 3: Client Receives Email

Client clicks "View Project & Verify"
Redirected to TrustMe verification page

Scenario A: Client Already Has Account

Logs in
Views full portfolio project details
Sees all photos and description

Scenario B: Client Is New

Prompted to create account (quick signup)
Can verify without full account (guest verification)
Or register to fully participate

Step 4: Client Verification Decision
Option A: Verify - Confirm Work

Client clicks "Yes, this work was done for me"
Optional: Rate the work (1-5 stars)
Optional: Add comment
Submits verification
Portfolio project marked: "✓ Verified by Client"
Handyman receives notification: "Client verified your portfolio project!"

Option B: Decline - Not Recognized

Client clicks "No, I don't recognize this work"
Optional: Add reason
Submits decline
Admin receives alert for potential fraud
Portfolio project marked: "⚠ Verification declined"
Admin reviews and may contact both parties

Option C: No Response

Client never responds to email
After 7 days: Portfolio project remains "Pending Verification"
Shown on handyman profile as: "🕐 Verification Pending"
Still visible, but less trustworthy than verified projects

Step 5: Portfolio Display Rules
Verified Projects:

Display prominently with green checkmark
"✓ Verified by Client" badge
Higher weight in search ranking algorithm
Client name shown (with permission) or anonymous "Verified Client"

Pending Verification:

Still displayed
"🕐 Pending Verification" badge
Lower weight in ranking
Client email not shown publicly

Declined Verification:

Hidden from public profile
Admin review required
May result in handyman account review if multiple declines

Admin Dashboard View:

Track verification rate per handyman
Flag handymen with multiple declined verifications
Monitor for fraud patterns

3.6 Review and Rating Flow
Flow Name: Client Reviews Completed Service
Entry Point: Service marked complete by both parties
Success Criteria: Client submits detailed review
Step 1: Review Trigger

Both handyman and client marked job as "Complete"
5-day escrow period countdown started
Client receives notification: "How was your experience with [Handyman]?"

Step 2: Review Prompt Timing
Immediate After Completion:

In-platform banner: "Review [Handyman Name]"
Email reminder sent

If Not Reviewed After 3 Days:

Follow-up email
In-platform notification

If Not Reviewed After 7 Days:

Final email reminder

Strong Incentive: Review Before Next Search

If client tries to search for new service
System prompts: "Please help grow our community by reviewing your last service"
Modal blocks next search until review submitted
Can skip after 30 days (auto-expires)

Step 3: Review Form (Comprehensive)
Overall Rating (Required):

1-5 stars
Large star display

Review Title (Required):

Brief summary (e.g., "Excellent plumbing work" or "Very professional")
10-100 characters

Detailed Description (Required):

Text area (100-1000 characters)
Questions to guide client:

How was the quality of work?
Was the handyman professional?
Did they arrive on time?
Would you recommend them?



Specific Ratings (Optional but Encouraged):

Quality of Work (1-5 stars)
Communication (1-5 stars)
Punctuality (1-5 stars)
Professionalism (1-5 stars)
Value for Money (1-5 stars)

Would You Recommend? (Required):

Checkbox: "☑ Yes, I would recommend to others"

Would You Hire Again? (Required):

Checkbox: "☑ Yes, I would hire them again"

Upload Photos (Optional but Encouraged):

Up to 10 photos of completed work
Helps future clients see quality
Before/after photos especially valuable

Photo Upload UI:

Drag-and-drop area
"Show off the great work!"
Photo thumbnails with delete option
Auto-compress large photos

Step 4: Review Submission

Client clicks "Submit Review"
Confirmation message: "Thank you for your review!"
Review published immediately
Handyman receives notification: "New review received"

Step 5: Review Display on Handyman Profile
Review Card Shows:

Client name (or anonymous if preferred)
Overall star rating (large)
Review title
Review date
Detailed description
Specific ratings (if provided)
Recommendation badges:

✓ Would recommend
✓ Would hire again


Photos of completed work
Handyman response (if provided)

Sorting Options:

Most recent first (default)
Highest rated first
Lowest rated first
Most helpful (future: upvote system)

Step 6: Handyman Response

Handyman can respond to each review
Response shown under review
Character limit: 500 characters
Best practices shown:

Thank the client
Address any concerns
Stay professional
Don't ask to change review



Example Response:
"Thank you for the wonderful review! It was a pleasure working on your kitchen plumbing. I'm glad you're satisfied with the results. Looking forward to helping you with any future needs!"
Step 7: Review Moderation
Fake Review Prevention:

Reviews only from completed Stripe payments (verified transactions)
Both parties must confirm service completion
Admin can flag suspicious reviews
Users can report fake reviews:

"Report this review" button
Reason selection (fake, inappropriate, spam)
Admin investigates



Admin Review Actions:

Investigate reported reviews
Request evidence from client
Can remove if fraudulent
Can suspend users for review manipulation
Track patterns (multiple fake reviews)

Step 8: Review Impact
On Handyman Profile:

Average rating updated in real-time
Review count increased
Recent reviews displayed prominently
All reviews archived and searchable

On Search Results:

Handyman ranking affected by:

Average star rating
Number of reviews
Recent reviews (last 30 days weighted more)
Recommendation rate (% who would recommend)



On Platform Trust:

More reviews = more trust
Verified reviews build credibility
Poor reviews visible (transparency)
Response shows professionalism

3.7 Payment Escrow and Dispute Flow
Flow Name: Secure Payment with Escrow Protection
Entry Point: Handyman sends payment request
Success Criteria: Payment completed, funds released, or dispute resolved
Step 1: Payment Request Creation

Handyman and client agreed on price in chat
Handyman clicks "Send Payment Request"
Payment request form:

Service description (from job details, editable)
Agreed amount (in MXN)
Expected service date
Any terms/notes


Handyman submits request
Status: "Payment Pending"

Step 2: Client Receives Payment Request

In-platform notification: "Payment request from [Handyman]"
Email with payment link
WhatsApp notification (Phase 3)

Client Views Payment Request Details:

Service description
Amount breakdown:

Service price: [Amount] MXN
Stripe processing fee: ~3% + fees
Total to pay: [Amount + fees] MXN


Expected service date
Handyman profile (click to review)

Step 3: Client Payment Decision
Option A: Pay Now

Client clicks "Pay with Card"
Redirected to Stripe Checkout
Enters card details (or uses saved card)
Confirms payment

Stripe Process:

Client charged: [Amount + Stripe fees]
Money goes to TrustMe Stripe Connect account (escrow)
Status: "Payment Received - In Escrow"
Both parties notified

Option B: Decline Request

Client clicks "Decline"
Must provide reason (optional)
Request cancelled
Both parties notified
Can negotiate new price in chat

Option C: Request Changes

Client messages handyman: "Can we adjust to [new amount]?"
Handyman creates new payment request
Repeat process

Step 4: Service Delivery Period

Payment in escrow
Service date arrives
Handyman performs work
Client receives service
Communication continues in chat

Step 5: Service Completion - Dual Confirmation
Handyman Initiates:

Handyman clicks "Mark Service as Complete"
Optional: Upload completion photos
Client receives notification: "Confirm service completion"

Client Confirms:

Client views completion notification
Options:

"Yes, service is complete and satisfactory"
"No, there are issues I want to address"



Scenario A: Client Confirms (Happy Path)

Client clicks "Yes, service is complete"
Optional: Provide feedback
Status changes to: "Complete - 5 Day Hold"
5-day countdown starts
Both parties notified

Escrow Timeline:

Days 1-5: Money held in escrow

Protects client if hidden issues appear
Allows time for any problems to surface


Day 6: Money automatically released to handyman's wallet

Scenario B: Client Reports Issues

Client clicks "No, there are issues"
Opens issue report form:

What's the problem?
Upload photos of issue
Desired resolution (re-do, partial refund, full refund)


Submits report
Status: "Disputed"

Step 6: Dispute Resolution Process
Initial Notification:

Customer Support receives alert
Handyman notified of dispute
Payment remains in escrow (frozen)

Customer Support Review:

Reads full chat history
Reviews issue report
Views completion photos
Checks service details

Customer Support Contacts Both Parties:

To Client: "Tell us more about the issue"
To Handyman: "Please respond to client's concerns"

Both Parties Provide Evidence:

Chat messages
Photos
Videos
Previous agreements

Customer Support Decision (Within 48-72 Hours):
Option 1: Full Refund to Client

Service deemed unsatisfactory
Money returned to client
Handyman receives explanation
Incident noted on handyman record

Option 2: Partial Refund

Work partially completed or quality issue
E.g., 50% refund to client, 50% to handyman
Both parties notified

Option 3: Payment to Handyman

Client complaint not justified
Work meets standards
Money released to handyman
Client notified

Option 4: Require Re-Do

Handyman must fix issues
After fixing, payment released
Extended escrow period

Both Parties Can Appeal:

If disagree with decision
Admin (higher authority) reviews
Final decision made
Cannot appeal Admin decision

Step 7: Payment Release (No Dispute)

5 days pass after completion
No issues reported
System automatically:

Transfers money from escrow to handyman wallet
Handyman notified: "Payment released: [Amount] MXN"
Transaction complete



Step 8: Handyman Withdrawal

Money now in handyman's TrustMe wallet
Can withdraw to bank account:

Enter bank details (one-time setup)
Minimum withdrawal: 100 MXN
Withdrawal fee: 0 MXN (free)
Processing time: 1-2 business days



Or:

Keep in wallet for future lead purchases
Auto-reload when balance low
