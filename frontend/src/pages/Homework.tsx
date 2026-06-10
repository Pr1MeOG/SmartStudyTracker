import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, HStack, Select, Text } from '@chakra-ui/react'

export default function Homework() {
  const [homework, setHomework] = useState<any[]>([])
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('')
  const [due, setDue] = useState('')

  useEffect(() => {
    fetch('/api/homework/user/1').then(r => r.json()).then(d => setHomework(d.homework || []))
  }, [])

  async function add() {
    const res = await fetch('/api/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, subject, chapter, due_date: due }) })
    const d = await res.json()
    setHomework(h => [...h, d.hw])
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Homework</Heading>
      <VStack align="stretch">
        {homework.map(h => (
          <Box key={h.id} p={3} borderWidth={1} borderRadius="md">{h.subject} — {h.chapter || '—'} — <Text as="span">{h.status}</Text></Box>
        ))}
        <HStack>
          <Select value={subject} onChange={e => setSubject(e.target.value)} width="35%">
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </Select>
          <Input placeholder="Chapter" value={chapter} onChange={e => setChapter(e.target.value)} />
          <Input type="date" value={due} onChange={e => setDue(e.target.value)} />
          <Button colorScheme="teal" onClick={add}>Add</Button>
        </HStack>
      </VStack>
    </Box>
  )
}
