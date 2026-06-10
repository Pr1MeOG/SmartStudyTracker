import express from 'express'
import pool from '../db'

const router = express.Router()

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM chapters WHERE user_id=$1 ORDER BY created_at', [userId])
    client.release()
    res.json({ chapters: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/', async (req, res) => {
  const { userId, subject, name } = req.body
  if (!userId || !subject || !name) return res.status(400).json({ error: 'userId, subject, name required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO chapters (user_id, subject, name) VALUES ($1,$2,$3) RETURNING *', [userId, subject, name])
    client.release()
    res.json({ chapter: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/update', async (req, res) => {
  const { id, status, progress, confidence, revision } = req.body
  if (!id) return res.status(400).json({ error: 'id required' })
  try {
    const client = await pool.connect()
    const updates: string[] = []
    const values: any[] = []
    let idx = 1
    if (status) { updates.push(`status=$${idx++}`); values.push(status) }
    if (progress !== undefined) { updates.push(`progress=$${idx++}`); values.push(progress) }
    if (confidence !== undefined) { updates.push(`confidence=$${idx++}`); values.push(confidence) }
    if (revision) { updates.push(`revision_count=revision_count+1, last_revision=now()`); }
    values.push(id)
    const q = `UPDATE chapters SET ${updates.join(', ')} WHERE id=$${values.length} RETURNING *`
    const result = await client.query(q, values)
    client.release()
    res.json({ chapter: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
