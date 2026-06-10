import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: number
}

export default async function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'missing auth' })
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'invalid auth format' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any
    if (!decoded || !decoded.userId) return res.status(401).json({ error: 'invalid token' })
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'unauthorized' })
  }
}
