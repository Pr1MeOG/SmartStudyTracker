import React from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="outline"
      size="sm"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? '☀️' : '🌙'}
    />
  )
}
