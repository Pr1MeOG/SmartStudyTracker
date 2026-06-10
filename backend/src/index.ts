import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import subjectRoutes from './routes/subjects'
import sessionsRoutes from './routes/sessions'
import chaptersRoutes from './routes/chapters'
import homeworkRoutes from './routes/homework'
import attendanceRoutes from './routes/attendance'
import testsRoutes from './routes/tests'
import revisionsRoutes from './routes/revisions'
import goalsRoutes from './routes/goals'
import weaknessRoutes from './routes/weakness'
import analyticsRoutes from './routes/analytics'
import userRoutes from './routes/user'
import streaksRoutes from './routes/streaks'
import adminRoutes from './routes/admin'
import announcementsRoutes from './routes/announcements'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/api/chapters', chaptersRoutes)
app.use('/api/homework', homeworkRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/tests', testsRoutes)
app.use('/api/revisions', revisionsRoutes)
app.use('/api/goals', goalsRoutes)
app.use('/api/weakness', weaknessRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/streaks', streaksRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/announcements', announcementsRoutes)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running on ${port}`))
