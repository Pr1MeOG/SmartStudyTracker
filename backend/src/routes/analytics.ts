import express from 'express'
import pool from '../db'

const router = express.Router()

// Simple analytics summary for user
router.get('/summary/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const client = await pool.connect()
    const timeRes = await client.query("SELECT COALESCE(SUM(duration_minutes),0) as minutes FROM sessions WHERE user_id=$1 AND started_at>=now() - interval '7 days'", [userId])
    const subjectRes = await client.query('SELECT subject, COALESCE(SUM(duration_minutes),0) as minutes FROM sessions WHERE user_id=$1 GROUP BY subject', [userId])
    const testsRes = await client.query('SELECT date, score_numeric, max_score FROM tests WHERE user_id=$1 ORDER BY date DESC LIMIT 20', [userId])
    client.release()
    res.json({
      weekMinutes: timeRes.rows[0].minutes || 0,
      subjectDistribution: subjectRes.rows,
      recentTests: testsRes.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
