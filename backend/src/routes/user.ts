import express from 'express'
import pool from '../db'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT id, name, email, class, board, subjects, target_percentage FROM users WHERE id=$1', [userId])
    client.release()
    if (result.rowCount === 0) return res.status(404).json({ error: 'not found' })
    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/update', async (req, res) => {
  const { id, name, className, board, subjects, target_percentage } = req.body
  if (!id) return res.status(400).json({ error: 'id required' })
  try {
    const client = await pool.connect()
    const result = await client.query('UPDATE users SET name=$1, class=$2, board=$3, subjects=$4, target_percentage=$5 WHERE id=$6 RETURNING id, name, email, class, board, subjects, target_percentage', [name || null, className || null, board || null, subjects || [], target_percentage || 0, id])
    client.release()
    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
