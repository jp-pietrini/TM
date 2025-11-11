# Client Profile System - Implementation Plan

**Created:** November 11, 2025
**Status:** Planning Phase
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

### ❌ What's Missing:

1. **Location Collection** - zipCode not collected in CompleteProfile
2. **Profile Photo Upload** - No UI for photo upload in profile completion
3. **Profile Viewing Page** - No way to view own profile
4. **Profile Editing Page** - No way to edit profile after creation
5. **Profile Completion Indicator** - No visual progress indicator
6. **Profile API Endpoints** - Need GET/PATCH endpoints for profiles

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

### Phase 1: UI/UX Design & Mockups ⭐ **START HERE**

**Goal:** Design all screens and interactions before writing code

#### Screens to Mock:
1. **Enhanced CompleteProfile Page**
   - Name fields (existing)
   - Phone field (existing)
   - **NEW: Location selector** (zone dropdown or zip code input)
   - **NEW: Profile photo upload** (drag-drop or click to upload)
   - Progress indicator showing completion steps

2. **Profile View Page** (`/profile` or `/me`)
   - Display all profile information
   - Profile photo
   - "Edit Profile" button
   - Profile completion badge/percentage

3. **Profile Edit Page** (`/profile/edit`)
   - Edit all fields (except email)
   - Change profile photo
   - Delete photo option
   - Save/Cancel actions

4. **Profile Completion Component**
   - Visual indicator (progress bar or checklist)
   - Show what's missing
   - Links to complete missing items

#### Design Questions to Answer:
- [ ] **Location Input:** Dropdown of CDMX zones OR zip code text input?
- [ ] **Photo Upload:** In CompleteProfile flow OR separate step after?
- [ ] **Profile Photo:** Circular avatar with camera icon overlay for upload?
- [ ] **Profile Completion:** Show as percentage (75%) or checklist?
- [ ] **Mobile Layout:** Single column? Sticky save button?
- [ ] **Do clients need public profile URLs?** (Probably NO for MVP - only workers)

**Deliverable:** Figma mockups or detailed text descriptions + ASCII layouts

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

### Phase 3: Frontend Implementation

**Goal:** Build React components based on approved mockups

#### 3.1 Update CompleteProfile Page
**File:** `src/pages/CompleteProfile.tsx`

**Changes:**
- Add location input (zone dropdown OR zip code field)
- Add profile photo upload section
- Add progress indicator
- Update form submission to include location
- Show upload preview after photo selected

**Components to create:**
- `<LocationSelector />` - Zone dropdown or zip input
- `<ProfilePhotoUpload />` - Drag-drop photo upload
- `<ProfileCompletionProgress />` - Visual progress indicator

#### 3.2 Create Profile View Page
**File:** `src/pages/Profile.tsx`

**Layout:**
```
┌─────────────────────────────────┐
│   [Profile Photo - circular]    │
│   Juan Pérez                     │
│   +52 55 1234 5678              │
│   Roma Norte, CDMX              │
│                                  │
│   ┌───────────────────────┐    │
│   │   Edit Profile  [✏️]  │    │
│   └───────────────────────┘    │
│                                  │
│   Profile Completion: 100% ✅   │
└─────────────────────────────────┘
```

**Features:**
- Display all profile info
- Edit button → navigate to edit page
- Profile completion badge
- Responsive design

#### 3.3 Create Profile Edit Page
**File:** `src/pages/ProfileEdit.tsx`

**Features:**
- Form pre-filled with current values
- Change profile photo
- Edit all fields
- Save button (API PATCH call)
- Cancel button (navigate back)
- Loading states
- Error handling
- Success toast

#### 3.4 Create Reusable Components

**File:** `src/components/profile/LocationSelector.tsx`
```tsx
interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  type: 'zone' | 'zipcode'; // To be decided in design phase
}
```

**File:** `src/components/profile/ProfilePhotoUpload.tsx`
```tsx
interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
}
```

**File:** `src/components/profile/ProfileCompletionBadge.tsx`
```tsx
interface ProfileCompletionBadgeProps {
  percentage: number;
  missingFields: string[];
  showDetails?: boolean;
}
```

**Deliverable:** Fully functional profile pages

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

**Phase 1 (Design):**
- [ ] All screens mocked/designed
- [ ] Location input approach decided (zone vs zipcode)
- [ ] Photo upload UX approved
- [ ] Mobile layouts verified
- [ ] User approval received ✅

**Phase 2 (Backend):**
- [ ] All API endpoints implemented
- [ ] Input validation with Zod
- [ ] Error handling complete
- [ ] Photo upload to S3 working
- [ ] Profile completion calculation accurate
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] Postman/Thunder Client tests documented

**Phase 3 (Frontend):**
- [ ] CompleteProfile enhanced with location & photo
- [ ] Profile view page complete
- [ ] Profile edit page complete
- [ ] All components responsive (mobile-first)
- [ ] Loading states implemented
- [ ] Error handling with toasts
- [ ] Success messages implemented
- [ ] TypeScript strict mode passing
- [ ] Component tests passing

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
