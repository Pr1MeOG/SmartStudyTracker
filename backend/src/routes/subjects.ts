import express from 'express'
import pool from '../db'

const router = express.Router()

// Get subjects for a user (userId passed as query for MVP)
router.get('/', async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ error: 'userId required' })
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT id, name, total_hours, chapters FROM subjects WHERE user_id=$1', [userId])
    client.release()
    res.json({ subjects: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

// Create subject
router.post('/', async (req, res) => {
  const { userId, name } = req.body
  if (!userId || !name) return res.status(400).json({ error: 'userId and name required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO subjects (user_id, name) VALUES ($1,$2) RETURNING id, name', [userId, name])
    client.release()
    res.json({ subject: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
