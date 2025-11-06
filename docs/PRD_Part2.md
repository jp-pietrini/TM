3.8 Wallet and Budget Management Flow
Flow Name: Handyman Manages Wallet and Weekly Budget
Entry Point: Approved handyman sets up wallet
Success Criteria: Sustainable lead purchasing system
Step 1: Initial Wallet Setup

New handyman (just approved) sees: "Set up your wallet to start receiving leads"
Clicks "Set Up Wallet"
Redirected to wallet page

Step 2: First Deposit Options
Payment Methods:
1. Credit/Debit Card (Immediate):

Enter card details
Save for future auto-reload
Instant balance update

2. OXXO Payment (1-2 Hours):

Generate OXXO voucher
Print or show barcode at OXXO store
Pay in cash
Balance updates within 1-2 hours

3. Bank Transfer (SPEI) (Minutes):

System generates unique reference number
Transfer from online banking
Balance updates within minutes
No fees

Minimum Initial Deposit:

300 MXN minimum
But remember: First week is FREE (no charge for leads)
After first week: Must maintain 300 MXN minimum

Step 3: Weekly Budget Configuration
Weekly Budget Purpose:

Control spending on leads
Prevents overspending
Predictable costs

Budget Setup Screen:

"Set your weekly lead budget"
Slider: 300 MXN to 3,000 MXN (or custom)
Explanation: "This is the maximum you'll spend on leads per week"
Weekly reset: Every Monday at 00:00

Recommended Budgets Shown:

Conservative: 300 MXN/week (3 leads)
Moderate: 700 MXN/week (7 leads)
Aggressive: 1,500 MXN/week (15 leads)
Custom: Enter own amount

Budget Behavior:

Handyman sets: 500 MXN/week
Buys leads Monday-Friday: 400 MXN spent
Budget remaining: 100 MXN
Can buy 1 more lead this week
Monday: Budget resets to 500 MXN

Step 4: First Week Free Period
New Handyman Experience:

Wallet balance: 0 MXN (or any amount)
Weekly budget: Set (e.g., 500 MXN)
But leads are FREE for first 7 days
Countdown shown: "5 days left in free trial"

During Free Week:

All lead purchases are 0 MXN
No deduction from wallet
Still counts toward weekly budget tracking (for learning)
Can buy unlimited leads (no cap)

Free Week Ends:

Day 8 arrives
System notification: "Free week ended. Lead purchases now cost 100 MXN each."
If wallet balance < 300 MXN:

Must add funds to continue
Cannot purchase leads until balance ≥ 300 MXN



Step 5: Lead Purchase Deduction

Handyman clicks "Buy Lead - 100 MXN"
System checks:

Wallet balance ≥ 100 MXN? ✓
Weekly budget not exceeded? ✓
Proceed with purchase


Deduction occurs:

Wallet balance: 500 MXN → 400 MXN
Weekly spent: 200 MXN → 300 MXN
Weekly remaining: 200 MXN → 100 MXN


Transaction recorded:

Date/time
Lead ID
Amount: 100 MXN
Status: Purchased



Step 6: Low Balance Warning

Wallet balance drops below 200 MXN
System sends alert: "Low wallet balance. Add funds soon."
Email and in-platform notification
Link to add funds

Step 7: Weekly Budget Reached

Handyman spent 500 MXN (budget limit)
Tries to buy another lead
System blocks: "Weekly budget reached. Increase budget or wait until Monday."

Options Shown:

Wait: Leads resume Monday
Increase Budget: Adjust to 700 MXN/week
Pause Lead Purchases: Stop receiving notifications

Step 8: Auto-Reload (Optional)

Handyman can enable: "Auto-reload when balance < 200 MXN"
Set reload amount: 500 MXN
Uses saved card
Automatic, no manual intervention
Notification sent when reload occurs

Step 9: Refund Handling

Client didn't respond to lead (48 hours passed)
System issues refund: 100 MXN
Wallet balance: 400 MXN → 500 MXN
Weekly spent: 300 MXN → 200 MXN (credit back)
Notification: "Refund issued: 100 MXN (unresponsive client)"

