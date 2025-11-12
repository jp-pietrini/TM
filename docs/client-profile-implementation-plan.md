# Client Profile System - Implementation Plan

**Created:** November 11, 2025
**Last Updated:** November 11, 2025
**Status:** Phase 3 - Frontend Implementation (In Progress)
**Approach:** Design-First, then Implementation

---

## 📋 Executive Summary

**Goal:** Build a minimal but complete client profile system that allows clients to:
1. Complete their profile with essential information
2. Upload a profile photo
3. Edit their profile information
4. See their profile completion status

**Design Philosophy:** Mobile-first, simple, and fast. Clients need minimal friction to start posting leads.

---

## 🔍 Current State Analysis

### ✅ What's Already Built:

#### Database (`profiles` table):
- `firstName` varchar(100)
- `lastName` varchar(100)
- `profilePhotoUrl` text
- `zipCode` varchar(10)
- `phoneDisplay` varchar(20)
- `createdAt`, `updatedAt` timestamps

#### Frontend:
- `CompleteProfile.tsx` - Collects firstName, lastName, phone
- Profile photo upload infrastructure (S3 + CloudFront ready)
- Image processing utilities exist

#### Backend:
- `/api/auth/complete-profile` - Saves firstName, lastName, phone
- Profile creation happens automatically on user registration
- Phone verification flow complete

### ✅ Recently Implemented (Phase 3):

1. **Profile Viewing Page** (`/perfil`) - Complete with:
   - Profile photo display (circular avatar with placeholder)
   - Name, email, phone, zip code display
   - Verification status indicators (email/phone)
   - Profile completion percentage with progress bar
   - Missing fields checklist
   - Gamification integration (level badge, XP progress, stats, badges)
   - Mobile-responsive design
   - Edit Profile button
   - Mobile-only quick access buttons (Centro de Control, Contacto y Soporte)

2. **Gamification Components** - All functional:
   - `<LevelBadge />` - Shows client level with visual design
   - `<XPProgressBar />` - Progress to next level
   - `<StatsGrid />` - Key stats display (projects, completed, reviews, completion rate)
   - `<BadgeGrid />` - Visual badge collection with locked/unlocked states
   - `<NextAchievements />` - Progress toward next achievements

3. **Onboarding Tutorial System** - Complete:
   - Step-by-step guided tour for new users
   - Mobile and desktop versions
   - Spotlight effects on UI elements
   - Profile level badge integrated as tutorial target
   - Auto-resume after navigation
   - Completion state tracking

### ❌ What's Still Missing:

1. **Location Collection** - zipCode not collected in CompleteProfile flow
2. **Profile Photo Upload** - No functional UI for photo upload (only placeholder)
3. **Profile Editing Page** - Placeholder exists at `/perfil/editar` but not implemented
4. **Profile API Endpoints** - Need GET/PATCH endpoints for profiles
5. **Photo Upload API** - POST/DELETE endpoints for profile photos
6. **Profile Completion Calculation** - Backend logic not implemented
7. **Gamification Backend** - XP tracking, badge unlocking, stats calculation

---

## 📐 Requirements from PRD

### Client Profile Fields (Minimal):
| Field | Required | Source | Notes |
|-------|----------|--------|-------|
| First Name | Yes | CompleteProfile | ✅ Already collected |
| Last Name | Yes | CompleteProfile | ✅ Already collected |
| Phone | Yes | CompleteProfile | ✅ Already collected + verified |
| Location (Zone/ZipCode) | Yes | **Missing** | Need to add |
| Profile Photo | No | **Missing** | Optional but encouraged |

### Profile Completion Criteria:
- Name ✓
- Phone verified ✓
- Location provided ✓
- Photo uploaded (optional, but increases completion %)

### User Journey:
1. Register/OAuth → 2. Accept Terms → 3. Complete Profile (name, phone, **location**, **photo**) → 4. Verify Phone → 5. Ready to post leads

---

## 🎯 Implementation Plan

### Phase 1: UI/UX Design & Mockups ✅ **COMPLETE**

**Goal:** Design all screens and interactions before writing code

