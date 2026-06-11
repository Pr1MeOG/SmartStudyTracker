import React, { useMemo, useState } from 'react'
import { Box, Button, Container, Divider, Flex, Heading, HStack, IconButton, Stack, Text, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AnalyticsIcon, DashboardIcon, HomeworkIcon, ProfileIcon, SessionsIcon, SparkleIcon, SubjectsIcon } from './Icons'
import CommandPalette from './CommandPalette'
import NotificationCenter from './NotificationCenter'
import PageTransition from './PageTransition'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Students', to: '/students', icon: SubjectsIcon },
  { label: 'Teachers', to: '/teachers', icon: SubjectsIcon },
  { label: 'Classes', to: '/classes', icon: SessionsIcon },
  { label: 'Announcements', to: '/announcements', icon: HomeworkIcon },
  { label: 'Fees', to: '/fees', icon: AnalyticsIcon },
  { label: 'Analytics', to: '/analytics', icon: AnalyticsIcon },
  { label: 'Profile', to: '/profile', icon: ProfileIcon },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'
  const isCompact = useBreakpointValue({ base: true, xl: false })
  const shellGradient = useColorModeValue('linear(to-br, brand.50 0%, white 45%, slate.50 100%)', 'linear(to-br, gray.900 0%, gray.800 45%, gray.900 100%)')
  const panelBg = useColorModeValue('white', 'gray.800')
  const panelBorder = useColorModeValue('slate.200', 'whiteAlpha.200')
  const textColor = useColorModeValue('slate.900', 'whiteAlpha.900')
  const mutedText = useColorModeValue('slate.500', 'whiteAlpha.700')

  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean)
    const labels = segments.length === 0 ? ['Dashboard'] : segments.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    return labels
  }, [location.pathname])

  return (
    <Box minH="100vh" bgGradient={shellGradient} color={textColor}>
      <Container maxW="1400px" py={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
        <Flex direction={{ base: 'column', xl: 'row' }} gap={6}>
          {!isAuthRoute && (
            <Box
              as="aside"
              display={{ base: mobileOpen ? 'block' : 'none', xl: 'block' }}
              width={{ base: '100%', xl: '280px' }}
              bg={panelBg}
              borderWidth="1px"
              borderColor={panelBorder}
              rounded="2xl"
              p={5}
              boxShadow="soft"
              position={{ xl: 'sticky' }}
              top={{ xl: 6 }}
              h="fit-content"
            >
              <Stack spacing={4}>
                <Box>
                  <HStack spacing={2} mb={2}>
                    <Box bg="brand.500" color="white" p={2} rounded="xl">
                      <SparkleIcon boxSize={4} />
                    </Box>
                    <Box>
                      <Heading size="sm">Northstar School</Heading>
                      <Text fontSize="xs" color={mutedText}>Campus command center</Text>
                    </Box>
                  </HStack>
                </Box>

                <VStack align="stretch" spacing={2}>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const active = location.pathname === item.to
                    return (
                      <Button
                        key={item.to}
                        as={Link}
                        to={item.to}
                        variant={active ? 'solid' : 'ghost'}
                        justifyContent="flex-start"
                        leftIcon={<Icon boxSize={4} />}
                        size="sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Button>
                    )
                  })}
                </VStack>

                <Box bg={useColorModeValue('brand.50', 'whiteAlpha.100')} p={4} rounded="xl">
                  <Text fontSize="sm" fontWeight="600" color="brand.700">Focus mode</Text>
                  <Text fontSize="sm" color={mutedText} mt={1}>
                    Keep the momentum with your next revision block.
                  </Text>
                </Box>
              </Stack>
            </Box>
          )}

          <Box flex="1" minW="0">
            <Box bg={panelBg} borderWidth="1px" borderColor={panelBorder} rounded="2xl" p={{ base: 4, md: 6 }} boxShadow="soft">
              {!isAuthRoute && (
                <>
                  <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
                    <HStack spacing={3}>
                      {isCompact && (
                        <IconButton aria-label="Toggle navigation" variant="outline" size="sm" onClick={() => setMobileOpen((value) => !value)}>
                          ☰
                        </IconButton>
                      )}
                      <Box>
                        <Text fontSize="sm" fontWeight="600" color="brand.600">School ERP • {breadcrumbs.join(' / ')}</Text>
                        <Heading size="lg">Welcome back, {user?.name || 'student'}</Heading>
                      </Box>
                    </HStack>
                    <HStack spacing={3}>
                      <CommandPalette />
                      <NotificationCenter />
                      <ThemeToggle />
                      {user ? (
                        <Button size="sm" colorScheme="red" onClick={logout}>Logout</Button>
                      ) : (
                        <Button as={Link} to="/login" size="sm" variant="solid">Login</Button>
                      )}
                    </HStack>
                  </Flex>
                  <Divider mb={6} />
                </>
              )}

              <PageTransition>{children}</PageTransition>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
