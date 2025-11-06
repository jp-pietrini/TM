# TrustMe Project - Claude Development Guidelines

## 🎯 Project Overview
TrustMe is a lead generation marketplace for home services in Mexico City. Solo developer with Claude Code building MVP in 28 days.

## 📋 Development Rules

### 1. Planning & Execution
- **Always plan in phases** before executing
- **Execute step by step** - complete one task before moving to the next
- **Read documentation for context** when needed:
  - `docs/PRD_Part1.md` through `docs/PRD_Part6.md` - Complete feature specifications
  - `docs/PRD_Reference.md` - Quick reference for all specs
  - `docs/roadmap.md` - 8-phase development plan
  - `tracking.md` - Current status and progress
  - `docs/conversation-analysis.md` - Business requirements and clarifications

### 2. Tracking & Documentation
- **Keep tracking.md updated** at all times:
  - Update "Current Work in Progress" when starting a task
  - Mark features complete as you finish them
  - Update phase progress percentages
  - Document blockers and issues
  - Add development notes for important decisions
- Update daily: current status, work in progress, completed features
- Update weekly: metrics, milestones, risk status

### 3. Quality Standards
Every feature must have:

#### Definition of Done
- Feature works as specified in PRD
- Code is clean and well-documented
- All tests passing (unit + integration + e2e)
- Mobile responsive (85% of users on mobile)
- Error handling implemented
- Loading states implemented
- Accessibility considerations (ARIA labels, keyboard nav)
- Security checked (no XSS, SQL injection, etc.)
- Code reviewed (self-review checklist)
- Deployed to staging and tested

#### Quality Criteria
- **Code Quality:**
  - TypeScript with strict mode
  - No `any` types unless absolutely necessary
  - Proper error handling with try-catch
  - Input validation on both client and server
  - Consistent code style (ESLint + Prettier)

- **Performance:**
  - API responses < 500ms for simple queries
  - Page load < 2 seconds on 3G
  - Images optimized and lazy loaded
  - Database queries indexed and optimized

- **Security:**
  - All inputs validated and sanitized
  - SQL injection prevention (parameterized queries)
  - XSS prevention (proper escaping)
  - CSRF protection
  - JWT tokens secured
  - Rate limiting on all endpoints
  - File upload validation (type, size)

- **UX:**
  - Loading states for all async operations
  - Error messages are user-friendly and actionable
  - Empty states guide users on what to do
  - Mobile-first design
  - Touch targets minimum 44x44px

#### Testing Requirements
For every feature, implement:

**Unit Tests:**
- Test individual functions and components
- Mock external dependencies
- Test edge cases and error conditions
- Aim for 80%+ code coverage on business logic

**Integration Tests:**
- Test API endpoints with real database (test DB)
- Test authentication and authorization
- Test data validation
- Test error responses

**E2E Tests:**
- Test complete user flows (e.g., registration → profile creation → lead purchase)
- Test critical paths (payment flow, chat, refunds)
- Test on mobile viewport
- Use Playwright for E2E tests

### 4. External APIs & Integrations
- **User can help with external APIs** - always guide them with:
  - What needs to be set up (account, API keys, etc.)
  - What configuration is needed
  - What endpoints/features to enable
  - How to get credentials
  - Where to put credentials (.env file structure)
- Test in sandbox/test mode first
- Document all API integration steps
- Handle API failures gracefully (retry logic, fallbacks)

### 5. Asking Questions
- **Ask questions if NOT 95% sure** of:
  - Business logic or requirements
  - UI/UX decisions not specified in PRD
  - Technical approach when multiple options exist
  - External service configuration
  - Data model changes
  - Security implications
- Don't make assumptions about critical features
- Reference specific PRD sections when asking for clarification

### 6. Git & Commits
- Commit frequently (after each feature/task)
- Write descriptive commit messages
- Follow conventional commits format
- Push to remote after each phase completion
- Create branches for experimental work

