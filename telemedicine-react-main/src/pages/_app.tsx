import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/App.css';
import '../styles/EpicMenu.css';

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
