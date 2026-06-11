import React, { useEffect, useState } from 'react'
import { Badge, Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SectionHeader } from '../components/ModuleUI'

type Summary = {
  weekMinutes?: number
  subjectDistribution?: Array<{ subject: string; minutes: number }>
}

export default function Analytics() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics/summary/1')
      .then((r) => r.json())
      .then((d) => setSummary(d))
      .catch(() => setSummary({}))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <SectionHeader title="Reports & analytics" subtitle="Use data to understand trends in attendance, fees, performance, and growth." action={<Badge colorScheme="blue">Insights board</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <MetricCard label="Study hours" value={`${Math.round(((summary?.weekMinutes || 0) / 60) * 10) / 10}h`} detail="This week" tone="brand" />
        <MetricCard label="Fee collection" value="82%" detail="Of annual goal" tone="accent" />
        <MetricCard label="Student growth" value="+6.2%" detail="Year over year" tone="slate" />
        <MetricCard label="Attendance trend" value="94.6%" detail="Steady this month" tone="slate" />
      </SimpleGrid>

      {loading ? (
        <LoadingState />
      ) : !summary?.subjectDistribution || summary.subjectDistribution.length === 0 ? (
        <EmptyState title="No analytics data available yet" description="Once activity data is connected, this report will populate with student and campus insights." />
      ) : (
        <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={6}>
          <PanelCard title="Subject coverage" subtitle="Hours logged by academic subject">
            <Stack spacing={3}>
              {summary.subjectDistribution.map((subject) => (
                <Box key={subject.subject} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={3}>
                  <Text fontWeight="600">{subject.subject}</Text>
                  <Text color="slate.600">{Math.round(subject.minutes / 60)}h logged</Text>
                </Box>
              ))}
            </Stack>
          </PanelCard>

          <PanelCard title="Performance insights" subtitle="A quick snapshot of current trends">
            <Stack spacing={3}>
              <Box bg="brand.50" p={4} rounded="2xl">
                <Heading size="sm">Attendance remains strong</Heading>
                <Text color="slate.600" mt={1}>Recent attendance has stayed above the school target for the last four weeks.</Text>
              </Box>
              <Box bg="accent.50" p={4} rounded="2xl">
                <Heading size="sm">Fee collections are healthy</Heading>
                <Text color="slate.600" mt={1}>Collection rates are up and overdue balances are being resolved quickly.</Text>
              </Box>
            </Stack>
          </PanelCard>
        </SimpleGrid>
      )}
    </Box>
  )
}
