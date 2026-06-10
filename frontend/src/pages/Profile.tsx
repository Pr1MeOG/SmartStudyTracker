import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, HStack, Textarea } from '@chakra-ui/react'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [board, setBoard] = useState('')
  const [target, setTarget] = useState(0)

  useEffect(() => {
    fetch('/api/user/1').then(r=>r.json()).then(d=>{ setUser(d.user); setName(d.user.name||''); setClassName(d.user.class||''); setBoard(d.user.board||''); setTarget(d.user.target_percentage||0)})
  }, [])

  async function save() {
    const res = await fetch('/api/user/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 1, name, className, board, subjects: [], target_percentage: target }) })
    const d = await res.json()
    setUser(d.user)
    alert('Profile saved')
  }

  if (!user) return <div>Loading...</div>

  return (
    <Box>
      <Heading size="sm" mb={4}>Profile</Heading>
      <VStack align="stretch">
        <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <Input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class" />
        <Input value={board} onChange={e=>setBoard(e.target.value)} placeholder="Board" />
        <Input type="number" value={target} onChange={e=>setTarget(parseInt(e.target.value||'0'))} placeholder="Target %" />
        <Button colorScheme="teal" onClick={save}>Save</Button>
      </VStack>
    </Box>
  )
}
