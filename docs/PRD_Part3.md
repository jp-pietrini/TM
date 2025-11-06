Pause Lead Purchases:

Toggle: "Pause Lead Notifications"
When enabled:

Stop receiving lead notifications
Profile still visible in search (clients can send leads)
Cannot purchase leads until resumed
Wallet balance preserved


Use case: Vacation, too busy, taking a break
Can resume anytime

Withdraw Funds (Future Feature):

Button: "Withdraw to Bank Account"
Shows current balance
Enter withdrawal amount
Minimum: 100 MXN
Maximum: Current balance
Bank account setup:

CLABE (18 digits)
Account holder name
Bank name
Confirmation via email


Withdrawal fee: 0 MXN (free)
Processing time: 1-2 business days
Email confirmation sent when processed

Low Balance Warnings:
When Balance < 200 MXN:

In-platform notification: "💰 Low balance. Add funds to continue receiving leads."
Email sent: "Your TrustMe wallet balance is low"
Dashboard banner with "Add Funds" button

When Balance < 100 MXN:

Cannot purchase new leads
Warning: "Insufficient balance. Add at least 100 MXN to purchase leads."
Redirect to Add Funds page when trying to purchase

Weekly Budget Reached:
When Spent = Weekly Limit:

Cannot purchase new leads
Warning: "Weekly budget reached. Increase budget or wait until Monday."
Options shown:

Increase Budget (opens adjustment modal)
Wait Until Monday (shows countdown)
Pause Notifications (temporarily stop receiving alerts)



Budget Reset Notification:

Every Monday at 00:00:

System resets weekly spent to 0 MXN
In-platform notification: "✨ Weekly budget reset! You have 500 MXN for this week."
Email notification (optional, user preference)



4.6 Customer Support Dashboard
Feature Name: Customer Support Operations Interface
Purpose: Enable founders to manage support tickets, disputes, and user issues
Dashboard Access:

URL: /support/dashboard
Only accessible by users with role: "Customer Support" or "Admin"

Dashboard Layout:
Top Navigation:

TrustMe logo
"Customer Support" title
Notification bell (new tickets count)
User menu (logout)

Main Tabs:

Support Tickets (Active)
Disputes
Flagged Conversations
User Lookup
Knowledge Base (future)


Tab 1: Support Tickets
Purpose: Handle user questions and technical issues
Ticket Queue View:
Filters (Top Bar):

Status: Open / In Progress / Waiting on User / Resolved
Priority: All / Urgent / High / Medium / Low
Category: Technical / Account / Policy / Guidance / Payment / Other
Assigned to: Me / Unassigned / All

Queue Stats:

Open Tickets: 8
In Progress: 5
Waiting on User: 3
Avg Response Time: 45 minutes

Ticket List Table:
Ref #FromSubjectCategoryPriorityStatusLast UpdateAssigned#TM-001Juan Pérez (Client)Can't upload photosTechnicalMediumOpen10 min agoUnassigned#TM-002Ana García (Handyman)How to verify portfolio?GuidanceLowIn Progress2 hours agoYou
Click on Ticket:

Opens ticket detail view (right panel or full page)

Ticket Detail View:
Header:

Reference Number: #TM-001 (large, prominent)
From: Juan Pérez (Client)

Link to user profile
User ID: 12345


Status: Open (dropdown to change)
Priority: Medium (dropdown to change)
Category: Technical (dropdown to change)
Created: Nov 5, 2024 - 3:15 PM
Last Updated: Nov 5, 2024 - 3:25 PM
Assigned to: Unassigned (dropdown: Assign to Me / Other Support Agent)

Original Ticket:

Subject: Can't upload photos
Description:
"Hi, I'm trying to upload photos for my lead but I keep getting an error message. It says 'File too large' but my photos are only 2MB each. Please help!"
Attachments (if any):

screenshot.png (view/download)



User Context (Sidebar):

User type: Client
Member since: Oct 2024
Leads created: 2
Total spent: 200 MXN (2 lead purchases)
Reviews left: 1
Disputes: 0
Quick link: View Full Profile

Conversation Thread:

All messages between support and user
Chronological (newest at bottom)
Support messages: Right-aligned, blue
User messages: Left-aligned, gray
Timestamps under each message
Internal notes (only visible to support): Yellow background

Reply to User:

Text area: "Type your response..."
Options:

Send to User (visible to user)
Add Internal Note (only support team sees)


Attach file option
Canned responses dropdown:

