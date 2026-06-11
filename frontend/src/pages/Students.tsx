import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SearchToolbar, SectionHeader } from '../components/ModuleUI'

type Student = {
  name: string
  className: string
  attendance: string
  performance: string
  status: 'Excellent' | 'On Track' | 'Needs Attention'
}

const studentsData: Student[] = [
  { name: 'Ava Martinez', className: 'Grade 10-A', attendance: '96%', performance: 'A-', status: 'Excellent' },
  { name: 'Liam Chen', className: 'Grade 10-A', attendance: '92%', performance: 'B+', status: 'On Track' },
  { name: 'Nora Singh', className: 'Grade 9-B', attendance: '88%', performance: 'B', status: 'Needs Attention' },
]

export default function Students() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesQuery = `${student.name} ${student.className}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || student.status.toLowerCase().replace(/\s+/g, '-') === filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  return (
    <Box>
      <SectionHeader title="Students" subtitle="Track learner progress, attendance, and growth in one place." action={<Badge colorScheme="brand">Live profile view</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <MetricCard label="Enrolled students" value="1,248" detail="Across 18 classrooms" tone="brand" />
        <MetricCard label="Attendance" value="94.6%" detail="Above monthly target" tone="accent" />
        <MetricCard label="Average performance" value="B+" detail="Improved 0.4 this term" tone="slate" />
        <MetricCard label="At-risk learners" value="23" detail="Flagged for support" tone="slate" />
      </SimpleGrid>

      <SearchToolbar query={query} setQuery={setQuery} filterValue={filter} setFilterValue={setFilter} filterOptions={[{ label: 'All status', value: 'all' }, { label: 'Excellent', value: 'excellent' }, { label: 'On track', value: 'on-track' }, { label: 'Needs attention', value: 'needs-attention' }]} />

      {loading ? (
        <LoadingState />
      ) : filteredStudents.length === 0 ? (
        <EmptyState title="No students match your filters" description="Adjust the search or status filter to see more records." />
      ) : (
        <PanelCard title="Student profiles" subtitle="Searchable academic and wellbeing snapshots">
          <Stack spacing={3}>
            {filteredStudents.map((student) => (
              <Box key={student.name} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4}>
                <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={3}>
                  <Box>
                    <Text fontWeight="700">{student.name}</Text>
                    <Text color="slate.600">{student.className}</Text>
                  </Box>
                  <Badge colorScheme={student.status === 'Excellent' ? 'green' : student.status === 'On Track' ? 'blue' : 'orange'}>{student.status}</Badge>
                </Flex>
                <HStack spacing={4} mt={3} wrap="wrap">
                  <Text fontSize="sm">Attendance: {student.attendance}</Text>
                  <Text fontSize="sm">Performance: {student.performance}</Text>
                </HStack>
              </Box>
            ))}
          </Stack>
        </PanelCard>
      )}
    </Box>
  )
}
