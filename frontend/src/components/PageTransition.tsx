import React from 'react'
import { Box } from '@chakra-ui/react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <Box transition="opacity 220ms ease, transform 220ms ease" _hover={{ opacity: 1 }}>
      {children}
    </Box>
  )
}