"Thank you for contacting us..."
"We're looking into this issue..."
"Your issue has been resolved..."
(customizable templates)



Actions Menu:

Mark as Resolved
Escalate to Admin
Flag for Review
Merge with Another Ticket (if duplicate)
Close Ticket

Example Support Response:
"Hi Juan, thank you for reaching out! I see the issue. Our current file size limit is 5MB per photo, so your 2MB photos should work. Let me check if there's a technical issue on our end.
Can you please try the following:

Clear your browser cache
Try a different browser (Chrome, Safari)
Make sure your internet connection is stable

If the issue persists, please send me the exact error message you're seeing.
Thanks!"
Follow-Up:

User responds
Support continues conversation
When resolved:

Mark as Resolved
Optional: Send satisfaction survey
Ticket closed but archived (can reopen if user replies)




Tab 2: Disputes
Purpose: Mediate payment disputes between clients and handymen
Dispute Queue View:
Filters:

Status: Open / In Progress / Resolved / Escalated
Priority: Critical / High / Medium / Low
Type: Payment / Quality / No-Show / Fraud / Other
Age: < 24h / 24-48h / > 48h

Queue Stats:

Active Disputes: 3
Resolved Today: 2
Avg Resolution Time: 18 hours
Money in Escrow (Total): 5,600 MXN

Dispute List:
Ref #ClientHandymanServiceAmountTypePriorityStatusOpened#DIS-101María LópezJuan PérezPlumbing800 MXNQualityHighOpen2 hours ago
Click on Dispute:

Opens dispute detail view

Dispute Detail View:
Header:

Reference: #DIS-101
Status: Open (In Progress / Resolved / Escalated)
Priority: High (Critical / Medium / Low)
Opened: Nov 5, 2024 - 1:30 PM
SLA Deadline: Nov 7, 2024 - 1:30 PM (48 hours for High)
Assigned to: You

Parties Involved:

Client: María López

User ID: 45678
View Profile link
Contact: email, phone


Handyman: Juan Pérez

User ID: 12345
View Profile link
Contact: email, phone



Service Details:

Service: Plumbing - Leak Repair
Lead ID: #LEAD-789
Booking ID: #BOOK-456
Service Date: Nov 3, 2024
Payment Amount: 800 MXN
Payment Status: In Escrow (held since Nov 3)
Escrow Day: Day 2 of 5

Dispute Information:

Type: Quality Issue
Raised by: Client (María López)
Date Raised: Nov 5, 2024 - 1:30 PM
Client's Issue:
"The handyman fixed the leak, but it started leaking again after 24 hours. He said he would come back but hasn't responded to my messages. I want a refund or for him to fix it properly."
Client's Desired Resolution: Partial refund or re-do work
Evidence Uploaded by Client:

