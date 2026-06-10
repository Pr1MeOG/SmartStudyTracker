# SmartStudyTracker

This repository contains the Smart Study Tracker MVP: a web frontend (React + Chakra) and a backend API (Node/Express + Postgres).

Quick start:

1. Backend

```bash
cd backend
cp .env.example .env
# Edit DATABASE_URL and JWT_SECRET, then:
npm install
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend proxies `/api` to `http://localhost:4000` during development.

Next steps (tracked in TODO): implement Subject Management, Study Timer persistence, Chapter Tracker, Homework, Attendance, Tests, Revision system, Streaks, Analytics and finalize Google OAuth before deployment.

Status: core MVP features implemented (auth, subjects, sessions, chapters, homework, attendance, tests, revisions, goals, analytics, streaks). Google OAuth deferred to final pre-deploy step.

CI: a GitHub Actions workflow is included at `.github/workflows/ci.yml` which builds the `backend` and `frontend` on pushes and PRs to `main`.

Admin panel: an admin panel is available at `/admin` in the frontend. Create an admin user using the seed script in `backend/scripts/create_admin.js` (example: `node backend/scripts/create_admin.js admij admin@143`).

