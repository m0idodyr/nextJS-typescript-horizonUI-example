import { Flex, Icon, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaHandHoldingMedical } from 'react-icons/fa'
import { MdPersonAddAlt1 } from 'react-icons/md'
import Banner from '../../components/banners/Banner'
import Card from '../../components/card/Card'
import IconBox from '../../components/icons/IconBox'
import { LoadingSpinner } from '../../components/spinner/Spinner'
import { useAuth } from '../../contexts/auth/context'

const Welcome = () => {
  const { web3AuthUser, loading: isWalletLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isWalletLoading) {
      return
    }
    if (web3AuthUser) {
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }, [web3AuthUser, isWalletLoading])

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

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card p="30px" w="100%">
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="10px">
            Get started
          </Text>
          <Text
            color="secondaryGray.600"
            fontSize="md"
            fontWeight="400"
            mb="70px"
          >
            To get started, first step sign-in, activate your account and then
            claim your free membership.
          </Text>
          <Flex
            position="relative"
            direction={{ base: 'column', md: 'row' }}
            justifyContent="center"
            align="center"
            gap={20}
          >
            <Flex direction="column" align="center" justify="center">
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
                    as={MdPersonAddAlt1}
                    color={'white'}
                  />
                }
                onClick={() => router.push('/auth/sign-in')}
                cursor={'pointer'}
              />
              <Text
                textAlign="center"
                color={textColor}
                fontSize="xl"
                fontWeight="700"
                mb="10px"
              >
                Sign-in
              </Text>
              <Text
                textAlign="center"
                color="secondaryGray.600"
                fontSize="md"
                fontWeight="400"
                maxW="278px"
                mb="70px"
              >
                Sign-in using your existing web3 wallet or create NoWa- wallet.
              </Text>
            </Flex>
            <Flex direction="column" align="center" justify="center">
              <IconBox
                mb="16px"
                w="86px"
                h="86px"
                bg={'gray.300'}
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
              />
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
          </Flex>
        </Card>
      )}
    </Flex>
  )
}

export default Welcome
