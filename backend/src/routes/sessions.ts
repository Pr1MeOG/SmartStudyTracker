import express from 'express'
import pool from '../db'

const router = express.Router()

router.post('/start', async (req, res) => {
  const { userId, subject, chapter } = req.body
  if (!userId) return res.status(400).json({ error: 'userId required' })
  try {
    const client = await pool.connect()
    const result = await client.query(
      'INSERT INTO sessions (user_id, subject, chapter, started_at) VALUES ($1,$2,$3,now()) RETURNING id, started_at',
      [userId, subject || null, chapter || null]
    )
    client.release()
    res.json({ session: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/end', async (req, res) => {
  const { sessionId, notes, breaks } = req.body
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' })
  try {
    const client = await pool.connect()
    const session = await client.query('SELECT started_at FROM sessions WHERE id=$1', [sessionId])
    if (session.rowCount === 0) {
      client.release()
      return res.status(404).json({ error: 'session not found' })
    }
    const started = session.rows[0].started_at
    const ended = new Date()
    const duration = Math.max(1, Math.round((ended.getTime() - new Date(started).getTime()) / 60000))
    // simple deep work score: longer sessions and fewer breaks -> higher score
    const breaksCount = breaks || 0
    const deepWorkScore = Math.max(1, Math.min(10, Math.round((duration / 30) * (1 - Math.min(breaksCount / 10, 0.8)) * 10)))
    const result = await client.query(
      'UPDATE sessions SET ended_at=now(), duration_minutes=$1, notes=$2, deep_work_score=$3, breaks_count=$4 WHERE id=$5 RETURNING *',
      [duration, notes || {}, deepWorkScore, breaksCount, sessionId]
    )
    client.release()
    res.json({ session: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM sessions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50', [userId])
    client.release()
    res.json({ sessions: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
