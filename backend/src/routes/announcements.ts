import express from 'express'
import pool from '../db'
import adminAuth from '../middleware/adminAuth'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      'SELECT id, title, body, pinned, created_at FROM announcements ORDER BY pinned DESC, created_at DESC'
    )
    client.release()
    res.json({ announcements: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/', adminAuth, async (req, res) => {
  const { title, body, pinned } = req.body
  if (!title || !body) return res.status(400).json({ error: 'title and body required' })
  try {
    const client = await pool.connect()
    const result = await client.query(
      'INSERT INTO announcements (title, body, pinned) VALUES ($1,$2,$3) RETURNING id, title, body, pinned, created_at',
      [title, body, pinned ? true : false]
    )
    client.release()
    res.json({ announcement: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
