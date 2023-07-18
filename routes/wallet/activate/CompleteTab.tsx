/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { UserStatus } from '@paperxyz/embedded-wallet-service-sdk'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaWallet } from 'react-icons/fa'
import Card from '../../../components/card/Card'
import IconBox from '../../../components/icons/IconBox'
import { useNoWa } from '../../../contexts/NoWaProvider'
import { useWallet } from '../../../contexts/WalletProvider'
import { trpc } from '../../../trpc'

const CompleteTab = () => {
  const { noWaData } = useNoWa()
  const { setWalletAddressFn } = useWallet()

  const { data: getUserUser } = trpc.user.getUser.useQuery()

  const storeWalletMutation = trpc.user.storeWallet.useMutation()
  const storeWalletAddress = async () => {
    if (!noWaData || !noWaData.walletAddress) {
      throw new Error('No NoWa wallet address found')
    }
    storeWalletMutation.mutate({
      walletAddress: noWaData.walletAddress,
      walletType: 'NOWA',
    })
    setWalletAddressFn(noWaData.walletAddress)
  }

  useEffect(() => {
    if (noWaData?.status === UserStatus.LOGGED_IN_WALLET_INITIALIZED) {
      if (getUserUser && !getUserUser.walletAddress) {
        storeWalletAddress()
      }
    }
  }, [noWaData, getUserUser])

  const bg = useColorModeValue('gray.100', 'navy.700')
  const border = useColorModeValue('23E0E5F2FF', '23FFFFFF1A')
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Box w={{ sm: '330px', md: '700px', lg: '850px' }} p="0px" mx="auto">
      <Card p="30px">
        <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
          Wallet activation completed
        </Text>
        <Card p="30px">
          <Box>
            <Flex
              align="center"
              justify="center"
              flexDirection="column"
              bg={bg}
              bgImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%${border}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`}
              borderRadius="16px"
              w="100%"
              mb="12px"
              py="70px"
            >
              <IconBox
                h="64px"
                w="64px"
                bg="green"
                borderRadius="24px"
                boxShadow="0px 20px 40px -5px rgba(67, 24, 255, 0.4)"
                icon={
                  <Icon
                    as={FaWallet}
                    w="50px"
                    h="50px"
                    p="10px"
                    color="white"
                  />
                }
              />
              <Text
                textAlign="center"
                fontSize="xl"
                fontWeight="700"
                mt="4"
                color={textColor}
              >
                NoWa- wallet is activated!
              </Text>
              <Text
                textAlign="center"
                fontWeight="400"
                mt="4"
                color={textColor}
              >
                Wallet address is: <strong>{noWaData?.walletAddress}</strong>
              </Text>
              <Text
                textAlign="center"
                fontWeight="400"
                mt="4"
                color={textColor}
              >
                You're ready to enter the web3...
              </Text>
            </Flex>
          </Box>
          <Flex justify="flex-end">
            <Link href={'/dashboard'}>
              <Button variant="darkBrand">Continue</Button>
            </Link>
          </Flex>
        </Card>
      </Card>
    </Box>
  )
}

export default CompleteTab
