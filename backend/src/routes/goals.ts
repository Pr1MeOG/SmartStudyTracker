import express from 'express'
import pool from '../db'

const router = express.Router()

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM goals WHERE user_id=$1', [userId])
    client.release()
    res.json({ goals: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/', async (req, res) => {
  const { userId, title, type, target_value, due_date } = req.body
  if (!userId || !title) return res.status(400).json({ error: 'userId and title required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO goals (user_id, title, type, target_value, due_date) VALUES ($1,$2,$3,$4,$5) RETURNING *', [userId, title, type || null, target_value || 0, due_date || null])
    client.release()
    res.json({ goal: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
