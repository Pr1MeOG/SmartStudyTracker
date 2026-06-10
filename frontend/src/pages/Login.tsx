import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Input, Button, VStack, Heading } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleLogin() {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        login(data.user, data.token)
        navigate('/')
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Login</Heading>
      <VStack spacing={3} align="stretch">
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
      </VStack>
    </Box>
  )
}