Step 10: Wallet Dashboard
Always Visible:

Current Balance: 450 MXN (large, prominent)
This Week's Spending: 300 MXN / 500 MXN (progress bar)
Remaining This Week: 200 MXN
Quick Actions:

Add Funds
Adjust Budget
Pause Leads
Withdraw Funds
Transaction History



Transaction History:

All lead purchases (date, lead ID, amount)
All refunds (date, reason, amount)
All deposits (date, method, amount)
All withdrawals (date, amount, status)
Downloadable CSV

Step 11: Budget Adjustment

Handyman clicks "Adjust Budget"
Current: 500 MXN/week
Slider to change: 300 MXN - 3,000 MXN
Confirm new budget: 700 MXN/week
Takes effect: Next Monday (or immediately if increasing)

Step 12: Pause Lead Purchases

Handyman taking vacation or too busy
Clicks "Pause Lead Purchases"
Confirmation: "You will not receive lead notifications until resumed"
Profile still visible in search
Can resume anytime
Wallet balance preserved


4. Feature Specifications
4.1 Search and Discovery
Feature Name: Intelligent Handyman Search
Purpose: Help clients find perfect handyman based on multiple criteria
Search Input Fields:
1. Service Category (Required):

Dropdown with all categories
Plomería, Electricidad, Pintura, etc.
Icons next to each category
Once selected, shows subcategories

2. Subcategory (Required):

Based on selected category
Multiple checkboxes (can select multiple)
E.g., for Plomería: Leak repairs, Drain unclogging, Faucet replacement

3. Service Area (Optional):

Further refinement within subcategory
E.g., for Leak repairs: Kitchen, Bathroom, Exterior

4. Location (Required):

Two options:

Select zone from dropdown (Polanco, Roma Norte, etc.)
Enter zip code (auto-detects zone)


Used for distance calculation

5. Availability (Optional):

Matrix selection:

Days: Monday - Sunday (checkboxes)
Time slots: Morning (6am-12pm), Afternoon (12pm-6pm), Evening (6pm-10pm)


E.g., "I need someone available Tuesday afternoon"

6. Urgency Level:

Radio buttons:

Regular (within a week)
Soon (within 2-3 days)
Urgent (today or tomorrow)
Emergency (immediate)



Search Algorithm (Ranking Handymen):
Factors Considered:

Service Match (40%):

Handyman offers exact category/subcategory
Has completed similar jobs before
Portfolio shows relevant work


Distance (25%):

Calculated from job location to handyman location
Closer = higher rank
Distance shown in km


Rating (15%):

Average star rating (0-5)
Higher rating = higher rank
Minimum 3 reviews to be weighted


Availability Match (10%):

Handyman's availability overlaps with client's needs
Perfect match = boost
No match = no penalty (client may be flexible)


Response Time (5%):

Average time handyman takes to respond to messages
Faster = higher rank
Calculated from past chats


Price Competitiveness (5%):

Handyman's rates compared to category average
Not necessarily lowest, but reasonable



Combined Score:

Each handyman gets score 0-100
Sorted by score (highest first)
Ties broken by most recent activity

Search Results Display:
List View (Default):

Scrollable list of handyman cards
Similar to Amazon product listings
Each card shows:

Profile photo (left)
Name and verification badge
Star rating + number of reviews
Distance from job location
Brief description (first 100 characters)
Service categories (tags)
Price range ("From 200 MXN/hour")
Number of completed tasks
"View Profile" button
"Request Service" button (quick action)



Grid View (Optional):

Toggle to grid layout
More cards visible at once
Slightly less info per card

Filters (Sidebar or Top Bar):
Price Range:

Slider: 0 MXN - 2,000 MXN per service
Filters by handyman's stated pricing

Minimum Rating:

Dropdown: Any, 3+, 4+, 4.5+
Only show handymen meeting threshold

Distance Radius:

Slider: 1 km - 20 km
Within X km of job location

Verification Badge:

Checkbox: "Verified only"
Shows only admin-approved handymen

Number of Completed Tasks:

