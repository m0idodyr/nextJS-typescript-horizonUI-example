import { Box, Portal, useDisclosure } from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { SidebarContext } from '../../contexts/SidebarContext'
import { getActiveRoute } from '../../utils/navigation'
import routes from '../../utils/routes'

export const MainLayout = ({ children, ...rest }: PropsWithChildren) => {
  const [fixed] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const { onOpen } = useDisclosure()

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                routeName={getActiveRoute(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box
            p={10}
            mt={10}
            pt={{ base: '130px', md: '80px', xl: '80px' }}
            minH="100vh"
          >
            {children}
          </Box>
          {/*<Box>*/}
          {/*  <Footer/>*/}
          {/*</Box>*/}
        </Box>
      </SidebarContext.Provider>
    </Box>
  )
}

export default MainLayout
