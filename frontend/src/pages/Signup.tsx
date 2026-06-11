import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Box, Input, Button, VStack, Heading, Text, Card, CardBody, CardHeader, Divider, Flex, FormControl, FormLabel } from '@chakra-ui/react'
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
    <Flex justify="center" align="center" minH="70vh">
      <Card maxW="480px" w="100%" borderWidth="1px" borderColor="slate.200" boxShadow="card">
        <CardHeader>
          <Heading size="lg">Create your account</Heading>
          <Text mt={2} color="slate.600">Join the school experience with a polished learning workspace.</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Alicia Brown" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="student@northstar.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="brand" onClick={handleSignup}>Create account</Button>
            <Divider />
            <Box>
              <Text fontSize="sm" color="slate.600">
                Already have an account?{' '}
                <Button as={RouterLink} to="/login" variant="link" colorScheme="brand">
                  Sign in
                </Button>
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  )
}
