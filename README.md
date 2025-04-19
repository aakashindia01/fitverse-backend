# FitVerse Backend

FitVerse is a multi-tenancy gym application. The backend handles API management and database operations using Node.js and Express.js.

## Features

### Company Owner Admin API
- Tenant management (CRUD operations).
- View analytics across tenants.
- Manage company-wide settings.
- Monitor tenant performance.

### Tenant Admin API
- Manage gym locations and facilities.
- User management (CRUD operations).
- Handle membership plans and billing.
- Generate reports and analytics.

### Tenant Staff Admin API
- Daily operations (check-ins, bookings).
- Attendance and progress tracking.
- Customer support management.
- Session scheduling.

### User API
- Profile and membership data.
- Class booking and schedule viewing.
- Workout progress tracking.
- Communication with trainers.

## Tech Stack
- **Backend Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, OAuth2 with Google and Facebook
- **Deployment**: Docker, AWS

## Getting Started
1. Clone the repository:https://github.com/aakashindia01/fitverse-backend.git
2. Install dependencies
3. Run the development server💪
4. Access the API at `http://localhost:3000`.
