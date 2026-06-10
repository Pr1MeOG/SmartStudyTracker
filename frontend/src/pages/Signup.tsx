import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Input, Button, VStack, Heading } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSignup() {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok) {
        login(data.user, data.token)
        navigate('/')
      } else {
        alert(data.error || 'Signup failed')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Sign up</Heading>
      <VStack spacing={3} align="stretch">
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="teal" onClick={handleSignup}>Create account</Button>
      </VStack>
    </Box>
  )
}
