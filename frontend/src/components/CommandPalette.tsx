import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Input, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const commands = [
  { label: 'Go to Dashboard', path: '/' },
  { label: 'Open Students', path: '/students' },
  { label: 'Open Teachers', path: '/teachers' },
  { label: 'Open Classes', path: '/classes' },
  { label: 'Open Announcements', path: '/announcements' },
  { label: 'Open Fees', path: '/fees' },
  { label: 'Open Analytics', path: '/analytics' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredCommands = useMemo(() => {
    return commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Quick search ⌘K
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent bg="white" borderRadius="2xl" boxShadow="soft">
          <ModalBody p={4}>
            <Input
              placeholder="Search pages and modules"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              mb={3}
              autoFocus
            />
            <Stack spacing={2}>
              {filteredCommands.map((command) => (
                <Box
                  key={command.path}
                  as={RouterLink}
                  to={command.path}
                  onClick={() => setOpen(false)}
                  borderWidth="1px"
                  borderColor="slate.200"
                  rounded="xl"
                  p={3}
                  _hover={{ bg: 'slate.50' }}
                >
                  <Text fontWeight="600">{command.label}</Text>
                </Box>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