Dropdown: Any, 5+, 10+, 25+, 50+
Experience filter

Service Type (Future):

Individual workers
Companies
Both

Sort Options:
Default: Best Match (algorithm score)
Other Options:

Distance (closest first)
Rating (highest first)
Price (lowest first)
Most Reviews
Most Recent Activity

No Results Scenario:

If no handymen match filters:

"No handymen found matching your criteria"
Suggestions:

"Expand distance radius"
"Remove some filters"
"Try different service category"


Option to "Post as Open Lead" (future: handymen come to you)



Search Tracking (Analytics):

Log every search:

Category searched
Filters applied
Number of results
Which handymen viewed
Which handymen selected
Conversion rate (search → lead created)



4.2 Profile System
Feature Name: Handyman Public Profile
Purpose: Showcase handyman's services, experience, and credibility
Profile URL Structure:

trustme.mx/handyman/[unique-id]
E.g., trustme.mx/handyman/juan-perez-plomero-123
SEO-friendly URL with name + ID

Profile Sections:
1. Header Section:

Profile photo (large, circular, 200x200px)
Full name (H1)
Verification badges:

✓ ID Verified (future)
✓ Admin Approved
✓ Email Verified
✓ WhatsApp Verified


Star rating (large, e.g., ⭐ 4.8 / 5.0)
Number of reviews (e.g., "(127 reviews)")
Number of completed tasks (e.g., "85 tasks completed")
Member since date (e.g., "Member since March 2024")
Response time (e.g., "Responds within 2 hours")
Location (zones served): "Polanco, Roma Norte, Condesa"
Distance from current search (if coming from search): "5 km away"

Quick Actions (Buttons):

"Request Service" (primary button) - Opens lead creation
"Send Message" (if already connected) - Opens chat
"Share Profile" - Copy link, share via WhatsApp, etc.

2. About / Description Section:

Professional description (20-400 characters)
Written by handyman
Should convey:

Experience
Specializations
Approach to work
Why hire them



Example:
"Professional plumber with 10 years of experience in residential and commercial projects. Specialized in leak detection, pipe installation, and bathroom remodels. I pride myself on punctuality, clear communication, and leaving every job site clean. Available for emergencies 24/7."
3. Services Offered Section:

Title: "Services & Pricing"
Table or cards showing:

Service category
Specific services
Pricing (hourly or fixed)
Minimum charge (if applicable)



Example:
ServicePriceLeak Repair300 MXN/hourDrain Unclogging400 MXN (fixed)Faucet Installation250 MXN (fixed)Bathroom Remodel500 MXN/hour

Pricing transparency builds trust
"Minimum 2 hours for all services" (if applicable)

4. Portfolio Section:

Title: "Previous Work"
Grid of portfolio projects
Each project card shows:

Primary photo (thumbnail)
Project title
Service category tag
Date completed
Verification status:

✓ Verified by Client (green badge)
🕐 Pending Verification (gray badge)


Number of photos



Click on Project:

Opens project detail modal or page
All photos in gallery (swipeable/clickable)
Videos (if uploaded)
Full project description
Service category and subcategories
Completion date
Client verification status
If verified: Client's name (anonymous option) or "Verified Client"

Portfolio Filters:

Filter by service category
Filter by verified only
Sort by date (newest/oldest)

Empty Portfolio:

If handyman has no portfolio yet:

"No projects to display yet. Check back soon!"
This is okay for new handymen
Not a red flag if they have good reviews



5. Reviews Section:

Title: "Client Reviews (127)"
Overall rating summary:

Average star rating (large): 4.8 / 5.0
Rating breakdown:

5 stars: 85 reviews (67%)
4 stars: 30 reviews (24%)
3 stars: 8 reviews (6%)
2 stars: 3 reviews (2%)
1 star: 1 review (1%)


Specific category averages:

Quality: 4.9 / 5.0
Communication: 4.8 / 5.0
Punctuality: 4.7 / 5.0
Professionalism: 4.9 / 5.0
Value: 4.6 / 5.0





Individual Reviews Display:

Each review card shows:

