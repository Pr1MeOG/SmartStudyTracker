import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, HStack, Select } from '@chakra-ui/react'

export default function Goals() {
  const [goals, setGoals] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Study Hours')
  const [target, setTarget] = useState('')

  useEffect(() => {
    fetch('/api/goals/user/1').then(r => r.json()).then(d => setGoals(d.goals || []))
  }, [])

  async function add() {
    const res = await fetch('/api/goals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId:1, title, type, target_value: parseInt(target||'0') }) })
    const d = await res.json()
    setGoals(g => [d.goal, ...g])
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Goals</Heading>
      <VStack align="stretch">
        {goals.map(g => <Box key={g.id} p={3} borderWidth={1} borderRadius="md">{g.title} — {g.current_value}/{g.target_value}</Box>)}
        <HStack>
          <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <Select value={type} onChange={e=>setType(e.target.value)}><option>Study Hours</option><option>Finish Subject</option></Select>
          <Input placeholder="Target" value={target} onChange={e=>setTarget(e.target.value)} width="100px" />
          <Button colorScheme="teal" onClick={add}>Add</Button>
        </HStack>
      </VStack>
    </Box>
  )
}
