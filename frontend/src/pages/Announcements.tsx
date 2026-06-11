import React, { useEffect, useState } from 'react'
import { Badge, Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { EmptyState, LoadingState, MetricCard, PanelCard, SectionHeader } from '../components/ModuleUI'

type AnnouncementItem = {
  id: number
  title: string
  body: string
  pinned?: boolean
  created_at: string
  type: 'Notice' | 'Event' | 'Emergency'
}

const fallbackAnnouncements: AnnouncementItem[] = [
  { id: 1, title: 'Parent-teacher conference week', body: 'All parents are invited to meet teachers on Thursday between 3 PM and 6 PM.', pinned: true, created_at: '2026-06-10T09:00:00Z', type: 'Notice' },
  { id: 2, title: 'Science fair registration opens', body: 'Students can register for the annual science fair until Friday.', created_at: '2026-06-08T11:00:00Z', type: 'Event' },
]

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/announcements')
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data.announcements || fallbackAnnouncements)
      })
      .catch(() => setAnnouncements(fallbackAnnouncements))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <SectionHeader title="Announcements" subtitle="Keep families and staff aligned with important campus updates." action={<Badge colorScheme="orange">School communications</Badge>} />

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        <MetricCard label="Pinned updates" value="3" detail="High-priority notices" tone="brand" />
        <MetricCard label="Upcoming events" value="5" detail="This month" tone="accent" />
        <MetricCard label="Emergency alerts" value="1" detail="Recent incident update" tone="slate" />
      </SimpleGrid>

      {loading ? (
        <LoadingState />
      ) : announcements.length === 0 ? (
        <EmptyState title="No announcements available yet" description="Check back soon for school notices and events." />
      ) : (
        <PanelCard title="Latest updates" subtitle="Recently published campus notices and event information">
          <Stack spacing={3}>
            {announcements.map((item) => (
              <Box key={item.id} p={4} borderWidth="1px" borderColor="slate.200" rounded="2xl" bg={item.pinned ? 'brand.50' : 'white'}>
                <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={2}>
                  <Box>
                    <Heading size="sm">{item.title}</Heading>
                    <Text mt={1} color="slate.600">{item.body}</Text>
                  </Box>
                  <Badge colorScheme={item.type === 'Emergency' ? 'red' : item.type === 'Event' ? 'blue' : 'green'}>{item.type}</Badge>
                </Flex>
                <Text mt={3} fontSize="sm" color="slate.500">{new Date(item.created_at).toLocaleString()}</Text>
              </Box>
            ))}
          </Stack>
        </PanelCard>
      )}
    </Box>
  )
}
