import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react'
import Head from 'next/head'
import { trpc } from '../trpc'

import theme from '../theme/theme'

import { ThirdwebProvider } from '@thirdweb-dev/react'
import React from 'react'
import 'styles/App.css'
import 'styles/Contact.css'
import 'styles/MiniCalendar.css'
import 'styles/Plugins.css'
import { AuthProvider, initAmplify } from '../contexts/auth'
import { NoWaProvider } from '../contexts/NoWaProvider'
import { WalletProvider } from '../contexts/WalletProvider'
import { AppPropsWithLayout } from '../types/page'

initAmplify()

const manager = createLocalStorageManager('chakra-manager-key')

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <Head>
          <title>Playground | 3rd Lab</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>
        <React.StrictMode>
          <AuthProvider>
            <ThirdwebProvider
              activeChain="mumbai"
              autoConnect={true}
              // TODO How to make this choose which wallet to connect?
              walletConnectors={[
                {
                  name: 'injected',
                  options: {
                    shimDisconnect: false,
                  },
                },
              ]}
            >
              <NoWaProvider>
                <WalletProvider>
                  {getLayout(<Component {...pageProps} />)},
                </WalletProvider>
              </NoWaProvider>
            </ThirdwebProvider>
          </AuthProvider>
        </React.StrictMode>
      </ChakraProvider>
    </>
  )
}

export default trpc.withTRPC(App)
