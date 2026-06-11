import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { EmptyState, LoadingState, SectionHeader } from '../components/ModuleUI'

export default function Homework() {
  const [homework, setHomework] = useState<any[]>([])
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('')
  const [due, setDue] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/homework/user/1').then((r) => r.json()).then((d) => setHomework(d.homework || [])).catch(() => setHomework([])).finally(() => setLoading(false))
  }, [])

  async function add() {
    const res = await fetch('/api/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, subject, chapter, due_date: due }) })
    const d = await res.json()
    setHomework((h) => [...h, d.hw])
  }

  return (
    <Box>
      <SectionHeader title="Homework" subtitle="Organize tasks, deadlines, and subject priorities gracefully." action={<Badge colorScheme="purple">Assignments</Badge>} />

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="white" boxShadow="card">
          <Heading size="md" mb={4}>Add a task</Heading>
          <VStack align="stretch" spacing={3}>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Maths</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Chapter</FormLabel>
              <Input placeholder="Chapter" value={chapter} onChange={(e) => setChapter(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Due date</FormLabel>
              <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
            </FormControl>
            <Button colorScheme="brand" onClick={add}>Add homework</Button>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="slate.50" boxShadow="card">
          <Heading size="md" mb={4}>Upcoming work</Heading>
          {loading ? (
            <LoadingState />
          ) : homework.length === 0 ? (
            <EmptyState title="No homework yet" description="Add your first assignment to start planning ahead." />
          ) : (
            <Stack spacing={3}>
              {homework.map((h) => (
                <Box key={h.id} borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
                  <Text fontWeight="700">{h.subject}</Text>
                  <Text color="slate.600" mt={1}>{h.chapter || 'General review'}</Text>
                  <Badge mt={2} colorScheme="blue">{h.status || 'Pending'}</Badge>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  )
}
