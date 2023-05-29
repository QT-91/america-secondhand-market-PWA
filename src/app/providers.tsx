// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  ColorModeProvider,
} from '@chakra-ui/react'
import theme from '@/theme/theme'

export function Providers({ 
  cookies, children 
}: { 
  cookies: any, children: React.ReactNode 
}) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <CacheProvider>
      <ColorModeProvider>
        <ChakraProvider theme={theme} resetCSS={true} colorModeManager={colorModeManager}>
          {children}
        </ChakraProvider>
      </ColorModeProvider>
    </CacheProvider>
  )
}