#### Screens Implemented:
1. **Profile View Page** (`/perfil`) ✅
   - ✅ Display all profile information
   - ✅ Profile photo (circular avatar placeholder)
   - ✅ "Edit Profile" button (navigates to `/perfil/editar`)
   - ✅ Profile completion percentage with progress bar
   - ✅ Missing fields checklist
   - ✅ Gamification section (level, XP, stats, badges, next achievements)
   - ✅ Mobile-responsive with quick access buttons
   - ✅ Tutorial integration (data-tutorial="profile-level")

2. **Profile Edit Page** (`/perfil/editar`) ⏳ **PLACEHOLDER**
   - Shows "Coming Soon" message
   - Needs full implementation

3. **Profile Completion Component** ✅
   - ✅ Progress bar showing percentage
   - ✅ Missing fields list
   - ✅ Visual indicator with color coding

4. **Gamification UI** ✅
   - ✅ Level badge with size variants
   - ✅ XP progress bar with next level display
   - ✅ Stats grid (4 stats with icons)
   - ✅ Badge collection with locked/unlocked states
   - ✅ Next achievements with progress bars

#### Design Decisions Made:
- ✅ **Profile Completion:** Percentage + checklist (both implemented)
- ✅ **Profile Photo:** Circular avatar (500x500px target)
- ✅ **Mobile Layout:** Single column, full-width buttons
- ✅ **Gamification Integration:** Integrated into profile page
- ⏳ **Location Input:** Not yet decided (pending implementation)
- ⏳ **Photo Upload:** Not yet implemented

**Status:** Profile View complete, Edit page pending

---

### Phase 2: Backend API Development

**Goal:** Build RESTful API endpoints for profile management

#### 2.1 Database Migration (if needed)
- ✅ Schema already has all required fields
- No migration needed

#### 2.2 API Endpoints

##### GET `/api/profiles/me`
- **Auth:** Required (JWT)
- **Returns:** Current user's profile
- **Response:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "uuid",
      "userId": "uuid",
      "firstName": "Juan",
      "lastName": "Pérez",
      "profilePhotoUrl": "https://cdn.../photo.jpg",
      "zipCode": "03100",
      "phoneDisplay": "+52 55 1234 5678",
      "completionPercentage": 100,
      "missingFields": []
    }
  }
}
```

##### PATCH `/api/profiles/me`
- **Auth:** Required (JWT)
- **Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "zipCode": "string (optional)",
  "phoneDisplay": "string (optional)"
}
```
- **Validation:**
  - firstName: 1-100 characters
  - lastName: 1-100 characters
  - zipCode: 5 digits for Mexico
- **Returns:** Updated profile

##### POST `/api/profiles/me/photo`
- **Auth:** Required (JWT)
- **Body:** multipart/form-data with `photo` file
- **Process:**
  1. Validate file (image, max 10MB)
  2. Resize/optimize (500x500, compress)
  3. Upload to S3
  4. Generate CloudFront URL
  5. Update profile.profilePhotoUrl
- **Returns:** New photo URL

##### DELETE `/api/profiles/me/photo`
- **Auth:** Required (JWT)
- **Process:**
  1. Delete from S3
  2. Set profile.profilePhotoUrl = null
- **Returns:** Success message

#### 2.3 Profile Completion Logic
- Create utility function `calculateProfileCompletion(profile)`
- Returns: `{ percentage: number, missingFields: string[] }`
- Logic:
  - firstName + lastName = 25%
  - phone verified = 25%
  - zipCode = 25%
  - profilePhotoUrl = 25%

#### 2.4 Update `/api/auth/complete-profile`
- Add `zipCode` to accepted fields
- Add `profilePhotoUrl` handling (optional)

**Deliverable:** Working API endpoints with validation

---

### Phase 3: Frontend Implementation ⚡ **IN PROGRESS**

**Goal:** Build React components based on approved mockups

#### 3.1 Update CompleteProfile Page ⏳ **PENDING**
**File:** `src/pages/CompleteProfile.tsx`

**Changes Needed:**
- [ ] Add location input (zone dropdown OR zip code field)
- [ ] Add profile photo upload section
- [ ] Add progress indicator
- [ ] Update form submission to include location
- [ ] Show upload preview after photo selected

**Components to create:**
- [ ] `<LocationSelector />` - Zone dropdown or zip input
- [ ] `<ProfilePhotoUpload />` - Drag-drop photo upload
- [ ] `<ProfileCompletionProgress />` - Visual progress indicator

