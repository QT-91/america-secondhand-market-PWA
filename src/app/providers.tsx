// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  ColorModeProvider,
} from '@chakra-ui/react'

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
        <ChakraProvider resetCSS={true} colorModeManager={colorModeManager}>
          {children}
        </ChakraProvider>
      </ColorModeProvider>
    </CacheProvider>
  )
}