import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, SimpleGrid, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { authHeaders } from '../utils/api'
import { LoadingState, SectionHeader } from '../components/ModuleUI'

export default function Profile() {
  const { token, login, logout } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [name, setName] = useState('')
  const [className, setClassName] = useState('')
  const [board, setBoard] = useState('')
  const [target, setTarget] = useState(0)
  const toast = useToast()

  useEffect(() => {
    if (!token) return
    fetch('/api/user/me', { headers: authHeaders(token) })
      .then((r) => r.json())
      .then((d) => {
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
      toast({ title: 'Profile updated', description: 'Your learning profile has been saved.', status: 'success', duration: 3000, isClosable: true })
    } else {
      toast({ title: 'Save failed', description: d.error || 'Please try again.', status: 'error', duration: 3000, isClosable: true })
      if (res.status === 401) logout()
    }
  }

  if (!token) return <Text>Please login to view your profile.</Text>
  if (!profile) return <LoadingState />

  return (
    <Box>
      <SectionHeader title="Profile" subtitle="Keep your personal school details polished and up to date." />

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="white" boxShadow="card">
          <VStack align="stretch" spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </FormControl>
            <FormControl>
              <FormLabel>Class</FormLabel>
              <Input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class" />
            </FormControl>
            <FormControl>
              <FormLabel>Board</FormLabel>
              <Input value={board} onChange={(e) => setBoard(e.target.value)} placeholder="Board" />
            </FormControl>
            <FormControl>
              <FormLabel>Target %</FormLabel>
              <Input type="number" value={target} onChange={(e) => setTarget(parseInt(e.target.value || '0'))} placeholder="Target %" />
            </FormControl>
            <Button colorScheme="brand" onClick={save}>Save profile</Button>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={5} bg="slate.50" boxShadow="card">
          <Stack spacing={3}>
            <Box borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
              <Text fontWeight="700">Personal details</Text>
              <Text color="slate.600" mt={1}>{profile.email || 'student@northstar.edu'}</Text>
            </Box>
            <Box borderWidth="1px" borderColor="slate.200" rounded="xl" p={3}>
              <Text fontWeight="700">Learning focus</Text>
              <Text color="slate.600" mt={1}>Target completion is set to {target}% for the current term.</Text>
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
