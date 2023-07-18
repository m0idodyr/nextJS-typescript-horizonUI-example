import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import NavLink from '../../components/link/NavLink'
import NavbarLinks from '../../components/navbar/NavbarLinks'

const SimpleNavbar = ({
  hideNavbarBackButton,
}: {
  hideNavbarBackButton?: boolean | false
}) => {
  const router = useRouter()
  const hideBackButton =
    router.pathname.includes('dashboard') || hideNavbarBackButton

  return (
    <Box
      zIndex={99}
      position="fixed"
      boxShadow="none"
      bg={useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)')}
      borderColor="transparent"
      filter="none"
      backdropFilter="blur(20px)"
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      display={'flex'}
      w={'100vw'}
      p={'30px'}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        justifyContent={!hideBackButton ? 'space-between' : 'flex-end'}
      >
        {!hideBackButton && (
          <Box>
            <NavLink
              href="/dashboard"
              styles={{
                width: 'fit-content',
                marginTop: '20px',
              }}
            >
              <Flex
                align="center"
                ps={{ base: '25px', lg: '0px' }}
                pt={{ lg: '0px', xl: '0px' }}
                w="fit-content"
              >
                <Icon
                  as={FaChevronLeft}
                  me="12px"
                  h="13px"
                  w="8px"
                  color="secondaryGray.600"
                />
                <Text ms="0px" fontSize="md" color="secondaryGray.600">
                  Back to dashboard
                </Text>
              </Flex>
            </NavLink>
          </Box>
        )}
        <Box>
          <NavbarLinks noSidebar={true} />
        </Box>
      </Flex>
    </Box>
  )
}

export default SimpleNavbar
