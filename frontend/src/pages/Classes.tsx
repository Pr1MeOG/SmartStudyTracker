import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Flex, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SearchToolbar, SectionHeader } from '../components/ModuleUI'

type ClassItem = {
  name: string
  section: string
  timetable: string
  performance: string
  strength: string
}

const classesData: ClassItem[] = [
  { name: 'Grade 10', section: 'A', timetable: '08:00 - 14:00', performance: '91%', strength: '34 students' },
  { name: 'Grade 10', section: 'B', timetable: '09:00 - 15:00', performance: '87%', strength: '31 students' },
  { name: 'Grade 11', section: 'A', timetable: '10:00 - 16:00', performance: '94%', strength: '29 students' },
]

export default function Classes() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredClasses = useMemo(() => {
    return classesData.filter((classItem) => {
      const matchesQuery = `${classItem.name} ${classItem.section}`.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'all' || classItem.performance.replace('%', '') >= filter
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  return (
    <Box>
      <SectionHeader title="Classes" subtitle="Manage sections, schedules, and class-level performance holistically." action={<Badge colorScheme="teal">Section planner</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <MetricCard label="Active classes" value="18" detail="Across primary and secondary" tone="brand" />
        <MetricCard label="Average class score" value="89%" detail="Steady improvement" tone="accent" />
        <MetricCard label="Timetables ready" value="100%" detail="Published for the term" tone="slate" />
        <MetricCard label="Sections" value="32" detail="Balanced across grades" tone="slate" />
      </SimpleGrid>

      <SearchToolbar query={query} setQuery={setQuery} filterValue={filter} setFilterValue={setFilter} filterOptions={[{ label: 'All classes', value: 'all' }, { label: '90%+', value: '90' }, { label: '85%+', value: '85' }]} />

      {loading ? (
        <LoadingState />
      ) : filteredClasses.length === 0 ? (
        <EmptyState title="No classes match your filters" description="Try widening the performance threshold to reveal more groups." />
      ) : (
        <PanelCard title="Class overview" subtitle="Useful for tracking sections, timings, and results">
          <Stack spacing={3}>
            {filteredClasses.map((classItem) => (
              <Box key={`${classItem.name}-${classItem.section}`} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4}>
                <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={3}>
                  <Box>
                    <Text fontWeight="700">{classItem.name} - Section {classItem.section}</Text>
                    <Text color="slate.600">{classItem.strength}</Text>
                  </Box>
                  <Badge colorScheme="green">{classItem.performance}</Badge>
                </Flex>
                <HStack spacing={4} mt={3} wrap="wrap">
                  <Text fontSize="sm">Timetable: {classItem.timetable}</Text>
                </HStack>
              </Box>
            ))}
          </Stack>
        </PanelCard>
      )}
    </Box>
  )
}
