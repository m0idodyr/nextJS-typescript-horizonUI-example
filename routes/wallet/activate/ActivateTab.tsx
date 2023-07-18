/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Card from '../../../components/card/Card'
import ActivateButton from './ActivateButton'
interface ActivateTabProps {
  setActiveBullets: React.SetStateAction<any>
}

const ActivateTab = ({ setActiveBullets }: ActivateTabProps) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  return (
    <Box w={{ sm: '350px', md: '700px', lg: '850px' }} p="0px" mx="auto">
      <Card p="30px">
        <Flex direction="column" w="100%">
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
            Activate Wallet
          </Text>
          <Text
            color="secondaryGray.600"
            pe={{ base: '0px', '3xl': '200px' }}
            mb="20px"
          >
            Activate your personal "NoWa"- wallet.
          </Text>
          <Text
            color="secondaryGray.600"
            pe={{ base: '0px', '3xl': '200px' }}
            mb="20px"
          >
            Learn more about NoWa here
          </Text>
          <Box>
            <ActivateButton setActiveBullets={setActiveBullets} />
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}

export default ActivateTab
