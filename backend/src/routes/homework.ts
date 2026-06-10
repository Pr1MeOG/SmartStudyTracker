import express from 'express'
import pool from '../db'

const router = express.Router()

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM homework WHERE user_id=$1 ORDER BY due_date', [userId])
    client.release()
    res.json({ homework: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/', async (req, res) => {
  const { userId, subject, chapter, due_date, priority } = req.body
  if (!userId || !subject) return res.status(400).json({ error: 'userId and subject required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO homework (user_id, subject, chapter, due_date, priority) VALUES ($1,$2,$3,$4,$5) RETURNING *', [userId, subject, chapter || null, due_date || null, priority || 2])
    client.release()
    res.json({ hw: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/update', async (req, res) => {
  const { id, status } = req.body
  if (!id || !status) return res.status(400).json({ error: 'id and status required' })
  try {
    const client = await pool.connect()
    const result = await client.query('UPDATE homework SET status=$1 WHERE id=$2 RETURNING *', [status, id])
    client.release()
    res.json({ hw: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
