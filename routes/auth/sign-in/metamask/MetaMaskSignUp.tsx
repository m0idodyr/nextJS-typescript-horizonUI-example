import { Button, Icon, useColorModeValue } from '@chakra-ui/react'
import { useAddress, useMetamask, useSDK } from '@thirdweb-dev/react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MetamaskLogo } from '../../../../components/icons/Icons'
import { LoadingSpinner } from '../../../../components/spinner/Spinner'
import { useAuth } from '../../../../contexts/auth/context'
import { useWallet, WalletType } from '../../../../contexts/WalletProvider'
import { trpc } from '../../../../trpc'

const UseMetamask = () => {
  const router = useRouter()
  const connectWithMetamask = useMetamask()
  const { storeMetaMaskConnection, setWalletTypeFn, setWalletAddressFn } =
    useWallet()
  const { user: authUser, updateAuthUser } = useAuth()
  const injectedWalletAddress = useAddress()
  const sdk = useSDK()

  const { refetch: refetchUser } = trpc.user.getUser.useQuery(undefined, {
    enabled: authUser !== undefined,
  })

  const [loading, setLoading] = useState(false)

  const background = useColorModeValue('secondaryGray.300', 'whiteAlpha.200')
  const content = useColorModeValue('navy.700', 'white')
  const hover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' })
  const active = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  )

  useEffect(() => {
    if (authUser && injectedWalletAddress) {
      refetchUser()
        .then(({ data, error }) => {
          if (!data || error) {
            console.error(error)
            throw new Error(
              'Unexpected error while connecting with MetaMask. Please try again.',
            )
          }
          setWalletTypeFn(WalletType.METAMASK)
          setWalletAddressFn(injectedWalletAddress)
          setLoading(false)
          router.push('/dashboard')
        })
        .catch((error) => {
          console.error(error)
          throw new Error(
            'Unexpected error while connecting with MetaMask. Please try again.',
          )
        })
    }
  }, [authUser])

  const handleMetaMaskConnect = async () => {
    try {
      await connectWithMetamask()
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Connector already connected') {
          console.info('MetaMask connector was already connected')
          return
        }
        throw error
      }
      throw error
    }

    if (!injectedWalletAddress) {
      // TODO This can be better
      console.info('No address found. Try again')
      return
    }

    connectWithMetamask()
      .then(() => {
        storeMetaMaskConnection(injectedWalletAddress)
          .then(async () => {
            await activateInjectedWallet().then(async () => {
              await checkUser()
            })
          })
          .catch((error) => {
            console.error(error)
            if (error.message.includes('user rejected signing')) {
              alert('Action canceled by user')
              setLoading(false)
            } else {
              console.error(error)
              setLoading(false)
              throw error
            }
          })
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (error.message === 'Connector already connected') {
            console.info('MetaMask connector was already connected')
            return
          }
          throw error
        }
        throw error
      })
  }

  /**
   * Handle signing the message with injected wallets
   */
  const activateInjectedWallet = async () => {
    setLoading(true)

    if (!sdk || !injectedWalletAddress) {
      throw new Error('No Thirdweb SDK found')
    }

    const cognitoUser = await handleAmplifySignIn()
    const messageToSign = cognitoUser.challengeParam.message
    try {
      const signature = await sdk.wallet.sign(messageToSign)
      await Auth.sendCustomChallengeAnswer(cognitoUser, signature)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      console.error(error)
    }
  }

  const handleAmplifySignIn = async (): Promise<any> => {
    if (!injectedWalletAddress) {
      throw new Error('No MetaMask address found')
    }
    const email = createDummyEmail(injectedWalletAddress)
    try {
      const cognitoUser = await Auth.signIn(email)
      return cognitoUser
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'UserNotFoundException') {
          const params = {
            username: email,
            password: getRandomString(30),
          }
          await Auth.signUp(params)
          return handleAmplifySignIn()
        } else {
          throw error
        }
      }
      throw error
    }
  }

  const checkUser = async () => {
    try {
      const _user = await Auth.currentAuthenticatedUser()
      if (_user) {
        await updateAuthUser()
      }
    } catch (error) {
      console.error('checkUser error', error)
    }
  }

  /**
   * Dummy email is used to crete MetaMask users in Cognito.
   * Email not to be confused with an actual email.
   *
   * TODO Maybe UserPool should support email OR username login?
   * This would mean full UserPool redeployment in all environments
   */
  const createDummyEmail = (address: string) => `${address}@3rdlab.xyz`

  const getRandomString = (bytes: number) => {
    const randomValues = new Uint8Array(bytes)
    window.crypto.getRandomValues(randomValues)
    return Array.from(randomValues).map(intToHex).join('A')
  }

  const intToHex = (number: number) => {
    return number.toString(16).padStart(2, '0')
  }

  return (
    <>
      <Button
        fontSize="sm"
        me="0px"
        mb="26px"
        py="15px"
        h="50px"
        borderRadius="16px"
        bg={background}
        color={content}
        fontWeight="500"
        _hover={hover}
        _active={active}
        _focus={active}
        onClick={handleMetaMaskConnect}
      >
        {loading ? (
          <LoadingSpinner size={'sm'} />
        ) : (
          <>
            <Icon as={MetamaskLogo} w="20px" h="20px" me="10px" />
            Sign in with Metamask
          </>
        )}
      </Button>
    </>
  )
}

export default UseMetamask