Client name (or anonymous)
Star rating
Review title (bolded)
Review date
"Would recommend" badge (if yes)
"Would hire again" badge (if yes)
Review description
Photos of completed work (if uploaded)
Handyman response (if provided)



Review Sorting:

Default: Most Recent
Options: Most Helpful (future), Highest Rated, Lowest Rated

Pagination:

Show 10 reviews per page
"Load More" button or pagination

Empty Reviews:

If new handyman with 0 reviews:

"No reviews yet. Be the first to hire and review!"



6. Availability Section:

Title: "Availability"
Weekly schedule displayed:

Days: Monday - Sunday
Time slots: Morning, Afternoon, Evening
Green checkmarks for available slots
Gray for unavailable



Example:
DayMorningAfternoonEveningMon✓✓✗Tue✓✓✓Wed✓✗✓

Note: "Availability shown is general schedule. Specific dates confirmed during booking."

7. Coverage Area Section:

Title: "Service Areas"
List of CDMX zones served:

Polanco
Roma Norte
Condesa
(etc.)


Map view (future):

Visual representation of coverage
Radius or polygons



8. Trust & Safety Section:

Title: "Trust & Safety"
List of verifications:

✓ Email Verified
✓ WhatsApp Verified
✓ Admin Approved
✓ ID Verified (future)
✓ Background Check (future)


Link to "How TrustMe Verifies Handymen"

9. Profile Actions Footer:

Sticky bottom bar on mobile
Always visible:

"Request Service" button (large, primary)
"Message" button (secondary, if already in contact)



Profile Edit (For Handyman):

When handyman views own profile:

"Edit Profile" button visible
Can edit:

Profile photo
Description
Services and pricing
Availability
Service areas


Cannot edit:

Reviews (only respond)
Verification badges (admin controlled)





4.3 In-Platform Chat System
Feature Name: Secure Messaging Between Client and Handyman
Purpose: Facilitate communication after lead purchase with rich media support
Chat Availability:

Chats ONLY start after handyman purchases lead
No chat before purchase (prevents free contact info sharing)
One chat per lead per handyman
Client can have multiple simultaneous chats (if sent lead to multiple handymen)

Chat Interface Layout:
Desktop View:

Left sidebar: Chat list (all active conversations)
Main area: Selected chat conversation
Right sidebar: User info (profile summary)

Mobile View:

Chat list view (default)
Tap chat → Opens full-screen conversation
Back button returns to chat list

Chat List (Sidebar/Main View):

Shows all active chats
Each chat item displays:

Other user's profile photo
Other user's name
Last message preview (truncated)
Timestamp of last message
Unread message count (badge)
Online status indicator (green dot if active)



Sorting:

Most recent message first
Unread chats pinned to top
Archived chats at bottom (future)

Search/Filter:

Search by name
Filter by: Active, Archived, Flagged (future)

Chat Conversation Interface:
Header:

Other user's profile photo
Other user's name
Click to view full profile
Online status
Actions menu (3 dots):

View Profile
Flag Conversation
Archive (future)
Delete Chat (future)


For handyman: If client responded, WhatsApp number displayed here (clickable to launch WhatsApp)

Message Thread:

Chronological display (oldest at top, newest at bottom)
Auto-scroll to newest message
Infinite scroll for history

Message Bubbles:

Sent messages: Right-aligned, blue background
Received messages: Left-aligned, gray background
Profile photo next to received messages
Timestamp under each message
Read receipts: ✓ Sent, ✓✓ Delivered, ✓✓ Read (future)

Message Types:
1. Text Messages:

Plain text
Up to 5,000 characters
URL auto-linking (clickable links)
Emoji support
Line breaks preserved

2. Image Messages:

Upload photos (JPEG, PNG)
Maximum 10 MB per image
Thumbnail in chat (click to enlarge)
Multiple images can be sent at once (gallery view)
Caption supported

3. Video Messages:

Upload videos (MP4, MOV)
Maximum 50 MB per video
Video thumbnail in chat (click to play)
In-browser player
Caption supported

4. Voice Messages:

