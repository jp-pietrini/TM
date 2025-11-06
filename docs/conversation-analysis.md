# TrustMe Platform - Comprehensive Analysis & Q&A

**Date:** January 2025
**Purpose:** Complete documentation analysis and stakeholder Q&A for PRD development

---

## Executive Summary

The documentation provides a solid foundation with comprehensive coverage of user roles, data models, and workflows. However, there are significant gaps around the core differentiators (AI and WhatsApp integration), business model mechanics, and some workflow details. The v2 expansion is well-conceived but introduces complexity that needs careful implementation planning.

### Critical Findings:
- ✅ **Strong:** Data modeling, role definitions, dispute resolution framework
- ⚠️ **Concerning:** Missing AI/WhatsApp integration details, unclear commission/payment flows, limited mobile-first considerations
- ❌ **Blocking:** No business model clarity, missing technical architecture, unclear WhatsApp integration strategy

---

## A. What's Working Well

### 1. Role Definition & Separation ⭐⭐⭐⭐⭐

**Strength:** The five-role system is exceptionally well thought out.

- Clear responsibilities for each role
- Minimal overlap/confusion
- Logical progression from v1 to v2
- Customer Support and Admin roles address real marketplace needs

**Evidence:**
- Individual Worker vs Company distinction is clear
- Customer Support role prevents admin overload
- Admin focuses on strategic vs operational tasks

### 2. Data Model Comprehensiveness ⭐⭐⭐⭐⭐

**Strength:** Database schema is thorough and well-normalized.

- Proper relationships and foreign keys
- Audit trails (adminActions, userSanctions)
- Flexibility (portfolioProjects vs legacy portfolioImages)
- Status tracking throughout lifecycle

**Highlights:**
- `disputes` table with detailed tracking
- `companyWorkers` junction table with commission rates
- `contentModerationQueue` for safety
- `notifications` for user engagement

### 3. Dispute Resolution Framework ⭐⭐⭐⭐

**Strength:** Multi-tiered dispute handling is marketplace best practice.

- Three-tier escalation (direct → support → admin)
- Clear SLAs by priority level
- Documented resolution types
- Follow-up mechanisms

**Evidence:**
- Priority levels with time SLAs defined
- Resolution types enumerated (refund_full, partial, redo_work, etc.)
- Satisfaction tracking post-resolution

### 4. Geographic Focus ⭐⭐⭐⭐

**Strength:** CDMX-specific approach is smart for initial launch.

- Defined zones (Polanco, Roma, Condesa, etc.)
- Service area matching for workers
- Location-based job discovery
- Manageable geographic scope

### 5. Portfolio System Evolution ⭐⭐⭐⭐

**Strength:** Project-based portfolios are superior to image-only.

- Projects with multiple media items
- Service category tagging
- Completion dates for credibility
- Public/private visibility control
- Client email verification option

### 6. Approval Workflows ⭐⭐⭐⭐

**Strength:** Admin approval for workers/companies ensures quality.

- Verification badge system
- Document verification process
- Provisional approval option for companies
- Appeals process

### 7. Dual Review System ⭐⭐⭐⭐

**Strength:** Reviewing both company AND worker is essential.

- Captures company service quality separately
- Worker maintains personal reputation
- Addresses attribution correctly

---

## B. What's Not Working

### 1. AI Integration - Completely Absent ⭐ CRITICAL

**Issue:** Documents mention "AI-powered" but provide zero implementation details.

**Problems:**
- No AI use cases defined
- No matching algorithm described
- No recommendation engine specified
- No natural language processing for search
- No predictive analytics for pricing

**Impact:** Major differentiator is undefined. Can't build PRD without this.

**Questions Needed:**
- What AI models will be used? (OpenAI, Anthropic, open-source?)
- What specific problems does AI solve?
  - Better worker-job matching?
  - Smart pricing suggestions?
  - Fraud detection?
  - Chatbot for customer support?
  - Review sentiment analysis?
- Where does AI processing happen? (real-time vs batch)
- What data trains the models?
- Cost implications?

### 2. WhatsApp Integration - Vague ⭐ CRITICAL

**Issue:** Mentioned as core feature but not architected.

**Missing Details:**
- Communication Flow: How do messages route between platform and WhatsApp?
- Notification Strategy: What triggers WhatsApp messages vs email vs in-app?
- Booking via WhatsApp: Can clients book directly through WhatsApp?
- WhatsApp Business API: Requirements and limitations
- Message Threading: How to maintain conversation context?
- Media Sharing: Image/video handling via WhatsApp
- Rate Limits: WhatsApp API has strict limits
- Template Messages: WhatsApp requires pre-approved templates

**Questions Needed:**
- Official WhatsApp Business API or unofficial solutions?
- Twilio/MessageBird integration?
- Which workflows happen in WhatsApp vs platform?
- How to prevent users from bypassing platform entirely?
- Cost per message?

### 3. Payment & Commission Flow - Undefined ⭐⭐ HIGH PRIORITY

**Issue:** No clear payment processing or commission calculation.

