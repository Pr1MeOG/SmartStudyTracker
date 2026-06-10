import React, { useState, useRef } from 'react'
import { Box, Button, Select, Input, HStack, Text } from '@chakra-ui/react'

export default function StudyTimer() {
  const [running, setRunning] = useState(false)
  const [subject, setSubject] = useState('Physics')
  const [chapter, setChapter] = useState('Motion in Straight Line')
  const startRef = useRef<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  let timerRef = useRef<number | null>(null)

  function start() {
    setRunning(true)
    startRef.current = Date.now()
    timerRef.current = window.setInterval(() => {
      setElapsed(prev => prev + 1)
    }, 1000)
  }

  function stop() {
    setRunning(false)
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    // In a real app we'd persist the session with subject/chapter/notes
  }

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <HStack spacing={3} mb={3}>
        <Select value={subject} onChange={e => setSubject(e.target.value)} width="40%">
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Maths</option>
        </Select>
        <Input value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Chapter" />
      </HStack>
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={running ? stop : start}>{running ? 'Stop' : 'Start'}</Button>
        <Text>{Math.floor(elapsed / 60)}:{('0' + (elapsed % 60)).slice(-2)}</Text>
      </HStack>
    </Box>
  )
}
