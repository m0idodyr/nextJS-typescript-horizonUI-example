import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaWallet } from 'react-icons/fa'
import Card from '../../../components/card/Card'
import IconBox from '../../../components/icons/IconBox'
import { useNoWa } from '../../../contexts/NoWaProvider'

interface ActivateWalletButtonProps {
  setActiveBullets: React.SetStateAction<any>
}

const ActivateButton = ({ setActiveBullets }: ActivateWalletButtonProps) => {
  const { activateWallet } = useNoWa()

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const brand = useColorModeValue('brand.500', 'brand.400')
  const bg = useColorModeValue('gray.100', 'navy.700')
  const border = useColorModeValue('23E0E5F2FF', '23FFFFFF1A')

  const handleClick = async () => {
    await activateWallet().then(() => {
      setActiveBullets({
        activate: false,
        complete: true,
      })
    })
  }

  return (
    <Card p="30px" onClick={handleClick}>
      <Box>
        <Flex
          align="center"
          justify="center"
          flexDirection="column"
          bg={bg}
          bgImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%${border}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`}
          borderRadius="16px"
          w="100%"
          cursor="pointer"
          mb="12px"
          py="70px"
        >
          <IconBox
            h="64px"
            w="64px"
            bg={brand}
            borderRadius="24px"
            boxShadow="0px 20px 40px -5px rgba(67, 24, 255, 0.4)"
            icon={
              <Icon as={FaWallet} w="50px" h="50px" p="10px" color="white" />
            }
          />
          <Text
            textAlign="center"
            fontSize="2xl"
            fontWeight="700"
            mt="4"
            color={textColor}
          >
            Activate Wallet Now
          </Text>
          <Text
            textAlign="center"
            fontSize="sm"
            fontWeight="500"
            color="secondaryGray.500"
          >
            Simply click here!
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}

export default ActivateButton
