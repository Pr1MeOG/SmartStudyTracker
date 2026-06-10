import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export default function Streaks() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/streaks/1').then(r=>r.json()).then(d=>setData(d))
  }, [])

  if (!data) return <Text>Loading...</Text>

  return (
    <Box>
      <Heading size="sm" mb={4}>Streaks</Heading>
      <VStack align="start">
        <Text>Current streak: {data.currentStreak} days</Text>
        <Text>Best streak: {data.bestStreak} days</Text>
        <Text>Active days (recent): {data.activeDays.slice(-7).join(', ')}</Text>
      </VStack>
    </Box>
  )
}
