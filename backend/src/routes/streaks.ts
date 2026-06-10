import express from 'express'
import pool from '../db'

const router = express.Router()

// Returns current streak and best streak in days
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const client = await pool.connect()
    const q = `SELECT date_trunc('day', started_at) as day, COALESCE(SUM(duration_minutes),0) as minutes
      FROM sessions WHERE user_id=$1 AND started_at IS NOT NULL GROUP BY 1 ORDER BY 1 DESC`
    const result = await client.query(q, [userId])
    client.release()
    const days = result.rows.map((r: any) => ({ day: new Date(r.day).toISOString().slice(0,10), minutes: parseInt(r.minutes,10) }))

    // consider a day active if minutes >= 15
    const activeDays = new Set(days.filter((d:any)=>d.minutes>=15).map((d:any)=>d.day))

    // compute current streak
    let current = 0
    const today = new Date()
    for (let i=0;;i++){
      const d = new Date(today)
      d.setDate(today.getDate()-i)
      const key = d.toISOString().slice(0,10)
      if (activeDays.has(key)) current++
      else break
    }

    // compute best streak by scanning sorted ascending
    const sorted = Array.from(activeDays).sort() as string[]
    let best = 0
    let run = 0
    for (let i=0;i<sorted.length;i++){
      if (i===0) { run = 1; }
      else {
        const prev = new Date(sorted[i-1])
        const cur = new Date(sorted[i])
        const diff = (cur.getTime()-prev.getTime())/(24*3600*1000)
        if (diff===1) run++
        else run=1
      }
      best = Math.max(best, run)
    }

    res.json({ currentStreak: current, bestStreak: best, activeDays: Array.from(activeDays) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
