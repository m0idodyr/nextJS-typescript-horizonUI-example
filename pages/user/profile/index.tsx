import { InferGetServerSidePropsType } from 'next'
import { withPageAuthGuard } from '../../../contexts/auth/ssr-guard'
import SimpleLayout from '../../../layout/simple'
import { UserProfilePage } from '../../../routes/'
import { NextPageWithLayout } from '../../../types/page'

const UserProfile: NextPageWithLayout = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <UserProfilePage user={user} />
}

export const getServerSideProps = withPageAuthGuard()

UserProfile.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>

export default UserProfile
