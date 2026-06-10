import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, Select, HStack, Text } from '@chakra-ui/react'

export default function Tests() {
  const [tests, setTests] = useState<any[]>([])
  const [subject, setSubject] = useState('Physics')
  const [score, setScore] = useState('')
  const [max, setMax] = useState('')

  useEffect(() => {
    fetch('/api/tests/user/1').then(r => r.json()).then(d => setTests(d.tests || []))
  }, [])

  async function add() {
    const res = await fetch('/api/tests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId:1, subject, score_numeric: parseInt(score||'0'), max_score: parseInt(max||'0') }) })
    const d = await res.json()
    setTests(t => [d.test, ...t])
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Tests</Heading>
      <VStack align="stretch">
        {tests.map(t => (
          <Box key={t.id} p={3} borderWidth={1} borderRadius="md">{t.subject} — {t.score_numeric}/{t.max_score}</Box>
        ))}
        <HStack>
          <Select value={subject} onChange={e => setSubject(e.target.value)} width="30%"><option>Physics</option><option>Chemistry</option><option>Maths</option></Select>
          <Input placeholder="Score" value={score} onChange={e => setScore(e.target.value)} width="80px" />
          <Input placeholder="Max" value={max} onChange={e => setMax(e.target.value)} width="80px" />
          <Button colorScheme="teal" onClick={add}>Add</Button>
        </HStack>
      </VStack>
    </Box>
  )
}
