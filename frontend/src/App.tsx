import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Box, Container, Heading, Flex, Button, HStack, Text } from '@chakra-ui/react'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import Sessions from './pages/Sessions'
import Homework from './pages/Homework'
import Attendance from './pages/Attendance'
import Tests from './pages/Tests'
import Revisions from './pages/Revisions'
import Goals from './pages/Goals'
import Analytics from './pages/Analytics'
import Streaks from './pages/Streaks'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Announcements from './pages/Announcements'
import Essential from './pages/Essential'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <Container maxW="container.md" py={6}>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap">
        <Heading size="md">Smart Study Tracker</Heading>
        <HStack spacing={2}>
          <Button as={Link} to="/" variant="ghost" size="sm">Dashboard</Button>
          <Button as={Link} to="/subjects" variant="ghost" size="sm">Subjects</Button>
          <Button as={Link} to="/sessions" variant="ghost" size="sm">Sessions</Button>
          <Button as={Link} to="/homework" variant="ghost" size="sm">Homework</Button>
          <Button as={Link} to="/attendance" variant="ghost" size="sm">Attendance</Button>
          <Button as={Link} to="/tests" variant="ghost" size="sm">Tests</Button>
          <Button as={Link} to="/revisions" variant="ghost" size="sm">Revisions</Button>
          <Button as={Link} to="/goals" variant="ghost" size="sm">Goals</Button>
          <Button as={Link} to="/analytics" variant="ghost" size="sm">Analytics</Button>
          <Button as={Link} to="/streaks" variant="ghost" size="sm">Streaks</Button>
          <Button as={Link} to="/admin" variant="outline" size="sm" colorScheme="purple">Admin</Button>
          <Button as={Link} to="/announcements" variant="ghost" size="sm">Announcements</Button>
          <Button as={Link} to="/essential" variant="ghost" size="sm">Essential</Button>
          <Button as={Link} to="/profile" colorScheme="teal" size="sm">Profile</Button>
          {user ? (
            <Button onClick={logout} colorScheme="red" size="sm">Logout</Button>
          ) : (
            <>
              <Button as={Link} to="/login" colorScheme="blue" size="sm">Login</Button>
              <Button as={Link} to="/signup" colorScheme="green" size="sm">Signup</Button>
            </>
          )}
        </HStack>
      </Flex>
      {user && (
        <Box mb={4} p={3} bg="gray.50" rounded="md">
          <Text fontSize="sm">Signed in as {user.name || user.email}</Text>
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/revisions" element={<Revisions />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/essential" element={<Essential />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Container>
  )
}
