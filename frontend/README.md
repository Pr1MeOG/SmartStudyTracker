# SmartStudyTracker — Frontend

Quick start (requires Node.js):

```bash
cd frontend
npm install
npm run dev
```

The app proxies `/api` to `http://localhost:4000` by default (see `vite.config.ts`).

Notes:
- Core pages: Dashboard, Subjects, Sessions, Homework, Attendance, Tests, Revisions, Goals, Analytics, Streaks, Profile.
- Google OAuth will be integrated as the final pre-deployment step.
