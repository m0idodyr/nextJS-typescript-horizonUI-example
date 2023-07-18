import SimpleLayout from '../../layout/simple'
import { DashboardPage } from '../../routes'
import { NextPageWithLayout } from '../../types/page'

const Dashboard: NextPageWithLayout = () => {
  return <DashboardPage />
}

Dashboard.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>
export default Dashboard
