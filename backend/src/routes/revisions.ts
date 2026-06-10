import express from 'express'
import pool from '../db'

const router = express.Router()

router.post('/', async (req, res) => {
  const { userId, chapterId, revision_number, revision_date, next_revision_date } = req.body
  if (!userId || !chapterId) return res.status(400).json({ error: 'userId and chapterId required' })
  try {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO revisions (user_id, chapter_id, revision_number, revision_date, next_revision_date) VALUES ($1,$2,$3,$4,$5) RETURNING *', [userId, chapterId, revision_number || 1, revision_date || null, next_revision_date || null])
    client.release()
    res.json({ revision: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/due/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM revisions WHERE user_id=$1 AND next_revision_date<=now() ORDER BY next_revision_date', [userId])
    client.release()
    res.json({ due: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