**Missing:**
- How do clients pay? (credit card, cash on delivery, bank transfer?)
- When is payment processed? (upfront, on completion, escrow?)
- How are workers/companies paid? (weekly, per job, on-demand?)
- What's the platform's commission rate?
- Who pays payment processing fees?
- Refund mechanics for disputes?
- Tax handling (Mexico's IVA/VAT)?
- Banking integrations (Stripe, MercadoPago, SPEI transfers?)

**Evidence in docs:**
- BalanceTab mentioned as "(Backend integration pending)"
- No transactions or payments table
- Commission rates defined in companyWorkers but no payment execution
- Dispute refunds mentioned but no payment reversal mechanism

**Impact:** Can't launch without payment infrastructure.

### 4. Mobile-First Strategy - Weak ⭐⭐ HIGH PRIORITY

**Issue:** Docs focus on web, but Mexico City users are mobile-first.

**Concerns:**
- "Mobile-first approach" mentioned but implementation is web-responsive
- No native app discussion (iOS/Android)
- WhatsApp integration suggests mobile usage but no mobile deep linking
- Upload flows designed for desktop (drag-and-drop)
- Dashboard layouts have "mobile" and "desktop" versions but no native optimization

**Recommendations:**
- Should this be a PWA (Progressive Web App)?
- Native app requirements? (Camera access, push notifications, geolocation)
- Mobile number as primary identifier (aligns with WhatsApp)
- Simplified mobile flows (fewer steps)

### 5. Worker-Company Commission Complexity ⭐⭐ MEDIUM

**Issue:** Commission tracking could become messy.

**Problems:**
- Worker affiliated with company but also takes independent jobs
- Commission only on company jobs, not independent jobs
- Tracking revenue source (direct vs company) per booking
- Tax implications (worker is contractor, not employee)
- Disputes about commission rates
- Payment timing (company pays worker when?)

**Recommendation:**
- Separate "company earnings" and "independent earnings" clearly
- Automated commission calculation and transparency
- Clear contracts/agreements digitally signed
- Regular payment schedules (e.g., weekly payouts)

### 6. Search & Discovery - Basic ⭐⭐ MEDIUM

**Issue:** Search is category-based, lacks sophistication.

**Current:**
- Keyword matching for service categories
- Manual filtering (zone, availability)
- No ranking algorithm described
- No personalization

**Missing:**
- **Relevance Ranking:** How are workers sorted in results?
  - By rating only?
  - By distance?
  - By response time?
  - By price?
  - By past success with similar jobs?
- **Smart Search:** Natural language ("need someone to fix my leaking sink tomorrow")
- **Recommendations:** "Workers similar to ones you've hired before"
- **Trending Services:** What's popular in your neighborhood

**Where AI Should Help:**
- Semantic search (not just keyword matching)
- Predictive matching scores
- Dynamic pricing insights

### 7. Notification System - Underspecified ⭐⭐ MEDIUM

**Issue:** notifications table exists but logic is unclear.

**Questions:**
- When are notifications sent? (real-time, batched, configurable?)
- Multi-channel strategy: in-app + email + WhatsApp + SMS?
- User preferences (can users mute certain notification types?)
- Critical vs optional notifications (booking confirmed vs new message)
- Notification fatigue prevention
- Delivery guarantee (what if WhatsApp fails?)

### 8. Fraud Detection - Manual Only ⭐⭐ MEDIUM

**Issue:** Fraud prevention relies on customer support flagging issues.

**Current:**
- Customer Support monitors for fraud indicators
- Admin reviews and bans users
- Manual process, reactive

**Missing:**
- **Automated Fraud Detection:**
  - Duplicate accounts (same device, IP, phone)
  - Fake reviews (pattern detection)
  - Price manipulation
  - Fake portfolio images (reverse image search)
  - Suspicious booking patterns
- **Risk Scoring:** Flag high-risk users/transactions for review
- **Machine Learning:** Learn from past fraud cases

**Where AI Should Help:** This is a perfect AI use case.

### 9. Availability Matching - Simplistic ⭐⭐ LOW-MEDIUM

**Issue:** Availability is just a JSON string of time slots.

**Current:**
- Workers set weekly availability matrix
- Clients select preferred times in job posting
- No intelligent matching

**Missing:**
- Calendar integration (Google Calendar, iCal)
- Real-time availability updates
- Buffer time between jobs
- Travel time consideration
- Overbooked prevention
- Automatic calendar blocks after booking

### 10. Company-Worker Relationship - Unclear Exit ⭐⭐ LOW-MEDIUM

**Issue:** What happens when worker leaves company?

**Scenarios Not Addressed:**
- Worker leaves company mid-contract
- Company fires worker with pending jobs
- Dispute between company and worker over commission
- Worker takes company's clients (non-compete?)
- Portfolio ownership (addressed, but enforcement?)

**Recommendation:**
- Notice period requirements
- Pending job reassignment process
- Dispute resolution between company and worker
- Non-compete clauses (if legal in Mexico)

---

## C. What's Missing

### 1. AI Integration Strategy 🚨 CRITICAL GAP

**Missing Use Cases:**

#### A. Intelligent Job-Worker Matching
```
Input: Job details (description, location, urgency, budget, images)
AI Processing:
  - Understand job requirements via NLP
  - Analyze worker specializations, past performance, availability
  - Calculate match score (0-100)
  - Consider distance, rating, response time
Output: Ranked list of best-fit workers
```

#### B. Smart Pricing Recommendations
```
Input: Job description, location, urgency
AI Processing:
  - Historical pricing data for similar jobs
  - Current market rates in the zone
  - Worker/company rates
  - Demand/supply dynamics
Output: Suggested price range for client, recommended quote for worker
```

#### C. Chatbot for Initial Triage
```
Client: "My sink is leaking badly"
AI: Asks clarifying questions
  - "Where is the leak coming from?"
  - "How long has this been happening?"
  - "Do you see any water damage?"
AI: Suggests:
  - Urgency level (emergency)
  - Service category (Plomería - fuga)
  - Estimated cost range
  - Recommended workers
```

#### D. Review Sentiment Analysis
```
AI Analyzes Reviews:
  - Extract key themes (punctuality, quality, price, communication)
  - Detect fake reviews (pattern matching)
  - Generate worker/company summary ("Known for fast response and quality work")
```

#### E. Fraud Detection AI
```
AI Monitors:
  - Account creation patterns (multiple accounts from same device)
  - Fake portfolio detection (reverse image search)
  - Review manipulation (coordinated reviews)
  - Price manipulation (too good to be true)
  - No-show patterns
Outputs: Risk scores for customer support review
```

#### F. Predictive Analytics
- Job completion likelihood (given worker, job type, distance)
- Dispute probability (based on historical patterns)
- Client churn risk
- Worker retention likelihood
- Revenue forecasting

**Technical Requirements:**
- AI Provider: OpenAI, Anthropic Claude, or open-source?
- Model Selection: GPT-4, Claude Sonnet, Llama 3?
- Infrastructure: Vector database (Pinecone, Weaviate) for embeddings
- Cost Management: Token usage limits, caching strategies
- Latency: Real-time vs batch processing
- Training Data: Privacy-compliant data collection

### 2. WhatsApp Integration Architecture 🚨 CRITICAL GAP

#### A. WhatsApp Business API Setup

**Options:**

**1. Official WhatsApp Business API (via Meta)**
- Requires: Business verification, phone number(s)
- Cost: Conversation-based pricing (~$0.005-0.03 per message)
- Pros: Official, reliable, compliant
- Cons: Approval process, template restrictions

**2. Twilio WhatsApp API**
- Easier integration via Twilio
- Similar pricing
- Faster setup

**3. MessageBird, Vonage, etc.**
- Similar capabilities

**Recommendation:** Twilio WhatsApp API for faster launch

#### B. Communication Flows

**Flow 1: Job Posting Notifications**
```
Client posts job →
Platform identifies matching workers →
Sends WhatsApp notification:
  "New job in your area: [Job Title]
   Location: [Zone]
   Budget: $[Amount]
   View details: [Link]"
Worker clicks link → Opens platform
```

**Flow 2: Booking Confirmation**
```
Worker accepts booking →
Client receives WhatsApp:
  "Your booking is confirmed!
   Worker: [Name] ⭐[Rating]
   Date: [DateTime]
   Call worker: [Phone Link]
   View details: [Link]"
```

**Flow 3: Bi-directional Messaging**

**Option A: Platform as intermediary**
```
Client WhatsApp → Platform → Worker WhatsApp
(Platform number is middle-man)
Pros: Full control, message logging, safety
Cons: Two phone numbers (confusing)
```

**Option B: Direct connection after booking**
```
Platform shares phone numbers
Direct WhatsApp between client and worker
Pros: Simpler, natural
Cons: Less control, users might bypass platform
```

**Recommendation:** Hybrid
- Pre-booking: Platform intermediary
- Post-booking: Direct connection allowed

**Flow 4: WhatsApp Bot for Simple Queries**
```
Client to TrustMe WhatsApp Bot:
  "I need a plumber in Roma Norte"
Bot:
  "Hi! I can help. Is this urgent?"
Client:
  "Yes, my sink is leaking"
Bot:
  "I found 3 available plumbers nearby:
   1. Juan P. ⭐4.8 - Available now
   2. Ana M. ⭐4.9 - Available in 2 hours
   Reply with number to book or visit [Link]"
```

#### C. Message Templates

WhatsApp requires pre-approved templates for business-initiated messages.

**Templates Needed:**
1. Job Match Notification
2. Booking Confirmation
3. Booking Reminder (24h before)
4. Service Completed - Leave Review
5. Payment Receipt
6. Dispute Update
7. Account Verification Code

*Each template needs Meta/Twilio approval (1-3 days)*

#### D. Media Handling

**Challenge:** Clients upload job images

**Solution:**
- Client uploads via platform or WhatsApp
- If WhatsApp: Platform receives image, uploads to server
- Images stored, URL shared in platform
- Workers view images in platform

#### E. Rate Limits & Costs

**WhatsApp Limits:**
- 1,000 messages/day initially (scales with usage)
- Template messages count against limit
- Media messages have size limits

**Cost Estimation:**
- 1,000 workers × 10 messages/month = 10,000 messages
- 5,000 clients × 5 messages/month = 25,000 messages
- Total: ~35,000 messages/month
- Cost: ~$350-1,050/month (depending on message types)

#### F. Integration with Existing Message System

**Unified Inbox:**
- Platform messages (conversations table)
- WhatsApp messages (synced to conversations)
- Both visible in dashboard "Messages" tab
- Worker/client doesn't care about channel

**Technical:**
- WhatsApp webhook → Server → Save to messages table
- Tag message source (platform/whatsapp)
- Display in unified thread

### 3. Business Model & Monetization 🚨 CRITICAL GAP

**Revenue Model - Not Defined:**

#### Option A: Commission per Booking

Platform takes X% of each completed job

**Example:**
```
- Job value: $1,000 MXN
- Platform commission: 15% = $150 MXN
- Worker receives: $850 MXN
```

**Questions:**
- What's the commission rate? (10-20% typical for marketplaces)
- Different rates for workers vs companies?
- Different rates by service category?
- How to prevent off-platform transactions?

#### Option B: Subscription Model

Workers/Companies pay monthly for platform access

**Example:**
```
- Basic: $200 MXN/month - 10 quotes
- Pro: $500 MXN/month - Unlimited quotes, featured profile
- Enterprise (Companies): $2,000 MXN/month - Team management
```

**Questions:**
- Does this work in Mexico's gig economy?
- Would workers pay upfront?

#### Option C: Hybrid Model (Recommended)

```
- Free for clients (always)
- Workers: Pay commission only on completed jobs
- Companies: Monthly subscription + lower commission rate
- Premium features: Featured listings, priority support, etc.

Example:
  - Workers: 15% commission per job
  - Companies: $1,500 MXN/month + 10% commission
  - Lead generation: Workers can buy leads ($20-50 MXN per job)
```

#### Payment Processing

**Missing Details:**
- **Payment Gateway:** Stripe (international), MercadoPago (Mexico-specific), Openpay?
- **Payment Methods:**
  - Credit/debit cards
  - OXXO (cash payment, huge in Mexico)
  - Bank transfer (SPEI)
  - Digital wallets (Apple Pay, Google Pay)
- **Escrow System:**
  - Hold client payment until service completion?
  - Protects both parties
  - Requires payment processor support
- **Payout Schedule:**
  - When do workers get paid? (immediately, weekly, monthly?)
  - Minimum payout threshold?
  - Payout method (bank transfer, PayPal)?
- **Currency:** Mexican Pesos (MXN) only or USD option?
- **Taxes:**
  - IVA (VAT) 16% in Mexico
  - Who pays IVA? (Client pays IVA on top, platform remits)
  - Withholding for workers? (No, they're independent contractors)
  - Invoice generation (CFDI required in Mexico)

**Data Model Additions Needed:**

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  bookingId INTEGER REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  commission DECIMAL(10,2),
  platformRevenue DECIMAL(10,2),
  workerPayout DECIMAL(10,2),
  paymentMethod VARCHAR(50), -- card, oxxo, spei, etc.
  paymentProvider VARCHAR(50), -- stripe, mercadopago
  paymentIntentId VARCHAR(200), -- external provider ID
  status VARCHAR(50), -- pending, completed, refunded, failed
  clientChargedAt TIMESTAMP,
  workerPaidAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payouts (
  id SERIAL PRIMARY KEY,
  workerId INTEGER REFERENCES workerProfiles(id),
  amount DECIMAL(10,2),
  method VARCHAR(50), -- bank_transfer, paypal
  status VARCHAR(50), -- pending, processing, completed, failed
  scheduledFor TIMESTAMP,
  completedAt TIMESTAMP,
  failureReason TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  transactionId INTEGER REFERENCES transactions(id),
  invoiceNumber VARCHAR(100) UNIQUE,
  cfdiXml TEXT, -- Mexico's electronic invoice XML
  issuedTo INTEGER REFERENCES users(id),
  issuedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## D. Critical Questions for Stakeholders

Before proceeding to PRD, these questions must be answered:

### Business Model
1. What is the platform's commission rate?
2. Commission on all jobs or only platform-sourced jobs?
3. Different rates for workers vs companies?
4. Subscription fees for premium features?
5. Lead generation fees?

### AI Strategy
6. Which AI provider? (OpenAI, Anthropic, open-source)
7. What specific AI features in MVP vs future?
8. Budget for AI API costs?
9. How to train/fine-tune models?

### WhatsApp Integration
10. Official WhatsApp Business API or third-party (Twilio)?
11. Budget for WhatsApp messaging costs (~$0.01 per message)?
12. Which workflows happen in WhatsApp vs platform?
13. How to prevent users from bypassing platform after connection?

### Payment Processing
14. Which payment gateway? (Stripe, MercadoPago, both?)
15. Escrow system or direct payment?
16. When do workers get paid? (immediate, weekly, monthly?)
17. How to handle refunds in disputes?

### Mobile Strategy
18. PWA sufficient or need native apps?
19. iOS and Android apps from day one or later?
20. React Native or separate native development?

### Launch Strategy
21. Soft launch with limited users or public launch?
22. Which CDMX zone(s) to launch in first?
23. How many workers needed before client acquisition?
24. Marketing budget and channels?

### Legal & Compliance
25. Is TrustMe a registered business in Mexico?
26. Legal counsel reviewed worker classification?
27. CFDI (invoice) generation partner selected?
28. Insurance policy for platform liability?

### Team & Resources
29. Development team size and skills?
30. Hiring customer support agents? (how many, when?)
31. Budget constraints?
32. Timeline expectations for v2 launch?

---

## E. Prioritized Recommendations

### 🚨 Must Resolve Before PRD (Blocking)

1. **Define Business Model**
   - Commission rates
   - Payment processing flow
   - Revenue projections

2. **AI Integration Strategy**
   - Use cases in MVP
   - Provider selection
   - Cost estimation

3. **WhatsApp Integration Architecture**
   - Technical approach (API provider)
   - Message flows
   - Cost estimation

4. **Payment Gateway Selection**
   - Provider comparison
   - Integration approach
   - CFDI compliance

5. **Mobile Strategy Decision**
   - PWA vs native apps
   - Prioritization

### 🔴 High Priority (Address in PRD)

6. **Identity Verification Process**
   - Third-party provider selection
   - Verification requirements by role

7. **Insurance & Liability Framework**
   - Platform liability limits
   - Worker/company insurance requirements
   - Job guarantee program (yes/no?)

8. **Geolocation System**
   - Address input and validation
   - Distance calculation
   - Mapping provider

9. **Security Enhancements**
   - Rate limiting
   - DDoS protection
   - Enhanced authentication

10. **Legal Compliance**
    - Worker classification review
    - Tax compliance (IVA, CFDI)
    - Data protection (LFPDPPP)

### 🟡 Medium Priority (Include in Roadmap)

11. **Advanced Search & Matching**
    - AI-powered matching algorithm
    - Smart recommendations

12. **Analytics Infrastructure**
    - Event tracking setup
    - Dashboard creation

13. **Onboarding Flows**
    - Detailed step-by-step for each role
    - Tutorials and guides

14. **Notification System**
    - Multi-channel strategy
    - User preferences

15. **Performance Optimization**
    - Caching strategy
    - CDN setup
    - Database optimization

### 🟢 Lower Priority (Future Enhancements)

16. **Native Mobile Apps**
    - iOS and Android
    - After PWA validation

17. **Advanced Features**
    - Real-time worker location
    - Video consultations
    - Calendar integrations
    - Service contracts
    - Recurring bookings

18. **Internationalization**
    - English language support
    - Expansion beyond CDMX

19. **Marketing Automation**
    - Email campaigns
    - Referral tracking
    - Growth loops

20. **Advanced Analytics**
    - Predictive analytics
    - Churn prediction
    - Pricing optimization

---

## Summary of Analysis

### ✅ Strengths (What's Working)
- Excellent role definition and separation
- Comprehensive data modeling
- Well-designed dispute resolution
- Geographic focus (CDMX)
- Portfolio system evolution
- Admin approval framework
- Dual review system

### ⚠️ Issues (What's Not Working)
- AI integration completely undefined
- WhatsApp integration vague
- Payment/commission flow missing
- Mobile-first strategy weak
- Worker-company commission complexity
- Basic search and discovery
- Underspecified notifications

### ❌ Critical Gaps (What's Missing)
1. AI Strategy - No implementation details
2. WhatsApp Architecture - Technical approach undefined
3. Business Model - Revenue and payment flows missing
4. Payment Processing - No gateway or flow defined
5. Identity Verification - Systematic process needed
6. Insurance & Liability - Legal framework missing
7. Onboarding Flows - Not detailed enough
8. Geolocation System - Needs mapping integration
9. Security Enhancements - Several gaps
10. Legal Compliance - Operational details missing
11. Scalability Plan - Infrastructure not addressed
12. Mobile Decision - PWA vs native unclear
13. Marketing Strategy - Acquisition plan absent
14. Analytics - Events and metrics undefined
15. Testing Strategy - QA approach incomplete
16. Feedback Mechanisms - User input loops missing

---

## Stakeholder Q&A Session

### Business Model Clarification

**Founder's Explanation:**

The business model works as follows:

1. **Users search** for the service they want by inputting:
   - Service category
   - Subcategory
   - Area
   - Availability
   - Location
   - Level of urgency

2. **They see results** of tradespeople who enrolled to the platform mentioning that they do exactly those service category, subcategory and area, covering the requested availability, level of urgency and zones.

3. **People can see the profiles** of the handymen and compare them in a similar UX of Amazon shopping when people are comparing products (they will be able to see their reviews, previous jobs, how far are them, prices).

4. **People decide to pick one person** and are able to write more details, upload photos and videos, then they are asked to confirm the full lead that will be sent to the handyman, and after that they are able to decide if they want to send the lead to up to 5 more people. Before being able to send the lead they are asked to input their name, email, and WhatsApp so that the handyman can contact them (and that is when we create them their user profiles).

5. **The handyman selected** by the user receive the lead in the platform and via WhatsApp and are able to see if the client is new or they already have ratings and reviews. That is when the handyman decides if they want to buy the lead or reject it.

6. **If the handyman buys the lead** a chat immediately starts between the handyman and the person in the platform. Both receive a WhatsApp notification so they can start chatting, and are reminded that it is recommended to have the conversation in the platform in case they want support from TrustMe.

7. **If the person never responds** the first message of the handyman in the platform the handyman can ask for a refund of the lead.

8. **When the handyman and the person reach an agreement** the handyman can send a payment request via debit or credit card using the Stripe integration. The receiving client can pay or reject the payment request.

---

## Complete Q&A Responses

### 1. Business Model & Pricing 💰

**Q: Lead Pricing Structure**

**A:** The leads are dynamic. Normally they cost **100 MXN per lead** but they can vary. The lead is sold to **all handymen who were selected by the client** (as described in the prompt).

**Q: Lead Details Visibility**

**A:** The handyman sees full details (except contact details, like name, email and phone number) before purchasing the lead. After the person has responded to the first message in the platform and therefore the lead is not refundable anymore, their WhatsApp becomes visible.

**Q: Refund Policy**

**A:** Time limit to request a refund is **48 hours**. If the handyman did talk with the user, and they decided not to pick them, there is NO refund. TrustMe does not take a transaction fee. TrustMe only charges for lead purchases.

**Q: Handyman Wallet System**

**A:** Yes! Handymen have pre-load credits/balance to buy leads and can set weekly budgets, stop buying leads whenever they want. For the **first week they don't have to pay for any lead**. After that they must set a budget of at least **300 MXN per week**.

### 2. User Roles & MVP Scope 👥

**Q: Which roles in MVP?**

**A:** Let's focus only on **clients and workers** for the MVP, and we can add companies later. The other roles will be added later. The companies pay for the leads very similarly to the individual service providers.

**Later clarification:** Let's build all roles for the MVP but **prioritize the client, worker and admin**. Then we can do company and customer support.

### 3. AI Integration Strategy 🤖

**Q: AI Features in MVP?**

**A:** AI is **Phase 2**. But I like your suggestions.

**Later clarification:** Fraud prevention. That is place in which we are going to use AI to check the ID verification phase.

### 4. WhatsApp Integration 📱

**Q: WhatsApp Implementation Timeline**

**A:** WhatsApp integration is **Phase 3**, but yes I like your suggestions. Current plan: **Share WhatsApp numbers after lead purchase but encourage platform chat**. We definitely need to use WhatsApp for verification.

### 5. Payment Processing & Stripe 💳

**Q: Stripe Implementation**

**A:** Stripe is necessary for the MVP. Client pays the **exact amount plus Stripe fee**.

**Q: Payment Escrow**

**A:** Is there a way to withhold the payment to the handyman until they both report that the job was done correctly and **5 days have passed** (to prevent hidden errors appearing and then the user being not able to get his money back)? The handyman should receive the money to their wallet / or their debit card in the system (the one they have decided as their default).

**Q: TrustMe's Cut**

**A:** No, TrustMe does not take any cut in any service payment. We **only make money in lead generation**.

**Q: Dispute Handling**

**A:** If there is a dispute then that is where customer service people intervene, and are able to read the conversations between the two parties, and also can receive further messages from both parties.

**Q: Stripe Connect Experience**

**A:** I have never used Stripe Connect, so in that sense you would have to guide me.

**Q: Dispute Scenario Details**

**A:** Client pays money. Money arrives to TrustMe Stripe account. Job is declared complete. 5 days have to pass. **No refunds after 5 days**. If the user wants a refund they have to submit a description and photos to customer support **within 5 days**. If customer support approves, their money goes back to them. If not it goes to the handyman.

### 6. Handyman Approval & Verification ✅

**Q: Approval Requirement**

**A:** Yes, handyman should be approved before verification.

**Q: Verification Level for MVP**

**A:** For the MVP let's do the **light verification**, but the idea is that in the near future we can do heavy verification by admin.

**Q: Admin Approval Flow**

**A:** Email verification and WhatsApp verification comes **before admin approval**. Admin approval is the **last step**.

**Q: Worker Onboarding Details**

**A:** The worker onboarding has to be with a **multiple step wizard with a completion bar**, asking them for:
- Name and last name
- CURP (input the number and a file)
- Address
- Proof of residence (file)
- WhatsApp (to be verified)
- Email (asked two times; to be verified)
- Time availability
- Zip code and coverage area (they can choose a radius looking at a map)
- If they take urgent jobs or not
- A profile picture
- A description of their job experience
- How many years working in the field
- Check the boxes of all services categories, sub categories, and areas that they cover (this part is **key** because it is used for the matching)
- Check a box if they have any criminal antecedents (antecedentes penales)
- Check a box that says that the platform is built on trust and that any grave fault they will be expelled for life from the platform and that legal actions can be taken against them

All this onboarding has to look friendly. The idea is that the handyman builds their profile. They can also bring reviews from other platforms (e.g., Google Maps).

### 7. Search & Discovery 🔍

**Q: Portfolio Requirements**

**A:** About the portfolios, I think the best approach is to have them as **verifiable by clients**. In the sense that handymen can upload their portfolio and then select a user who was the receiving end of it. They receive a notification and then they decide to accept the verification or not.

**Q: Search Results Ranking**

**A:** They are sorted by an **algorithm combining the factors** mentioned.

**Q: Comparison UX**

**A:** Scroll through list with key info visible (like Amazon product listings).

**Q: Filter Options**

**A:** All the filters you mentioned are great. I would add: **"distance radius", "individuals", "companies", number of tasks done**.

### 8. Mobile Strategy 📱

**Q: Primary Device**

**A:** Yes! Most clients will be mobile. I would think maybe like **85% of clients**.

**Q: Mobile App Strategy**

**A:** Let's do **Option C** for mobile app strategy. Let's do **React Native** so that the codebase is the same for iOS and Android.

### 9. Geographic Scope 🗺️

**Q: Launch Zone Strategy**

**A:** We want to launch in **all zones simultaneously**.

**Q: Address Handling**

**A:** I think we could use GPS integrations or a solution that you propose to ask the user for their **zip code** and calculate distances.

**Q: Distance Calculation**

**A:** Yes, for distance calculation use **KM away**.

### 10. Reviews & Ratings ⭐

**Q: Review System Details**

**A:** All users are kindly asked to help the platform grow and build trust since they are not getting charged for anything by confirming if they end up hiring anyone and leaving a detailed review for them, in which they can add:
- Stars 0-5
- Title of the review
- Description of the experience
- A checkbox if they would recommend to another person
- A checkbox if they would hire again
- The ability to add pictures

**Q: Review Timing**

**A:** The timing is after the service completion, which starts when they mark the job as complete and therefore the handyman can request a review, and/or the client is kindly prompted to add the review.

**Q: Review Incentive**

**A:** A way to incentivize the review is to ask clients to leave the review **before being allowed to look for another service**, with the kind messaging of asking them for their support growing the platform.

**Later clarification:** The client is **not allowed to make more leads until 10 days after their last service** if they don't leave a review. They are reminded in a kind way because they are not charged for the service - this allows the platform to grow and good workers get the trust they deserve.

**Q: Handyman Response**

**A:** Handymen can respond to the reviews.

### 11. Communication & Chat 💬

**Q: Chat Features**

**A:** In-platform chat:
- Text messages allowed
- Also image and video sharing
- People can flag conversations for customer support if something improper is shared
- Also voice messages
- And file attachments

**Q: Chat Access**

**A:** Chats only start and become available if the person buys the lead. There is **no chatting before buying the lead**.

**Q: Chat History**

**A:** The history is **forever** but users can delete chats. The users **cannot delete messages**.

### 12. Technical Stack & Infrastructure 🛠️

**Q: Hosting & Storage**

**A:** I plan to host in **AWS**, and to have also object storage and database there. Please do not assume we are saving things like in previous versions. We are creating a **brand new version** of the app, that allows us to do things better from the beginning setting the best foundations possible. Let's move cloud storage to AWS. We need to test all of this for the MVP.

**Q: Email Service**

**A:** For the email let's also switch, maybe to **Twilio**.

**Q: AWS Experience**

**A:** I am **totally new to AWS** so I will need full guidance.

**Q: Twilio Experience**

**A:** Yes, I will also need guidance with Twilio.

### 13. Launch Timeline & Resources ⏱️

**Q: Timeline**

**A:** We plan to launch the MVP in **one month**.

**Q: Development Team**

**A:** The development team is **only me**. I will be using **Claude Code**.

**Q: Design Requirements**

**A:** For Phase 1 I also want to decide the look and feel of the app. It has to be very **minimal, and elegant, world-class** inspired by Apple, and specially the Facebook app. Our **brand color is sky blue** (#00BFFF) and our **font is Plus Jakarta Sans**.

**Q: Facebook App Inspiration**

**A:** Facebook app inspiration: I mean about the **UI of the phone application**: the boxes shapes and sizes, icons, **fixed navigation bar at the bottom**, **hamburger menu in top right corner**. It is not about the functionalities but the UI. I can later show Claude Code screenshots of this.

### 14. Initial Users & Testing 🧪

**Q: Handyman Recruitment**

**A:** We already have **35 handymen**. But we are still not onboarding them in the platform until I have tested all the features first.

### 15. Legal & Compliance ⚖️

**Q: Legal Entity**

**A:** We are already a **Delaware PBC** and we are about to be registered as a subsidiary in Mexico.

### 16. Customer Support 🎧

**Q: Support Operations**

**A:** The founders will handle all customer support. Remember that there will be a role for **customer support in the app** that will allow that user type to interact with clients and workers.

**Q: Support Channels**

**A:** The customer support should be able to have:
- Email
- In-platform chat
- Phone support

**Q: Chat Reference System**

**A:** It is very important to assign a **reference number to each chat** so that the customer support can look for it easily and access the existing chat and the involved parties. You decide the chat reference format - should be displayed in the support dashboard. And the client or worker should be able to see it if they ask for support.

**Q: Support Hours**

**A:** Support hours **9 AM to 9 PM**.

### 17. Fraud Prevention 🛡️

**Q: Fraud Prevention Strategy**

**A:** Fraud prevention. That is a place in which we are going to use **AI to check the ID verification phase**.

**Q: Fake Lead Prevention**

**A:** To prevent customers from creating fake leads we will:
- Verify email and WhatsApp
- Limit **10 leads per day** for the moment

**Q: Admin Monitoring**

**A:** The admins (one of the 5 types of roles) should be able to see all those statistics to see if a user is behaving weirdly.

**Q: Fake Review Prevention**

**A:** To prevent fake reviews people can flag if a review was fake, and also normally reviews are done after both parties have accepted that the job was finished.

### 18. Data & Analytics 📊

**Q: Metrics Priority**

**A:** Metrics - all of the ones listed matter. But also I want to know about:
- The searches that were done
- Which are the services that were most looked for
- At what point of the service wizard do people stop interaction if they always finish it
- Also it would be great to have metrics for the prices set for all the Stripe charges for services so that we later can give recommendations of in average how much does each service cost

**A:** I have **never integrated analytics** so in that sense you would have to guide me a lot.

### 19. Competitive Positioning 🎯

**Q: Current Competitors**

**A:** There are **not any big platforms like Thumbtack in Mexico yet**.

### 20. Brand & Language 🌍

**Q: Language Support**

**A:** Language - it would be great to set the foundations from the beginning for **Spanish and English**. However **Spanish will be the default**.

**Q: Tone**

**A:** Tone: **"tú"**. It is more a friendly tone.

---

## Additional Critical Flow Clarifications

### Lead Purchase Flow Confirmation

**Scenario:** Client creates a lead and selects 3 handymen to send it to.

1. ✅ All 3 handymen receive notification
2. ✅ Each can see: Job description, photos/videos, location (zone), urgency, budget - but NOT client's name/email/WhatsApp
3. ✅ Each handyman decides independently to buy for 100 MXN
4. ✅ **All handymen who pay get the lead** (non-exclusive)
5. ✅ After purchase: Chat opens between each handyman and client (3 separate chats)
6. ✅ **Handyman sends the first message** after paying for the lead with their wallet balance
7. ✅ Once client responds in ANY chat → Contact info (WhatsApp) becomes visible to that handyman
8. ✅ Refund rule: If client NEVER responds to a specific handyman's first message within 48h → That handyman gets refund
9. ✅ If client responds to handyman A but not handyman B, only B gets refund
10. ✅ The refund logic is about being able to actually **compete for the lead**, not for being picked or not. That is why it depends on the fact of receiving a response
11. ✅ Client picks one handyman from the 3 who bought the lead → That handyman sends Stripe payment request
12. ✅ Other 2 handymen who bought lead but weren't picked: **NO REFUND** if conversation happened

### Wallet & Budget System

**Handyman Wallet Balance:**
- ✅ If they don't have money in the wallet they **cannot buy leads**. That incentivizes them to input money in their wallets.
- ✅ The way in which they can put money in their wallet is by either being charged to their debit or credit cards or making a deposit into an account.
- ✅ They are **still visible if their wallet is in 0 for 48 hours**.

**Weekly Budget:**
- ✅ They receive a notification that their budget is done for the week, and ask if they want to add more budget.
- ✅ When setting a budget they should be able to say if they want it **flexible or fixed**.
- ✅ The same logic applies - they are going to be **not shown in 48 hours** if they don't recharge the budget.

**First Week Free:**
- ✅ Yes, first week is **free and unlimited**.

### Stripe Escrow Details

**Payment Hold Flow:**
- ✅ **Option A:** TrustMe Stripe account (you hold it)
- ✅ Money transfers to handyman's **connected debit card**

### Admin Dashboard Requirements

**The dashboard for the admin should include:**
- ✅ Creating customer support roles by assigning them a name, last name, email, and temporary password
- ✅ Block clients or workers from the platform, so they should be able to see all the users
- ✅ Approve handyman queue
- ✅ You decide for the MVP. The idea is to generate a long-term roadmap that includes all features progressively for all the platform.

### Portfolio Verification

**Client Verification of Portfolio:**
- ✅ If the client never responds to a verification request the project is published regardless (as it has been since the worker decided to publish it, but it will **not have a "verified by client" badge**).
- ✅ The portfolios are more like **expandable mini blogs**, in where the worker can share a title of the project, a date, a mini description of the project and include photos.

---

## MVP Feature Priority (Confirmed by Founder)

### Critical Features Ranking

**If you could ONLY launch with 3 features, which 3?**

**Founder's Answer:**
1. **Search and lead**
2. **Chat after lead**
3. **Wallet and lead purchase**

### None Can Be Cut

**Q: If you had to cut ONE feature from MVP to launch faster, which would it be?**

**Founder's Answer:** **None** - all are critical.

---

## Next Steps

With all questions answered, the following deliverables will be created:

1. 📋 **Ultra-Focused MVP PRD** (30-40 pages)
   - Only features for 1-month launch
   - Every user flow documented
   - All edge cases covered
   - API specifications
   - Data models

2. 🗓️ **4-Week Sprint Plan** (week by week)
   - Week 1: Foundation
   - Week 2: Core flow
   - Week 3: Payments & reviews
   - Week 4: Polish & testing
   - Daily tasks broken down

3. 🎨 **Design System Document**
   - Sky blue (#00BFFF) palette
   - Plus Jakarta Sans typography
   - Component library
   - Apple/Facebook inspired layouts
   - Mobile-first responsive

4. 🏗️ **Technical Architecture**
   - AWS setup guide (step-by-step)
   - Database schema (optimized for new model)
   - API structure
   - Stripe Connect integration
   - Twilio integration
   - File upload flow

5. 👥 **User Flow Diagrams**
   - Client journey (search → lead → chat → payment → review)
   - Worker journey (register → approve → buy lead → chat → get paid)
   - Admin journey (approve workers, monitor platform)

6. 🔌 **Integration Requirements**
   - Stripe Connect setup
   - Twilio SendGrid + Verify
   - AWS services configuration
   - All API keys and webhooks

---

**Document Created:** January 2025
**Status:** Ready for PRD Development
**Next Action:** Create comprehensive PRD.md, roadmap.md, and tracking.md documents
