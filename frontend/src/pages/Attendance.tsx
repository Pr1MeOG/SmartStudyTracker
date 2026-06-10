import React, { useEffect, useState } from 'react'
import { Box, Heading, Select, Button, VStack, Text } from '@chakra-ui/react'

export default function Attendance() {
  const [items, setItems] = useState<any[]>([])
  const [subject, setSubject] = useState('Physics')

  useEffect(() => {
    fetch('/api/attendance/user/1').then(r => r.json()).then(d => setItems(d.attendance || []))
  }, [])

  async function mark() {
    const res = await fetch('/api/attendance/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 1, subject, attended: true }) })
    const d = await res.json()
    setItems(i => i.filter(x => x.subject !== d.attendance.subject).concat(d.attendance))
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Attendance</Heading>
      <VStack align="stretch">
        {items.map(a => (
          <Text key={a.id}>{a.subject}: {a.attended}/{a.total_classes} ({Math.round((a.attended/a.total_classes||0)*100)}%)</Text>
        ))}
        <Select value={subject} onChange={e => setSubject(e.target.value)} width="40%">
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Maths</option>
        </Select>
        <Button colorScheme="teal" onClick={mark}>Mark Attended</Button>
      </VStack>
    </Box>
  )
}
