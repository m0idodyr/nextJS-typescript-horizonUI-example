import React from 'react'
import AuthLayout from '../../../layout/auth'
import { AuthSignInPage } from '../../../routes/'
import { NextPageWithLayout } from '../../../types/page'

const SignIn: NextPageWithLayout = () => {
  return <AuthSignInPage />
}

SignIn.getLayout = (page) => <AuthLayout>{page}</AuthLayout>
export default SignIn