#### 3.2 Profile View Page ✅ **COMPLETE**
**File:** `src/pages/Profile.tsx`

**Implemented Features:**
- ✅ Profile photo display (circular avatar, 128px, with User icon placeholder)
- ✅ Name display (firstName + lastName from mock data)
- ✅ Email with verification status indicator
- ✅ Phone with verification status indicator
- ✅ Zip code display
- ✅ Profile completion percentage (75%) with progress bar
- ✅ Missing fields checklist (e.g., "Foto de perfil")
- ✅ Edit Profile button → navigates to `/perfil/editar`
- ✅ Mobile-only buttons:
  - Centro de Control → `/perfil/ajustes`
  - Contacto y Soporte → `/contacto`
  - Ver tutorial → `startTutorial()`
- ✅ Gamification section:
  - Level badge (large size, Oro level)
  - XP progress bar (2450/3000 XP to Platino)
  - Stats grid (Proyectos: 12, Completados: 8, Reseñas: 6, Tasa Final.: 67%)
  - Badge grid (12 badges, 8 unlocked, 4 locked, limit 10 displayed)
  - Next achievements (2 items with progress bars)
- ✅ Fully responsive (mobile-first)
- ✅ Tutorial integration (data-tutorial="profile-level")
- ✅ Clean layout with proper spacing

**Current Data:** Using mock data (will be replaced with API call)

#### 3.3 Profile Edit Page ⏳ **PLACEHOLDER**
**File:** `src/pages/ProfileEdit.tsx` (route exists as placeholder in App.tsx)

**Features to Implement:**
- [ ] Form pre-filled with current values
- [ ] Change profile photo
- [ ] Edit all fields (firstName, lastName, zipCode, phoneDisplay)
- [ ] Save button (API PATCH call)
- [ ] Cancel button (navigate back)
- [ ] Loading states
- [ ] Error handling
- [ ] Success toast

#### 3.4 Gamification Components ✅ **COMPLETE**

**File:** `src/components/gamification/LevelBadge.tsx` ✅
- Displays level badge with color coding
- Size variants: small, medium, large
- Levels: bronce, plata, oro, platino, elite

**File:** `src/components/gamification/XPProgressBar.tsx` ✅
- Shows XP progress to next level
- Displays current XP, target XP, and next level name
- Animated progress bar

**File:** `src/components/gamification/StatsGrid.tsx` ✅
- Grid layout for key stats
- Each stat has label, value, and emoji icon
- Responsive 2x2 grid

**File:** `src/components/gamification/BadgeGrid.tsx` ✅
- Displays badge collection
- Locked/unlocked states
- Shows unlock date for unlocked badges
- "View All" button when limit exceeded
- Click handlers for badge details

**File:** `src/components/gamification/NextAchievements.tsx` ✅
- Shows upcoming achievements
- Progress bars for each achievement
- Displays reward information
- Emoji icons for visual appeal

#### 3.5 Reusable Components ⏳ **PENDING**

**Components Still Needed:**
- [ ] `<LocationSelector />` - Zone dropdown or zip input
- [ ] `<ProfilePhotoUpload />` - Drag-drop photo upload
- [ ] `<ProfileCompletionBadge />` - Standalone completion widget

**Deliverable:** Profile View ✅ Complete | Edit Page ⏳ Pending

---

### Phase 4: Testing

**Goal:** Ensure quality with comprehensive test coverage

#### 4.1 Unit Tests

**Backend Tests** (`backend/src/__tests__/profile.service.test.ts`):
```typescript
describe('Profile Service', () => {
  describe('calculateProfileCompletion', () => {
    it('returns 0% for empty profile');
    it('returns 25% with only name');
    it('returns 50% with name and phone');
    it('returns 75% with name, phone, and location');
    it('returns 100% with all fields');
  });

  describe('updateProfile', () => {
    it('updates profile fields successfully');
    it('validates zipCode format');
    it('rejects invalid data');
    it('prevents updating other users profiles');
  });
});
```

**Frontend Tests** (`frontend/src/components/__tests__/ProfilePhotoUpload.test.tsx`):
```typescript
describe('ProfilePhotoUpload', () => {
  it('renders upload UI when no photo');
  it('shows preview after file selected');
  it('validates file type (images only)');
  it('validates file size (max 10MB)');
  it('calls onUpload with file');
  it('shows delete button when photo exists');
});
```

