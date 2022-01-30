import '../styles/globals.css'
import type { AppProps } from 'next/app'

export function processItemName(s: string) {
  const re = /(\b[a-z](?!\s))/g
  return s.replace(re, (x) => x.toUpperCase())
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
