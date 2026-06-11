import React, { ReactNode } from 'react'
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, HStack, Heading, Input, Select, SimpleGrid, Spinner, Stack, Text, VStack } from '@chakra-ui/react'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={3} mb={5}>
      <Box>
        <Heading size="md">{title}</Heading>
        {subtitle && <Text color="slate.600" mt={1}>{subtitle}</Text>}
      </Box>
      {action}
    </Flex>
  )
}

export function MetricCard({ label, value, detail, tone = 'brand' }: { label: string; value: string; detail: string; tone?: 'brand' | 'accent' | 'slate' }) {
  const toneMap = {
    brand: { bg: 'brand.50', color: 'brand.700' },
    accent: { bg: 'accent.50', color: 'accent.700' },
    slate: { bg: 'slate.100', color: 'slate.700' },
  }

  return (
    <Box bg={toneMap[tone].bg} p={4} rounded="2xl" borderWidth="1px" borderColor="slate.200">
      <Text fontSize="sm" fontWeight="600" color={toneMap[tone].color}>{label}</Text>
      <Heading size="lg" mt={2}>{value}</Heading>
      <Text fontSize="sm" color="slate.600" mt={1}>{detail}</Text>
    </Box>
  )
}

export function PanelCard({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <Card borderWidth="1px" borderColor="slate.200" boxShadow="card">
      <CardHeader pb={2}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="md">{title}</Heading>
            {subtitle && <Text color="slate.600" mt={1}>{subtitle}</Text>}
          </Box>
          {action}
        </Flex>
      </CardHeader>
      <CardBody pt={0}>{children}</CardBody>
    </Card>
  )
}

export function SearchToolbar({ query, setQuery, filterValue, setFilterValue, filterOptions }: { query: string; setQuery: (value: string) => void; filterValue: string; setFilterValue: (value: string) => void; filterOptions: Array<{ label: string; value: string }> }) {
  return (
    <Box bg="slate.50" borderWidth="1px" borderColor="slate.200" p={4} rounded="2xl" mb={5}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
        <Input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} maxW={{ base: '100%', md: '220px' }}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>
    </Box>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Box borderWidth="1px" borderColor="slate.200" rounded="2xl" p={8} textAlign="center" bg="slate.50">
      <Heading size="sm" mb={2}>{title}</Heading>
      <Text color="slate.600">{description}</Text>
    </Box>
  )
}

export function LoadingState() {
  return (
    <VStack spacing={4} py={8}>
      <Spinner size="lg" color="brand.500" />
      <Text color="slate.600">Loading the latest school insights…</Text>
    </VStack>
  )
}
