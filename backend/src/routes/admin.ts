import express from 'express'
import pool from '../db'
import adminAuth from '../middleware/adminAuth'

const router = express.Router()

// Protect all admin routes
router.use(adminAuth)

router.get('/users', async (_req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT id, name, email, class, board, is_admin, target_percentage FROM users ORDER BY id')
    client.release()
    res.json({ users: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/sessions', async (_req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM sessions ORDER BY created_at DESC LIMIT 200')
    client.release()
    res.json({ sessions: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/tests', async (_req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM tests ORDER BY date DESC LIMIT 200')
    client.release()
    res.json({ tests: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.get('/subjects', async (_req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM subjects ORDER BY id')
    client.release()
    res.json({ subjects: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/users/:id/toggle-admin', async (req, res) => {
  const id = req.params.id
  try {
    const client = await pool.connect()
    const cur = await client.query('SELECT is_admin FROM users WHERE id=$1', [id])
    if (cur.rowCount === 0) { client.release(); return res.status(404).json({ error: 'not found' }) }
    const newVal = !cur.rows[0].is_admin
    const updated = await client.query('UPDATE users SET is_admin=$1 WHERE id=$2 RETURNING id, is_admin', [newVal, id])
    client.release()
    res.json({ user: updated.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  try {
    const client = await pool.connect()
    await client.query('DELETE FROM users WHERE id=$1', [id])
    client.release()
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
