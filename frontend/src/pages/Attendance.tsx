import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, FormControl, FormLabel, Select, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { EmptyState, LoadingState, SectionHeader } from '../components/ModuleUI'

export default function Attendance() {
  const [items, setItems] = useState<any[]>([])
  const [subject, setSubject] = useState('Physics')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/attendance/user/1').then((r) => r.json()).then((d) => setItems(d.attendance || [])).catch(() => setItems([])).finally(() => setLoading(false))
  }, [])

  async function mark() {
    const res = await fetch('/api/attendance/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, subject, attended: true }) })
    const d = await res.json()
    setItems((i) => i.filter((x) => x.subject !== d.attendance.subject).concat(d.attendance))
  }

  return (
    <Box>
      <SectionHeader title="Attendance" subtitle="Monitor class participation and keep the academic record up to date." action={<Badge colorScheme="green">Daily check</Badge>} />

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
            <Button colorScheme="brand" onClick={mark}>Mark attended</Button>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="slate.50" boxShadow="card">
          <Text fontWeight="700" mb={4}>Attendance snapshot</Text>
          {loading ? (
            <LoadingState />
          ) : items.length === 0 ? (
            <EmptyState title="No attendance data yet" description="Mark your first class to start building a clear attendance trail." />
          ) : (
            <Stack spacing={3}>
              {items.map((a) => (
                <Box key={a.id} borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
                  <Text fontWeight="700">{a.subject}</Text>
                  <Text color="slate.600" mt={1}>{a.attended}/{a.total_classes} sessions attended</Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  )
}
