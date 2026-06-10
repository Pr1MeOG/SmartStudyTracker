import React from 'react'
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react'

const essentials = [
  'Plan your study sessions with a clear goal',
  'Track homework deadlines and attendance daily',
  'Use the analytics dashboard to find weak topics',
  'Set revision reminders for important chapters',
  'Keep your profile updated for better personalized tracking'
]

export default function Essential() {
  return (
    <Box>
      <Heading size="md" mb={4}>Essential Things</Heading>
      <Text mb={4}>This is the app you should be using for focused study tracking. Keep these essentials front and center as you study.</Text>
      <List spacing={3}>
        {essentials.map((item, idx) => (
          <ListItem key={idx} p={3} borderWidth="1px" borderRadius="md" bg="gray.50">
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