#### 4.2 Integration Tests

**API Tests** (`backend/src/__tests__/profile.routes.test.ts`):
```typescript
describe('Profile API', () => {
  describe('GET /api/profiles/me', () => {
    it('returns profile for authenticated user');
    it('returns 401 without auth token');
    it('includes completion percentage');
  });

  describe('PATCH /api/profiles/me', () => {
    it('updates profile successfully');
    it('validates input data');
    it('returns updated profile');
    it('prevents updating email');
  });

  describe('POST /api/profiles/me/photo', () => {
    it('uploads photo to S3');
    it('updates profile with photo URL');
    it('rejects non-image files');
    it('rejects files over 10MB');
  });
});
```

#### 4.3 End-to-End Tests

**Playwright/Cypress Tests** (`e2e/profile.spec.ts`):
```typescript
describe('Client Profile Flow', () => {
  it('completes profile during onboarding', () => {
    // 1. Register new client
    // 2. Accept terms
    // 3. Fill complete profile form (name, phone, location, photo)
    // 4. Verify phone
    // 5. See dashboard with 100% completion
  });

  it('edits profile after creation', () => {
    // 1. Login as existing client
    // 2. Navigate to profile
    // 3. Click edit
    // 4. Change name and location
    // 5. Save
    // 6. Verify changes reflected
  });

  it('uploads and deletes profile photo', () => {
    // 1. Navigate to profile edit
    // 2. Upload photo
    // 3. See preview
    // 4. Save
    // 5. Verify photo shows on profile
    // 6. Delete photo
    // 7. Verify photo removed
  });
});
```

**Deliverable:** 80%+ test coverage, all E2E tests passing

---

## ✅ Definition of Done

### Per Phase:

**Phase 1 (Design):** ✅ **COMPLETE**
- [x] Profile view page designed and approved
- [x] Gamification UI designed and integrated
- [x] Mobile layouts implemented and verified
- [x] User approval received ✅
- [ ] Location input approach decided (zone vs zipcode) - PENDING
- [ ] Photo upload UX finalized - PENDING

**Phase 2 (Backend):** ⏳ **NOT STARTED**
- [ ] All API endpoints implemented
- [ ] Input validation with Zod
- [ ] Error handling complete
- [ ] Photo upload to S3 working
- [ ] Profile completion calculation accurate
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] Postman/Thunder Client tests documented
- [ ] Gamification backend (XP tracking, badges, stats calculation)

**Phase 3 (Frontend):** ⚡ **IN PROGRESS (60% Complete)**
- [ ] CompleteProfile enhanced with location & photo - PENDING
- [x] Profile view page complete ✅
- [x] Gamification components complete ✅
  - [x] LevelBadge
  - [x] XPProgressBar
  - [x] StatsGrid
  - [x] BadgeGrid
  - [x] NextAchievements
- [ ] Profile edit page complete - PLACEHOLDER ONLY
- [x] All components responsive (mobile-first) ✅
- [x] Mobile-only quick access buttons ✅
- [ ] Loading states implemented - PARTIAL
- [ ] Error handling with toasts - PENDING
- [ ] Success messages implemented - PENDING
- [x] TypeScript strict mode passing ✅
- [ ] Component tests passing - NOT STARTED
- [x] Tutorial integration complete ✅

**Phase 4 (Testing):**
- [ ] All unit tests written and passing
- [ ] All integration tests passing
- [ ] E2E tests cover happy path
- [ ] E2E tests cover error scenarios
- [ ] Manual testing checklist completed
- [ ] No console errors in browser
- [ ] No TypeScript errors

### Overall Completion Criteria:
- [ ] Client can complete profile with all required fields
- [ ] Client can upload and change profile photo
- [ ] Client can view their profile
- [ ] Client can edit their profile
- [ ] Profile completion percentage shows correctly
- [ ] All forms validate inputs
- [ ] All API calls have error handling
- [ ] Mobile experience is smooth (85% of users)
- [ ] No security vulnerabilities (XSS, injection, etc.)
- [ ] Code reviewed and approved
- [ ] Deployed to staging and tested
- [ ] Documentation updated

