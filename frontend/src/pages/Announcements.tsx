import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, VStack, Alert, AlertIcon, Spinner } from '@chakra-ui/react'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data.announcements || [])
      })
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <Heading size="md" mb={4}>Announcements</Heading>
      {loading ? (
        <Spinner />
      ) : announcements.length === 0 ? (
        <Alert status="info">
          <AlertIcon /> No announcements available yet. Check back soon.
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {announcements.map(item => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" bg={item.pinned ? 'purple.50' : 'white'}>
              <Heading size="sm" mb={2}>{item.title}</Heading>
              <Text mb={2}>{item.body}</Text>
              <Text fontSize="sm" color="gray.500">{new Date(item.created_at).toLocaleString()}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}
