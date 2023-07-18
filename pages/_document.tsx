import { ColorModeScript } from '@chakra-ui/react'
import { Head, Html, Main, NextScript } from 'next/document'
import theme from '../theme/theme'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*<link rel="apple-touch-icon" href="/logo192.png" />*/}
        {/*<link rel="manifest" href="/manifest.json" />*/}
        {/*<link*/}
        {/*  rel="shortcut icon"*/}
        {/*  type="image/x-icon"*/}
        {/*  href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'}*/}
        {/*/>*/}
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
