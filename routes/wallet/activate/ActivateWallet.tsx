import { Box, Flex, Text } from '@chakra-ui/react'
import { UserStatus } from '@paperxyz/embedded-wallet-service-sdk'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../../components/spinner/Spinner'
import { useAuth } from '../../../contexts/auth/context'
import { useNoWa } from '../../../contexts/NoWaProvider'
import { WalletType } from '../../../contexts/WalletProvider'
import { NoWaStatus } from '../../../types/nowa-wallet'
import ActivateTab from './ActivateTab'
import CompleteTab from './CompleteTab'
import RecoveryTab from './RecoveryTab'

const ActivateWallet = () => {
  const router = useRouter()
  const { user: authUser, web3AuthUser } = useAuth()
  const { noWaData, noWaStatus, getNoWaUser, walletSdk } = useNoWa()

  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState({
    create: true,
    recovery: false,
    complete: false,
  })

  useEffect(() => {
    if (authUser && web3AuthUser?.walletType === WalletType.METAMASK) {
      // TODO Logout
      router.push('/auth/sign-in')
    }

    if (!walletSdk) return

    if (!noWaData) {
      getNoWaUser().then((nowaUser) => {
        if (!nowaUser) return
        /**
         * Detect user that has already NoWa activated, but is logged out
         */
        if (
          nowaUser.status === UserStatus.LOGGED_OUT &&
          web3AuthUser?.walletType === WalletType.NOWA &&
          web3AuthUser.walletAddress
        ) {
          setActiveView({
            create: false,
            recovery: true,
            complete: false,
          })
          setLoading(false)
          return
        }

        /**
         * Detect new NoWa account
         */
        if (nowaUser.status === UserStatus.LOGGED_OUT) {
          setActiveView({
            create: true,
            recovery: false,
            complete: false,
          })
          setLoading(false)
          return
        }

        /**
         * Detect activated wallet and redirect
         */
        if (
          nowaUser.status === UserStatus.LOGGED_IN_WALLET_INITIALIZED &&
          web3AuthUser?.walletAddress &&
          web3AuthUser.walletType === WalletType.NOWA
        ) {
          setActiveView({
            create: false,
            recovery: false,
            complete: true,
          })
          setLoading(false)
          return
        }
      })
    }
  }, [noWaStatus, noWaData, web3AuthUser, walletSdk])

  return (
    <Box>
      <Flex m={10} direction="column" align="center" position="relative">
        <Box
          h="45vh"
          bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
          position="absolute"
          w="100%"
          borderRadius="30px"
        />
        <Box
          mt={{ base: '60px', md: '80px' }}
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            alignSelf="center"
            justifySelf="center"
          >
            <Box w={{ sm: '120px', md: '250px', lg: '300px' }}>
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
                _before={{
                  content: "''",
                  width: { sm: '130px', md: '250px', lg: '300px' },
                  height: '3px',
                  bg: activeView.complete ? 'white' : '#8476FF',
                  left: { sm: '50px', md: '120px', lg: '150px' },
                  top: {
                    sm: activeView.create ? '6px' : '4px',
                  },
                  position: 'absolute',
                  bottom: activeView.complete ? '40px' : '38px',
                  transition: 'all .3s ease',
                }}
              >
                <Box
                  border="2px solid"
                  borderColor="white"
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color={activeView.create ? 'white' : 'gray.300'}
                  fontWeight={activeView.create ? 'bold' : 'normal'}
                  display={{ sm: 'none', md: 'block' }}
                >
                  Activate
                </Text>
              </Flex>
            </Box>
            <Box w={{ sm: '120px', md: '250px', lg: '300px' }}>
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
              >
                <Box
                  border="2px solid"
                  borderColor={activeView.complete ? 'white' : '#8476FF'}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color={activeView.complete ? 'white' : 'gray.300'}
                  fontWeight={activeView.complete ? 'bold' : 'normal'}
                  display={{ sm: 'none', md: 'block' }}
                >
                  Activated
                </Text>
              </Flex>
            </Box>
          </Box>

          <Box mt="24px" maxW={{ md: '100%', lg: '100%' }} mx="auto">
            {loading && <LoadingSpinner />}
            {!loading && activeView.create && (
              <ActivateTab setActiveBullets={setActiveView} />
            )}
            {!loading && activeView.recovery && (
              <RecoveryTab setActiveBullets={setActiveView} />
            )}
            {!loading && activeView.complete && <CompleteTab />}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
export default ActivateWallet
