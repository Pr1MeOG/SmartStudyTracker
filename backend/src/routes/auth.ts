import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, className } = req.body
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })

    const client = await pool.connect()
    const exists = await client.query('SELECT id FROM users WHERE email=$1', [email])
    if (exists.rowCount && exists.rowCount > 0) {
      client.release()
      return res.status(409).json({ error: 'User already exists' })
    }

    const hash = await bcrypt.hash(password, 10)
    const result = await client.query(
      'INSERT INTO users (name, email, password_hash, class) VALUES ($1,$2,$3,$4) RETURNING id, name, email',
      [name || null, email, hash, className || null]
    )
    client.release()

    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
    res.json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })
    const client = await pool.connect()
    const result = await client.query('SELECT id, name, email, password_hash, is_admin FROM users WHERE email=$1', [email])
    client.release()
    if (result.rowCount === 0) return res.status(401).json({ error: 'invalid credentials' })
    const user = result.rows[0]
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return res.status(401).json({ error: 'invalid credentials' })
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
    res.json({ user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
