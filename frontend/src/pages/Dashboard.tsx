import React from 'react'
import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import StudyTimer from '../components/StudyTimer'

export default function Dashboard() {
  return (
    <Box>
      <Heading size="md" mb={4}>Today</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        <Stat>
          <StatLabel>Hours Today</StatLabel>
          <StatNumber>2h 15m</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Weak Chapter</StatLabel>
          <StatNumber>Kinematics</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending HW</StatLabel>
          <StatNumber>2</StatNumber>
        </Stat>
      </SimpleGrid>

      <Heading size="sm" mb={2}>Study Timer</Heading>
      <StudyTimer />

      <Heading size="sm" mt={6} mb={2}>Quick Summary</Heading>
      <Text color="gray.600">This dashboard is a starting point for the Smart Study Tracker MVP.</Text>
    </Box>
  )
}
