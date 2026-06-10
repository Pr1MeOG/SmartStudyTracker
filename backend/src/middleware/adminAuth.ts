import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db'

export default async function adminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'missing auth' })
    const token = auth.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'dev')
    if (!decoded || !decoded.userId) return res.status(401).json({ error: 'invalid token' })
    const client = await pool.connect()
    const result = await client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.userId])
    client.release()
    if (result.rowCount === 0 || !result.rows[0].is_admin) return res.status(403).json({ error: 'admin only' })
    // attach userId for handlers
    ;(req as any).userId = decoded.userId
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: 'unauthorized' })
  }
}
