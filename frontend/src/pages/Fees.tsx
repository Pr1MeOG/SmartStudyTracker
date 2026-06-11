import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SearchToolbar, SectionHeader } from '../components/ModuleUI'

type FeeRecord = {
  student: string
  amount: string
  status: 'Paid' | 'Pending' | 'Overdue'
  dueDate: string
}

const feeData: FeeRecord[] = [
  { student: 'Ava Martinez', amount: '$840', status: 'Paid', dueDate: 'Apr 15' },
  { student: 'Liam Chen', amount: '$960', status: 'Pending', dueDate: 'Jun 10' },
  { student: 'Nora Singh', amount: '$1,120', status: 'Overdue', dueDate: 'May 22' },
]

export default function Fees() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredFees = useMemo(() => {
    return feeData.filter((fee) => {
      const matchesQuery = fee.student.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || fee.status.toLowerCase() === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  return (
    <Box>
      <SectionHeader title="Fee management" subtitle="Track tuition collections, due balances, and payment health in one place." action={<Badge colorScheme="green">Collection dashboard</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <MetricCard label="Collected this term" value="$84.2K" detail="82% of target" tone="brand" />
        <MetricCard label="Outstanding" value="$15.8K" detail="Across 118 students" tone="accent" />
        <MetricCard label="Overdue fees" value="23" detail="Needs follow-up" tone="slate" />
        <MetricCard label="On-time rate" value="91%" detail="Stable and improving" tone="slate" />
      </SimpleGrid>

      <SearchToolbar query={query} setQuery={setQuery} filterValue={filter} setFilterValue={setFilter} filterOptions={[{ label: 'All records', value: 'all' }, { label: 'Paid', value: 'paid' }, { label: 'Pending', value: 'pending' }, { label: 'Overdue', value: 'overdue' }]} />

      {loading ? (
        <LoadingState />
      ) : filteredFees.length === 0 ? (
        <EmptyState title="No fee records match your filters" description="Try broadening the search or switch the fee status filter." />
      ) : (
        <PanelCard title="Fee tracking" subtitle="A clear view of the payment lifecycle for families and staff">
          <Stack spacing={3}>
            {filteredFees.map((fee) => (
              <Box key={fee.student} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4}>
                <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={3}>
                  <Box>
                    <Text fontWeight="700">{fee.student}</Text>
                    <Text color="slate.600">Due {fee.dueDate}</Text>
                  </Box>
                  <Badge colorScheme={fee.status === 'Paid' ? 'green' : fee.status === 'Pending' ? 'blue' : 'orange'}>{fee.status}</Badge>
                </Flex>
                <Text mt={3} fontWeight="600">{fee.amount}</Text>
              </Box>
            ))}
          </Stack>
        </PanelCard>
      )}
    </Box>
  )
}
