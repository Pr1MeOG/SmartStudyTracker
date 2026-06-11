import React from 'react'
import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'

const notifications = [
  { title: 'Fee reminder', detail: 'Three families have outstanding balances', tone: 'orange' },
  { title: 'Attendance alert', detail: 'One class is trending below target', tone: 'red' },
  { title: 'Upcoming event', detail: 'Parent conference starts in 2 hours', tone: 'blue' },
]

export default function NotificationCenter() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button size="sm" variant="outline" onClick={onOpen}>
        Notifications (3)
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notification center</DrawerHeader>
          <DrawerBody>
            <Stack spacing={3}>
              {notifications.map((item) => (
                <Box key={item.title} borderWidth="1px" borderColor="slate.200" rounded="2xl" p={4}>
                  <Badge colorScheme={item.tone}>{item.title}</Badge>
                  <Text mt={2} color="slate.600">{item.detail}</Text>
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