Photo 1: Leak still dripping
Photo 2: Message screenshot (handyman's last message)



Full Chat History:

Support can read entire conversation between client and handyman
All messages visible (with timestamps)
Can see when handyman last responded
Can identify communication breakdowns

Handyman's Response (If Any):

Handyman receives notification of dispute
Can provide their side:
"I did fix the leak properly. It's possible a different pipe is now leaking. I told the client I would come back on Nov 6 (tomorrow) but she filed a dispute immediately. I'm willing to go back and check."

Support Investigation:
Internal Notes (Support Team Only):

Support can add notes:
"Reviewed chat history. Handyman did promise to return on Nov 6. Client may have raised dispute prematurely. Will contact both parties."

Actions Available:

Contact Client (send message)
Contact Handyman (send message)
Request Additional Evidence (from either party)
Schedule Call (with one or both parties)
View Original Lead Details
View Payment Transaction
View Booking Details

Resolution Options:
1. Full Refund to Client:

800 MXN returned to client
Handyman receives 0 MXN
Reason: Service not satisfactory
Note added to handyman's record
Client notified
Handyman notified
Dispute marked: Resolved (Client Favor)

2. Partial Refund:

Example: 400 MXN to client, 400 MXN to handyman
Reason: Work partially done or partially at fault
Both parties notified
Dispute marked: Resolved (Partial)

3. Payment to Handyman:

800 MXN released to handyman
Client receives 0 MXN refund
Reason: Handyman did work properly, client complaint unjustified
Both notified
Dispute marked: Resolved (Handyman Favor)

4. Require Re-Do:

Handyman must return and fix issue
Payment remains in escrow until re-do complete
Client and handyman both agree
New deadline set
Escrow extended
After re-do: Payment released to handyman
Dispute marked: Resolved (Re-Done)

5. Escalate to Admin:

Complex case requiring higher authority
Admin receives notification
Support provides summary and recommendation
Admin makes final decision
Dispute marked: Escalated

Example Support Resolution Message:
To Client:
"Hi María, thank you for your patience. I've reviewed your dispute and spoken with the handyman. He is willing to return tomorrow (Nov 6) as originally agreed to inspect and fix the issue. I've confirmed with him that he will prioritize your service.
I recommend giving him this opportunity to make it right. If the issue is not resolved after his visit, we will issue a full refund.
Does this work for you?"
To Handyman:
"Hi Juan, I've reviewed the dispute raised by María. She's concerned because the leak reappeared. I see you offered to return on Nov 6. Please prioritize this visit and ensure the issue is fully resolved. If you cannot visit tomorrow, please let me know immediately.
This is important for your reputation on the platform. Thank you for your cooperation."
Outcome:

Handyman visits on Nov 6
Fixes issue completely
Client confirms satisfaction
Payment released to handyman
Dispute marked: Resolved
Both parties leave notes

Support Documentation:

Support adds final notes:
"Dispute resolved amicably. Handyman returned and fixed issue. Client satisfied. No refund issued. Payment released to handyman on Nov 6."


Tab 3: Flagged Conversations
Purpose: Review conversations flagged by users for inappropriate content
Flagged Conversation List:
Filters:

Status: Pending Review / Under Review / Resolved / Dismissed
Flagged by: Client / Handyman
Reason: Inappropriate Content / Spam / Harassment / Scam / Other

List View:
Ref #ConversationFlagged ByReasonDate FlaggedStatusAssigned#FLAG-201María López ↔ Juan PérezMaría López (Client)HarassmentNov 5, 2024PendingUnassigned
Click on Flag:

Opens conversation review view

Conversation Review:
Header:

Flag Reference: #FLAG-201
Flagged By: María López (Client)
Reason: Harassment
Date Flagged: Nov 5, 2024 - 4:00 PM
Status: Pending Review

Parties:

Client: María López (User ID: 45678)
Handyman: Juan Pérez (User ID: 12345)

Flag Details:

User's Report:
"This handyman is sending inappropriate messages and asking for my personal address before I even agreed to hire him. I feel uncomfortable."
Flagged Messages: (User can select specific messages)

Message 1: "Can you send me your exact address so I can come by tonight?"
Message 2: "Why aren't you responding? I'm available now."



Full Conversation History:

Support reads entire chat from beginning
Flagged messages highlighted in red
Context before and after

Support Review:

Support assesses if content is actually inappropriate
Checks platform policies (terms of service)
Determines severity

Actions:
1. Dismiss Flag:

Reason: Not actually inappropriate or policy violation
Example: Handyman asking for address after client agreed to hire (legitimate)
User who flagged notified: "We've reviewed your report. The content does not violate our policies."

2. Warn User:

Send warning message to offending user
Example: "Your messages have been flagged for inappropriate content. Please be professional in your communications."
Warning logged in user's record
If multiple warnings: Escalate to admin for possible suspension

3. Suspend User:

Serious violation (harassment, scam attempt)
Support recommends suspension to admin
Admin makes final decision
User account temporarily suspended
Both parties notified

4. Remove Content:

Delete specific messages
Notify user: "Your message violated our policy and has been removed."
Document action

5. Ban User:

Extreme case (repeated violations, clear scam)
Escalate to admin
Admin bans user permanently

Support Internal Notes:
"Reviewed conversation. Handyman's messages do appear pushy and requesting address before any agreement. Issued warning to handyman. Advised client to not share personal info until formal booking. Monitoring handyman's future interactions."

Tab 4: User Lookup
Purpose: Quickly find user profiles and view key info
Search Interface:

Search bar: "Enter name, email, phone, or user ID"
Autocomplete suggestions as typing
Filters: User Type (Client / Handyman / All)

Search Results:

List of matching users
Each result shows:

Profile photo
Name
User ID
User type (Client / Handyman)
Member since
Status (Active / Suspended / Banned)
Quick actions: View Profile / View Activity / Contact



User Detail View (Support Perspective):
Profile Summary:

Full profile info (same as user sees)
Plus support-only info:

Email (always visible)
WhatsApp (always visible)
IP address history (fraud detection)
Device information
Account creation date
Last login date



Activity Summary:

For Clients:

Leads created: count
Handymen contacted: count
Services paid for: count
Reviews left: count
Disputes raised: count


For Handymen:

Leads purchased: count
Total spent: amount
Services completed: count
Reviews received: avg rating
Disputes involved: count



Support Actions:

Send Message (email)
Call User (click-to-call)
View All Tickets (from this user)
View All Disputes (involving this user)
View All Transactions
Flag for Admin Review
Suspend Account (request admin approval)

Support Notes:

Internal notes about user
Only visible to support team and admins
Can add new notes
History of all notes

Example Note:
"User called on Nov 5 regarding payment issue. Resolved by issuing partial refund. User satisfied. No further action needed. -Maria (Support)"

Reference Number System:
Format:

Support Tickets: #TM-XXXXX (TM = TrustMe)
Disputes: #DIS-XXXXX
Flagged Conversations: #FLAG-XXXXX

Sequential Numbering:

Starts at 00001
Increments for each new ticket/dispute
Unique across platform
Never reused

Searchable:

Enter reference number in search bar
Instantly pulls up ticket/dispute
Available to both support and users

Displayed:

In all communications (emails, notifications)
In dashboard
In user's support history
In chat conversations

Example Email Subject:
"TrustMe Support - Ticket #TM-00145 - Can't upload photos"

Support Metrics Dashboard:
Available on Main Dashboard:

Response Time:

Average time to first response
Average time to resolution
Target: < 2 hours first response, < 24 hours resolution


Ticket Volume:

Tickets opened today / this week / this month
Trend graph


Resolution Rate:

% of tickets resolved within SLA
% of disputes resolved without escalation


User Satisfaction:

Average satisfaction rating (from post-resolution surveys)
% of users who would recommend support


Active Cases:

Open tickets
Active disputes
Pending flags




This Customer Support Dashboard enables founders to:

Handle user questions efficiently with ticket system
Resolve payment disputes fairly with full context
Moderate platform content through flagged conversations
Look up user information quickly for any inquiry
Track performance metrics to improve support quality

All with professional reference numbering and comprehensive documentation.

5. Business Logic & Rules
5.1 Lead Pricing and Purchasing Rules
Lead Base Price:

Default: 100 MXN per lead
Dynamic pricing capability (future):

Higher for urgent leads
Higher for high-demand services
Lower for off-peak times
Variable by service category



Lead Non-Exclusivity:

Client can send lead to minimum 1, maximum 6 handymen
Each selected handyman can purchase same lead for 100 MXN
Example: Client sends to 3 handymen → All 3 can buy for 100 MXN each → Platform earns 300 MXN from one lead
Handymen are informed how many others received the lead

Information Visibility Tiers:
Before Purchase:

Handyman sees:

Service category and subcategory
Detailed job description
All photos and videos
Budget range (if provided)
Location (zone level only, e.g., "Roma Norte")
Urgency level
Timeline/deadline
Availability requirements
Number of other handymen who received lead
If client is new or returning (and their review history)


Handyman CANNOT see:

Client name
Client email
Client WhatsApp number
Exact address (street, number)



After Purchase (But Before Client Response):

Chat opens between handyman and client
Handyman can now see:

Client first name (e.g., "María")
Chat interface


Handyman still CANNOT see:

Full name
Email
WhatsApp
Exact address


Handyman sends first message to initiate contact

After Client Responds to First Message:

Contact information becomes fully visible:

Full client name
Email address
WhatsApp number (clickable link in chat header)
Exact address (for service delivery)


Lead becomes non-refundable at this point

Lead Purchase Requirements:
Wallet Balance:

Must have at least 100 MXN in wallet
If balance < 100 MXN: Cannot purchase lead
System blocks purchase and prompts to add funds

Weekly Budget:

Must not have exceeded weekly spending limit
Example: Budget 500 MXN/week, spent 400 MXN

Can purchase 1 more lead (100 MXN)
Cannot purchase 2 more leads (would exceed budget)


If budget reached: Cannot purchase until next Monday or until budget increased

First Week Free:

New handymen get 7 days of free leads
No wallet balance required during free week
No limit on number of leads
After 7 days: Normal pricing and wallet requirements apply

Lead Purchase Transaction:

Handyman clicks "Buy Lead - 100 MXN"
System checks: Balance OK? Budget OK?
If yes: Instant deduction from wallet
Transaction recorded with timestamp
Chat opens immediately
Notification sent: "Lead purchased successfully"
