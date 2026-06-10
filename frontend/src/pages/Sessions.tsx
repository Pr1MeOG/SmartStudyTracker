import React, { useState } from 'react'
import { Box, Button, Input, Select, VStack, Heading, HStack, Text } from '@chakra-ui/react'

export default function Sessions() {
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('Motion in Straight Line')
  const [elapsed, setElapsed] = useState(0)

  async function start() {
    const res = await fetch('/api/sessions/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, subject, chapter }) })
    const d = await res.json()
    setSessionId(d.session.id)
  }

  async function end() {
    if (!sessionId) return
    const res = await fetch('/api/sessions/end', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, notes: { summary: 'Study notes' }, breaks: 1 }) })
    const d = await res.json()
    alert('Session saved: ' + JSON.stringify(d.session))
    setSessionId(null)
  }

  return (
    <Box>
      <Heading size="sm" mb={3}>Study Session</Heading>
      <VStack align="stretch">
        <HStack>
          <Select value={subject} onChange={e => setSubject(e.target.value)} width="40%">
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </Select>
          <Input value={chapter} onChange={e => setChapter(e.target.value)} />
        </HStack>
        <HStack>
          <Button onClick={sessionId ? end : start} colorScheme="teal">{sessionId ? 'End Session' : 'Start Session'}</Button>
          <Text>{sessionId ? `Running (id ${sessionId})` : 'Idle'}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
