import { Box } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import Footer from '../../components/footer'
import SimpleNavbar from './SimpleNavbar'

interface SimpleLayoutProps extends PropsWithChildren {
  hideNavbarBackButton?: boolean
}

const SimpleLayout = ({
  children,
  hideNavbarBackButton,
}: SimpleLayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <SimpleNavbar hideNavbarBackButton={hideNavbarBackButton} />
      <Box flex={1} pt={{ base: '130px', md: '80px', xl: '80px' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default SimpleLayout
