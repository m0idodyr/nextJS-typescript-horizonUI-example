import SimpleLayout from '../../../layout/simple'
import { ActivateWalletPage } from '../../../routes/'
import { NextPageWithLayout } from '../../../types/page'

const ActivateWallet: NextPageWithLayout = () => {
  return <ActivateWalletPage />
}

ActivateWallet.getLayout = (page) => (
  <SimpleLayout hideNavbarBackButton={true}>{page}</SimpleLayout>
)
export default ActivateWallet
