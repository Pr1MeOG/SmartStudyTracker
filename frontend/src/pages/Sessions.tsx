import React, { useState } from 'react'
import { Badge, Box, Button, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { SectionHeader } from '../components/ModuleUI'

export default function Sessions() {
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('Motion in Straight Line')

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
      <SectionHeader title="Study sessions" subtitle="Start focused sessions with a calm, professional workflow." action={<Badge colorScheme={sessionId ? 'green' : 'blue'}>{sessionId ? 'Live' : 'Ready'}</Badge>} />

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="white" boxShadow="card">
          <VStack align="stretch" spacing={4}>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Maths</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Chapter or topic</FormLabel>
              <Input value={chapter} onChange={(e) => setChapter(e.target.value)} />
            </FormControl>
            <Button colorScheme="brand" onClick={sessionId ? end : start}>{sessionId ? 'End session' : 'Start session'}</Button>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="slate.50" boxShadow="card">
          <Heading size="md" mb={4}>Session overview</Heading>
          <Stack spacing={3}>
            <Box borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
              <Text fontWeight="700">Current status</Text>
              <Text color="slate.600" mt={1}>{sessionId ? `Running session #${sessionId}` : 'Idle and ready to begin'}</Text>
            </Box>
            <Box borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
              <Text fontWeight="700">Focus goal</Text>
              <Text color="slate.600" mt={1}>One deep study block before the next class.</Text>
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
