import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react'

export default function Analytics() {
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    fetch('/api/analytics/summary/1').then(r=>r.json()).then(d=>setSummary(d))
  }, [])

  if (!summary) return <Text>Loading...</Text>

  return (
    <Box>
      <Heading size="sm" mb={4}>Analytics</Heading>
      <SimpleGrid columns={2} spacing={4}>
        <Box p={4} borderWidth={1} borderRadius="md"><Heading size="xs">This Week</Heading><Text>{Math.round((summary.weekMinutes||0)/60)} hours</Text></Box>
        <Box p={4} borderWidth={1} borderRadius="md"><Heading size="xs">Subjects</Heading>{summary.subjectDistribution.map((s:any)=><Text key={s.subject}>{s.subject}: {Math.round(s.minutes/60)}h</Text>)}</Box>
      </SimpleGrid>
    </Box>
  )
}
