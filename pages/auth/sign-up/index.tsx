import React from 'react'
import AuthLayout from '../../../layout/auth'
import { AuthSignUpPage } from '../../../routes/'
import { NextPageWithLayout } from '../../../types/page'

const SignUp: NextPageWithLayout = () => {
  return <AuthSignUpPage />
}

SignUp.getLayout = (page) => <AuthLayout>{page}</AuthLayout>
export default SignUp
