# TrustMe Marketplace v2 - Five Role System Architecture

## Table of Contents
1. [Overview](#overview)
2. [Role Definitions](#role-definitions)
3. [Individual Worker Role](#individual-worker-role)
4. [Client Role](#client-role)
5. [Company Role](#company-role)
6. [Customer Support Role](#customer-support-role)
7. [Admin Role](#admin-role)
8. [Role Interactions](#role-interactions)
9. [Data Model Changes](#data-model-changes)
10. [Workflow Diagrams](#workflow-diagrams)
11. [Feature Comparison Matrix](#feature-comparison-matrix)
12. [Migration Strategy](#migration-strategy)

---

## Overview

### Current State (v1)
TrustMe Marketplace currently operates with **2 user roles**:
- **Client**: Posts jobs, hires workers, leaves reviews
- **Worker**: Creates profiles, quotes on jobs, provides services

### Future State (v2)
The platform will expand to **5 user roles**:
1. **Individual Worker**: Solo service providers (enhanced from v1)
2. **Client**: Service seekers (enhanced from v1)
3. **Company**: Organizations managing multiple workers
4. **Customer Support**: Dispute resolution and user assistance
5. **Admin**: Platform moderation and analytics

### Key Improvements in v2
- **B2B Capabilities**: Companies can operate on the platform
- **Hierarchical Management**: Companies manage workers
- **Quality Control**: Admin approval system for workers and companies
- **Dispute Resolution**: Dedicated customer support role
- **Platform Moderation**: Admin controls for user access
- **Advanced Analytics**: Dashboard for platform health monitoring

---

## Role Definitions

### 1. Individual Worker
**Definition**: Solo service provider offering repair and maintenance services directly to clients.

**Status**: Enhanced version of current worker role

**Key Characteristics**:
- Operates independently
- Full profile control
- Direct client relationships
- Individual reputation

### 2. Client
**Definition**: Individual or household seeking repair and maintenance services.

**Status**: Enhanced version of current client role

**Key Characteristics**:
- Posts job requests
- Can hire individuals OR companies
- Leaves reviews
- Manages bookings

### 3. Company
**Definition**: Organization that manages multiple workers and provides services at scale.

**Status**: New role

**Key Characteristics**:
- Manages roster of workers
- Receives job requests
- Distributes work among workers
- Company-level reputation
- Multiple service categories

### 4. Customer Support
**Definition**: Platform staff responsible for user assistance, dispute resolution, and quality assurance.

**Status**: New role

**Key Characteristics**:
- Views all conversations
- Handles complaints
- Resolves disputes
- Provides user support
- Moderates content

### 5. Admin
**Definition**: Platform owner/manager with full system access and control.

**Status**: New role

**Key Characteristics**:
- Approves workers and companies
- Blocks/suspends users
- Manages customer support staff
- Views analytics
- Platform-wide control

---

## Individual Worker Role

### Enhanced Features from v1

#### Profile Management
**Current**: Worker creates profile with services, portfolio, and availability  
**Enhanced**:
- **Affiliation Status**: Can be "Independent" or "Company-affiliated"
- **Company Association**: If affiliated, shows which company they work for
- **Dual Listing**: Can accept independent jobs AND company-assigned jobs
- **Verification Badge**: Admin-approved verification status
- **Independence Settings**: Toggle to accept only independent work or both

#### Job Discovery & Quotes
**Current**: Browse all open jobs and submit quotes  
**Enhanced**:
- **Company Assignment Visibility**: See jobs assigned by their affiliated company
- **Job Source Filter**: Filter by "Open Market" vs "Company Assigned"
- **Priority Levels**: Company-assigned jobs can be marked as priority
- **Acceptance/Decline**: Can decline company assignments with reason

#### Booking Management
**Current**: Receive, accept/reject bookings  
**Enhanced**:
- **Source Tracking**: Know if booking came from direct client or through company
- **Company Commission**: If company-affiliated, see commission structure
- **Earnings Split**: Transparent breakdown of earnings (if via company)

#### Reputation & Reviews
**Current**: Accumulate individual reviews  
**Enhanced**:
- **Dual Reputation**: Personal rating + company rating (if affiliated)
- **Review Attribution**: Reviews specify if service was independent or company-backed
- **Portfolio Ownership**: Portfolio stays with worker even if they leave company

#### Company Affiliation Workflow
**New Feature**:

**Step 1: Company Invitation**
- Company sends invitation to worker
- Worker receives notification
- Invitation includes:
  - Company name and profile
  - Commission/payment structure
  - Service categories
  - Expected availability

**Step 2: Worker Review & Decision**
- Worker reviews company offer
- Can request clarifications via messaging
- Accepts or declines invitation

**Step 3: Affiliation Setup**
- If accepted, worker status updates to "Company-affiliated"
- Worker appears in company's worker roster
- Worker can still accept independent jobs (configurable)
- Commission structure saved

**Step 4: Managing Affiliation**
- Worker can leave company with notice period
- Company can remove worker from roster
- Reviews and portfolio remain with worker
- Earnings history preserved

### Dashboard Updates

#### New Tabs/Sections:
- **Company Assignments**: Jobs assigned by affiliated company
- **Earnings Breakdown**: Split between independent and company work
- **Affiliation Settings**: Manage company relationship
- **Verification Status**: Admin approval progress

---

## Client Role

### Enhanced Features from v1

#### Service Discovery
**Current**: Search for individual workers  
**Enhanced**:
- **Entity Type Filter**: Choose "Individual Workers", "Companies", or "Both"
- **Team Size Display**: For companies, see number of workers
- **Company Ratings**: Separate rating for companies vs individuals
- **Availability at Scale**: Companies show broader availability (multiple workers)

#### Job Posting
**Current**: Create job, receive quotes from workers  
**Enhanced**:
- **Target Audience**: Specify if seeking individual, company, or either
- **Team Size Preference**: Indicate if job requires multiple workers
- **Company Quotes**: Receive quotes from companies (with assigned worker details)
- **Urgency Escalation**: Urgent jobs go to customer support if no response within timeframe

#### Booking & Selection
**Current**: Book individual workers  
**Enhanced**:
- **Company Booking**: Book a company (they assign specific worker)
- **Worker Preference**: Request specific worker from a company
- **Backup Workers**: Companies can provide backup if assigned worker unavailable
- **Service Level Agreements**: Companies can offer guarantees

#### Dispute Resolution
**New Feature**:

**Step 1: Issue Identification**
- Client identifies problem with service
- Options:
  - Worker didn't show up
  - Quality issues
  - Pricing dispute
  - Safety concerns
  - Other issues

**Step 2: Initial Resolution Attempt**
- Client contacts worker/company directly via messaging
- Attempt to resolve within platform
- 24-hour response window

**Step 3: Escalation to Customer Support**
- If unresolved, client can escalate
- "Report Issue" button in booking details
- Fills out dispute form:
  - Issue category
  - Description
  - Evidence (photos, messages)
  - Desired resolution

**Step 4: Customer Support Intervention**
- Customer support agent assigned
- Reviews conversation history
- Contacts both parties
- Facilitates resolution
- Can issue refunds, warnings, or sanctions

**Step 5: Resolution & Feedback**
- Issue marked as resolved
- Client rates dispute resolution experience
- Case notes added to worker/company record

#### Review System
**Current**: Leave reviews for workers  
**Enhanced**:
- **Company Reviews**: If booked through company, can review both company AND assigned worker
- **Separate Ratings**: Company service vs worker performance
- **Dispute History Visibility**: If dispute was raised and resolved, shown in review context
- **Response Time Rating**: Rate how quickly worker/company responded

### Dashboard Updates

#### New Tabs/Sections:
- **Active Disputes**: Track ongoing issues with customer support
- **Service Preferences**: Save preferred workers or companies
- **Booking History**: Enhanced with entity type (worker vs company)
- **Dispute History**: Past issues and resolutions

---

## Company Role

### Core Features

#### Company Profile Management

**Profile Information**:
- Company name and logo
- Business description (100-500 characters)
- Service categories offered
- Service areas in CDMX (same zones as workers)
- Business registration number
- Years in business
- Team size
- Response time guarantee
- Service level agreements
- Contact information (main office)
- Operating hours
- Emergency service availability

**Verification Requirements**:
- Business registration documents
- Proof of insurance (if applicable)
- Background check authorization
- Admin approval required before going live

**Portfolio**:
- Company portfolio (separate from worker portfolios)
- Project galleries with team credits
- Certifications and awards
- Client testimonials

#### Worker Management

**Worker Roster**:
- List of affiliated workers
- Worker status (active, inactive, on leave)
- Individual worker ratings
- Specializations
- Current assignments
- Availability status

**Invitation System**:
- Send invitations to workers by:
  - Email
  - Username
  - Worker profile ID
- Invitation includes:
  - Commission structure
  - Payment terms
  - Service categories
  - Expectations
  - Benefits (if any)
- Track invitation status (pending, accepted, declined)

**Worker Assignment**:
- View worker availability calendars
- Assign jobs to specific workers
- Load balancing across team
- Specialization matching
- Geographic optimization

**Commission & Payments**:
- Set commission rates per worker
- Different rates for different service categories
- Payment schedule configuration
- Transparent earnings reporting
- Payment history tracking

#### Job Management

**Receiving Jobs**:
- Browse open jobs seeking companies
- Filter by service category and zone
- See jobs marked as "large" or "team required"
- Receive direct requests from repeat clients

**Quoting Process**:
- Submit company quote with:
  - Total price
  - Assigned worker(s)
  - Timeline
  - Team size
  - Guarantee/warranty
  - Insurance coverage
  - Detailed scope of work
- Indicate lead worker and support team
- Show company credentials

**Job Distribution**:
- Assign accepted jobs to workers
- Can assign multiple workers for large jobs
- Set primary and secondary workers
- Define each worker's role/responsibility
- Set internal deadlines

**Job Monitoring**:
- Track job progress
- Worker check-ins
- Client feedback during service
- Quality control checkpoints
- Completion verification

#### Client Relationships

**Direct Bookings**:
- Clients can book company directly
- Company assigns best available worker
- Client can request specific worker
- Guaranteed backup worker availability

**Recurring Clients**:
- Build client relationships
- Preferred client programs
- Service contracts
- Scheduled maintenance

**Communication**:
- Company-level messaging with clients
- Internal notes not visible to clients
- Escalation protocols
- Customer satisfaction monitoring

#### Reputation Management

**Company Ratings**:
- Overall company rating (separate from worker ratings)
- Based on:
  - Service quality
  - Response time
  - Professionalism
  - Value for money
  - Communication
- Display number of jobs completed
- Completion rate percentage

**Reviews**:
- Company-level reviews from clients
- Worker-level reviews (attributed to company jobs)
- Response to reviews capability
- Featured testimonials

**Performance Metrics**:
- Average response time
- Job completion rate
- Client retention rate
- Dispute resolution rate
- Average rating over time

#### Financial Dashboard

**Revenue Tracking**:
- Total revenue
- Revenue by service category
- Revenue per worker
- Monthly/quarterly/yearly reports

**Commission Management**:
- Commissions paid to workers
- Outstanding payments
- Payment schedules
- Commission rate analysis

**Analytics**:
- Most profitable services
- Top performing workers
- Peak demand periods
- Geographic demand mapping

#### Dispute Handling

**Internal Disputes** (Worker Issues):
- Manage worker complaints
- Handle worker performance issues
- Internal mediation
- Documentation

**External Disputes** (Client Issues):
- Receive client complaints
- First response within company
- Escalate to customer support if needed
- Resolution tracking
- Client retention efforts

### Company Dashboard

#### Dashboard Tabs:

**1. Overview Tab**:
- Active jobs count
- Pending quotes
- Worker availability summary
- Today's schedule
- Recent reviews
- Revenue this month
- Quick actions (assign job, invite worker)

**2. Workers Tab**:
- Complete worker roster
- Availability calendar view
- Performance metrics per worker
- Send invitations
- Manage commissions
- Worker status updates

**3. Jobs Tab**:
Subtabs:
- Available (open jobs to quote on)
- Active (ongoing jobs)
- Completed (job history)
- Cancelled/Disputed

For each job:
- Client information
- Service details
- Assigned worker(s)
- Status
- Revenue
- Client feedback

**4. Quotes Tab**:
- Pending quotes
- Accepted quotes (now bookings)
- Declined quotes
- Quote templates
- Pricing calculator

**5. Clients Tab**:
- Client relationship management
- Communication history
- Repeat clients
- Client preferences
- Service contracts
- Account managers (for large clients)

**6. Finances Tab**:
- Revenue dashboard
- Commission payouts
- Payment schedules
- Invoicing
- Tax documents
- Financial reports

**7. Analytics Tab**:
- Performance metrics
- Worker utilization
- Service category breakdown
- Geographic heat maps
- Trend analysis
- Forecasting

**8. Messages Tab**:
- Client conversations
- Worker internal chat
- Customer support threads
- Notifications

**9. Settings Tab**:
- Company profile editing
- Service area management
- Commission structures
- Notification preferences
- Team permissions (if multiple company admins)
- Operating hours

### Company Workflows

#### Workflow 1: Onboarding to Platform

**Step 1: Registration**
- Company creates account
- Provides business information
- Uploads verification documents
- Agrees to company terms of service

**Step 2: Admin Review**
- Application goes to admin queue
- Admin reviews documents
- Background check (if applicable)
- Approval or rejection with feedback

**Step 3: Profile Setup**
- Upload logo and photos
- Write company description
- Select service categories
- Define service areas
- Set operating hours

**Step 4: Worker Recruitment**
- Invite existing workers on platform
- Add external workers (they must create accounts)
- Set commission structures
- Define roles and specializations

**Step 5: Go Live**
- Complete profile review
- Test quote submission
- Start browsing jobs
- Receive first bookings

#### Workflow 2: Job Quote to Completion

**Step 1: Job Discovery**
- Browse jobs seeking companies
- Filter by category and location
- Review job requirements
- Check worker availability

**Step 2: Quote Preparation**
- Assign potential worker(s)
- Calculate pricing (labor + commission + margin)
- Prepare detailed proposal
- Set timeline
- Add guarantees/insurance info

**Step 3: Submit Quote**
- Submit to client
- Quote appears in client's quote list
- Notification sent to client
- Internal notification to assigned worker

**Step 4: Quote Acceptance**
- Client accepts company quote
- Booking created
- Worker officially assigned
- Worker notified
- Calendar updated

**Step 5: Pre-Service**
- Worker reviews job details
- Company provides any special instructions
- Worker confirms availability
- Client receives worker contact info
- Service scheduled

**Step 6: Service Delivery**
- Worker performs service
- Company monitors progress (optional check-ins)
- Client can message company or worker
- Issues escalated to company if needed

**Step 7: Completion**
- Worker marks job as complete
- Company verifies completion
- Client confirms completion
- Payment processed
- Commission calculated and scheduled

**Step 8: Post-Service**
- Client leaves review (company + worker)
- Company can respond to review
- Worker's record updated
- Revenue recorded
- Client relationship notes added

#### Workflow 3: Worker Invitation & Onboarding

**Step 1: Identify Worker**
- Company searches platform for workers
- Reviews worker profiles, ratings, portfolios
- Identifies workers in needed service categories
- Checks worker's affiliation status (must be independent)

**Step 2: Send Invitation**
- Click "Invite to Company" on worker profile
- Fill out invitation form:
  - Proposed commission rate
  - Service categories
  - Expected availability
  - Payment terms
  - Additional benefits
  - Introduction message
- Submit invitation

**Step 3: Worker Review**
- Worker receives notification
- Reviews company profile
- Reviews commission structure
- Can message company with questions
- Accepts or declines

**Step 4: Onboarding (If Accepted)**
- Worker status updates to company-affiliated
- Company adds worker to roster
- Set worker's service categories within company
- Provide company guidelines and standards
- Add to internal communication channels
- Worker appears in company's worker list

**Step 5: First Assignment**
- Company assigns first job
- Provide extra support and guidance
- Monitor quality closely
- Gather feedback from client
- Adjust approach if needed

#### Workflow 4: Handling Client Dispute

**Step 1: Dispute Notification**
- Client reports issue with service
- Company receives immediate notification
- Dispute details visible in dashboard
- Assigned worker notified

**Step 2: Internal Review**
- Review job details and conversation history
- Contact assigned worker for their perspective
- Review any evidence (photos, messages)
- Assess validity of complaint

**Step 3: Resolution Attempt**
- Contact client within 2 hours
- Acknowledge issue
- Propose resolution:
  - Redo work at no charge
  - Partial refund
  - Send different worker
  - Offer discount on future service
  - Other remedies
- Get client agreement

**Step 4: Resolution Implementation**
- Execute agreed solution
- Document resolution in system
- Follow up with client
- Update worker's record (if needed)

**Step 5: Escalation (If Unresolved)**
- If client unsatisfied, dispute escalates to customer support
- Company provides their side to customer support
- Customer support mediates
- Abide by customer support decision
- Implement final resolution

**Step 6: Post-Dispute**
- Review what went wrong
- Provide worker feedback/training
- Update processes if needed
- Track dispute in company metrics
- Attempt to retain client relationship

---

## Customer Support Role

### Core Responsibilities

#### 1. Conversation Monitoring
**Capability**: View all platform conversations with context

**Access Levels**:
- **Full Conversation View**: Can read entire message history between:
  - Clients and individual workers
  - Clients and companies
  - Companies and their affiliated workers
  - All parties in disputed bookings
- **Contextual Information**: See associated job, booking, user profiles, and transaction history
- **Search & Filter**: Find conversations by user, keyword, date, dispute status
- **Privacy Notes**: Cannot access until user grants permission or raises issue (privacy-first approach)

**Monitoring Dashboard**:
- Active conversations count
- Flagged conversations (automated keyword detection)
- Dispute conversations
- High-priority issues
- Response time metrics

#### 2. Dispute Resolution

**Dispute Intake**:
- Receive escalated disputes from clients, workers, or companies
- Auto-escalated disputes (no response, multiple complaints)
- System-flagged issues (fraud detection, safety concerns)

**Dispute Queue Management**:
- Priority levels:
  - Critical (safety, fraud) - Immediate
  - High (payment disputes, no-shows) - 2 hours
  - Medium (quality issues) - 24 hours
  - Low (minor complaints) - 48 hours
- Assignment to customer support agents
- Workload balancing

**Resolution Process**:

**Step 1: Case Review**
- Review dispute details
- Read full conversation history
- Check user histories (past disputes, ratings)
- Identify policy violations
- Assess evidence provided

**Step 2: Investigation**
- Contact all parties involved
- Request additional information if needed
- Review photos/videos/documents
- Check transaction records
- Consult with supervisors for complex cases

**Step 3: Mediation**
- Facilitate communication between parties
- Propose fair solutions
- Consider:
  - Platform policies
  - User histories
  - Evidence quality
  - Industry standards
  - Legal requirements

**Step 4: Decision**
- Make final determination
- Issue resolution:
  - Full refund
  - Partial refund
  - Re-do service
  - Warning to worker/company
  - Case dismissal
  - Account suspension (escalate to admin)
- Document reasoning

**Step 5: Implementation**
- Process refunds (if applicable)
- Update booking status
- Add notes to user records
- Close dispute
- Send resolution notifications to all parties

**Step 6: Follow-up**
- Check client satisfaction 1 week later
- Ensure resolution was implemented
- Update metrics
- Identify process improvements

#### 3. User Support & Assistance

**Support Channels**:
- In-platform messaging
- Email support
- Phone support (for urgent issues)
- Chat widget (future)

**Support Types**:

**Technical Support**:
- Login issues
- Password reset help
- Profile setup assistance
- Upload problems
- Payment processing issues
- Bug reporting

**Account Support**:
- Verification questions
- Account recovery
- Profile updates
- Data export requests
- Account deletion requests

**Policy Support**:
- Terms of service clarification
- Privacy policy questions
- Refund policy explanation
- Community guidelines

**Guidance**:
- How to post jobs effectively
- How to create strong worker profiles
- Best practices for quotes
- Safety recommendations
- Communication tips

#### 4. Content Moderation

**Review User Content**:
- Profile descriptions
- Portfolio images/videos
- Job postings
- Review comments
- Messages (when flagged)

**Flag for Inappropriate Content**:
- Offensive language
- Discriminatory content
- False information
- Spam or scams
- Explicit content
- Contact info sharing (to bypass platform)

**Actions**:
- Request content removal/edit
- Remove content directly (if violates TOS)
- Issue warnings
- Recommend account suspension (to admin)
- Document violations

#### 5. Fraud Prevention

**Monitor for Fraud Indicators**:
- Multiple accounts from same user
- Payment disputes pattern
- Fake reviews
- Identity verification issues
- Suspicious messaging patterns
- Price manipulation
- Fake portfolio content

**Investigation**:
- Cross-reference user data
- Check IP addresses
- Verify documentation
- Contact verification
- Pattern analysis

**Actions**:
- Flag suspicious accounts
- Freeze accounts temporarily
- Require additional verification
- Escalate to admin for bans
- Report to authorities (if needed)

#### 6. Quality Assurance

**User Feedback Collection**:
- Post-resolution surveys
- Service quality checks
- Platform experience surveys
- Feature requests

**Trend Analysis**:
- Common complaint categories
- Frequent issues by service type
- Geographic problem areas
- Worker/company performance patterns
- System usability issues

**Recommendations to Admin**:
- Policy changes
- Platform improvements
- Training materials needed
- Feature enhancements
- Risk mitigation strategies

### Customer Support Dashboard

#### Dashboard Tabs:

**1. Queue Tab**:
- New disputes (unassigned)
- My assigned disputes
- Escalated issues
- Pending responses
- Overdue cases
- Filter by priority, type, date

**2. Conversations Tab**:
- Search all conversations
- Filter by:
  - User type
  - Date range
  - Keywords
  - Dispute status
  - Flagged content
- Read-only view with notes capability

**3. Users Tab**:
- Search users (all types)
- View user details:
  - Profile information
  - Dispute history
  - Review history
  - Account status
  - Warning/sanctions
  - Notes from support team
- Quick actions (send message, flag account)

**4. Reports Tab**:
- Dispute statistics
- Resolution time metrics
- User satisfaction scores
- Content moderation summary
- Fraud prevention metrics
- Personal performance stats

**5. Knowledge Base Tab**:
- Support article library
- Policy documentation
- Resolution guidelines
- Escalation procedures
- FAQ management
- Training materials

**6. Messages Tab**:
- Support inbox
- Client messages
- Worker messages
- Company messages
- Internal team chat

### Customer Support Workflows

#### Workflow 1: Daily Operations

**Morning**:
- Check overnight disputes
- Review priority queue
- Assign critical cases
- Check escalated issues
- Review metrics

**Throughout Day**:
- Work through assigned disputes
- Respond to support messages
- Monitor flagged conversations
- Process content moderation queue
- Document resolutions

**End of Day**:
- Close completed cases
- Update pending cases
- Escalate unresolved critical issues
- Log activity
- Brief next shift (if 24/7 support)

#### Workflow 2: Handling Client Complaint

**Step 1: Receipt**
- Client submits complaint via "Report Issue" button
- Ticket created in queue
- Auto-response sent to client
- Priority assigned based on issue type

**Step 2: Assignment**
- Support agent claims ticket OR auto-assigned
- Agent reviews complaint details
- Checks client history
- Reviews related booking/job

**Step 3: Initial Contact**
- Contact client within SLA time (2-24 hours based on priority)
- Acknowledge issue
- Express empathy
- Request additional details if needed
- Set expectations for resolution timeline

**Step 4: Investigation**
- Review conversation between client and worker/company
- Check worker/company history
- Examine evidence (photos, messages)
- Contact worker/company for their perspective
- Review platform policies

**Step 5: Resolution Proposal**
- Determine fair outcome
- Contact client with proposal
- Get client agreement or negotiate
- Contact worker/company with decision
- Document agreement

**Step 6: Implementation**
- Process refund (if applicable) - coordinate with admin for financial actions
- Update booking status
- Issue warnings/sanctions (if applicable)
- Add notes to all user records involved
- Mark case as resolved

**Step 7: Follow-up**
- Send resolution confirmation to all parties
- Follow up with client in 3-7 days
- Request feedback on support experience
- Close ticket
- Update metrics

#### Workflow 3: Content Moderation Review

**Step 1: Flag Received**
- Content flagged by:
  - Automated system (keyword detection)
  - User report
  - Proactive review
- Added to moderation queue

**Step 2: Review Content**
- View flagged content in context
- Review user profile
- Check previous violations
- Assess severity

**Step 3: Determination**
- Violates TOS: Yes or No
- Severity level:
  - Minor (warning)
  - Moderate (content removal)
  - Severe (account suspension recommendation)
  - Critical (immediate escalation)

**Step 4: Action**
- **Minor**: Send warning message to user, request edit
- **Moderate**: Remove content, send notification, warning issued
- **Severe**: Remove content, suspend content creation, escalate to admin
- **Critical**: Freeze account, escalate to admin immediately

**Step 5: Documentation**
- Log violation in user record
- Document reasoning
- Screenshot evidence (if needed)
- Update moderation metrics

**Step 6: Communication**
- Notify user of action taken
- Explain policy violation
- Provide opportunity to appeal (escalate to admin)
- Give guidance on compliance

### Customer Support Tools & Features

**Communication Tools**:
- Multi-channel inbox (platform messages, email)
- Template responses for common issues
- Translation support for Spanish/English
- Internal notes on cases (not visible to users)
- Case collaboration (consult other agents)

**Investigation Tools**:
- User profile deep-dive
- Conversation history viewer
- Transaction history access
- Duplicate account detection
- IP address logging
- Document verification tools

**Decision Support**:
- Resolution guideline database
- Policy quick reference
- Escalation decision tree
- Refund authorization limits
- Sanction guidelines

**Reporting & Analytics**:
- Personal performance metrics
- Team performance dashboard
- Case resolution tracking
- User satisfaction scores
- Trend identification
- Workload management

---

## Admin Role

### Core Responsibilities

#### 1. User Approval & Verification

**Worker Approval Process**:

**Step 1: Application Review Queue**
- New worker profiles appear in admin approval queue
- View worker application with:
  - Profile information
  - Service categories
  - Service areas
  - Portfolio images/projects
  - Verification documents (if required)
  - Background check results (if applicable)

**Step 2: Profile Evaluation**
- Assess profile completeness
- Verify identity documents (if required)
- Check portfolio authenticity
- Review service descriptions for appropriateness
- Cross-reference with existing users (duplicate check)

**Step 3: Decision**
- **Approve**: Worker profile goes live, worker can quote on jobs
- **Request Changes**: List required modifications, return to worker
- **Reject**: Provide detailed reasoning, worker notified

**Step 4: Post-Approval**
- Worker receives approval notification
- Verification badge added to profile
- Worker appears in search results
- Can now actively use platform

**Company Approval Process**:

**Step 1: Company Application Review**
- Company applications in separate queue
- Higher scrutiny than individual workers
- Review:
  - Business registration documents
  - Tax identification
  - Insurance certificates
  - Business address verification
  - Ownership information
  - References (if applicable)

**Step 2: Background & Compliance Check**
- Verify business is legally registered
- Check for any violations or complaints
- Review online reputation
- Verify insurance coverage
- Check licenses (if required for services offered)

**Step 3: Interview/Assessment (Optional)**
- For larger companies or high-value services
- Video call or in-person meeting
- Discuss business model
- Assess professionalism
- Review service standards

**Step 4: Decision**
- **Approve**: Company can go live, start recruiting workers
- **Request Additional Documentation**: Specify what's needed
- **Provisional Approval**: Limited access to start, full review after X jobs
- **Reject**: Detailed explanation provided

**Step 5: Ongoing Monitoring**
- First 10 jobs closely monitored
- Early review collection enforcement
- Compliance spot-checks
- Annual re-verification for companies

#### 2. Platform Moderation

**User Suspension/Banning**:

**Suspension Triggers**:
- Multiple customer support escalations
- Fraud indicators
- Policy violations
- Safety concerns
- Payment issues
- Severe content violations

**Suspension Process**:
- Review customer support recommendation
- Examine user history
- Assess severity and pattern
- Determine suspension:
  - Temporary (7 days, 30 days, 90 days)
  - Permanent ban
  - Account deletion
- Issue decision with explanation
- User notified
- Block access immediately

**Appeal Process**:
- User can submit appeal
- Admin reviews appeal
- Can overturn or uphold decision
- Final decision communicated

**Ban Categories**:
- **Soft Ban**: Cannot post jobs/quotes, can message existing clients
- **Hard Ban**: Full platform access revoked, can only view settings
- **Permanent Ban**: Account deleted, IP blocked, cannot re-register

**Re-admission Process**:
- After suspension period, review required
- User must acknowledge violations
- Probationary period with close monitoring
- Violations during probation = permanent ban

#### 3. Customer Support Management

**Hiring & Onboarding Customer Support Staff**:
- Post support agent positions
- Interview candidates
- Create customer support accounts
- Assign permissions and access levels
- Provide training on:
  - Platform policies
  - Resolution guidelines
  - Communication standards
  - Tools and dashboards
  - Escalation procedures

**Performance Management**:
- Monitor support agent metrics:
  - Resolution time
  - User satisfaction
  - Case volume handled
  - Decision quality
  - Policy compliance
- Provide feedback and coaching
- Issue warnings for poor performance
- Recognize excellent performance

**Team Organization**:
- Assign roles:
  - Tier 1 (basic support)
  - Tier 2 (dispute resolution)
  - Team lead
  - Specialist (fraud, technical)
- Set schedules and coverage
- Manage workload distribution

**Policy & Guidelines**:
- Create resolution guidelines
- Update support documentation
- Define escalation procedures
- Set SLA targets
- Establish quality standards

#### 4. Analytics & Reporting

**Platform Health Metrics**:
- Total users by type (clients, workers, companies)
- New registrations (daily, weekly, monthly)
- Active users
- Dormant users
- Churned users

**Transaction Metrics**:
- Jobs posted
- Quotes submitted
- Bookings created
- Jobs completed
- Completion rate
- Average job value
- Total platform GMV (Gross Merchandise Value)

**Quality Metrics**:
- Average ratings by user type
- Review volume and sentiment
- Dispute rate
- Resolution success rate
- User satisfaction scores

**Engagement Metrics**:
- Messages sent
- Search queries
- Profile views
- Quote response time
- Booking response time
- Repeat booking rate

**Geographic Metrics**:
- Activity by CDMX zone
- Service demand by area
- Worker distribution
- Company concentration
- Growth trends by neighborhood

**Service Category Metrics**:
- Popular services
- Pricing trends
- Demand vs supply
- Completion rates by category
- Rating averages by service type

**Financial Metrics** (if platform takes commission):
- Platform revenue
- Revenue by user type
- Commission by service category
- Payment processing metrics
- Refund rates

**Operational Metrics**:
- Customer support volume
- Support resolution time
- Approval queue wait time
- Fraud detection rate
- Content moderation volume

#### 5. Policy & Platform Management

**Policy Creation & Updates**:
- Terms of Service
- Privacy Policy
- Community Guidelines
- Service Level Agreements
- Commission structures (if applicable)
- Refund policies
- Safety standards

**Policy Communication**:
- Announce policy changes
- Notify all users
- Provide implementation period
- Update help documentation
- Train customer support team

**Platform Configuration**:
- Service category management (add, edit, remove)
- CDMX zone updates
- Commission rate settings
- Feature flags (enable/disable features)
- Notification settings
- Search algorithm tuning

**Risk Management**:
- Monitor fraud patterns
- Update security measures
- Insurance policy management
- Legal compliance
- Data protection (GDPR-like compliance)

#### 6. Strategic Planning

**Growth Analysis**:
- Identify growth opportunities
- Analyze market trends
- Competitor monitoring
- User feedback synthesis
- Feature prioritization

**Quality Improvement**:
- Identify platform issues
- Plan enhancements
- Worker/company quality standards
- Client experience improvements

**Expansion Planning**:
- New service categories
- New geographic areas
- Partnership opportunities
- Marketing strategies

### Admin Dashboard

#### Dashboard Tabs:

**1. Overview Tab**:
- Key metrics summary
- Platform health score
- Active users today
- Jobs completed this week
- Pending approvals count
- Active disputes
- Critical alerts
- Recent activity feed

**2. Approvals Tab**:
Subtabs:
- **Worker Approvals**: Queue of pending worker profiles
- **Company Approvals**: Queue of pending company applications
- **Approved History**: Recently approved profiles
- **Rejected History**: Recently rejected applications

For each approval:
- User profile details
- Documents to review
- Approval checklist
- Approve/Reject/Request Changes buttons
- Notes field

**3. Users Tab**:
- Search all users
- Filter by:
  - User type
  - Status (active, suspended, banned)
  - Verification status
  - Join date
  - Rating
  - Activity level
- User detail view:
  - Full profile
  - Activity history
  - Disputes history
  - Reviews received
  - Financial summary
  - Support tickets
  - Sanctions log
- Actions:
  - View profile
  - Send message
  - Suspend account
  - Ban account
  - Delete account
  - Reset password
  - Verify manually

**4. Customer Support Tab**:
- Support team roster
- Performance metrics per agent
- Hire new support agent
- Edit permissions
- Review decisions (audit trail)
- Support team analytics
- Training materials

**5. Analytics Tab**:
Multiple sub-tabs:
- **Platform Health**: Overall metrics
- **Users**: User acquisition, retention, churn
- **Transactions**: Jobs, bookings, completion rates
- **Quality**: Ratings, reviews, disputes
- **Geography**: Heat maps, zone analysis
- **Services**: Category performance
- **Financial**: Revenue, commissions, trends
- **Engagement**: User activity patterns

Customizable dashboards with:
- Date range selection
- Chart types
- Export capabilities
- Scheduled reports

**6. Disputes Tab**:
- View all disputes (read-only or override capability)
- Filter by:
  - Status
  - Priority
  - Assigned agent
  - User type
  - Date
- Dispute details view
- Override customer support decisions (rare)
- Dispute trends analysis

**7. Moderation Tab**:
- Content moderation queue
- Flagged profiles
- Reported users
- Banned users
- Suspension log
- Appeal queue
- Pattern analysis (repeated offenders)

**8. Platform Settings Tab**:
- Service categories management
- Zone/location settings
- Commission rates
- Feature toggles
- Email templates
- Notification settings
- System announcements
- Maintenance mode

**9. Reports Tab**:
- Scheduled reports
- Custom report builder
- Export options (CSV, PDF)
- Report templates
- Historical reports archive

**10. Logs Tab**:
- System activity logs
- Admin action logs
- Customer support action logs
- User login logs
- API logs
- Error logs
- Security events

### Admin Workflows

#### Workflow 1: Daily Platform Monitoring

**Morning Review**:
- Check overnight activity
- Review critical alerts
- Check approval queue size
- Monitor active disputes
- Review suspended accounts needing review

**Throughout Day**:
- Process approval queue
- Respond to escalated issues
- Monitor platform health metrics
- Review customer support performance
- Investigate fraud flags
- Respond to urgent issues

**End of Day**:
- Review day's metrics
- Identify concerning trends
- Plan next day priorities
- Check pending escalations
- Document significant events

#### Workflow 2: Worker Profile Approval

**Step 1: Open Approval Queue**
- Navigate to Approvals > Worker Approvals
- Sort by oldest first (FIFO)
- Select next worker in queue

**Step 2: Review Profile**
- Check profile completeness:
  - Description quality (20-400 chars, appropriate language)
  - Service areas selected (at least one)
  - Services offered (at least one)
  - Portfolio (at least 1 project or 3 images recommended)
  - Contact information complete
- Review portfolio:
  - Images appear legitimate (not stock photos)
  - Projects descriptions professional
  - Service categories match portfolio

**Step 3: Verification Check**
- If documents required:
  - ID verification
  - Professional licenses
  - Insurance certificates
- Cross-check with existing users (duplicate detection)
- Background check results (if applicable)

**Step 4: Quality Assessment**
- Profile description is professional
- No inappropriate content
- No contact information sharing (trying to bypass platform)
- No false claims or exaggerations
- Grammar and spelling acceptable

**Step 5: Decision**
- If all checks pass:
  - Click "Approve"
  - Add approval notes (optional)
  - Worker notified via email
  - Profile goes live immediately
  
- If issues found:
  - Click "Request Changes"
  - List specific issues to fix
  - Set deadline for resubmission (e.g., 7 days)
  - Worker receives notification with feedback
  
- If major violations or fraud suspected:
  - Click "Reject"
  - Provide detailed explanation
  - Worker cannot reapply (or must wait 6 months)
  - Flag account for monitoring if suspicious

**Step 6: Post-Approval Monitoring**
- Newly approved workers monitored for first 30 days
- Check first reviews received
- Monitor for any immediate complaints
- Can revoke approval if fraud detected

#### Workflow 3: Company Application Approval

**Step 1: Initial Review**
- Open company application from queue
- Review business information:
  - Company name and description
  - Services offered
  - Service areas
  - Team size
  - Years in business
  - Contact details

**Step 2: Document Verification**
- Business registration certificate
- Tax ID verification
- Business address confirmation
- Insurance documentation
- Owner/manager identification
- Bank account verification (if payments involved)

**Step 3: Background Check**
- Search company name online
- Check for complaints or negative reviews
- Verify no legal issues
- Check with business registration authority
- Industry reputation check

**Step 4: Risk Assessment**
- Evaluate based on:
  - Documentation completeness
  - Business history
  - Online reputation
  - Service categories (some higher risk)
  - Team size (larger = more scrutiny)
  
- Risk levels:
  - **Low**: Established business, good docs, positive reputation
  - **Medium**: Newer business, adequate docs, no red flags
  - **High**: New business, incomplete docs, or concerning signs

**Step 5: Decision**
- **Low Risk**: Full approval immediately
- **Medium Risk**: Provisional approval with close monitoring
- **High Risk**: Request additional documentation or interview
- **Reject**: If fraud suspected or major issues

**Step 6: Approval Implementation**
- Approve in system
- Send welcome email with:
  - Next steps (set up profile, invite workers)
  - Best practices guide
  - Company guidelines
  - Customer support contact
- Add to monitoring list

**Step 7: Ongoing Monitoring**
- Review first 5 bookings
- Check early reviews
- Monitor dispute rate
- Quarterly compliance checks (for larger companies)
- Annual re-verification required

#### Workflow 4: Handling User Ban Decision

**Step 1: Ban Recommendation Received**
- Customer support escalates recommendation
- Includes:
  - User details
  - Violation history
  - Evidence
  - Recommended ban duration/type
  - Support agent's notes

**Step 2: Case Review**
- Read full case history
- Review user's complete history on platform:
  - Jobs/bookings completed
  - Reviews received
  - Previous warnings
  - Dispute history
  - Value to platform (revenue generated)
- Review evidence provided
- Check for patterns

**Step 3: Severity Assessment**
- Minor: First offense, minor violation
- Moderate: Repeat offense or moderate violation
- Severe: Multiple violations or serious single violation
- Critical: Fraud, safety threat, illegal activity

**Step 4: Decision**
- **Minor**:
  - Final warning (no ban)
  - Probationary period
  - Require policy acknowledgment
  
- **Moderate**:
  - Temporary suspension (7-30 days)
  - Can view platform but not transact
  - Must acknowledge violation to return
  
- **Severe**:
  - Long suspension (30-90 days)
  - Profile hidden during suspension
  - Re-approval required to return
  - Probationary period after return
  
- **Critical**:
  - Permanent ban
  - Account deletion
  - IP address blocked
  - Email/phone blacklisted
  - Cannot create new account

**Step 5: Implementation**
- Update user status in system
- Set suspension end date (if applicable)
- Document decision thoroughly
- Generate notification

**Step 6: Communication**
- Send detailed notification to user:
  - Decision and reasoning
  - Policy violations cited
  - Ban duration (if temporary)
  - Appeal process (if available)
  - Next steps
- Notify customer support team
- If company or worker, notify affected clients

**Step 7: Monitoring**
- For temporary bans:
  - Calendar reminder for reinstatement review
  - Check if user wants to return
  - Require acknowledgment of terms
  - Probationary monitoring
  
- For permanent bans:
  - Monitor for re-registration attempts
  - Block duplicate accounts
  - Final case closure

#### Workflow 5: Customer Support Performance Review

**Monthly Review Process**:

**Step 1: Gather Metrics**
- Each support agent's performance:
  - Cases handled
  - Average resolution time
  - User satisfaction ratings
  - Escalations to admin
  - Decision overturn rate
  - Response time compliance
  - Notes quality

**Step 2: Identify Top Performers**
- Rank agents by key metrics
- Recognize excellence:
  - Highest satisfaction ratings
  - Fastest resolution times
  - Most cases handled
  - Lowest overturn rate
- Plan recognition/rewards

**Step 3: Identify Performance Issues**
- Agents below standards:
  - Low satisfaction ratings
  - Slow resolution times
  - High overturn rate
  - Incomplete documentation
  - Policy violations
- Determine causes:
  - Training needed
  - Workload too high
  - Wrong fit for role

**Step 4: Individual Meetings**
- Schedule 1-on-1 with each agent
- Review performance metrics
- Provide specific feedback
- Recognize achievements
- Discuss challenges
- Set goals for next month

**Step 5: Training & Development**
- Identify common training needs
- Schedule team training sessions
- Share best practices
- Update guidelines
- Provide resources

**Step 6: Team Optimization**
- Adjust assignments based on strengths
- Rebalance workload if needed
- Promote high performers
- Create performance improvement plans for struggling agents
- Termination decisions (if necessary)

**Step 7: Documentation**
- Document review notes
- Update agent records
- Track improvement plans
- Report to stakeholders (if applicable)

---

## Role Interactions

### Interaction Matrix

| From \ To | Individual Worker | Client | Company | Customer Support | Admin |
|-----------|------------------|---------|---------|------------------|-------|
| **Individual Worker** | - | Direct messaging, quotes, bookings, service delivery | Can join as affiliated worker, internal communication if affiliated | Raise issues, respond to disputes | Application for approval, appeal bans |
| **Client** | Browse profiles, message, book services, leave reviews | - | Browse profiles, message, book services, leave reviews | Report issues, request help, dispute resolution | - |
| **Company** | Invite workers, assign jobs, pay commissions, internal chat | Receive bookings, message, deliver services | - | Handle disputes, raise issues | Application for approval, compliance |
| **Customer Support** | View conversations, resolve disputes, moderate content | View conversations, resolve disputes, provide support | View conversations, resolve disputes, monitor compliance | Team collaboration | Escalate issues, report trends |
| **Admin** | Approve profiles, suspend accounts, view analytics | Suspend accounts, view analytics | Approve companies, suspend accounts, view analytics | Hire, manage, review performance | - |

### Key Interaction Scenarios

#### Scenario 1: Client Seeks Service

**Option A: Hire Individual Worker**
```
Client → Browse Workers → View Worker Profile → Message Worker (optional) 
→ Book Worker Directly OR Post Job → Receive Quote → Accept Quote → Booking Created 
→ Worker Delivers Service → Client Reviews Worker
```

**Option B: Hire Company**
```
Client → Browse Companies → View Company Profile → View Company's Workers (optional)
→ Message Company (optional) → Post Job OR Book Company Directly → Company Submits Quote
→ Client Accepts → Company Assigns Worker → Worker Delivers Service 
→ Client Reviews Both Company and Worker
```

**Option C: Post Job and Wait**
```
Client → Post Job → Both Workers and Companies Submit Quotes → Client Compares Quotes
→ Client Selects Best Option → Accepts Quote → Booking Created
→ Service Delivered → Client Reviews
```

#### Scenario 2: Worker Joins Company

**Invitation Flow**:
```
Company → Browses Workers → Finds Suitable Worker → Sends Invitation (with commission details)
→ Worker Receives Notification → Worker Reviews Company Profile → Worker Accepts/Declines
→ If Accepted: Worker Affiliates with Company → Worker Added to Company Roster
→ Can Receive Company Assignments
```

**Assignment Flow**:
```
Company → Receives Job Booking → Reviews Available Workers → Selects Best Fit Worker
→ Assigns Job to Worker → Worker Notified → Worker Accepts/Declines Assignment
→ If Accepted: Worker Delivers Service → Company and Worker Both Get Reviewed
→ Commission Automatically Calculated
```

#### Scenario 3: Dispute Resolution

**Simple Dispute (Resolved Between Parties)**:
```
Client → Experiences Issue → Messages Worker/Company Directly → Explains Problem
→ Worker/Company Responds → Proposes Solution → Client Accepts → Issue Resolved
→ No Support Involvement Needed
```

**Escalated Dispute**:
```
Client → Experiences Issue → Tries to Resolve with Worker/Company → No Resolution
→ Client Clicks "Report Issue" → Fills Dispute Form → Customer Support Notified
→ Support Agent Reviews → Contacts Both Parties → Gathers Evidence → Mediates Discussion
→ Proposes Fair Solution → Both Parties Accept → Issue Resolved → Support Closes Case
```

**Complex Dispute Requiring Admin**:
```
Client → Reports Serious Issue (fraud, safety) → Customer Support Reviews → Flags as Critical
→ Support Escalates to Admin → Admin Investigates → Reviews User History
→ Admin Makes Decision (refund + ban worker) → Admin Implements Decision
→ User Banned → Support Notifies Client → Case Closed
```

#### Scenario 4: Worker Onboarding

**Independent Worker Path**:
```
Worker → Registers Account → Creates Profile → Uploads Portfolio → Submits for Approval
→ Admin Reviews Application → Admin Approves → Worker Receives Notification
→ Profile Goes Live → Worker Can Browse Jobs → Worker Submits Quotes
→ Gets First Booking → Delivers Service → Receives First Review → Establishes Reputation
```

**Company-Affiliated Worker Path**:
```
Worker → Already Approved on Platform → Receives Company Invitation → Reviews Company
→ Accepts Invitation → Becomes Affiliated → Can Accept Company Jobs AND Independent Jobs
→ Company Assigns First Job → Delivers Service → Reviews Split (Company + Worker)
→ Commission Paid by Company
```

#### Scenario 5: Company Operations

**Company Getting Started**:
```
Company → Registers → Submits Business Documents → Admin Reviews → Admin Approves
→ Company Sets Up Profile → Invites Workers (or new workers register)
→ Workers Accept → Company Roster Established → Company Can Quote on Jobs
→ Receives First Booking → Assigns to Worker → Worker Delivers → Reviews Received
→ Company Reputation Built
```

**Company Scaling**:
```
Company → Successful Track Record → Receives More Bookings → Needs More Workers
→ Invites More Workers → Larger Team → Can Take Bigger Jobs → Can Offer Team Services
→ Multiple Workers on Same Job → Higher Revenue → Better Reviews → More Business
```

#### Scenario 6: Customer Support Daily Operations

**Typical Day**:
```
Support Agent → Logs In → Checks Queue → Sees 5 New Disputes
→ Takes First Dispute (payment issue) → Reviews Details → Contacts Client and Worker
→ Mediates → Resolves with Partial Refund → Closes Case
→ Takes Second Dispute (no-show) → Investigates → Worker Had Emergency
→ Facilitates Rescheduling → Adds Note → Closes Case
→ Reviews Flagged Content (inappropriate profile photo) → Removes Photo → Warns User
→ Answers Support Message (how to post job) → Provides Guidance → Closes Ticket
→ End of Day Report → Updates Metrics → Logs Off
```

#### Scenario 7: Admin Monthly Operations

**Monthly Routine**:
```
Admin → Reviews Last Month's Analytics → Identifies Trends (plumbing demand up 20%)
→ Approves 15 New Workers → Approves 2 New Companies → Rejects 3 Applications (incomplete)
→ Reviews Customer Support Performance → Meets with Support Team → Provides Feedback
→ Reviews Suspended Accounts → Lifts 2 Suspensions → Upholds 3 Bans
→ Updates Service Category List (adds "Smart Home Installation")
→ Sends Platform Announcement (new service category available)
→ Checks Fraud Alerts → Investigates 1 Suspicious Company → Bans Company for Fake Reviews
→ Generates Monthly Report for Stakeholders → Plans Next Month Strategy
```

---

## Data Model Changes

### New Tables Required

#### 1. **companies** Table
```
id: serial primary key
ownerId: integer (FK to users.id) - Company account owner
companyName: varchar(200) unique not null
businessDescription: text (100-500 chars)
logo: varchar(500) - Logo image URL
businessRegistrationNumber: varchar(100)
taxId: varchar(100)
yearsInBusiness: integer
teamSize: integer
serviceCategories: text[] - Array of categories
serviceAreas: text[] - Array of CDMX zones
operatingHours: text - JSON string
emergencyServiceAvailable: boolean
responseTimeGuarantee: integer - Hours
insuranceProvider: varchar(200)
insurancePolicyNumber: varchar(100)
verificationStatus: enum (pending, approved, rejected)
verificationDocuments: text[] - Array of document URLs
approvedBy: integer (FK to users.id) - Admin who approved
approvedAt: timestamp
isActive: boolean - Can be suspended by admin
createdAt: timestamp
updatedAt: timestamp
```

#### 2. **companyWorkers** Table (Many-to-Many)
```
id: serial primary key
companyId: integer (FK to companies.id)
workerId: integer (FK to workerProfiles.id)
commissionRate: decimal(5,2) - Percentage (e.g., 15.00 for 15%)
serviceCategories: text[] - Categories worker handles for company
status: enum (invited, active, inactive, left)
invitedAt: timestamp
joinedAt: timestamp
leftAt: timestamp
invitationMessage: text
acceptanceNotes: text
createdAt: timestamp
updatedAt: timestamp
```

#### 3. **companyJobs** Table
```
id: serial primary key
companyId: integer (FK to companies.id)
jobId: integer (FK to jobs.id)
quoteId: integer (FK to quotes.id)
assignedWorkerId: integer (FK to workerProfiles.id) - Can be null initially
assignedAt: timestamp
assignmentStatus: enum (pending, accepted, declined, completed)
assignmentNotes: text
workerDeclineReason: text
companyRevenue: decimal(10,2)
workerPayment: decimal(10,2)
commissionAmount: decimal(10,2)
createdAt: timestamp
```

#### 4. **companyReviews** Table
```
id: serial primary key
bookingId: integer (FK to bookings.id)
clientId: integer (FK to users.id)
companyId: integer (FK to companies.id)
workerId: integer (FK to workerProfiles.id) - The worker who did the job
companyRating: integer (1-5)
workerRating: integer (1-5)
companyComment: text
workerComment: text
responseTime: integer (1-5)
professionalism: integer (1-5)
valueForMoney: integer (1-5)
createdAt: timestamp
```

#### 5. **companyPortfolio** Table
```
id: serial primary key
companyId: integer (FK to companies.id)
title: text
description: text
serviceCategory: text
completedDate: timestamp
clientName: text (optional, with permission)
teamSize: integer - Number of workers involved
projectValue: decimal(10,2) (optional)
isVerified: boolean
createdAt: timestamp
```

#### 6. **companyPortfolioMedia** Table
```
id: serial primary key
portfolioId: integer (FK to companyPortfolio.id)
mediaUrl: text
mediaType: text (image/video)
description: text
sortOrder: integer
createdAt: timestamp
```

#### 7. **disputes** Table
```
id: serial primary key
bookingId: integer (FK to bookings.id)
raisedBy: integer (FK to users.id) - Who raised the dispute
disputedAgainst: integer (FK to users.id) - The other party
disputeCategory: enum (no_show, quality_issue, payment_dispute, safety_concern, fraud, other)
description: text
evidenceUrls: text[] - Photos, documents
desiredResolution: text
priority: enum (low, medium, high, critical)
status: enum (open, in_progress, resolved, closed, escalated)
assignedTo: integer (FK to users.id) - Customer support agent
resolution: text
resolutionType: enum (refund_full, refund_partial, redo_work, warning, dismissal, other)
refundAmount: decimal(10,2)
satisfactionRating: integer (1-5) - Client rates dispute resolution
createdAt: timestamp
resolvedAt: timestamp
closedAt: timestamp
```

#### 8. **supportTickets** Table
```
id: serial primary key
userId: integer (FK to users.id)
category: enum (technical, account, policy, guidance, other)
subject: varchar(200)
description: text
priority: enum (low, medium, high, urgent)
status: enum (open, in_progress, waiting_user, resolved, closed)
assignedTo: integer (FK to users.id) - Support agent
attachments: text[]
createdAt: timestamp
resolvedAt: timestamp
closedAt: timestamp
```

#### 9. **supportMessages** Table
```
id: serial primary key
ticketId: integer (FK to supportTickets.id)
senderId: integer (FK to users.id)
message: text
isInternal: boolean - Internal notes between support agents
createdAt: timestamp
```

#### 10. **userSanctions** Table
```
id: serial primary key
userId: integer (FK to users.id)
sanctionType: enum (warning, content_removal, temporary_suspension, permanent_ban, account_deletion)
reason: text
evidenceUrls: text[]
issuedBy: integer (FK to users.id) - Admin or support agent
duration: integer - Days (null for permanent)
startDate: timestamp
endDate: timestamp
status: enum (active, completed, appealed, overturned)
notes: text
createdAt: timestamp
```

#### 11. **contentModerationQueue** Table
```
id: serial primary key
contentType: enum (profile_description, portfolio_image, job_posting, review, message)
contentId: integer - ID of the flagged content
userId: integer (FK to users.id) - Content owner
flaggedBy: integer (FK to users.id) - Who flagged it (can be system)
flagReason: enum (inappropriate_language, spam, fraud, explicit_content, discrimination, other)
flagDescription: text
contentSnapshot: text - Copy of flagged content
status: enum (pending, reviewed, approved, removed, escalated)
reviewedBy: integer (FK to users.id) - Support agent
reviewNotes: text
action: enum (no_action, warning, content_removed, user_suspended)
createdAt: timestamp
reviewedAt: timestamp
```

#### 12. **adminActions** Table (Audit Log)
```
id: serial primary key
adminId: integer (FK to users.id)
actionType: enum (approve_worker, approve_company, reject_application, suspend_user, ban_user, delete_account, other)
targetUserId: integer (FK to users.id) - User affected
targetEntityType: varchar(50) - "worker", "company", etc.
targetEntityId: integer
actionDetails: text - JSON with details
reason: text
createdAt: timestamp
```

#### 13. **platformSettings** Table
```
id: serial primary key
settingKey: varchar(100) unique
settingValue: text - Can be JSON
description: text
updatedBy: integer (FK to users.id)
updatedAt: timestamp
```

#### 14. **notifications** Table
```
id: serial primary key
userId: integer (FK to users.id)
notificationType: enum (booking, message, quote, review, dispute, approval, system)
title: varchar(200)
message: text
linkUrl: varchar(500)
isRead: boolean default false
createdAt: timestamp
readAt: timestamp
```

### Modified Tables

#### **users** Table - Add Fields:
```
userType: enum (individual_worker, client, company, customer_support, admin) - Replaces simple 'role'
companyId: integer (FK to companies.id) - If user is company account
verificationStatus: enum (unverified, pending, verified, rejected)
isActive: boolean default true - Can be suspended
suspensionEndDate: timestamp - When suspension ends
accountStatus: enum (active, suspended, banned, deleted)
lastLoginAt: timestamp
```

#### **workerProfiles** Table - Add Fields:
```
affiliatedCompanyId: integer (FK to companies.id) - null if independent
affiliationStatus: enum (independent, company_affiliated)
canAcceptIndependentWork: boolean default true
verificationBadge: boolean default false
adminApprovedBy: integer (FK to users.id)
adminApprovedAt: timestamp
```

#### **bookings** Table - Add Fields:
```
bookingSource: enum (direct_worker, direct_company, job_quote)
companyId: integer (FK to companies.id) - If booked through company
commissionRate: decimal(5,2) - If applicable
disputeId: integer (FK to disputes.id) - If dispute raised
```

#### **quotes** Table - Add Fields:
```
quotedByType: enum (individual_worker, company)
companyId: integer (FK to companies.id) - If company quote
assignedWorkerId: integer (FK to workerProfiles.id) - If company assigns worker
teamSize: integer - For company quotes
guarantee: text - Service guarantee offered
insuranceCovered: boolean
```

#### **reviews** Table - Modify:
- Rename to **workerReviews** for clarity
- Add field `reviewSource: enum (direct_booking, company_booking)`

### Indexes for Performance

```sql
-- Company searches
CREATE INDEX idx_companies_service_areas ON companies USING GIN (serviceAreas);
CREATE INDEX idx_companies_service_categories ON companies USING GIN (serviceCategories);
CREATE INDEX idx_companies_verification_status ON companies(verificationStatus);

-- Worker-Company relationships
CREATE INDEX idx_company_workers_company ON companyWorkers(companyId);
CREATE INDEX idx_company_workers_worker ON companyWorkers(workerId);
CREATE INDEX idx_company_workers_status ON companyWorkers(status);

-- Disputes
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_assigned_to ON disputes(assignedTo);
CREATE INDEX idx_disputes_priority ON disputes(priority);

-- Support tickets
CREATE INDEX idx_support_tickets_status ON supportTickets(status);
CREATE INDEX idx_support_tickets_assigned ON supportTickets(assignedTo);

-- Moderation queue
CREATE INDEX idx_moderation_status ON contentModerationQueue(status);

-- User management
CREATE INDEX idx_users_user_type ON users(userType);
CREATE INDEX idx_users_account_status ON users(accountStatus);
```

---

## Workflow Diagrams

### Workflow 1: Client Job Posting Flow (v2 Enhanced)

```
Client Logs In
    ↓
Navigates to "Post Job"
    ↓
Step 1: Job Details
    ├─ Service Category
    ├─ Description
    ├─ Location/Zone
    ├─ Budget
    └─ Urgency
    ↓
Step 2: Target Audience Selection ← NEW
    ├─ Individual Workers Only
    ├─ Companies Only
    └─ Both
    ↓
Step 3: Team Size Preference ← NEW (if company selected)
    ├─ Single Worker
    └─ Multiple Workers (team job)
    ↓
Step 4: Upload Images & Contact Info
    ↓
Submit Job
    ↓
Job Posted
    ↓
    ├─ Workers See Job (if targeted)
    ├─ Companies See Job (if targeted)
    └─ Both can submit quotes
    ↓
Client Receives Quotes
    ├─ Worker Quotes (individual)
    └─ Company Quotes (with assigned worker info)
    ↓
Client Compares Quotes
    ├─ Price
    ├─ Reviews/Ratings
    ├─ Response Time
    └─ Guarantees (companies may offer)
    ↓
Client Accepts Best Quote
    ↓
Booking Created
    ├─ If Worker: Direct booking
    └─ If Company: Company assigns worker
    ↓
Service Delivered
    ↓
Review Process ← ENHANCED
    ├─ If Worker: Review worker
    └─ If Company: Review both company AND worker
```

### Workflow 2: Company Worker Assignment

```
Company Receives Job Booking
    ↓
Reviews Job Requirements
    ├─ Service type
    ├─ Location
    ├─ Timeline
    └─ Complexity
    ↓
Checks Worker Availability
    ├─ View worker calendar
    ├─ Check worker locations
    └─ Review worker specializations
    ↓
Selects Best Fit Worker(s)
    ├─ Match specialization
    ├─ Geographic proximity
    ├─ Availability
    └─ Performance history
    ↓
Assigns Job to Worker
    ↓
Worker Receives Assignment Notification
    ↓
Worker Reviews Assignment
    ├─ Job details
    ├─ Timeline
    ├─ Location
    └─ Commission amount
    ↓
Worker Decision
    ├─ Accept Assignment
    │   ↓
    │   Worker Confirmed
    │   ↓
    │   Client Notified
    │   ↓
    │   Service Scheduled
    │
    └─ Decline Assignment
        ↓
        Provide Decline Reason
        ↓
        Company Notified
        ↓
        Company Assigns Different Worker
        (Loop back to "Selects Best Fit Worker")
```

### Workflow 3: Dispute Resolution (Complete Flow)

```
Issue Occurs
    ↓
Client Attempts Direct Resolution
    ├─ Messages Worker/Company
    └─ Explains Issue
    ↓
Response within 24 hours?
    ├─ YES → Issue Resolved → End
    │
    └─ NO (or unsatisfactory)
        ↓
        Client Escalates
        ↓
        Client Clicks "Report Issue"
        ↓
        Fills Dispute Form
            ├─ Category selection
            ├─ Description
            ├─ Evidence upload
            └─ Desired resolution
        ↓
        Dispute Created in System
        ↓
        Priority Assigned (Auto)
            ├─ Critical: Safety/Fraud → Immediate
            ├─ High: Payment/No-show → 2 hours
            ├─ Medium: Quality → 24 hours
            └─ Low: Minor → 48 hours
        ↓
        Assigned to Customer Support Agent
        ↓
        Support Agent Reviews Case
            ├─ Reads dispute details
            ├─ Reviews conversation history
            ├─ Checks user histories
            └─ Examines evidence
        ↓
        Support Contacts Both Parties
            ├─ Gets worker/company perspective
            ├─ Requests additional evidence
            └─ Clarifies details
        ↓
        Support Agent Analysis
            ├─ Policy violation?
            ├─ Who is at fault?
            ├─ Severity assessment
            └─ Fair resolution determination
        ↓
        Simple Case?
            ├─ YES → Support Makes Decision
            │        ↓
            │        Implements Resolution
            │            ├─ Refund issued
            │            ├─ Warning issued
            │            └─ Service redo arranged
            │        ↓
            │        Both Parties Notified
            │        ↓
            │        Case Closed
            │        ↓
            │        Follow-up Survey
            │
            └─ NO (Complex/Severe)
                ↓
                Escalate to Admin
                ↓
                Admin Reviews Case
                ↓
                Admin Investigation
                    ├─ Deep dive into history
                    ├─ Pattern analysis
                    └─ Legal/policy review
                ↓
                Admin Decision
                    ├─ Issue refund
                    ├─ Suspend user
                    ├─ Ban user
                    └─ Other sanctions
                ↓
                Admin Implements Decision
                ↓
                All Parties Notified
                ↓
                Case Closed
                ↓
                Case Added to User Records
```

### Workflow 4: Worker Application & Approval

```
Worker Registers Account
    ↓
Creates Worker Profile
    ├─ Description (20-400 chars)
    ├─ Service categories
    ├─ Service areas (CDMX zones)
    ├─ Availability
    ├─ Upload portfolio
    └─ Profile picture
    ↓
Submits for Approval
    ↓
Profile Enters Admin Queue
    ↓
Admin Receives Notification
    ↓
Admin Reviews Application
    ├─ Profile completeness check
    ├─ Portfolio quality assessment
    ├─ Content appropriateness
    ├─ Duplicate account check
    └─ Verification documents (if required)
    ↓
Admin Decision
    ├─ APPROVE
    │   ↓
    │   Worker Status → Verified
    │   ↓
    │   Verification Badge Added
    │   ↓
    │   Profile Goes Live
    │   ↓
    │   Worker Receives Email
    │   ↓
    │   Worker Can Quote on Jobs
    │
    ├─ REQUEST CHANGES
    │   ↓
    │   Admin Lists Issues
    │   ↓
    │   Worker Receives Feedback
    │   ↓
    │   Worker Makes Changes
    │   ↓
    │   Resubmits (back to Admin Queue)
    │
    └─ REJECT
        ↓
        Admin Provides Detailed Reason
        ↓
        Worker Receives Rejection Notice
        ↓
        Account Flagged
        ↓
        Cannot Reapply for 6 Months
```

### Workflow 5: Company Onboarding

```
Company Registers Account
    ↓
Fills Company Application
    ├─ Business information
    ├─ Service categories
    ├─ Service areas
    ├─ Team size
    └─ Operating hours
    ↓
Uploads Verification Documents
    ├─ Business registration
    ├─ Tax ID
    ├─ Insurance certificates
    ├─ Owner ID
    └─ Bank information
    ↓
Submits Application
    ↓
Admin Receives Application
    ↓
Admin Initial Review
    ├─ Document completeness
    ├─ Information accuracy
    └─ Red flag check
    ↓
Admin Background Check
    ├─ Online reputation search
    ├─ Business registration verification
    ├─ Legal issues check
    └─ Industry compliance
    ↓
Risk Assessment
    ├─ Low Risk → Fast track approval
    ├─ Medium Risk → Standard approval
    └─ High Risk → Detailed review or reject
    ↓
Admin Decision
    ├─ APPROVE
    │   ↓
    │   Company Status → Verified
    │   ↓
    │   Welcome Email Sent
    │   ↓
    │   Company Can Set Up Profile
    │
    ├─ PROVISIONAL APPROVAL
    │   ↓
    │   Limited Access Granted
    │   ↓
    │   First 10 Jobs Monitored Closely
    │   ↓
    │   Full Approval After Review
    │
    ├─ REQUEST MORE INFO
    │   ↓
    │   Specify Missing Documents
    │   ↓
    │   Company Provides Info
    │   ↓
    │   Back to Admin Review
    │
    └─ REJECT
        ↓
        Provide Detailed Reason
        ↓
        Company Notified
        ↓
        Can Reapply After Issues Resolved
    ↓
(If Approved)
Company Sets Up Profile
    ├─ Upload logo
    ├─ Write description
    ├─ Add portfolio
    └─ Configure settings
    ↓
Company Invites Workers
    ├─ Search platform workers
    ├─ Send invitations
    └─ Set commission rates
    ↓
Workers Accept Invitations
    ↓
Company Roster Established
    ↓
Company Goes Live
    ↓
Can Quote on Jobs
    ↓
Ongoing Monitoring by Admin
    ├─ First month: Close monitoring
    ├─ Quarterly: Compliance checks
    └─ Annual: Re-verification
```

---

## Feature Comparison Matrix

| Feature | Individual Worker (v1) | Individual Worker (v2) | Client (v1) | Client (v2) | Company | Customer Support | Admin |
|---------|----------------------|----------------------|-------------|-------------|---------|------------------|-------|
| **Profile Creation** | ✅ Full | ✅ Enhanced + Affiliation | ✅ Basic | ✅ Enhanced | ✅ Full Business Profile | N/A | N/A |
| **Browse Jobs** | ✅ | ✅ Independent + Company-assigned | ❌ | ❌ | ✅ Company-targeted | ❌ | ❌ |
| **Post Jobs** | ❌ | ❌ | ✅ | ✅ Enhanced targeting | ❌ | ❌ | ❌ |
| **Submit Quotes** | ✅ | ✅ | ❌ | ❌ | ✅ With worker assignment | ❌ | ❌ |
| **Receive Bookings** | ✅ | ✅ Direct + Company | ❌ | ❌ | ✅ Then assigns to workers | ❌ | ❌ |
| **Create Bookings** | ❌ | ❌ | ✅ | ✅ Workers or Companies | ❌ | ❌ | ❌ |
| **Portfolio Management** | ✅ | ✅ + Ownership stays with worker | ❌ | ❌ | ✅ Company portfolio | ❌ | ❌ |
| **Leave Reviews** | ❌ | ❌ | ✅ | ✅ Dual reviews (company + worker) | ❌ | ❌ | ❌ |
| **Receive Reviews** | ✅ | ✅ Individual + Company context | ❌ | ❌ | ✅ Company-level | ❌ | ❌ |
| **Direct Messaging** | ✅ With clients | ✅ With clients + company | ✅ With workers | ✅ With workers/companies | ✅ With clients/workers | 👁️ View only | ❌ |
| **Raise Disputes** | ✅ Against clients | ✅ Against clients | ✅ Against workers | ✅ Against workers/companies | ✅ Against clients | ❌ Receive only | ❌ |
| **Resolve Disputes** | ❌ | ❌ | ❌ | ❌ | ❌ Initial attempt | ✅ Primary role | ✅ Final authority |
| **Join Company** | ❌ | ✅ NEW | ❌ | ❌ | N/A | ❌ | ❌ |
| **Manage Workers** | ❌ | ❌ | ❌ | ❌ | ✅ Full roster mgmt | ❌ | ❌ |
| **Assign Jobs** | ❌ | ❌ | ❌ | ❌ | ✅ To affiliated workers | ❌ | ❌ |
| **Commission System** | ❌ | ✅ Receive from company | ❌ | ❌ | ✅ Pay to workers | ❌ | ❌ |
| **Verification Badge** | ❌ | ✅ Admin-approved | ❌ | ❌ | ✅ Admin-approved | ❌ | N/A |
| **View All Conversations** | ❌ | ❌ | ❌ | ❌ | ❌ Internal only | ✅ Platform-wide | ✅ Platform-wide |
| **Content Moderation** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Review & remove | ✅ Final say |
| **User Suspension** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ Recommend only | ✅ Execute |
| **Platform Analytics** | ❌ Personal stats | ❌ Personal stats | ❌ Personal stats | ❌ Personal stats | ✅ Company analytics | ✅ Support metrics | ✅ Full platform |
| **Approve Users** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Workers & Companies |
| **Manage Support Team** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Hire, review, manage |
| **Configure Platform** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Full control |

**Legend:**
- ✅ Full access/capability
- ⚠️ Limited access/capability
- 👁️ View-only access
- ❌ No access/not applicable
- N/A Not applicable to this role

---

## Migration Strategy

### Phase 1: Foundation (Months 1-2)
**Goal**: Establish new role infrastructure without disrupting existing users

**Tasks**:
1. **Database Schema Updates**
   - Add new tables (companies, companyWorkers, disputes, supportTickets, etc.)
   - Add fields to existing tables (users.userType, workerProfiles.affiliatedCompanyId, etc.)
   - Create indexes for performance
   - Run migrations on staging environment first

2. **Backend API Development**
   - Create company registration endpoints
   - Create admin approval endpoints
   - Create customer support dispute endpoints
   - Update authentication to handle 5 user types
   - Maintain backward compatibility with v1 API

3. **Admin Interface (MVP)**
   - Admin login and dashboard
   - Worker approval queue
   - Company approval queue
   - Basic user management (suspend/ban)
   - Analytics dashboard (basic metrics)

4. **Testing**
   - Unit tests for new API endpoints
   - Integration tests for approval flows
   - Security testing for admin access
   - Performance testing for new queries

### Phase 2: Company & Support Roles (Months 3-4)
**Goal**: Launch company registration and customer support functionality

**Tasks**:
1. **Company Features**
   - Company registration flow
   - Company profile creation
   - Worker invitation system
   - Job quoting system for companies
   - Company dashboard (basic version)
   - Company portfolio management

2. **Customer Support Features**
   - Support dashboard
   - Dispute resolution interface
   - Conversation viewer
   - Content moderation queue
   - Support ticket system
   - Knowledge base/FAQ editor

3. **Enhanced Client Experience**
   - Update job posting to target companies
   - Update search to include companies
   - Dual review system (company + worker)
   - Enhanced dispute reporting

4. **Launch Preparation**
   - Hire and train first customer support agents
   - Create support guidelines and documentation
   - Onboard pilot companies (5-10)
   - Beta test with selected users

### Phase 3: Worker Affiliation (Months 5-6)
**Goal**: Enable workers to join companies

**Tasks**:
1. **Worker-Company Features**
   - Company invitation workflow
   - Worker acceptance/decline interface
   - Commission tracking system
   - Job assignment from company to worker
   - Dual reputation system (independent + company)

2. **Enhanced Worker Dashboard**
   - Affiliation management
   - Company-assigned jobs tab
   - Earnings breakdown
   - Independence settings

3. **Company Worker Management**
   - Worker roster management
   - Assignment interface
   - Performance tracking
   - Commission calculation and reporting

4. **Testing & Refinement**
   - Test worker invitation flow
   - Test job assignment
   - Test commission calculations
   - Gather feedback from pilot companies and workers

### Phase 4: Full Admin Tools (Months 7-8)
**Goal**: Complete admin functionality for platform management

**Tasks**:
1. **Advanced Admin Features**
   - Comprehensive analytics dashboard
   - Customer support team management
   - Platform configuration tools
   - Fraud detection tools
   - Bulk operations (mass approve/reject)
   - Audit logging

2. **Policy & Compliance**
   - Update Terms of Service for 5 roles
   - Company-specific policies
   - Support resolution guidelines
   - Admin operation procedures
   - Legal compliance review

3. **Communication Systems**
   - Email templates for all new workflows
   - In-app notifications system
   - System announcements capability
   - Multi-language support (Spanish/English)

4. **Documentation**
   - User guides for each role
   - Admin operation manual
   - Support agent training materials
   - API documentation
   - Developer documentation

### Phase 5: Launch & Optimization (Months 9-10)
**Goal**: Full public launch with optimization

**Tasks**:
1. **Soft Launch**
   - Open company registration to public
   - Announce new features to existing users
   - Monitor performance and issues
   - Rapid bug fixing

2. **Marketing & Onboarding**
   - Company outreach campaign
   - Worker affiliation promotion
   - Client education (companies available)
   - Onboarding assistance

3. **Monitoring & Optimization**
   - Performance monitoring
   - User feedback collection
   - Identify bottlenecks
   - Optimize database queries
   - Refine approval processes

4. **Scaling**
   - Add more customer support agents as needed
   - Optimize admin approval queue
   - Improve search algorithms
   - Enhance matching (company/worker to jobs)

### Migration Considerations

**Data Migration**:
- Existing workers: Remain as "independent" workers
- Existing clients: No changes, gain ability to hire companies
- Existing reviews: Remain as worker reviews
- Existing bookings: Source marked as "direct_worker"
- All existing data preserved

**User Communication**:
- Email announcement about new features
- In-app notifications
- Help center updates
- Optional webinars/training

**Backward Compatibility**:
- v1 API endpoints remain functional
- Gradual deprecation if needed
- Clear migration path for any breaking changes
- Support for both systems during transition

**Risk Mitigation**:
- Feature flags for gradual rollout
- Rollback plans for each phase
- Staging environment mirrors production
- Beta testing with selected users
- Phased launch by user type

**Success Metrics**:
- Company registration rate
- Worker affiliation rate
- Dispute resolution time
- User satisfaction scores
- Platform growth rate
- Customer support efficiency
- Admin approval time
- Platform uptime and performance

---

## Summary

The expansion of TrustMe Marketplace from 2 roles to 5 roles represents a significant evolution:

### Key Improvements

**For Existing Users**:
- **Workers**: Gain option to join companies for stable work, verification badges, better visibility
- **Clients**: Can hire companies for reliability, better dispute resolution, more choices

**For Platform Growth**:
- **Companies**: Enables B2B operations, scalable service delivery, professional teams
- **Customer Support**: Professional dispute resolution, user assistance, quality control
- **Admin**: Platform moderation, quality assurance, data-driven decisions

### Strategic Benefits

1. **Quality Control**: Admin approval ensures only qualified workers and legitimate companies
2. **Trust & Safety**: Customer support provides professional dispute resolution
3. **Scalability**: Companies can handle larger jobs and multiple clients simultaneously
4. **Flexibility**: Workers choose independence, company affiliation, or both
5. **Professionalism**: Verification badges, business documentation, accountability
6. **Growth**: Opens platform to enterprise clients and professional service companies
7. **Data-Driven**: Admin analytics enable informed platform improvements

### Implementation Path

The phased approach ensures:
- Minimal disruption to existing users
- Thorough testing of each new feature
- Time to train customer support staff
- Opportunity to refine based on feedback
- Manageable development workload
- Risk mitigation through gradual rollout

This 5-role system positions TrustMe Marketplace as a comprehensive, professional platform that serves individual clients, workers, and businesses while maintaining high standards through moderation and support.
