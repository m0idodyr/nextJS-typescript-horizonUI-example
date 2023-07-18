import SimpleLayout from '../layout/simple'
import { WelcomePage } from '../routes'
import { NextPageWithLayout } from '../types/page'

const Welcome: NextPageWithLayout = () => {
  return <WelcomePage />
}

Welcome.getLayout = (page) => (
  <SimpleLayout hideNavbarBackButton={true}>{page}</SimpleLayout>
)
export default Welcome
