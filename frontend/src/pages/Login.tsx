import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Box, Input, Button, VStack, Heading, Text, Card, CardBody, CardHeader, Divider, Flex, FormControl, FormLabel } from '@chakra-ui/react'
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
    <Flex justify="center" align="center" minH="70vh">
      <Card maxW="480px" w="100%" borderWidth="1px" borderColor="slate.200" boxShadow="card">
        <CardHeader>
          <Heading size="lg">Welcome back</Heading>
          <Text mt={2} color="slate.600">Sign in to your school command center.</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="student@northstar.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="brand" onClick={handleLogin}>Sign in</Button>
            <Divider />
            <Box>
              <Text fontSize="sm" color="slate.600">
                New here?{' '}
                <Button as={RouterLink} to="/signup" variant="link" colorScheme="brand">
                  Create an account
                </Button>
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  )
}
