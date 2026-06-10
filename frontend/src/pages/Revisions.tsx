import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, Text } from '@chakra-ui/react'

export default function Revisions() {
  const [due, setDue] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/revisions/due/1').then(r => r.json()).then(d => setDue(d.due || []))
  }, [])

  return (
    <Box>
      <Heading size="sm" mb={4}>Revisions Due</Heading>
      <VStack align="stretch">
        {due.map(r => (
          <Box key={r.id} p={3} borderWidth={1} borderRadius="md">Revision #{r.revision_number} for chapter {r.chapter_id} due {r.next_revision_date}</Box>
        ))}
        {due.length === 0 && <Text>No revisions due</Text>}
      </VStack>
    </Box>
  )
}