Record voice message (in-browser microphone)
Maximum 2 minutes
Waveform visualization
Play/pause controls
Duration displayed

5. File Attachments:

Upload documents (PDF, DOCX, XLS, etc.)
Maximum 10 MB per file
File name, size, and type displayed
Download button
Preview for PDFs (future)

Message Input Box:
Text Input:

Multi-line text area
Auto-expands as user types
Shift+Enter for new line
Enter to send (desktop)
"Send" button (always visible)

Attachment Options (Icons):

📷 Photo (opens file picker filtered to images)
🎥 Video (opens file picker filtered to videos)
🎤 Voice (opens voice recorder modal)
📎 File (opens file picker for any file type)

Rich Features:
Typing Indicator:

When other user is typing: "Juan is typing..."
Animated dots
Disappears after 5 seconds of inactivity

Message Actions (Long Press/Hover):

Copy text
Delete message (only for sender, within 1 hour)
Flag message (report inappropriate content)

System Messages:

Automated messages for key events:

"Chat started - Lead purchased"
"Payment request sent"
"Service marked complete"
"Review left"


Gray background, centered, italicized
Informational only (not from user)

Notification Badge:

Dashboard shows total unread message count
Navigation bar: "Messages (5)" if 5 unread
Real-time updates (polling every 10 seconds or WebSocket future)

Contact Info Visibility Rules:
Before Client Responds:

Handyman sees:

Client first name only
Cannot see WhatsApp or email
Can send messages (not yet read by client)



After Client Responds to First Message:

Handyman sees:

Full client name
WhatsApp number (clickable in chat header)
Email (in profile sidebar)


Lead becomes non-refundable
Both parties can now communicate freely

Flag Conversation Feature:

Either party can flag conversation
Flag reasons:

Inappropriate content
Spam
Harassment
Scam attempt
Other (with description)


Flagged conversation alerts customer support
Customer support can view full conversation
Admin dashboard shows flagged conversations

Message Retention:

Chat history kept forever (unless user deletes account)
Users can delete entire chat (both sides)
Individual messages cannot be permanently deleted (edit shows "Message deleted")
Important for dispute resolution (customer support needs access)

Chat Closing/Archiving (Future):

After service complete and reviewed:

Option to "Archive Conversation"
Archived chats moved to separate list
Can be reopened if needed
Not deleted, just hidden from active list



4.4 Admin Approval Dashboard
Feature Name: Admin Queue for Handyman Approval
Purpose: Quality control before handymen appear in search
Dashboard Access:

URL: /admin/dashboard
Only accessible by users with role: "Admin"
If non-admin tries to access: Redirect to homepage

Dashboard Layout:
Top Navigation:

TrustMe logo (left)
Admin Dashboard (title)
User menu (right):

Admin profile
Settings
Logout



Sidebar Menu:

Approvals (active)

Pending Handymen (badge showing count)
Pending Companies (future)
Approval History


Users

All Users
Clients
Handymen
Flagged Users


Platform

Metrics Dashboard
Revenue Report
Fraud Alerts


Support

Flagged Conversations
Active Disputes
Support Tickets



Main Content: Pending Handymen Queue
Queue Table View:

Shows all handymen with status: "Pending Approval"
Sortable columns:

Name
Registration Date
Service Categories
Service Areas
Portfolio Items
Verification Status (Email/WhatsApp)
Actions



Example Row:
NameRegisteredCategoriesAreasPortfolioVerifiedActionsJuan PérezNov 3, 2024PlumbingRoma Norte, Polanco3 projects✓ Email, ✓ WhatsApp[Review]
Sorting:

Default: Oldest first (FIFO - first in, first out)
Option: Most recent first
Option: Needs attention (incomplete profiles)

Filtering:

By service category
By service area
By verification status
By registration date range

Queue Stats (Top of Page):

Pending: 12 handymen
Approved Today: 5 handymen
Rejected Today: 2 handymen
Avg Approval Time: 18 hours

Review Handyman Flow:
Admin Clicks "Review" Button:

Opens handyman detail panel (right sidebar or modal)

