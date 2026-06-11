import React from 'react'
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, HStack, Heading, Icon, SimpleGrid, Skeleton, Stack, Stat, StatLabel, StatNumber, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { SparkleIcon } from './Icons'

const cards = [
  { label: 'Total Students', value: '1,248', detail: '+6.2% this term', accent: 'brand' },
  { label: 'Total Teachers', value: '84', detail: '12 departments', accent: 'accent' },
  { label: 'Total Classes', value: '18', detail: '32 sections', accent: 'slate' },
  { label: 'Fee Collection', value: '$84.2K', detail: '82% of target', accent: 'brand' },
  { label: 'Attendance Rate', value: '94.6%', detail: 'Steady rise', accent: 'accent' },
  { label: 'Pending Payments', value: '23', detail: 'Needs follow-up', accent: 'slate' },
]

const activityRows = [
  { title: 'Recent admissions', detail: '7 new enrollments this week', time: '14 min ago' },
  { title: 'Fee payments', detail: '12 families completed tuition', time: '29 min ago' },
  { title: 'Attendance updates', detail: '3 classes reviewed', time: '1 hr ago' },
  { title: 'Announcements', detail: 'Sports day notice posted', time: '2 hrs ago' },
]

export default function PremiumDashboard() {
  return (
    <Box>
      <Box position="relative" overflow="hidden" bgGradient="linear(to-br, brand.600, accent.500)" color="white" p={{ base: 6, md: 8 }} rounded="2xl" mb={6}>
        <Box position="absolute" inset="0" bg="whiteAlpha.100" backdropFilter="blur(16px)" />
        <Box position="relative">
          <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={4}>
            <Box>
              <HStack spacing={3} mb={3}>
                <Box bg="whiteAlpha.300" p={3} rounded="2xl">
                  <SparkleIcon boxSize={5} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="600" opacity={0.9}>Northstar School</Text>
                  <Text fontSize="xs" opacity={0.8}>Academic year 2026/27</Text>
                </Box>
              </HStack>
              <Heading size="lg">A premium view of your school’s momentum.</Heading>
              <Text mt={2} color="whiteAlpha.800" maxW="2xl">
                From admissions to fees, attendance to communication, every signal is presented in a polished, modern workspace.
              </Text>
            </Box>
            <HStack spacing={3} wrap="wrap">
              <Button size="sm" variant="outline" color="white" borderColor="whiteAlpha.300" _hover={{ bg: 'whiteAlpha.200' }}>
                Quick actions
              </Button>
              <Button size="sm" bg="white" color="brand.700" _hover={{ bg: 'slate.50' }}>
                View reports
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4} mb={6}>
        {cards.map((card) => {
          const accentMap = {
            brand: { bg: 'brand.50', color: 'brand.700' },
            accent: { bg: 'accent.50', color: 'accent.700' },
            slate: { bg: 'slate.100', color: 'slate.700' },
          }
          const tones = accentMap[card.accent as keyof typeof accentMap]
          return (
            <Card key={card.label} transition="transform 0.2s ease, box-shadow 0.2s ease" _hover={{ transform: 'translateY(-4px)', boxShadow: 'soft' }}>
              <CardBody>
                <Box bg={tones.bg} color={tones.color} p={3} rounded="xl" w="fit-content" mb={3}>
                  <Text fontSize="sm" fontWeight="700">{card.label}</Text>
                </Box>
                <Stat>
                  <StatNumber>{card.value}</StatNumber>
                  <StatLabel>{card.detail}</StatLabel>
                </Stat>
              </CardBody>
            </Card>
          )
        })}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6} mb={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Revenue & attendance trends</Heading>
          </CardHeader>
          <CardBody>
            <Box bgGradient="linear(to-br, brand.50, white)" borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4} minH="220px">
              <Skeleton isLoaded startColor="brand.100" endColor="accent.100" borderRadius="xl" height="140px" />
              <Text mt={4} color="slate.600">A polished analytics surface with growth, attendance, and collection trends.</Text>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Student growth</Heading>
          </CardHeader>
          <CardBody>
            <Box bgGradient="linear(to-br, accent.50, white)" borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4} minH="220px">
              <Skeleton isLoaded startColor="accent.100" endColor="brand.100" borderRadius="xl" height="140px" />
              <Text mt={4} color="slate.600">Enrollment growth is trending positively with a stronger start to the year.</Text>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Activity center</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={3}>
              {activityRows.map((row) => (
                <Box key={row.title} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={3} _hover={{ bg: 'slate.50' }}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="700">{row.title}</Text>
                      <Text color="slate.600" mt={1}>{row.detail}</Text>
                    </Box>
                    <Text fontSize="sm" color="slate.500">{row.time}</Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Recent school activity</Heading>
          </CardHeader>
          <CardBody>
            <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" overflow="hidden">
              <Table size="sm" variant="simple">
                <Thead bg="slate.50">
                  <Tr>
                    <Th>Record</Th>
                    <Th>Status</Th>
                    <Th>Updated</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Admission batch</Td>
                    <Td><Badge colorScheme="green">Completed</Badge></Td>
                    <Td>10m ago</Td>
                  </Tr>
                  <Tr>
                    <Td>Fee collection</Td>
                    <Td><Badge colorScheme="blue">In progress</Badge></Td>
                    <Td>28m ago</Td>
                  </Tr>
                  <Tr>
                    <Td>Attendance review</Td>
                    <Td><Badge colorScheme="orange">Pending</Badge></Td>
                    <Td>1h ago</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  )
}
