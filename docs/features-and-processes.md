# TrustMe Marketplace - Features and Processes Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [User Roles](#user-roles)
3. [Core Features by Role](#core-features-by-role)
4. [Data Models](#data-models)
5. [Authentication & Authorization](#authentication--authorization)
6. [Key Process Flows](#key-process-flows)
7. [API Endpoints](#api-endpoints)
8. [Frontend Components](#frontend-components)
9. [Communication Systems](#communication-systems)
10. [File Management](#file-management)
11. [Search & Discovery](#search--discovery)
12. [Review & Rating System](#review--rating-system)
13. [Geographic Targeting](#geographic-targeting)
14. [Technical Features](#technical-features)

---

## Application Overview

**TrustMe Marketplace** is a full-stack web application specifically designed for Mexico City (CDMX) that connects clients who need repair and maintenance services with skilled workers. The platform enables clients to post jobs, workers to showcase their skills through portfolios, and facilitates secure bookings with a review system.

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Wouter, TanStack Query, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: Passport.js with express-session
- **File Upload**: Multer with size/type validation
- **Email**: Microsoft Graph API (OAuth2) with Nodemailer fallback
- **Image Processing**: react-easy-crop for profile pictures

---

## User Roles

The application has two distinct user roles:

### 1. Client
Users who need repair and maintenance services. They can:
- Post job requests with detailed descriptions
- Upload images for their job requests
- Browse and contact workers
- Book services with workers
- Leave reviews and ratings

### 2. Worker
Service providers who offer repair and maintenance services. They can:
- Create detailed profiles with portfolios
- Specify service areas within Mexico City
- Apply for jobs by submitting quotes
- Manage their availability
- Communicate with potential clients
- Build reputation through reviews

---

## Core Features by Role

### Client Features

#### 1. **Job Posting**
- Create job requests with:
  - Title and detailed description
  - Service category selection
  - Location/zone in Mexico City
  - Budget range (min/max)
  - Urgency flag
  - Preferred start time (morning/afternoon/evening)
  - Availability matrix (days and time slots)
  - Deadline
  - Contact information (name, email, phone)
  - Multiple image uploads (up to 5 images)

#### 2. **Service Search**
- Multi-category service search
- Advanced search modal with:
  - Category selection (plomería, electricidad, pintura, etc.)
  - Subcategory selection
  - Specific area selection within subcategories
  - Location/zone filtering
  - Availability matrix selection
- Autocomplete search with keyword matching
- Search suggestions based on service keywords

#### 3. **Worker Discovery**
- Browse workers by:
  - Service category
  - Service area/zone
  - Reviews and ratings
  - Portfolio quality
- View worker public profiles with:
  - Service offerings
  - Portfolio projects with images/videos
  - Reviews from previous clients
  - Service areas covered
  - Availability information

#### 4. **Contact & Communication**
- **Contact Wizard**: Multi-step process to request services:
  - Step 1: Service selection and problem description
  - Step 2: Upload images/videos of the problem
  - Step 3: Provide contact information
  - Step 4: Confirmation and worker selection
- **Simple Contact Wizard**: Streamlined version for quick requests
- **In-app Messaging**: Direct chat with workers
- **Email Notifications**: Receive updates about bookings

#### 5. **Booking Management**
- View all bookings in dashboard with statuses:
  - Pending (waiting for worker confirmation)
  - Confirmed (worker accepted)
  - Rejected (worker declined)
  - Completed (service finished)
- Track booking details:
  - Associated job
  - Assigned worker
  - Scheduled date/time
  - Booking notes

#### 6. **Review System**
- Leave reviews after completed services:
  - Star rating (1-5)
  - Written comment
  - Linked to specific booking
- View own submitted reviews

#### 7. **Profile Management**
- Update personal information:
  - Name, email, phone
  - Address (street, unit, municipality, state, zip)
  - Pet information (for workers visiting home)
  - Profile picture with cropping capability
- View service history
- Manage job postings

#### 8. **Dashboard**
Client dashboard with tabs:
- **Servicios (Services)**: Manage job postings
  - Filter by status: Open, Assigned, Completed, Cancelled
  - Create new job postings
  - View quotes received
  - Edit/delete jobs
- **Mensajes (Messages)**: View conversations with workers
- **Reservas (Bookings)**: Track all bookings
- **Reseñas (Reviews)**: View and manage reviews
- **Perfil (Profile)**: Edit client profile

### Worker Features

#### 1. **Profile Creation & Management**
- Create comprehensive worker profile:
  - Professional description (20-400 characters)
  - Service areas in Mexico City (multiple zones)
  - Availability matrix (days and time slots)
  - Profile picture with cropping
  - Contact information
- Spanish character support (ñ, á, é, í, ó, ú, ü, ¡, ¿)

#### 2. **Portfolio System**
Two portfolio approaches:

**A. Legacy Portfolio Images**
- Upload individual images with descriptions
- Display in profile gallery

**B. Enhanced Portfolio Projects** (Current system)
- Create project-based portfolio entries:
  - Project title and description
  - Service category and subcategories
  - Completion date (month/year)
  - Multiple media files (images/videos)
  - Media descriptions
  - Sort order for media display
  - Public/private visibility toggle
  - Client email for verification (optional)
- Features:
  - Drag-and-drop media upload
  - Media preview before upload
  - Individual media deletion
  - Project-level organization
  - Service category integration

#### 3. **Service Management**
- Add custom services to profile:
  - Service category
  - Pricing (hourly or fixed)
  - Service description
- Link to predefined service categories
- Display services on public profile

#### 4. **Job Discovery & Quotes**
- Browse open jobs in dashboard:
  - Filter by service category
  - View job details (description, images, budget, location)
  - See number of quotes submitted
  - View client information
- Submit quotes for jobs:
  - Proposed price
  - Estimated hours
  - Description of approach
  - Availability for the job
  - Quote status tracking (pending/accepted/rejected)

#### 5. **Booking Management**
- Receive booking requests from clients
- Accept or reject bookings
- View booking details:
  - Client information
  - Job details
  - Scheduled date/time
  - Notes from client
- Update booking status to completed

#### 6. **Availability Management**
- Set weekly availability:
  - Days of week (Monday-Sunday)
  - Time slots (morning/afternoon/evening)
- Availability displayed to clients
- Used for job matching

#### 7. **Worker Preferences** (Database structure exists)
- Target service categories
- Preferred zones for work
- Working hours
- Accept urgent jobs (yes/no)
- Minimum job value
- Maximum travel distance

#### 8. **Dashboard**
Worker dashboard with two layouts:

**Mobile Layout**:
- **Servicios (Services)**: Browse and quote on jobs
- **Mensajes (Messages)**: Client communication
- **Reservas (Reservations)**: Manage bookings
- **Saldo (Balance)**: Track earnings (UI present, backend TBD)
- **Perfil (Profile)**: Manage profile and portfolio

**Desktop Layout**:
- **Messages**: Client conversations
- **Jobs**: Open job listings
- **Calendar**: Availability management
- **Portfolio**: Project management
- **Perfil**: Profile settings

#### 9. **Public Profile**
- Accessible via direct link
- Displays:
  - Profile information
  - Services offered with pricing
  - Portfolio projects with media
  - Reviews and ratings
  - Service areas
  - Availability information
- Allows clients to contact worker directly

### System-Wide Features

#### 1. **Help Center**
- Tabbed interface with:
  - Terms and Conditions
  - Privacy Policy
  - Cookie Policy
- URL parameter support for direct tab access
- Markdown rendering for content
- FAQ search (UI present, functionality coming)

#### 2. **Legal Compliance**
- Complete legal documentation in Spanish
- Accessible from footer and dedicated help page
- Proper consent flows for data collection

#### 3. **Responsive Design**
- Mobile-first approach
- Enhanced touch targets (44px minimum)
- Responsive grid layouts
- Optimized typography for mobile
- Mobile menu with user stats
- Desktop and mobile dashboard variations

#### 4. **Performance Monitoring**
- Response time tracking for API calls
- Slow API logging (>300ms)
- Bundle analysis configuration
- React profiler integration

---

## Data Models

### Core Tables

#### 1. **users**
Stores all user accounts (both clients and workers):
- `id`: Serial primary key
- `username`: Unique username
- `name`: Full name
- `email`: Unique email address
- `password`: Bcrypt hashed password
- `role`: Enum (client/worker)
- `profileImage`: URL to profile picture
- `phone`: Contact phone number
- `address`: Legacy address field
- `street`, `unit`, `municipality`, `state`, `zip`: Structured address
- `hasPets`: Pet information (yes/no/not_specified)
- `createdAt`: Account creation timestamp

#### 2. **workerProfiles**
Extended information for workers:
- `id`: Serial primary key
- `userId`: Foreign key to users
- `description`: Professional description (20-400 chars)
- `serviceAreas`: Array of CDMX zones
- `availability`: JSON string of availability matrix
- `createdAt`: Profile creation timestamp

#### 3. **services**
Predefined service categories:
- `id`: Serial primary key
- `name`: Service name (e.g., "Plomería")
- `category`: Category classification
- `description`: Service description
- `image`: Service category image URL

#### 4. **workerServices**
Many-to-many relationship between workers and services:
- `id`: Serial primary key
- `workerId`: Foreign key to workerProfiles
- `serviceId`: Foreign key to services
- `price`: Pricing (hourly or fixed)
- `createdAt`: Entry creation timestamp

#### 5. **portfolioImages** (Legacy)
Individual portfolio images:
- `id`: Serial primary key
- `workerId`: Foreign key to workerProfiles
- `imageUrl`: Image URL
- `description`: Image description
- `createdAt`: Upload timestamp

#### 6. **portfolioProjects** (Current)
Project-based portfolio:
- `id`: Serial primary key
- `workerId`: Foreign key to workerProfiles
- `title`: Project title
- `description`: Project description
- `serviceCategory`: Category text
- `categoryId`: Foreign key to services (optional)
- `subcategoryIds`: Array of subcategory identifiers
- `month`, `year`: Completion date
- `clientEmail`: For verification (optional)
- `completedDate`: Full completion timestamp
- `isPublic`: Visibility flag
- `sortOrder`: Display order
- `createdAt`, `updatedAt`: Timestamps

#### 7. **portfolioProjectMedia**
Media files for portfolio projects:
- `id`: Serial primary key
- `projectId`: Foreign key to portfolioProjects
- `mediaUrl`: File URL
- `mediaType`: Type (image/video)
- `description`: Media description
- `sortOrder`: Display order within project
- `createdAt`: Upload timestamp

#### 8. **jobs**
Client job postings:
- `id`: Serial primary key
- `clientId`: Foreign key to users
- `title`: Job title
- `description`: Detailed description
- `location`: General location
- `zone`: Specific CDMX zone
- `status`: Enum (open/assigned/completed/cancelled)
- `serviceId`: Foreign key to services
- `isUrgent`: Urgency flag
- `preferredStartTime`: Time preference (morning/afternoon/evening)
- `deadline`: Job deadline
- `availability`: JSON availability matrix
- `contactPhone`, `contactEmail`, `contactName`: Contact info
- `budgetMin`, `budgetMax`: Budget range
- `createdAt`, `updatedAt`: Timestamps

#### 9. **jobImages**
Images attached to jobs:
- `id`: Serial primary key
- `jobId`: Foreign key to jobs
- `imageUrl`: Image URL
- `createdAt`: Upload timestamp

#### 10. **bookings**
Job assignments:
- `id`: Serial primary key
- `jobId`: Foreign key to jobs
- `workerId`: Foreign key to workerProfiles
- `clientId`: Foreign key to users
- `status`: Enum (pending/confirmed/rejected/completed)
- `dateTime`: Scheduled date and time
- `notes`: Additional notes
- `createdAt`: Booking creation timestamp

#### 11. **reviews**
Service reviews:
- `id`: Serial primary key
- `bookingId`: Foreign key to bookings
- `clientId`: Foreign key to users
- `workerId`: Foreign key to workerProfiles
- `rating`: Integer 1-5
- `comment`: Written review
- `createdAt`: Review timestamp

#### 12. **conversations**
Chat conversations:
- `id`: Serial primary key
- `clientId`: Foreign key to users (client)
- `workerId`: Foreign key to users (worker)
- `jobId`: Foreign key to jobs (optional)
- `status`: Conversation status (active/archived)
- `createdAt`, `updatedAt`: Timestamps

#### 13. **messages**
Individual chat messages:
- `id`: Serial primary key
- `conversationId`: Foreign key to conversations
- `senderId`: Foreign key to users
- `content`: Message text
- `isRead`: Read status flag
- `createdAt`: Message timestamp

#### 14. **attachments**
File attachments:
- `id`: Serial primary key
- `messageId`: Foreign key to messages (optional)
- `jobId`: Foreign key to jobs (optional)
- `fileName`: Original filename
- `fileUrl`: Stored file URL
- `fileType`: Type (image/video)
- `fileSize`: File size in bytes
- `createdAt`: Upload timestamp

#### 15. **quotes**
Worker quotes for jobs:
- `id`: Serial primary key
- `jobId`: Foreign key to jobs
- `workerId`: Foreign key to workerProfiles
- `price`: Quoted price
- `estimatedHours`: Time estimate
- `description`: Quote description
- `availability`: Worker availability for job
- `status`: Quote status (pending/accepted/rejected)
- `createdAt`: Quote submission timestamp

#### 16. **evaluatorCalls**
Expert consultation requests:
- `id`: Serial primary key
- `userId`: Foreign key to users
- `name`, `email`, `phone`: Contact information
- `description`: Consultation description
- `callUrl`: Calendly or scheduling link
- `scheduled`: Scheduling status flag
- `createdAt`: Request timestamp

#### 17. **passwordResetTokens**
Password recovery tokens:
- `id`: Serial primary key
- `userId`: Foreign key to users
- `tokenHash`: Hashed reset token
- `expiresAt`: Token expiration
- `createdAt`: Token creation timestamp

#### 18. **smsVerification**
SMS verification codes:
- `id`: Serial primary key
- `phone`: Phone number
- `code`: 6-digit verification code
- `expiresAt`: Code expiration (5 minutes)
- `verified`: Verification status
- `createdAt`: Code generation timestamp

#### 19. **workerAvailability**
Detailed worker schedules:
- `id`: Serial primary key
- `workerId`: Foreign key to workerProfiles
- `dayOfWeek`: Day (0-6, Sunday-Saturday)
- `startTime`, `endTime`: Time range (e.g., "09:00"-"17:00")
- `isAvailable`: Availability flag

#### 20. **workerPreferences**
Worker notification preferences:
- `id`: Serial primary key
- `workerId`: Foreign key to workerProfiles
- `targetServices`: Array of target service categories
- `preferredZones`: Array of preferred work zones
- `workingHours`: JSON working hours
- `urgentJobsAccepted`: Accept urgent jobs flag
- `minimumJobValue`: Minimum job value threshold
- `maximumTravelDistance`: Max travel distance in km
- `createdAt`, `updatedAt`: Timestamps

### Database Relationships

**One-to-One:**
- users ↔ workerProfiles (one worker profile per user)

**One-to-Many:**
- users → jobs (clients create multiple jobs)
- users → bookings (clients have multiple bookings)
- users → reviews (clients write multiple reviews)
- users → evaluatorCalls (users request consultations)
- users → conversations (users participate in chats)
- users → messages (users send messages)
- workerProfiles → workerServices (workers offer multiple services)
- workerProfiles → portfolioImages (workers have portfolio images)
- workerProfiles → portfolioProjects (workers have portfolio projects)
- workerProfiles → bookings (workers receive bookings)
- workerProfiles → reviews (workers receive reviews)
- workerProfiles → quotes (workers submit quotes)
- portfolioProjects → portfolioProjectMedia (projects have media)
- jobs → jobImages (jobs have multiple images)
- jobs → bookings (jobs can have bookings)
- jobs → quotes (jobs receive quotes)
- jobs → attachments (jobs have attachments)
- conversations → messages (conversations contain messages)
- bookings → reviews (bookings can be reviewed)

**Many-to-Many:**
- workerProfiles ↔ services (through workerServices)

---

## Authentication & Authorization

### Authentication System

#### Registration Flow
1. User submits registration form with:
   - Username (unique)
   - Name
   - Email (unique)
   - Password
   - Role selection (client/worker)
2. Backend validates:
   - Username doesn't exist
   - Email doesn't exist
   - Password meets requirements
3. Password is hashed using bcrypt
4. User record created in database
5. User automatically logged in
6. Welcome email sent (optional)
7. Session created with httpOnly cookies

#### Login Flow
1. User submits email and password
2. Backend validates credentials using Passport.js local strategy
3. Password compared using bcrypt
4. On success:
   - Session created
   - User object stored in session (without password)
   - Session cookie sent to client
5. On failure:
   - Error message returned
   - Login attempt logged

#### Session Management
- **Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Configuration**:
  - httpOnly cookies (prevents XSS)
  - Secure flag in production
  - SameSite protection
  - Session secret from environment
- **Duration**: Configurable session lifetime
- **Cleanup**: Automatic expired session cleanup

#### Password Reset Flow
1. User requests password reset via email
2. Backend:
   - Generates random token (32 bytes)
   - Hashes token with SHA-256
   - Stores hash in passwordResetTokens with expiration (1 hour)
   - Sends reset email with token link
3. Email link construction:
   - Development: http://localhost:5000/reset-password/:token
   - Production: Uses PUBLIC_FRONTEND_URL environment variable
4. User clicks link and enters new password
5. Backend:
   - Validates token exists and not expired
   - Hashes new password
   - Updates user password
   - Deletes token
   - Auto-login user with new password

#### Authorization Middleware
- `requireAuth`: Ensures user is authenticated
- Role-based checks:
  - Client-only routes (job posting, reviews)
  - Worker-only routes (profile management, job quotes)
- Returns 401 for unauthenticated
- Returns 403 for wrong role

### Security Features
- **Password Hashing**: bcrypt with salt rounds
- **CSRF Protection**: SameSite cookies
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **Input Validation**: Zod schemas on all inputs
- **File Upload Security**:
  - Size limits (5MB for images)
  - Type validation (MIME type checking)
  - Filename sanitization
- **Email Security**:
  - OAuth2 for Microsoft Graph API
  - Token refresh mechanism
  - SMTP fallback with authentication

---

## Key Process Flows

### 1. Client Job Posting Flow

**Step 1: Navigate to Job Form**
- Client clicks "Publicar Servicio" from dashboard
- Routed to `/client/job-form`

**Step 2: Fill Job Details**
- Select service category from dropdown
- Enter job title
- Write detailed description
- Select zone in CDMX
- Optionally set budget range
- Mark as urgent if needed
- Select preferred start time
- Choose availability (days and time slots)
- Upload up to 5 images
- Provide contact information

**Step 3: Submit Job**
- Frontend validates form with Zod schema
- Images uploaded with FormData
- POST to `/api/jobs` with multipart/form-data
- Backend:
  - Validates authentication (client role required)
  - Validates form data
  - Creates job record
  - Saves uploaded images
  - Returns created job

**Step 4: Job Listed**
- Job appears in client's dashboard under "Servicios"
- Job status: "open"
- Available to workers for viewing and quoting

### 2. Worker Profile Creation Flow

**Step 1: Navigate to Profile Form**
- Worker registers/logs in
- If no profile exists, prompted to create one
- Routed to `/worker/profile/edit`

**Step 2: Fill Profile Information**
- Tab 1: Basic Info
  - Professional description (20-400 chars)
  - Select service areas (CDMX zones)
  - Set availability matrix
  - Upload profile picture (optional)
- Tab 2: Services
  - Add custom services with pricing
  - Link to service categories
- Tab 3: Portfolio
  - Create portfolio projects
  - Upload media for projects
  - Organize by service category

**Step 3: Save Profile**
- Frontend validates with Zod schema
- POST to `/api/worker/profile`
- Backend:
  - Validates worker role
  - Checks for existing profile
  - Creates or updates profile
  - Returns profile data

**Step 4: Profile Published**
- Profile accessible at `/worker/:id`
- Appears in worker search results
- Can receive job quotes and bookings

### 3. Worker Quote Submission Flow

**Step 1: Browse Jobs**
- Worker navigates to dashboard "Servicios" tab
- Views list of open jobs
- Filters by service category

**Step 2: View Job Details**
- Click on job card
- View full job description, images, budget, location
- See client information (name, contact)
- Check number of existing quotes

**Step 3: Submit Quote**
- Click "Enviar Cotización" button
- Fill quote form:
  - Proposed price
  - Estimated hours
  - Description of approach
  - Availability for the job
- Submit quote

**Step 4: Quote Processing**
- POST to `/api/quotes`
- Backend:
  - Validates worker authentication
  - Creates quote record
  - Links to job and worker
  - Sets status to "pending"
  - (Optional) Notifies client via email

**Step 5: Client Reviews Quote**
- Client sees quote count in job listing
- Views quote details
- Can accept quote (creates booking)
- Can reject quote
- Can request clarification via messages

### 4. Booking Creation Flow

**Step 1: Client Selects Worker**
- Client views job quotes or worker profiles
- Decides on worker to hire
- Clicks to book worker

**Step 2: Booking Form**
- Client provides:
  - Selected worker ID
  - Job ID
  - Preferred date/time
  - Additional notes
- Submits booking request

**Step 3: Booking Created**
- POST to `/api/bookings`
- Backend:
  - Validates job is open
  - Validates worker exists
  - Creates booking with status "pending"
  - Sends email to worker

**Step 4: Worker Response**
- Worker sees booking in "Reservas" tab
- Reviews booking details
- Can accept or reject:
  - PATCH to `/api/bookings/:id/status`
  - If accepted:
    - Booking status → "confirmed"
    - Job status → "assigned"
    - Confirmation email sent to client
  - If rejected:
    - Booking status → "rejected"
    - Job remains "open"

**Step 5: Service Completion**
- Worker marks booking as completed
- Booking status → "completed"
- Client can now leave review

### 5. Review Submission Flow

**Step 1: Eligible Reviews**
- Client sees completed bookings in dashboard
- "Dejar Reseña" button appears for completed, unreviewed bookings

**Step 2: Review Form**
- Client provides:
  - Star rating (1-5)
  - Written comment (optional)
- Submits review

**Step 3: Review Saved**
- POST to `/api/reviews`
- Backend:
  - Validates booking is completed
  - Validates client owns booking
  - Creates review record
  - Links to booking, client, and worker

**Step 4: Review Display**
- Review appears on worker's public profile
- Contributes to worker's average rating
- Visible to all users browsing workers

### 6. Messaging Flow

**Step 1: Start Conversation**
- Client or worker initiates chat
- POST to `/api/chat/conversations`
- Creates conversation record linking:
  - Client user ID
  - Worker user ID
  - Related job ID (optional)

**Step 2: Send Message**
- User types message
- Optionally attaches files
- POST to `/api/chat/conversations/:id/messages`
- Backend:
  - Validates user is participant
  - Creates message record
  - Saves attachments if present
  - Updates conversation timestamp

**Step 3: View Messages**
- GET `/api/chat/conversations/:id/messages`
- Returns messages with:
  - Sender information
  - Message content
  - Attachments
  - Timestamps
  - Read status

**Step 4: Message Notifications**
- Unread message count shown in dashboard
- Real-time updates (polling-based)
- Messages marked as read when viewed

### 7. Portfolio Project Creation Flow

**Step 1: Navigate to Portfolio Tab**
- Worker goes to profile edit
- Selects "Portafolio" tab

**Step 2: Create Project**
- Click "Agregar Proyecto"
- Fill project form:
  - Project title
  - Description
  - Service category and subcategories
  - Completion date (month/year)
  - Upload media files (images/videos)
  - Add descriptions for each media item
  - Set visibility (public/private)

**Step 3: Upload Media**
- Drag-and-drop or click to upload
- Multiple files supported
- Preview before upload
- Each file can have description
- Sort order can be adjusted

**Step 4: Save Project**
- POST to `/api/portfolio/projects`
- Backend:
  - Validates worker authentication
  - Creates project record
  - Uploads media files
  - Creates media records with associations
  - Returns created project

**Step 5: Project Display**
- Project appears in worker's portfolio
- Media displayed in gallery format
- Organized by service category
- Visible on public profile

### 8. Search & Discovery Flow

**Step 1: Service Search**
- User enters search term or selects category
- Autocomplete suggests matching services
- User can use advanced search modal

**Step 2: Search Execution**
- GET `/api/workers` with filters:
  - Service category
  - Zone
  - Availability
- Backend returns matching workers

**Step 3: Results Display**
- Workers shown in grid/list format
- Each card shows:
  - Profile picture
  - Name
  - Average rating
  - Service areas
  - Preview of services

**Step 4: Profile View**
- User clicks worker card
- Routed to `/worker/:id`
- Full profile displayed with:
  - Detailed information
  - Complete portfolio
  - All reviews
  - Contact options

### 9. Password Recovery Flow

**Step 1: Initiate Reset**
- User clicks "Olvidé mi contraseña"
- Routed to `/forgot-password`
- Enters email address
- POST to `/api/auth/forgot-password`

**Step 2: Token Generation**
- Backend:
  - Validates user exists
  - Generates random token
  - Stores hashed token with expiration
  - Sends email with reset link

**Step 3: Email Sent**
- Email contains link: `/reset-password/:token`
- Link valid for 1 hour
- Uses environment-aware URL construction

**Step 4: Reset Password**
- User clicks link
- Routed to `/reset-password/:token`
- Enters new password (twice)
- POST to `/api/auth/reset-password/:token`

**Step 5: Password Updated**
- Backend:
  - Validates token exists and not expired
  - Hashes new password
  - Updates user record
  - Deletes used token
  - Auto-logs in user

### 10. File Upload Flow

**Step 1: File Selection**
- User uses file input or drag-and-drop
- Frontend validates:
  - File size (<5MB)
  - File type (images/videos)
- Preview shown before upload

**Step 2: Upload Process**
- File sent as FormData
- POST to appropriate endpoint:
  - `/api/user/profile-picture` (profile images)
  - `/api/worker/portfolio-image` (legacy portfolio)
  - `/api/portfolio/projects` (project media)
  - `/api/jobs` (job images)

**Step 3: Backend Processing**
- Multer middleware handles file
- File saved to `/public/uploads/`
- Unique filename generated
- File URL created
- Database record created

**Step 4: Client Update**
- URL returned to frontend
- Image displayed immediately
- TanStack Query cache invalidated
- UI updated with new image

---

## API Endpoints

### Authentication Endpoints

#### POST `/api/register`
**Purpose**: Create new user account  
**Auth**: None  
**Body**:
```json
{
  "username": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "client" | "worker"
}
```
**Returns**: User object (without password)  
**Process**:
1. Check username uniqueness
2. Check email uniqueness
3. Hash password
4. Create user record
5. Auto-login user
6. Return user data

#### POST `/api/login`
**Purpose**: Authenticate user  
**Auth**: None  
**Body**:
```json
{
  "username": "string",
  "password": "string"
}
```
**Returns**: User object (without password)  
**Process**:
1. Passport local strategy authentication
2. Validate credentials
3. Create session
4. Return user data

#### POST `/api/logout`
**Purpose**: End user session  
**Auth**: Required  
**Returns**: Success message  
**Process**:
1. Destroy session
2. Clear cookies
3. Return success

#### GET `/api/user`
**Purpose**: Get current user info  
**Auth**: Required  
**Returns**: User object (without password)

#### POST `/api/auth/forgot-password`
**Purpose**: Initiate password reset  
**Auth**: None  
**Body**:
```json
{
  "email": "string"
}
```
**Returns**: Success message  
**Process**:
1. Find user by email
2. Generate reset token
3. Store hashed token with expiration
4. Send reset email with link

#### POST `/api/auth/reset-password/:token`
**Purpose**: Complete password reset  
**Auth**: None  
**Body**:
```json
{
  "password": "string"
}
```
**Returns**: Success message  
**Process**:
1. Validate token exists and not expired
2. Hash new password
3. Update user password
4. Delete token
5. Auto-login user

### User Endpoints

#### PUT `/api/user`
**Purpose**: Update user profile  
**Auth**: Required  
**Body**: UserUpdateSchema (name, email, phone, address fields, hasPets)  
**Returns**: Updated user object  
**Process**:
1. Validate input with Zod
2. Update user record
3. Return updated user (without password)

#### POST `/api/user/profile-picture`
**Purpose**: Upload profile picture  
**Auth**: Required  
**Body**: FormData with 'image' file  
**Returns**: Updated user object with new profileImage URL  
**Process**:
1. Multer processes upload
2. Generate public URL
3. Update user.profileImage
4. Return updated user

### Worker Endpoints

#### POST `/api/worker/profile`
**Purpose**: Create or update worker profile  
**Auth**: Required (worker role)  
**Body**:
```json
{
  "description": "string (20-400 chars)",
  "serviceAreas": ["zone1", "zone2"],
  "availability": "day:time,day:time"
}
```
**Returns**: Worker profile object  
**Process**:
1. Validate with workerProfileBodySchema
2. Check for existing profile
3. Create or update profile
4. Return profile data

#### GET `/api/worker/my-profile`
**Purpose**: Get authenticated worker's profile  
**Auth**: Required (worker role)  
**Returns**: Worker profile with services, portfolio, reviews  
**Process**:
1. Get worker profile by userId
2. Aggregate related data
3. Return comprehensive profile object

#### GET `/api/worker/profile/:id`
**Purpose**: Get public worker profile  
**Auth**: None  
**Params**: Worker profile ID  
**Returns**: Public profile data  
**Process**:
1. Get worker profile
2. Get associated user
3. Get services offered
4. Get portfolio images/projects
5. Get reviews
6. Return aggregated data

#### POST `/api/worker/portfolio-image`
**Purpose**: Upload portfolio image (legacy)  
**Auth**: Required (worker role)  
**Body**: FormData with 'image' file and 'description'  
**Returns**: Created portfolio image record  
**Process**:
1. Upload image file
2. Create portfolioImages record
3. Return image data

#### POST `/api/worker/service`
**Purpose**: Add custom service  
**Auth**: Required (worker role)  
**Body**:
```json
{
  "serviceId": "number",
  "price": "string"
}
```
**Returns**: Created workerService record

#### GET `/api/worker/open-jobs`
**Purpose**: Get available jobs for workers  
**Auth**: Required (worker role)  
**Returns**: Array of open jobs with client info and images  
**Process**:
1. Get all jobs with status 'open'
2. Enrich with client data
3. Enrich with job images
4. Enrich with service info
5. Add quote counts
6. Return enriched jobs

#### GET `/api/workers`
**Purpose**: Search workers  
**Auth**: None  
**Query params**: Filters (service, zone, etc.)  
**Returns**: Array of worker profiles  
**Process**:
1. Apply filters
2. Get matching workers
3. Return results

### Job Endpoints

#### POST `/api/jobs`
**Purpose**: Create job posting  
**Auth**: Required (client role)  
**Body**: FormData with job fields and up to 5 images  
**Returns**: Created job object  
**Process**:
1. Validate with insertJobSchema
2. Create job record
3. Upload and save images
4. Return job data

#### GET `/api/jobs`
**Purpose**: List open jobs  
**Auth**: None  
**Returns**: Array of open jobs  
**Process**:
1. Query jobs with status 'open'
2. Return job list

#### GET `/api/jobs/:id`
**Purpose**: Get job details  
**Auth**: None  
**Params**: Job ID  
**Returns**: Job with images and client info  
**Process**:
1. Get job record
2. Get job images
3. Get client user info
4. Return aggregated data

#### GET `/api/my-jobs`
**Purpose**: Get authenticated user's jobs  
**Auth**: Required (client role)  
**Returns**: Array of user's jobs with images  
**Process**:
1. Get jobs by clientId
2. Enrich with images
3. Return jobs

### Booking Endpoints

#### POST `/api/bookings`
**Purpose**: Create booking  
**Auth**: Required  
**Body**:
```json
{
  "jobId": "number",
  "workerId": "number",
  "dateTime": "ISO date string",
  "notes": "string"
}
```
**Returns**: Created booking  
**Process**:
1. Validate job exists and is open
2. Validate worker exists
3. Create booking with status 'pending'
4. Send notification email to worker
5. Return booking

#### PATCH `/api/bookings/:id/status`
**Purpose**: Update booking status  
**Auth**: Required (worker role)  
**Params**: Booking ID  
**Body**:
```json
{
  "status": "confirmed" | "rejected" | "completed"
}
```
**Returns**: Updated booking  
**Process**:
1. Validate worker owns booking
2. Update booking status
3. If confirmed:
   - Update job status to 'assigned'
   - Send confirmation email to client
4. Return updated booking

#### GET `/api/my-bookings`
**Purpose**: Get user's bookings  
**Auth**: Required  
**Returns**: Array of bookings with job/worker/client data  
**Process**:
1. Get bookings by role (client or worker)
2. Enrich with related data
3. Return enriched bookings

### Review Endpoints

#### POST `/api/reviews`
**Purpose**: Create service review  
**Auth**: Required (client role)  
**Body**:
```json
{
  "bookingId": "number",
  "workerId": "number",
  "rating": "1-5",
  "comment": "string"
}
```
**Returns**: Created review  
**Process**:
1. Validate booking is completed
2. Validate client owns booking
3. Create review record
4. Return review

### Portfolio Endpoints

#### GET `/api/portfolio/projects`
**Purpose**: Get worker's portfolio projects  
**Auth**: Required (worker role)  
**Returns**: Array of projects with media  
**Process**:
1. Get worker profile
2. Get projects by workerId
3. Include media for each project
4. Return projects

#### POST `/api/portfolio/projects`
**Purpose**: Create portfolio project  
**Auth**: Required (worker role)  
**Body**: FormData with project fields and media files  
**Returns**: Created project with media  
**Process**:
1. Validate project data
2. Create project record
3. Upload media files
4. Create media records
5. Return project with media

#### PATCH `/api/portfolio/projects/:id`
**Purpose**: Update portfolio project  
**Auth**: Required (worker role)  
**Params**: Project ID  
**Body**: FormData with updated fields  
**Returns**: Updated project  
**Process**:
1. Validate worker owns project
2. Update project record
3. Handle new media uploads
4. Delete removed media
5. Return updated project

#### DELETE `/api/portfolio/projects/:id`
**Purpose**: Delete portfolio project  
**Auth**: Required (worker role)  
**Params**: Project ID  
**Returns**: Success message  
**Process**:
1. Validate worker owns project
2. Delete media files
3. Delete media records
4. Delete project record
5. Return success

### Chat Endpoints

#### GET `/api/chat/conversations`
**Purpose**: Get user's conversations  
**Auth**: Required  
**Returns**: Array of conversations  
**Process**:
1. Get conversations where user is participant
2. Include last message for each
3. Return conversations

#### POST `/api/chat/conversations`
**Purpose**: Create conversation  
**Auth**: Required  
**Body**:
```json
{
  "clientId": "number",
  "workerId": "number",
  "jobId": "number (optional)"
}
```
**Returns**: Created conversation  
**Process**:
1. Check for existing conversation
2. Create conversation if none exists
3. Return conversation

#### GET `/api/chat/conversations/:id/messages`
**Purpose**: Get conversation messages  
**Auth**: Required  
**Params**: Conversation ID  
**Returns**: Array of messages with sender info  
**Process**:
1. Validate user is participant
2. Get messages for conversation
3. Include sender information
4. Return messages

#### POST `/api/chat/conversations/:id/messages`
**Purpose**: Send message  
**Auth**: Required  
**Params**: Conversation ID  
**Body**: FormData with 'content' and optional attachments  
**Returns**: Created message  
**Process**:
1. Validate user is participant
2. Create message record
3. Upload attachments if present
4. Update conversation timestamp
5. Return message

### Service Endpoints

#### GET `/api/services`
**Purpose**: Get all service categories  
**Auth**: None  
**Returns**: Array of services  
**Process**:
1. Query all services
2. Return service list

#### GET `/api/services/categories`
**Purpose**: Get service categories for portfolio  
**Auth**: None  
**Returns**: Grouped service categories  
**Process**:
1. Query services
2. Group by category
3. Return categorized services

### SMS Endpoints

#### POST `/api/sms/send`
**Purpose**: Send SMS verification code  
**Auth**: None  
**Body**:
```json
{
  "phone": "string",
  "countryCode": "string (optional)"
}
```
**Returns**: Success message (with code in development)  
**Process**:
1. Clean phone number
2. Generate 6-digit code
3. Store with 5-minute expiration
4. (TODO: Send via Twilio)
5. Return success

#### POST `/api/sms/verify`
**Purpose**: Verify SMS code  
**Auth**: None  
**Body**:
```json
{
  "phone": "string",
  "code": "string"
}
```
**Returns**: Verification result  
**Process**:
1. Find verification record
2. Check code matches and not expired
3. Mark as verified
4. Return success

### Quote Endpoints

#### POST `/api/quotes`
**Purpose**: Submit job quote  
**Auth**: Required (worker role)  
**Body**:
```json
{
  "jobId": "number",
  "price": "string",
  "estimatedHours": "number",
  "description": "string",
  "availability": "string"
}
```
**Returns**: Created quote  
**Process**:
1. Validate worker profile exists
2. Validate job exists and is open
3. Create quote record
4. Return quote

### Evaluator Endpoints

#### POST `/api/evaluator/call`
**Purpose**: Request expert consultation  
**Auth**: Optional  
**Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "description": "string"
}
```
**Returns**: Created call request  
**Process**:
1. Create evaluatorCall record
2. Send notification email
3. Return call request

---

## Frontend Components

### Layout Components

#### Header
**Location**: `client/src/components/layout/header.tsx`  
**Purpose**: Main navigation bar  
**Features**:
- TrustMe logo with home link
- Service search dropdown
- Desktop navigation links
- Mobile menu trigger
- User authentication state:
  - Login/Register buttons (logged out)
  - User avatar dropdown (logged in)
- Profile dropdown with:
  - Link to dashboard
  - Link to profile
  - View public profile (workers)
  - Logout option
- Search modal integration

#### Footer
**Location**: `client/src/components/layout/footer.tsx`  
**Purpose**: Site-wide footer  
**Features**:
- Site information
- Links to legal pages:
  - Terms and Conditions
  - Privacy Policy
  - Cookie Policy
- Social media links
- Copyright notice

#### MobileMenu
**Location**: `client/src/components/layout/mobile-menu.tsx`  
**Purpose**: Mobile navigation drawer  
**Features**:
- User profile summary with avatar
- Quick stats (messages, services, works)
- Navigation links:
  - Home
  - Search services
  - Dashboard (role-specific)
  - Help center
- Logout button
- Service search modal trigger

#### AuthWrapper
**Location**: `client/src/lib/protected-route.tsx`  
**Purpose**: Protected route wrapper  
**Features**:
- Checks authentication status
- Redirects to login if not authenticated
- Role-based access control
- Loading state while checking auth

### Home Page Components

#### HeroSection
**Location**: `client/src/components/home/hero-section.tsx`  
**Purpose**: Landing page hero  
**Features**:
- Main headline and tagline
- Call-to-action buttons
- Service search integration
- Background imagery
- Responsive design

#### StatsSection
**Location**: `client/src/components/home/stats-section.tsx`  
**Purpose**: Platform statistics  
**Features**:
- Number of workers
- Jobs completed
- Customer satisfaction
- Response time
- Animated counters

#### HowItWorks
**Location**: `client/src/components/home/how-it-works.tsx`  
**Purpose**: Process explanation  
**Features**:
- Step-by-step guide for clients
- Step-by-step guide for workers
- Visual icons for each step
- Clear descriptions

#### ServicesSection
**Location**: `client/src/components/home/services-section.tsx`  
**Purpose**: Service category showcase  
**Features**:
- Grid of service categories
- Category icons
- Links to service search
- Hover effects

#### WorkersSection
**Location**: `client/src/components/home/workers-section.tsx`  
**Purpose**: Featured workers  
**Features**:
- Worker carousel/grid
- Worker cards with:
  - Profile picture
  - Name
  - Rating
  - Services
- Link to full profile

#### TestimonialsSection
**Location**: `client/src/components/home/testimonials-section.tsx`  
**Purpose**: User testimonials  
**Features**:
- Testimonial carousel
- Customer photos
- Ratings
- Review text

#### CTASection
**Location**: `client/src/components/home/cta-section.tsx`  
**Purpose**: Call-to-action  
**Features**:
- Role-based CTAs:
  - Post a job (clients)
  - Join as worker (workers)
- Prominent buttons
- Compelling copy

#### EvaluatorSection
**Location**: `client/src/components/home/evaluator-section.tsx`  
**Purpose**: Expert consultation offer  
**Features**:
- Description of evaluator service
- Benefits of consultation
- Request form/button
- Contact information

#### FAQSection
**Location**: `client/src/components/home/faq-section.tsx`  
**Purpose**: Frequently asked questions  
**Features**:
- Accordion-style FAQ
- Common questions for clients and workers
- Expandable answers
- Search functionality (planned)

### Dashboard Components

#### ProfileSidebar
**Location**: `client/src/components/dashboard/ProfileSidebar.tsx`  
**Purpose**: User profile sidebar for desktop dashboards  
**Features**:
- User avatar and name
- Profile completion percentage
- Quick stats
- Edit profile link
- Role-specific information

#### DesktopTabs
**Location**: `client/src/components/dashboard/DesktopTabs.tsx`  
**Purpose**: Desktop dashboard navigation tabs  
**Features**:
- Tab navigation for dashboard sections
- Active tab highlighting
- Icons for each section
- Badge counts for notifications

#### ServiceStatusBar
**Location**: `client/src/components/dashboard/ServiceStatusBar.tsx`  
**Purpose**: Filter bar for services/jobs  
**Features**:
- Status filter buttons:
  - Open
  - Assigned
  - Completed
  - Cancelled
- Active state styling
- Count badges

#### ServicesContent
**Location**: `client/src/components/dashboard/services/ServicesContent.tsx`  
**Purpose**: Client services/jobs management  
**Features**:
- Job listings with status filtering
- Create new job button
- Job cards showing:
  - Job title and description
  - Status badge
  - Date created
  - Location
  - Budget
  - Quote count
- Edit/delete job actions
- View job details link

#### MessagesContent
**Location**: `client/src/components/dashboard/messages/MessagesContent.tsx`  
**Purpose**: Message inbox  
**Features**:
- Conversation list
- Message preview
- Unread indicators
- Click to open conversation
- Send message interface

#### BookingsContent
**Location**: `client/src/components/dashboard/bookings/BookingsContent.tsx`  
**Purpose**: Booking management  
**Features**:
- Booking list with status
- Booking details:
  - Worker/client info
  - Job details
  - Date/time
  - Status
- Actions based on status
- Review prompts for completed

#### ReviewsContent
**Location**: `client/src/components/dashboard/reviews/ReviewsContent.tsx`  
**Purpose**: Review management  
**Features**:
- List of reviews submitted
- Review details:
  - Worker name
  - Rating
  - Comment
  - Date
- Edit/delete actions

### Worker Mobile Components

#### WorkerMobileShell
**Location**: `client/src/components/worker/mobile/WorkerMobileShell.tsx`  
**Purpose**: Mobile dashboard container for workers  
**Features**:
- Bottom navigation bar
- Tab switching
- Active tab highlighting
- Icon-based navigation

#### ServicesTab
**Location**: `client/src/components/worker/mobile/ServicesTab.tsx`  
**Purpose**: Mobile view of available jobs  
**Features**:
- Job card list
- Job filtering
- Quote submission
- Job details modal

#### MessagesTab
**Location**: `client/src/components/worker/mobile/MessagesTab.tsx`  
**Purpose**: Mobile message inbox  
**Features**:
- Conversation list
- Message preview
- Chat interface
- Attachment support

#### ReservationsTab
**Location**: `client/src/components/worker/mobile/ReservationsTab.tsx`  
**Purpose**: Mobile booking management  
**Features**:
- Booking list
- Accept/reject actions
- Booking details
- Status updates

#### BalanceTab
**Location**: `client/src/components/worker/mobile/BalanceTab.tsx`  
**Purpose**: Earnings tracking (UI present)  
**Features**:
- Balance display
- Earnings history
- Payment methods
- Withdrawal options
- (Backend integration pending)

#### ProfileTab
**Location**: `client/src/components/worker/mobile/ProfileTab.tsx`  
**Purpose**: Mobile profile management  
**Features**:
- Profile summary
- Edit profile link
- View public profile link
- Settings access

### Search Components

#### HeaderSearchDropdown
**Location**: `client/src/components/search/header-search-dropdown.tsx`  
**Purpose**: Quick service category search in header  
**Features**:
- Category dropdown
- Subcategory selection
- Opens service search modal
- Keyboard navigation

#### SearchAutocomplete
**Location**: `client/src/components/search/search-autocomplete.tsx`  
**Purpose**: Smart search with suggestions  
**Features**:
- Keyword-based search
- Real-time suggestions
- Category matching
- Search history (planned)

**Service Categories Supported**:
- Plomería (Plumbing)
- Electricidad (Electrical)
- Pintura (Painting)
- Instalación de electrodomésticos (Appliance installation)
- Ensamblado de muebles (Furniture assembly)
- Reparación y mantenimiento (Repair & maintenance)
- Herrería (Metalwork)
- Limpieza profunda (Deep cleaning)
- Valoración para compraventa (Property valuation)

**Keyword Matching**: Each category has extensive Spanish keywords for better search matching.

#### ServiceSearchModal
**Location**: `client/src/components/search/service-search-modal.tsx`  
**Purpose**: Multi-step service search wizard  
**Features**:

**Step 1: Category Selection**
- Service category cards
- Category icons
- Category descriptions

**Step 2: Subcategory Selection**
- Subcategories for selected category
- Specific service areas
- Multiple selection support

**Step 3: Location & Availability**
- CDMX zone selection
- Availability matrix:
  - Days of week
  - Time slots (morning/afternoon/evening)
- Urgency flag

**Step 4: Results**
- Search execution
- Worker listing
- Filter refinement
- View worker profiles

### Contact Components

#### ContactWizard
**Location**: `client/src/components/ContactWizard/`  
**Purpose**: Multi-step service request wizard  
**Features**:

**Step 1 Component**:
- Service category selection
- Problem description
- File upload for problem images
- Form validation

**Step 2 Component**:
- Additional details
- Upload more media
- Location information
- Preferred timing

**Step 3 Component**:
- Contact information
- Name, email, phone
- Special instructions
- Budget indication

**Step 4 Component**:
- Summary review
- Worker suggestions
- Submit request
- Confirmation message

#### SimpleContactWizard
**Location**: `client/src/components/ContactWizard/SimpleContactWizard.tsx`  
**Purpose**: Streamlined contact flow  
**Features**:
- Single-page form
- Essential fields only
- Quick submission
- Success message

### Portfolio Components

#### PortfolioProjectsTab
**Location**: `client/src/components/portfolio/PortfolioProjectsTab.tsx`  
**Purpose**: Portfolio project management  
**Features**:
- Project grid display
- Create new project button
- Project cards with:
  - Thumbnail image
  - Project title
  - Service category
  - Completion date
  - Media count
- Edit/delete actions
- Project modal

#### ProjectForm
**Location**: `client/src/components/portfolio/ProjectForm.tsx`  
**Purpose**: Create/edit portfolio project  
**Features**:
- Project title input
- Description textarea
- Service category dropdown
- Subcategory checkboxes
- Completion date picker (month/year)
- Media upload:
  - Drag-and-drop zone
  - Multiple file support
  - Image/video preview
  - Description for each media
  - Delete media option
  - Reorder media (via sortOrder)
- Public/private toggle
- Save/cancel buttons
- Form validation

### Help Components

#### HelpTabs
**Location**: `client/src/components/help/HelpTabs.tsx`  
**Purpose**: Legal document navigation  
**Features**:
- Tabbed interface for:
  - Terms and Conditions
  - Privacy Policy
  - Cookie Policy
- URL parameter support (?tab=terms)
- Markdown rendering
- Search bar (UI present, functionality planned)
- Mobile-responsive layout
- Vertical tab layout on desktop

### UI Components (Custom)

#### ProfilePictureUpload
**Location**: `client/src/components/ui/profile-picture-upload.tsx`  
**Purpose**: Profile image upload with cropping  
**Features**:
- Current image display
- Upload trigger button
- File input
- Opens AvatarCropper on selection

#### AvatarCropper
**Location**: `client/src/components/ui/avatar-cropper.tsx`  
**Purpose**: Interactive image cropping  
**Features**:
- Uses react-easy-crop
- Zoom control
- Rotation control
- Circular crop area
- Preview
- Save/cancel actions
- Crop result as blob
- Upload to server

### UI Components (shadcn/ui)

The application uses a comprehensive set of shadcn/ui components:

- **Form Components**: Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- **Input Components**: Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider
- **Layout**: Card, Separator, Tabs, Accordion, Sheet, Dialog
- **Navigation**: DropdownMenu, NavigationMenu, Breadcrumb
- **Feedback**: Toast, Alert, AlertDialog, Progress, Skeleton
- **Display**: Avatar, Badge, Tooltip, HoverCard, Popover
- **Interactive**: Button, Toggle, ToggleGroup, ScrollArea, Carousel
- **Advanced**: Calendar, DatePicker, Command, Collapsible

---

## Communication Systems

### In-App Messaging

**Purpose**: Real-time communication between clients and workers

#### Conversation Model
- Links client and worker
- Optionally tied to specific job
- Tracks conversation status (active/archived)
- Updates timestamp on new messages

#### Message Model
- Belongs to conversation
- Sent by user (client or worker)
- Contains text content
- Tracks read status
- Timestamped for ordering

#### Attachment System
- Messages can include files
- Attachments table stores:
  - File URL
  - File type (image/video)
  - File size
  - Original filename
- Can also attach to jobs directly

#### Features
- Conversation list with last message
- Unread message count
- Message history
- File sharing
- Real-time updates (polling-based, WebSocket-ready architecture)

### Email Notifications

**Purpose**: Keep users informed of important events

#### Email System Architecture

**Primary**: Microsoft Graph API
- OAuth2 authentication
- Client ID: d4e98773-42c5-4493-8e16-bb544e13c9ba
- Tenant ID: 68b856c9-e5d8-4b71-80ed-80302a2b58d0
- Automatic token refresh
- Fully operational in production

**Fallback**: Nodemailer SMTP
- Used if Graph API fails
- Traditional SMTP authentication
- Configurable host/port

#### Email Types

**1. Welcome Email**
- Sent on registration
- Welcomes user to platform
- Provides getting started tips
- Role-specific content

**2. Password Reset Email**
- Sent on reset request
- Contains secure reset link
- Link expires in 1 hour
- Environment-aware URL construction:
  - Development: localhost:5000
  - Production: Uses PUBLIC_FRONTEND_URL

**3. Booking Notification to Worker**
- Sent when client creates booking
- Includes:
  - Client name
  - Job title
  - Scheduled date/time
  - Link to dashboard

**4. Booking Confirmation to Client**
- Sent when worker confirms booking
- Includes:
  - Worker name
  - Job title
  - Confirmed date/time
  - Worker contact info
  - Link to dashboard

**5. Evaluator Call Request**
- Sent when user requests expert consultation
- Includes user contact information
- Links to scheduling system

#### URL Construction
- Environment-aware helper function: `buildClientLink()`
- Development: Uses localhost
- Production: Uses PUBLIC_FRONTEND_URL environment variable
- Proper protocol handling (http/https)
- Path joining

### SMS System (Infrastructure Present)

**Purpose**: Phone number verification

#### Features
- Send verification codes
- 6-digit code generation
- 5-minute expiration
- Code verification
- Phone number validation
- Country code support

#### Integration Status
- Database schema complete
- API endpoints implemented
- Frontend UI ready
- SMS service integration pending (Twilio recommended)

---

## File Management

### Upload System

#### Multer Configuration
- **Storage**: Local filesystem (`public/uploads/`)
- **Filename**: UUID + original extension
- **Size Limits**: 5MB per file
- **File Types**: Images (jpg, jpeg, png, gif) and videos (mp4, mov, avi)

#### Upload Endpoints

**Profile Pictures**:
- Endpoint: POST `/api/user/profile-picture`
- Single file
- Cropped on frontend before upload
- Updates user.profileImage

**Portfolio Images** (Legacy):
- Endpoint: POST `/api/worker/portfolio-image`
- Single file
- Optional description
- Creates portfolioImages record

**Portfolio Project Media**:
- Endpoint: POST `/api/portfolio/projects`
- Multiple files
- Part of project creation
- Creates portfolioProjectMedia records

**Job Images**:
- Endpoint: POST `/api/jobs`
- Up to 5 files
- Part of job creation
- Creates jobImages records

**Message Attachments**:
- Endpoint: POST `/api/chat/conversations/:id/messages`
- Multiple files
- Part of message sending
- Creates attachments records

#### File Access
- Public URL: `/uploads/:filename`
- Served statically by Express
- No authentication required for viewing
- Files stored in `public/uploads/` directory

#### Frontend Upload Flow

**1. File Selection**:
- HTML file input or react-dropzone
- File validation (size, type)
- Preview generation

**2. Upload Process**:
- Create FormData object
- Append file(s) and metadata
- POST to appropriate endpoint
- Progress tracking (optional)

**3. Server Processing**:
- Multer middleware handles file
- File saved to disk
- Unique filename generated
- URL returned

**4. Client Update**:
- URL stored in state
- Image displayed
- Cache invalidated
- Database updated

#### Image Cropping (Profile Pictures)

**Process**:
1. User selects image
2. AvatarCropper modal opens
3. User adjusts crop area and zoom
4. Frontend generates cropped blob
5. Blob uploaded to server
6. Server saves cropped image

**Libraries**:
- react-easy-crop for cropping UI
- Canvas API for crop processing

---

## Search & Discovery

### Service Search

#### Search Methods

**1. Autocomplete Search**
- Component: SearchAutocomplete
- Keyword-based matching
- Searches across service names and keywords
- Real-time suggestions as user types
- Supports Spanish terms and variations

**Example Keywords**:
- "plomero" → Plomería category
- "fuga" → Plomería (leak repair)
- "electricista" → Electricidad
- "pintor" → Pintura

**2. Category Search**
- Component: HeaderSearchDropdown
- Dropdown of main categories
- Subcategory drill-down
- Opens advanced search modal

**3. Advanced Search Modal**
- Component: ServiceSearchModal
- Multi-step wizard:
  - Step 1: Category selection
  - Step 2: Subcategory and area selection
  - Step 3: Location and availability
- Results filtered by criteria

#### Search Categories

**Plomería (Plumbing)**:
- Reparación de fugas (Leak repair)
- Destape de drenajes (Drain unclogging)
- Cambio de llaves y grifos (Faucet replacement)
- Instalación de baño y cocina (Bathroom/kitchen installation)
- Sellado de juntas o filtraciones (Sealing)
- Instalación de red de agua (Water network installation)
- Sustitución de flotadores (Float mechanism replacement)

**Electricidad (Electrical)**:
- Cambio de componentes (Component replacement)
- Instalación de componentes (Component installation)
- Reparaciones menores (Minor repairs)
- Instalación de canaletas y extensiones (Conduit installation)
- Instalaciones eléctricas generales (General electrical installations)

**Pintura (Painting)**:
- Pintado de superficies (Surface painting)
- Resanado de superficies (Surface repair)
- Aplicación de selladores (Sealant application)
- Barnizado y acabados (Varnish and finishes)
- Pintura de fachadas (Facade painting)

**Other Categories**:
- Instalación de electrodomésticos (Appliance installation)
- Ensamblado o armado de muebles (Furniture assembly)
- Reparación y mantenimiento (Repair & maintenance)
- Herrería (Metalwork)
- Limpieza profunda (Deep cleaning)
- Valoración para compraventa (Property valuation)

### Worker Discovery

#### Search Criteria
- Service category
- CDMX zone/neighborhood
- Rating threshold
- Availability matching
- Price range (planned)

#### Worker Profiles Display
- Grid or list view
- Worker cards show:
  - Profile picture
  - Name
  - Average rating (stars)
  - Number of reviews
  - Service areas
  - Preview of services offered
  - Starting price (if available)

#### Filtering & Sorting
- Filter by service category
- Filter by location/zone
- Sort by rating
- Sort by reviews count
- Sort by newest
- Distance sorting (planned)

### Job Discovery (Workers)

#### Job Listing
- Available on worker dashboard
- Shows open jobs
- Filtered by:
  - Service category match
  - Location match
  - Budget range
  - Urgency

#### Job Details
- Full description
- Images
- Client information
- Budget range
- Location
- Deadline
- Number of quotes already submitted

---

## Review & Rating System

### Review Creation

#### Eligibility
- Only clients can leave reviews
- Only for completed bookings
- One review per booking
- Cannot review own services

#### Review Data
- **Rating**: 1-5 stars (required)
- **Comment**: Text feedback (optional)
- **Booking**: Links to specific booking
- **Timestamp**: When review was created

### Review Display

#### On Worker Profiles
- List of all reviews
- Shows:
  - Client name
  - Rating (stars)
  - Comment
  - Date
  - Associated job (optional)
- Ordered by newest first

#### Average Rating Calculation
- Computed from all reviews
- Displayed prominently on profile
- Shown in search results
- Updated automatically

#### Review Count
- Total number of reviews
- Displayed with average rating
- Used for sorting/filtering

### Review Management

#### Client Actions
- View own submitted reviews
- Edit review (planned)
- Delete review (planned)

#### Worker Actions
- View all received reviews
- Reply to reviews (planned)
- Report inappropriate reviews (planned)

### Impact on Platform

**For Workers**:
- Higher ratings → better visibility
- More reviews → more trust
- Displays on profile and search results

**For Clients**:
- Informed decision making
- Quality assurance
- Worker comparison

---

## Geographic Targeting

### Mexico City Zones

The application focuses specifically on Mexico City (CDMX) neighborhoods.

#### Supported Zones
- Polanco
- Condesa
- Roma Norte
- Roma Sur
- Escandón
- Del Valle
- Santa Fe
- Coyoacán
- Nápoles
- San Ángel
- Lomas de Chapultepec

#### Zone Selection

**For Workers**:
- Select multiple service areas
- Displayed on profile
- Used for job matching
- Part of search filters

**For Clients**:
- Select zone when posting job
- Filter workers by zone
- Search within specific zones

### Zone Implementation

**Database**:
- Enum in schema: `CDMX_ZONES`
- Array field in workerProfiles: `serviceAreas`
- Text field in jobs: `zone`

**Validation**:
- Zod schema validates zone selection
- Must match predefined list
- Array validation for workers (min 1 zone)

**Frontend**:
- Dropdown or checkbox selection
- Zone badges on profiles
- Map visualization (planned)

---

## Technical Features

### State Management

#### TanStack Query
- Server state caching
- Automatic refetching
- Optimistic updates
- Error handling
- Loading states
- Cache invalidation

**Query Keys**:
- `/api/user` - Current user
- `/api/jobs` - Job listings
- `/api/my-jobs` - User's jobs
- `/api/my-bookings` - User's bookings
- `/api/worker/my-profile` - Worker profile
- `/api/portfolio/projects` - Portfolio projects
- `/api/chat/conversations` - Conversations
- Hierarchical keys for related data

**Mutations**:
- POST/PATCH/DELETE operations
- Optimistic UI updates
- Cache invalidation on success
- Error handling with toasts

#### React Hook Form
- Form state management
- Validation integration
- Error display
- Controlled inputs
- Default values
- Submit handling

#### Wouter Routing
- Lightweight routing
- URL parameters
- Query string support
- Programmatic navigation
- Route protection
- 404 handling

### Form Validation

#### Zod Schemas
- Type-safe validation
- Shared between frontend and backend
- Spanish error messages
- Complex validation rules

**Key Schemas**:
- `insertUserSchema` - User registration
- `userUpdateSchema` - Profile updates
- `insertWorkerProfileSchema` - Worker profile
- `workerProfileBodySchema` - Worker profile API
- `insertJobSchema` - Job creation
- `insertBookingSchema` - Booking creation
- `insertReviewSchema` - Review submission
- `insertPortfolioProjectSchema` - Portfolio projects

**Spanish Character Support**:
- Regex pattern: `/^[\p{L}\p{N}\p{M}\s.,:;!¡¿?'"()\-€$%#@/]+$/u`
- Supports: ñ, á, é, í, ó, ú, ü, ¡, ¿
- Blocks: emojis, control characters, angle brackets

### Responsive Design

#### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

#### Mobile Optimizations
- Touch targets: 44px minimum
- Mobile-first CSS
- Responsive typography
- Collapsible sections
- Bottom navigation for workers
- Hamburger menu for navigation

#### Desktop Enhancements
- Sidebar layouts
- Multi-column grids
- Hover effects
- Larger images
- More information density

### Performance

#### Frontend Optimizations
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis
- React profiler integration
- Virtualization (planned for long lists)

#### Backend Optimizations
- Response time monitoring
- Slow query logging (>300ms)
- Static data caching
- Connection pooling
- Index optimization (planned)

#### Caching Strategy
- TanStack Query caching (5 minutes default)
- Static service data caching
- Browser caching for static assets
- Session caching in PostgreSQL

### Security

#### Input Validation
- Zod schemas on all inputs
- SQL injection prevention via ORM
- XSS prevention (React escaping)
- File type validation
- File size limits

#### Authentication Security
- Bcrypt password hashing
- Secure session cookies
- httpOnly flag
- SameSite protection
- CSRF tokens (planned)

#### Authorization
- Role-based access control
- Route protection
- API endpoint guards
- Resource ownership validation

#### Data Protection
- Password never returned in API responses
- Sensitive data encrypted in transit (HTTPS)
- Session data in PostgreSQL
- Token-based password reset
- Environment variable secrets

### Error Handling

#### Frontend
- TanStack Query error boundaries
- Toast notifications for errors
- Form validation errors
- Loading states
- Fallback UI

#### Backend
- Express error middleware
- Validation errors with details
- Proper HTTP status codes
- Error logging
- User-friendly messages

### Testing

#### Frontend Tests (Vitest)
- Component unit tests
- Navigation tests
- Form validation tests
- Integration tests
- Accessibility tests

#### Backend Tests
- API endpoint tests
- Authentication tests
- Database operation tests
- URL construction tests
- Validation tests

### Development Tools

#### Development Mode
- Hot module replacement (Vite)
- TypeScript type checking
- ESLint linting
- Console logging
- Development-only features (SMS codes, etc.)

#### Production Mode
- Optimized builds
- Minification
- Environment-aware configurations
- Production error handling
- Performance monitoring

---

## Summary

TrustMe Marketplace is a comprehensive, production-ready platform for connecting service providers with clients in Mexico City. The application features:

### Core Capabilities
- **Two-sided marketplace** with distinct client and worker experiences
- **Job posting and discovery** with advanced search and filtering
- **Portfolio system** for workers to showcase their work
- **Booking management** with status tracking
- **Review and rating system** for quality assurance
- **In-app messaging** for communication
- **Email notifications** via Microsoft Graph API
- **Geographic targeting** specific to CDMX zones

### Technical Strengths
- **Modern tech stack** (React 18, TypeScript, Express, PostgreSQL)
- **Type-safe** with Zod validation
- **Responsive design** with mobile-first approach
- **Production-ready email** with OAuth2
- **Comprehensive testing** with Vitest
- **Security-focused** with proper authentication and validation
- **Performance-optimized** with caching and monitoring

### User Experience
- **Intuitive workflows** for common tasks
- **Multi-step wizards** for complex processes
- **Real-time updates** via polling
- **File upload** with drag-and-drop
- **Image cropping** for profile pictures
- **Spanish language support** throughout
- **Legal compliance** with terms, privacy, and cookie policies

This documentation provides a complete reference for understanding how the application works and what has been successfully implemented, making it an excellent foundation for building v2 of the platform.