Handyman Detail Panel Shows:
1. Basic Info:

Profile photo (large)
Full name
Email (clickable to send email)
WhatsApp (clickable to call/message)
Registration date

2. Verification Status:

✓ Email Verified (green checkmark)
✓ WhatsApp Verified (green checkmark)
✗ ID Verified (red X - not yet implemented)
Profile Complete: Yes/No

3. Professional Description:

Full description text
Character count
Quality check:

✓ Length appropriate (20-400 chars)
✗ Too short (under 20 chars) - Flag
⚠ Contains inappropriate content - Flag



4. Services Offered:

List of all service categories selected
Pricing for each service
Check for:

✓ At least 1 service
⚠ Unrealistic pricing (too low or too high) - Flag
✓ Services match description



5. Service Areas:

List of CDMX zones selected
Check for:

✓ At least 1 zone
⚠ Too many zones (covering entire city) - May indicate fake profile



6. Availability:

Weekly schedule matrix
Check for:

✓ At least some availability
⚠ Available 24/7 every day - Unrealistic



7. Portfolio:

Number of projects: X
For each project:

Thumbnail
Title
Description
Photos count
Verification status


Check for:

✓ Portfolio present (good sign)
⚠ No portfolio (okay, but note)
⚠ Photos look fake or stock photos - Flag



8. Admin Notes (Internal):

Text area to add notes
Previous admin notes (if any)
Visible only to admins
E.g., "Called to verify phone number - legitimate"

9. Red Flags (Automated):

System checks for:

Duplicate email/phone (existing account)
Suspicious email domain (temporary email services)
Profile photo is stock image (future: reverse image search)
Description contains prohibited words
Multiple accounts from same IP (future)



If Red Flags Present:

Warning banner: "⚠ 2 red flags detected"
List red flags with details
Admin can investigate further

10. Admin Decision Buttons:
Option A: Approve (Green Button):

Confirm: "Approve this handyman? They will appear in search results."
Admin clicks "Confirm Approval"
System:

Changes status to "Approved"
Sends email to handyman: "Congratulations! Your profile is approved."
Handyman can now purchase leads
Appears in search results
Admin notes saved


Queue moves to next handyman

Option B: Request Changes (Yellow Button):

Opens modal: "What changes are needed?"
Admin enters specific feedback:

Checkboxes for common issues:

☑ Improve description (add more details about experience)
☑ Add pricing for services
☑ Verify WhatsApp number
☑ Add portfolio projects


Custom message text area (for specific instructions)


Admin clicks "Send Change Request"
System:

Sends email to handyman with feedback
Status: "Changes Requested"
Handyman makes edits and resubmits
Returns to queue for re-review
Admin can see previous change requests in history



Option C: Reject (Red Button):

Opens modal: "Reason for rejection?"
Admin must provide detailed reason:

Dropdown of common reasons:

Fake profile / Fraudulent
Inappropriate content
Duplicate account
Does not meet quality standards
Business not legitimate
Other (specify)


Detailed explanation text area (required)


Admin clicks "Confirm Rejection"
System:

Changes status to "Rejected"
Sends email to handyman with detailed reason
Account flagged (cannot reapply for 6 months)
Admin notes saved


If fraud suspected: Option to also ban user account

Approval History View:
Tab: "Approval History"

Shows all past approval decisions
Filterable by:

Approved
Changes Requested
Rejected


Searchable by handyman name
Sortable by date

Each Entry Shows:

Handyman name
Decision made
Date decided
Admin who decided
Notes (if any)
Option to view full profile

Bulk Actions (Future):

Select multiple handymen
Approve all selected
Export list to CSV

Performance Metrics:

Admin approval stats:

Total approved this month
Total rejected this month
Average time to decision
Approval rate (% approved)


Platform-wide stats:

Total active handymen
New registrations this week
Pending approval count



4.5 Wallet System
Feature Name: Handyman Wallet and Credit Management
Purpose: Pre-loaded balance system for purchasing leads with budget control
Wallet Dashboard (Handyman View):
Location: /handyman/wallet
Top Section: Balance Overview

