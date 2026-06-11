import React, { useEffect, useRef, useState } from 'react'
import { Badge, Box, Button, HStack, Input, Select, Stack, Text } from '@chakra-ui/react'

export default function StudyTimer() {
  const [running, setRunning] = useState(false)
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('Motion in Straight Line')
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  function start() {
    setRunning(true)
    timerRef.current = window.setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
  }

  function stop() {
    setRunning(false)
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
  }

  return (
    <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4} bg="slate.50">
      <Stack spacing={4}>
        <HStack spacing={3} wrap="wrap">
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} width={{ base: '100%', md: '40%' }}>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
          </Select>
          <Input value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Topic" flex="1" />
        </HStack>

        <Box bg="white" p={4} rounded="xl" borderWidth="1px" borderColor="slate.200">
          <HStack justify="space-between" mb={3}>
            <Box>
              <Text fontSize="sm" color="slate.500">Active session</Text>
              <Text fontSize="2xl" fontWeight="700">{Math.floor(elapsed / 60)}:{('0' + (elapsed % 60)).slice(-2)}</Text>
            </Box>
            <Badge colorScheme={running ? 'green' : 'purple'}>{running ? 'Live' : 'Ready'}</Badge>
          </HStack>
          <HStack spacing={3}>
            <Button colorScheme="brand" onClick={running ? stop : start}>
              {running ? 'Stop' : 'Start'}
            </Button>
            <Button variant="outline" onClick={() => setElapsed(0)}>
              Reset
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Box>
  )
}