---

## 🎨 Quality Criteria

### Code Quality:
- TypeScript strict mode
- No `any` types
- Proper error handling (try-catch everywhere)
- Input validation (client AND server)
- ESLint + Prettier compliant
- Meaningful variable/function names
- Comments for complex logic

### Performance:
- API responses < 500ms
- Image optimization (resize to 500x500, compress)
- Lazy load images
- No unnecessary re-renders

### Security:
- Input sanitization
- SQL injection prevention (Drizzle ORM parameterized)
- XSS prevention (React auto-escaping)
- CSRF protection
- File upload validation (type, size, malware check)
- Authorization checks (user can only edit own profile)
- Rate limiting on upload endpoints

### UX:
- Loading states for all async operations
- Error messages are clear and actionable
- Success feedback (toasts)
- Mobile-friendly (44x44px touch targets minimum)
- Smooth animations
- Haptic feedback on mobile

### Accessibility:
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- Sufficient color contrast
- Focus indicators

---

## 🤔 Open Questions (To Discuss Before Implementation)

### 1. Location Input Method:
**Option A:** Dropdown of 11 CDMX zones (Polanco, Condesa, Roma Norte, etc.)
- Pros: Simple, matches worker service areas, prevents typos
- Cons: Less precise than zipcode

**Option B:** Zip code text input (5 digits)
- Pros: More precise, can calculate distance to workers
- Cons: Users might not know their zip code

**Option C:** Both (zone + optional zipcode)
- Pros: Best of both worlds
- Cons: More complex UI

**Recommendation:** ?

### 2. Profile Photo in CompleteProfile Flow:
**Option A:** Include photo upload in CompleteProfile page
- Pros: One-time setup, higher completion rate
- Cons: Longer form, might overwhelm users

**Option B:** Skip photo in CompleteProfile, add later in profile edit
- Pros: Faster onboarding, optional upload
- Cons: Lower photo upload rate

**Recommendation:** ?

### 3. Profile Completion Indicator:
**Option A:** Percentage (e.g., "75% Complete")
- Pros: Clear numerical progress
- Cons: Might feel like nagging

**Option B:** Checklist (e.g., "✓ Name ✓ Phone ✗ Photo")
- Pros: Shows exactly what's missing
- Cons: Takes more space

**Option C:** Both
- Pros: Most informative
- Cons: Might be too much

**Recommendation:** ?

### 4. Do Clients Need Public Profiles?
In marketplace context:
- Workers have public profiles (clients browse them)
- Do clients need public profiles that workers can see?

**Probably NO for MVP** - Workers see client info in leads/chats, not profiles.

### 5. Profile Photo Requirements:
- Max size: 10MB?
- Accepted formats: JPEG, PNG, WebP?
- Resize to: 500x500px?
- Quality: 85%?
- Allow crop/zoom before upload?

---

## 🚀 Next Steps

1. **Review this plan** - Discuss open questions
2. **Design mockups** - Create visual designs for all screens
3. **Get approval** - Ensure alignment before coding
4. **Execute phases** - Build iteratively
5. **Test thoroughly** - Quality over speed
6. **Deploy to staging** - Test in production-like environment
7. **Launch** - Roll out to users

---

## 📊 Estimated Timeline

| Phase | Duration | Notes |
|-------|----------|-------|
| Phase 1: Design | 2-4 hours | Mockups + discussions |
| Phase 2: Backend | 4-6 hours | API + tests |
| Phase 3: Frontend | 6-8 hours | Components + pages |
| Phase 4: Testing | 3-4 hours | E2E + manual tests |
| **Total** | **15-22 hours** | ~2-3 days of focused work |

---

## 📚 References

- **PRD Part 1:** User roles, journey
- **PRD Part 2:** Feature specifications
- **PRD Part 5:** Database models (section 8.1)
- **Roadmap:** Phase 2, Day 9
- **Existing Code:**
  - `backend/src/db/schema/profiles.ts` - Database schema
  - `frontend/src/pages/CompleteProfile.tsx` - Existing form
  - `backend/src/routes/auth.ts` - `/api/auth/complete-profile`

---

**Status:** ✅ Plan Complete - Ready for Design Phase
**Last Updated:** November 11, 2025
