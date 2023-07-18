import SimpleLayout from '../../layout/simple'
import { ClaimPagePage } from '../../routes'
import { NextPageWithLayout } from '../../types/page'

const Claim: NextPageWithLayout = () => {
  return <ClaimPagePage />
}

Claim.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>

export default Claim
