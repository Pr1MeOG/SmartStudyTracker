import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, HStack } from '@chakra-ui/react'

export default function Subjects() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [name, setName] = useState('')

  useEffect(() => {
    // For MVP use a fixed userId=1; in real app derive from auth
    fetch('/api/subjects?userId=1')
      .then(r => r.json())
      .then(d => setSubjects(d.subjects || []))
  }, [])

  async function add() {
    const res = await fetch('/api/subjects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, name }) })
    const d = await res.json()
    setSubjects(s => [...s, d.subject])
    setName('')
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Subjects</Heading>
      <VStack align="stretch" spacing={3}>
        {subjects.map(s => (
          <Box key={s.id} p={3} borderWidth={1} borderRadius="md">{s.name}</Box>
        ))}
        <HStack>
          <Input placeholder="New subject" value={name} onChange={e => setName(e.target.value)} />
          <Button onClick={add} colorScheme="teal">Add</Button>
        </HStack>
      </VStack>
    </Box>
  )
}
