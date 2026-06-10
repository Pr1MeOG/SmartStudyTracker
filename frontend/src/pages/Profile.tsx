import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { authHeaders } from '../utils/api'

export default function Profile() {
  const { user, token, login, logout } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [board, setBoard] = useState('')
  const [target, setTarget] = useState(0)

  useEffect(() => {
    if (!token) return
    fetch('/api/user/me', { headers: authHeaders(token) })
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setProfile(d.user)
          setName(d.user.name || '')
          setClassName(d.user.class || '')
          setBoard(d.user.board || '')
          setTarget(d.user.target_percentage || 0)
        }
      })
      .catch(() => {})
  }, [token])

  async function save() {
    if (!token || !profile) return
    const res = await fetch('/api/user/me/update', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ name, className, board, subjects: profile.subjects || [], target_percentage: target })
    })
    const d = await res.json()
    if (d.user) {
      setProfile(d.user)
      login(d.user, token)
      alert('Profile saved')
    } else {
      alert(d.error || 'Save failed')
      if (res.status === 401) logout()
    }
  }

  if (!token) return <Text>Please login to view your profile.</Text>
  if (!profile) return <div>Loading...</div>

  return (
    <Box>
      <Heading size="sm" mb={4}>Profile</Heading>
      <VStack align="stretch">
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <Input value={className} onChange={e => setClassName(e.target.value)} placeholder="Class" />
        <Input value={board} onChange={e => setBoard(e.target.value)} placeholder="Board" />
        <Input type="number" value={target} onChange={e => setTarget(parseInt(e.target.value || '0'))} placeholder="Target %" />
        <Button colorScheme="teal" onClick={save}>Save</Button>
      </VStack>
    </Box>
  )
}
