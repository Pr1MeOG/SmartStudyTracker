import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'slate.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'slate.900',
      },
    }),
  },
  fonts: {
    heading: 'Inter, "Segoe UI", sans-serif',
    body: 'Inter, "Segoe UI", sans-serif',
  },
  colors: {
    brand: {
      50: '#eef4ff',
      100: '#dce8ff',
      500: '#4068ff',
      600: '#2f53d8',
      700: '#21379f',
    },
    accent: {
      50: '#f5f1ff',
      100: '#e8dbff',
      500: '#7c4dff',
      600: '#6d3de6',
    },
    slate: {
      50: '#f7f9fc',
      100: '#eef2f7',
      500: '#64748b',
      700: '#334155',
      900: '#0f172a',
    },
  },
  shadows: {
    soft: '0 18px 45px rgba(15, 23, 42, 0.12)',
    card: '0 10px 30px rgba(15, 23, 42, 0.08)',
  },
  radii: {
    xl: '20px',
    '2xl': '28px',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 600,
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            boxShadow: 'soft',
          },
        },
        outline: {
          borderColor: 'slate.200',
          color: 'slate.700',
          _hover: {
            bg: 'slate.50',
          },
        },
        ghost: {
          color: 'slate.700',
          _hover: {
            bg: 'slate.100',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'xl',
          borderColor: 'slate.200',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #4068ff',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'xl',
          borderColor: 'slate.200',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #4068ff',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: '2xl',
          borderWidth: '1px',
          borderColor: 'slate.200',
          boxShadow: 'card',
        },
      },
    },
  },
})

export default theme
