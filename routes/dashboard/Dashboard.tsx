import { Flex, Icon, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import { PLAYGROUND_MEMBERSHIP_CONTRACT } from '@thrdlab/types/src/constants'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaHandHoldingMedical } from 'react-icons/fa'
import Banner from '../../components/banners/Banner'
import Card from '../../components/card/Card'
import IconBox from '../../components/icons/IconBox'
import { LoadingSpinner } from '../../components/spinner/Spinner'
import {
  useAuth,
  useRedirectUnauthenticated,
} from '../../contexts/auth/context'
import { WalletType } from '../../contexts/WalletProvider'
import { trpc } from '../../trpc'

const Dashboard = () => {
  useRedirectUnauthenticated()

  const router = useRouter()
  const { user: authUser, web3AuthUser } = useAuth()

  const [loading, setLoading] = useState(true)

  const { data: membershipDrop, error: membershipDropFetchError } =
    trpc.drop.getDropByTitle.useQuery(
      {
        title: PLAYGROUND_MEMBERSHIP_CONTRACT,
      },
      {
        onSuccess: () => setLoading(false),
        enabled: authUser !== undefined,
      },
    )

  console.log('membershipDrop', membershipDrop)

  useEffect(() => {
    if (membershipDropFetchError) {
      throw new Error(membershipDropFetchError.message)
    }
  }, [membershipDropFetchError])

  useEffect(() => {
    if (
      web3AuthUser?.walletType === WalletType.NOWA &&
      !web3AuthUser.walletAddress
    ) {
      router.push('/wallet/activate')
    }
  }, [web3AuthUser])

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const shadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  )
  const completeShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'inset 0px 4px 4px rgba(255, 255, 255, 0.2)',
  )

  return (
    <Flex w="100%" p={10} direction="column" align="left" gap={4}>
      <Banner />
      <Spacer />
      <Card p="30px" w="100%">
        <Text color={textColor} fontSize="2xl" fontWeight="700" mb="10px">
          Welcome
        </Text>
        <Text
          color="secondaryGray.600"
          fontSize="md"
          fontWeight="400"
          mb="70px"
        >
          Claim your free membership.
        </Text>
        <Flex direction="column" align="center" justify="center">
          {loading || !membershipDrop ? (
            <LoadingSpinner />
          ) : (
            <IconBox
              mb="16px"
              w="86px"
              h="86px"
              bg={'brand.500'}
              shadow={shadow}
              boxShadow={completeShadow}
              icon={
                <Icon
                  w="28px"
                  h="28px"
                  as={FaHandHoldingMedical}
                  color={'white'}
                />
              }
              onClick={() => router.push(`/claim/${membershipDrop.address}`)}
              cursor={'pointer'}
            />
          )}
          <Text
            textAlign="center"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            mb="10px"
          >
            Claim membership
          </Text>
          <Text
            textAlign="center"
            color="secondaryGray.600"
            fontSize="md"
            fontWeight="400"
            maxW="278px"
            mb="70px"
          >
            Claim your playground membership NFT and enter the web3 world.
          </Text>
        </Flex>
      </Card>
    </Flex>
  )
}
export default Dashboard
