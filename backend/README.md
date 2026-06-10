# SmartStudyTracker — Backend

Quick start (requires Node.js and Postgres):

1. Copy `.env.example` to `.env` and edit values.
2. Create a Postgres database and run the schema in `schema.sql`.
3. Install deps:

```bash
cd backend
npm install
npm run dev
```

Endpoints:
- `POST /api/auth/signup` {name,email,password,className}
- `POST /api/auth/login` {email,password}
- `GET /api/health`

Other API endpoints (MVP):
- `GET /api/subjects?userId=`
- `POST /api/subjects`
- `POST /api/sessions/start` and `POST /api/sessions/end`
- `GET /api/chapters/user/:id` and `POST /api/chapters`/`/api/chapters/update`
- `GET /api/homework/user/:id` and `POST /api/homework`
- `POST /api/attendance/update`
- `GET /api/tests/user/:id` and `POST /api/tests`
- `GET /api/revisions/due/:userId` and `POST /api/revisions`
- `GET /api/goals/user/:id` and `POST /api/goals`
- `GET /api/weakness/user/:id`
- `GET /api/analytics/summary/:userId`
- `GET /api/streaks/:userId`
- `GET /api/user/:id` and `POST /api/user/update`

OAuth: Google OAuth integration will be added as the final pre-deployment step.

Admin user (testing):
To create an admin user run the seed script. Example to create the admin account requested for testing:

```bash
# set DATABASE_URL in env or export it
cd backend
node scripts/create_admin.js admij admin@143
```

This will create or update the user with email `admij` (use a full email if desired) and set `is_admin=true`.