Current Balance (large, prominent):

Amount in MXN (e.g., "450 MXN")
Color-coded:

Green if balance > 300 MXN
Yellow if balance 100-300 MXN
Red if balance < 100 MXN




Add Funds button (primary, always visible)

Weekly Budget Section:

Title: "Weekly Budget Control"
This Week's Limit: 500 MXN
Spent This Week: 300 MXN
Remaining: 200 MXN
Progress bar visualization:

Filled portion: spent (300/500)
Blue bar showing progress


Week Resets: Monday, Nov 11 at 00:00 (countdown timer)
Adjust Budget button

Free Week Status (For New Handymen):

If in first 7 days:

Banner: "🎉 Free Week Active! All leads are FREE until Nov 10"
Countdown: "5 days, 14 hours remaining"
Note: "After free week, leads cost 100 MXN each"



Quick Stats:

Leads Purchased This Week: 3
Total Leads Purchased (All Time): 47
Total Spent (All Time): 4,700 MXN
Refunds Received: 5 (500 MXN)

Transaction History:
Tab Navigation:

All Transactions (default)
Lead Purchases
Refunds
Deposits
Withdrawals

Transaction List:

Each transaction shows:

Date/Time: Nov 5, 2024 - 2:30 PM
Type: Lead Purchase / Refund / Deposit / Withdrawal
Description: "Lead #12345 - Plumbing in Roma Norte"
Amount: +100 MXN (refund) or -100 MXN (purchase)
Balance After: 450 MXN
Status: Completed / Pending / Failed
Link: View Lead (for purchases) or View Deposit (for deposits)



Filters:

Date range picker
Transaction type dropdown
Amount range

Export:

Download as CSV button
Email monthly statement option

Add Funds Modal:
Payment Method Selection:
1. Credit/Debit Card (Instant):

Input card details (Stripe Elements)
Card number, expiry, CVC
Save card for future (checkbox)
Processing fee: 0 MXN (we absorb Stripe fees for now)
Instant balance update

2. OXXO Payment (1-2 hours):

Generate OXXO voucher
Shows barcode and reference number
Instructions: "Print or show barcode at any OXXO store"
Amount to pay: Exact MXN amount
Balance updates within 1-2 hours
Email sent with voucher

3. Bank Transfer (SPEI) (Minutes):

Shows TrustMe bank account details:

Bank: [Bank Name]
CLABE: [18-digit CLABE]
Reference Number: [Unique ref for this deposit]


Copy button for each field
Amount: Exact MXN amount
Balance updates within minutes (automated via bank webhook)

Deposit Amount Options:

Quick amounts:

300 MXN (minimum)
500 MXN
1,000 MXN
2,000 MXN
Custom amount (input field)


Shows: "This will bring your balance to [Current + Deposit]"

Auto-Reload Feature:

Toggle: "Enable Auto-Reload"
When enabled:

Trigger: Balance drops below [200 MXN]
Reload amount: [500 MXN]
Uses: Saved card (required)
Notification sent when reload occurs


Setup screen:

Select trigger balance (dropdown: 100, 200, 300 MXN)
Select reload amount (dropdown: 300, 500, 1000 MXN)
Select payment method (saved card required)
Checkbox: "I authorize automatic reloads"
Save button



Adjust Weekly Budget Modal:
Current Budget Display:

This Week: 500 MXN
Already Spent: 300 MXN
Cannot Decrease Below Spent: 300 MXN minimum

Adjustment Options:
Slider:

Range: 300 MXN (minimum) to 5,000 MXN (or unlimited)
Live preview: "New weekly limit: 700 MXN"
Shows: "Remaining after spent: 400 MXN"

Recommended Presets:

Conservative: 300 MXN/week (3 leads)
Moderate: 700 MXN/week (7 leads)
Aggressive: 1,500 MXN/week (15 leads)

When Does New Budget Take Effect:

If increasing: Immediately
If decreasing: Next Monday (to prevent circumventing current week limit)

Confirmation:

"Your new weekly budget will be 700 MXN starting [Date]"
Confirm button
