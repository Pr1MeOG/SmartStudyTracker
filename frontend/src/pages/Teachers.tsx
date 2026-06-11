import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SearchToolbar, SectionHeader } from '../components/ModuleUI'

type Teacher = {
  name: string
  subject: string
  allocation: string
  className: string
  status: 'Available' | 'Busy' | 'On Leave'
}

const teachersData: Teacher[] = [
  { name: 'Ms. Rivera', subject: 'Mathematics', allocation: '8 periods', className: 'Grade 10-A', status: 'Available' },
  { name: 'Mr. Hassan', subject: 'Physics', allocation: '6 periods', className: 'Grade 11-B', status: 'Busy' },
  { name: 'Dr. Patel', subject: 'Chemistry', allocation: '5 periods', className: 'Grade 9-A', status: 'Available' },
]

export default function Teachers() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredTeachers = useMemo(() => {
    return teachersData.filter((teacher) => {
      const matchesQuery = `${teacher.name} ${teacher.subject} ${teacher.className}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || teacher.status.toLowerCase() === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  return (
    <Box>
      <SectionHeader title="Teachers" subtitle="Coordinate subjects, timetables, and class allocations with clarity." action={<Badge colorScheme="purple">Faculty planner</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <MetricCard label="Teaching staff" value="84" detail="Across 12 departments" tone="brand" />
        <MetricCard label="Subject coverage" value="100%" detail="All core subjects staffed" tone="accent" />
        <MetricCard label="Open periods" value="12" detail="Ready for support sessions" tone="slate" />
        <MetricCard label="On leave" value="2" detail="Scheduled this week" tone="slate" />
      </SimpleGrid>

      <SearchToolbar query={query} setQuery={setQuery} filterValue={filter} setFilterValue={setFilter} filterOptions={[{ label: 'All staff', value: 'all' }, { label: 'Available', value: 'available' }, { label: 'Busy', value: 'busy' }, { label: 'On leave', value: 'on leave' }]} />

      {loading ? (
        <LoadingState />
      ) : filteredTeachers.length === 0 ? (
        <EmptyState title="No teachers match your filters" description="Try adjusting the search terms or status filter." />
      ) : (
        <PanelCard title="Faculty assignments" subtitle="Each teacher card highlights allocation and classroom placement">
          <Stack spacing={3}>
            {filteredTeachers.map((teacher) => (
              <Box key={teacher.name} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4}>
                <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={3}>
                  <Box>
                    <Text fontWeight="700">{teacher.name}</Text>
                    <Text color="slate.600">{teacher.subject}</Text>
                  </Box>
                  <Badge colorScheme={teacher.status === 'Available' ? 'green' : teacher.status === 'Busy' ? 'blue' : 'orange'}>{teacher.status}</Badge>
                </Flex>
                <HStack spacing={4} mt={3} wrap="wrap">
                  <Text fontSize="sm">Allocation: {teacher.allocation}</Text>
                  <Text fontSize="sm">Class: {teacher.className}</Text>
                </HStack>
              </Box>
            ))}
          </Stack>
        </PanelCard>
      )}
    </Box>
  )
}
