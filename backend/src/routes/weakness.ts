import express from 'express'
import pool from '../db'

const router = express.Router()

// Compute a weakness score for chapters for a user
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const client = await pool.connect()
    const chapters = await client.query('SELECT id, name, confidence, revision_count FROM chapters WHERE user_id=$1', [userId])
    const tests = await client.query('SELECT chapter, score_numeric, max_score FROM tests WHERE user_id=$1', [userId])

    // Simple formula: lower confidence and test scores and fewer revisions -> higher weakness
    const chapterMap: any = {}
    chapters.rows.forEach((c: any) => {
      chapterMap[c.name] = { name: c.name, confidence: c.confidence || 0, revision_count: c.revision_count || 0, testScores: [] }
    })
    tests.rows.forEach((t: any) => {
      if (!t.chapter) return
      if (!chapterMap[t.chapter]) chapterMap[t.chapter] = { name: t.chapter, confidence: 0, revision_count: 0, testScores: [] }
      chapterMap[t.chapter].testScores.push(t.score_numeric && t.max_score ? (t.score_numeric / t.max_score) * 100 : null)
    })

    const results = Object.values(chapterMap).map((c: any) => {
      const avgTest = c.testScores.length ? c.testScores.filter(Boolean).reduce((a:any,b:any)=>a+b,0)/c.testScores.length : null
      // weakness: inverse of confidence (higher number = weaker), scaled with low test scores and low revision
      let score = (10 - (c.confidence||0)/10) * 3
      if (avgTest !== null) score += (100 - avgTest) / 10
      score += Math.max(0, 3 - (c.revision_count||0))
      return { chapter: c.name, weaknessScore: Math.round(score*10)/10, confidence: c.confidence, avgTest }
    })

    client.release()
    res.json({ weaknesses: results.sort((a:any,b:any)=>b.weaknessScore - a.weaknessScore) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

export default router
