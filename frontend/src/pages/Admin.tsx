import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, Button, VStack, HStack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [tests, setTests] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    if (token) loadAll()
  }, [token])

  async function login() {
    const res = await fetch('/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    const d = await res.json()
    if (res.ok && d.user && d.user.is_admin) {
      localStorage.setItem('adminToken', d.token)
      setToken(d.token)
    } else {
      alert('Invalid admin credentials')
    }
  }

  async function loadAll() {
    const headers = { Authorization: `Bearer ${token}` }
    const [uRes, sRes, tRes, subRes] = await Promise.all([
      fetch('/api/admin/users', { headers }),
      fetch('/api/admin/sessions', { headers }),
      fetch('/api/admin/tests', { headers }),
      fetch('/api/admin/subjects', { headers }),
    ])
    const [u, s, t, sub] = await Promise.all([uRes.json(), sRes.json(), tRes.json(), subRes.json()])
    setUsers(u.users || [])
    setSessions(s.sessions || [])
    setTests(t.tests || [])
    setSubjects(sub.subjects || [])
  }

  async function toggleAdmin(id:string) {
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    const res = await fetch(`/api/admin/users/${id}/toggle-admin`, { method: 'POST', headers })
    const d = await res.json()
    loadAll()
  }

  if (!token) {
    return (
      <Box>
        <Heading size="sm" mb={4}>Admin Login</Heading>
        <VStack>
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button colorScheme="red" onClick={login}>Login as Admin</Button>
        </VStack>
      </Box>
    )
  }

  return (
    <Box>
      <Heading size="sm" mb={4}>Admin Panel</Heading>
      <Heading size="xs" mt={4}>Users</Heading>
      <Table size="sm" mb={4}>
        <Thead><Tr><Th>ID</Th><Th>Email</Th><Th>Name</Th><Th>Admin</Th><Th></Th></Tr></Thead>
        <Tbody>
          {users.map(u=> (
            <Tr key={u.id}><Td>{u.id}</Td><Td>{u.email}</Td><Td>{u.name}</Td><Td>{String(u.is_admin)}</Td><Td><Button size="xs" onClick={()=>toggleAdmin(String(u.id))}>Toggle Admin</Button></Td></Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="xs">Sessions (recent)</Heading>
      <VStack align="stretch" mb={4}>
        {sessions.slice(0,20).map(s=> <Box key={s.id} p={2} borderWidth={1} borderRadius="md">{s.user_id} — {s.subject} — {s.duration_minutes}m</Box>)}
      </VStack>

      <Heading size="xs">Tests (recent)</Heading>
      <VStack align="stretch" mb={4}>
        {tests.slice(0,20).map(t=> <Box key={t.id} p={2} borderWidth={1} borderRadius="md">{t.user_id} — {t.subject} — {t.score_numeric}/{t.max_score}</Box>)}
      </VStack>

      <Heading size="xs">Subjects</Heading>
      <VStack align="stretch" mb={4}>
        {subjects.map(s=> <Box key={s.id} p={2} borderWidth={1} borderRadius="md">{s.id} — {s.name} — {s.total_hours}h</Box>)}
      </VStack>
    </Box>
  )
}
