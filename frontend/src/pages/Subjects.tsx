import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Heading, Input, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { EmptyState, LoadingState, SectionHeader } from '../components/ModuleUI'

export default function Subjects() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/subjects?userId=1')
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects || []))
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false))
  }, [])

  async function add() {
    const res = await fetch('/api/subjects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, name }) })
    const d = await res.json()
    setSubjects((s) => [...s, d.subject])
    setName('')
  }

  return (
    <Box>
      <SectionHeader title="Subjects" subtitle="Keep your academic curriculum organized and easy to manage." action={<Badge colorScheme="blue">Curriculum</Badge>} />

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="white" boxShadow="card">
          <Heading size="md" mb={4}>Add a subject</Heading>
          <VStack align="stretch" spacing={3}>
            <Input placeholder="e.g. Literature" value={name} onChange={(e) => setName(e.target.value)} />
            <Button colorScheme="brand" onClick={add}>Add subject</Button>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="slate.50" boxShadow="card">
          <Heading size="md" mb={4}>Current subjects</Heading>
          {loading ? (
            <LoadingState />
          ) : subjects.length === 0 ? (
            <EmptyState title="No subjects yet" description="Add your first subject to begin organizing curriculum." />
          ) : (
            <Stack spacing={3}>
              {subjects.map((subject) => (
                <Box key={subject.id} borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
                  <Text fontWeight="700">{subject.name}</Text>
                  <Text color="slate.600" mt={1}>Ready for lesson planning and tracking.</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  )
}
