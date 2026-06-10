import express from 'express'
import pool from '../db'

const router = express.Router()

router.post('/', async (req, res) => {
  const { userId, subject, chapter, test_name, date, score_numeric, max_score } = req.body
  if (!userId || !subject) return res.status(400).json({ error: 'userId and subject required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO tests (user_id, subject, chapter, test_name, date, score_numeric, max_score) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [userId, subject, chapter || null, test_name || null, date || null, score_numeric || null, max_score || null])
    client.release()
    res.json({ test: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM tests WHERE user_id=$1 ORDER BY date DESC', [userId])
    client.release()
    res.json({ tests: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