### 7. Mobile-First Development
- **85% of users are on mobile** - prioritize mobile experience
- Test on mobile viewport constantly
- Use responsive breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly UI (44x44px minimum touch targets)
- Consider mobile data usage (optimize images, lazy load)

### 8. Tech Stack Reminder
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Payments:** Stripe (Checkout + Connect)
- **Email:** Twilio SendGrid
- **SMS:** Twilio Verify API
- **Cloud:** AWS (S3, CloudFront, RDS, EC2/ECS)
- **Real-time:** Socket.io
- **Analytics:** Google Analytics 4
- **Errors:** Sentry

### 9. Design System
- **Brand Color:** Deep Sky Blue #00BFFF
- **Font:** Plus Jakarta Sans
- **Spacing:** 4px base unit (4, 8, 12, 16, 24, 32, 48, 64)
- **Inspiration:** Apple (clean), Facebook (familiar patterns)
- See `docs/PRD_Part5.md` § 7 for complete design system

### 10. Business Logic Reminders
- Lead price: 100 MXN (non-exclusive)
- First week free: 300 MXN credit for new workers
- Minimum weekly budget: 300 MXN
- Refund: Automatic after 48h if client no response
- Escrow: 5-day hold on job payments
- 35 handymen committed to joining at launch

## 🔄 Development Workflow

### Starting a New Phase
1. Read relevant sections from roadmap.md
2. Update tracking.md "Current Work in Progress"
3. Create todo list for phase tasks (use TodoWrite tool)
4. Execute tasks step by step

### Completing a Task
1. Implement feature with tests
2. Test locally (unit + integration + e2e)
3. Update tracking.md (mark feature complete)
4. Commit code with descriptive message
5. Move to next task

### Completing a Phase
1. Verify all phase tasks complete
2. Run full test suite
3. Update tracking.md phase percentage
4. Push to git
5. Plan next phase

### When Stuck
1. Read relevant PRD sections
2. Check conversation-analysis.md for clarifications
3. Ask user if not 95% sure
4. Document blocker in tracking.md
5. Work on parallel task if possible

## 📚 Quick Reference Links

### Documentation Structure
```
/TM
├── tracking.md                          # Current status (UPDATE THIS!)
├── docs/
│   ├── PRD_Part1.md                    # Flows
│   ├── PRD_Part2.md                    # Features
│   ├── PRD_Part3.md                    # Business Logic
│   ├── PRD_Part4.md                    # Technical Requirements
│   ├── PRD_Part5.md                    # Security & Design
│   ├── PRD_Part6.md                    # Integrations & Launch
│   ├── PRD_Reference.md                # Quick lookup
│   ├── roadmap.md                      # 8-phase plan
│   ├── conversation-analysis.md        # Requirements clarification
│   ├── features-and-processes.md       # v1 technical docs
│   └── v2-five-role-system.md          # Future vision
└── .claude/
    └── claude.md                        # This file
```

### Key PRD Sections
- User roles: PRD_Part1.md § 2
- Core flows: PRD_Part1.md § 3
- Lead system: PRD_Part2.md § 4.1, PRD_Part3.md § 5.1-5.2
- Wallet system: PRD_Part2.md § 4.5, PRD_Part4.md § 5.3-5.4
- Chat system: PRD_Part2.md § 4.3
- Payment escrow: PRD_Part4.md § 5.5
- Database schemas: PRD_Part5.md § 8
- API endpoints: PRD_Part4.md § 6.3
- Design system: PRD_Part5.md § 7
- Integrations: PRD_Part6.md § 9

## 🎯 Current Phase: Phase 0 - Foundation

See `docs/roadmap.md` Phase 0 for detailed tasks.

**Timeline:** Days 1-3
**Goal:** Set up development environment and core project structure

**Next Steps:**
1. Day 1: Environment Setup
2. Day 2: Database Foundation
3. Day 3: Authentication Skeleton

---

**Remember:** Quality over speed. It's better to build features right the first time than to rush and create technical debt.

**Last Updated:** November 6, 2025
