import express from 'express'
import pool from '../db'

const router = express.Router()

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM attendance WHERE user_id=$1', [userId])
    client.release()
    res.json({ attendance: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/update', async (req, res) => {
  const { userId, subject, attended } = req.body
  if (!userId || !subject) return res.status(400).json({ error: 'userId and subject required' })
  try {
    const client = await pool.connect()
    const existing = await client.query('SELECT id FROM attendance WHERE user_id=$1 AND subject=$2', [userId, subject])
    if (existing.rowCount === 0) {
      const inserted = await client.query('INSERT INTO attendance (user_id, subject, total_classes, attended) VALUES ($1,$2,1,$3) RETURNING *', [userId, subject, attended ? 1 : 0])
      client.release()
      return res.json({ attendance: inserted.rows[0] })
    }
    const id = existing.rows[0].id
    const updated = await client.query('UPDATE attendance SET total_classes=total_classes+1, attended=attended+$1 WHERE id=$2 RETURNING *', [attended ? 1 : 0, id])
    client.release()
    res.json({ attendance: updated.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
