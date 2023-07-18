import {
  Box,
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import NightmodeButton from '../../components/buttons/NightmodeButton'
import nightImage from './../../public/img/auth/auth-background-darkblue.png'
import dayImage from './../../public/img/auth/auth-background.png'
import nightLogo from './../../public/img/auth/auth-logo-pink.png'
import dayLogo from './../../public/img/auth/auth-logo-white.png'

interface Props {
  children: JSX.Element
}

const AuthLayout = ({ children }: Props) => {
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100')
  const { colorMode } = useColorMode()
  const illustrationBackground = colorMode === 'light' ? dayImage : nightImage
  const authLogo = colorMode === 'light' ? dayLogo : nightLogo
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: 'initial',
          md: 'unset',
          lg: '100vh',
          xl: '97vh',
        }}
        w="100%"
        maxW={{ md: '66%', lg: '1313px' }}
        mx="auto"
        pt={{ sm: '50px', md: '0px' }}
        px={{ lg: '30px', xl: '0px' }}
        ps={{ xl: '70px' }}
        justifyContent="center"
        direction="column"
      >
        <Box>{children}</Box>
        <Box
          display={{ base: 'none', md: 'block' }}
          h="100%"
          minH="100vh"
          w={{ lg: '50vw', '2xl': '44vw' }}
          position="absolute"
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground.src})`}
            justify="center"
            align="center"
            direction="column"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius={{ lg: '120px', xl: '200px' }}
          >
            <Flex
              display={{ base: 'none', lg: 'block' }}
              h={'60%'}
              justify="center"
              align="center"
              direction="column"
              pl={'10%'}
              w={{ lg: '40vw', '2xl': '34vw' }}
            >
              <Flex
                justify="center"
                align="center"
                direction="column"
                h={'100%'}
              >
                <Image
                  src={authLogo.src}
                  alt="3rdLab logo"
                  maxH={'400px'}
                  w={'auto'}
                  mb={'80px'}
                  h={'100%'}
                ></Image>
                <Flex
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  justify="center"
                  align="center"
                  direction="column"
                  h={'170px'}
                  w={'64%'}
                  minW={'350px'}
                >
                  <Text
                    fontSize="md"
                    color="#E3DAFF"
                    maxW={{
                      base: '100%',
                      md: '64%',
                      lg: '40%',
                      xl: '56%',
                      '2xl': '46%',
                      '3xl': '34%',
                    }}
                    fontWeight="500"
                    lineHeight="28px"
                  >
                    Welcome to the
                  </Text>
                  <Text
                    fontSize={{ base: '24px', md: '34px' }}
                    color="white"
                    mb="4px"
                    maxW={{
                      base: '100%',
                      md: '64%',
                      lg: '46%',
                      xl: '70%',
                      '2xl': '50%',
                      '3xl': '42%',
                    }}
                    fontWeight="700"
                    lineHeight={{ base: '32px', md: '42px' }}
                  >
                    Playground
                  </Text>
                  <Text
                    fontSize="md"
                    color="#E3DAFF"
                    maxW={{
                      base: '100%',
                      md: '64%',
                      lg: '40%',
                      xl: '56%',
                      '2xl': '46%',
                      '3xl': '34%',
                    }}
                    fontWeight="500"
                    lineHeight="28px"
                  >
                    Start your web3 journey now
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <NightmodeButton />
    </Flex>
  )
}

export default AuthLayout
