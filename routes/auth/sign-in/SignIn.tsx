import { Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react'
import { UserStatus } from '@paperxyz/embedded-wallet-service-sdk'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import ActionButton from '../../../components/buttons/ActionButton'
import AuthCard from '../../../components/card/AuthCard'
import CheckBoxField from '../../../components/fields/CheckBoxField'
import InputField from '../../../components/fields/InputField'
import PasswordField from '../../../components/fields/PasswordField'
import NavLink from '../../../components/link/NavLink'
import { HSeparator } from '../../../components/separator/Separator'
import { REDIRECT_QUERY_KEY } from '../../../constant'
import { useAuth } from '../../../contexts/auth/context'
import { useNoWa } from '../../../contexts/NoWaProvider'
import { WalletType } from '../../../contexts/WalletProvider'
import UseMetamask from './metamask/MetaMaskSignUp'

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const SignIn = () => {
  const { signIn, web3AuthUser, user: AuthUser } = useAuth()
  const { noWaData, getNoWaUser } = useNoWa()
  const router = useRouter()

  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (web3AuthUser && AuthUser) {
      setLoading(true)
      /**
       * Return early is MetaMask user
       */
      if (web3AuthUser.walletType == WalletType.METAMASK) {
        setLoading(false)
        return
      }

      if (web3AuthUser.walletType !== WalletType.NOWA) {
        setLoading(false)
        throw new Error('Unexpected wallet type during sign-up')
      }

      getNoWaUser().then((noWaData) => {
        if (!noWaData) return

        /**
         * New or returning NoWa user, redirect ot wallet page to activate wallet
         */
        if (noWaData.status === UserStatus.LOGGED_OUT) {
          router.push('/wallet/activate')
        }

        /**
         * NoWa user wallet is activated. Redirect user to use application
         */
        if (noWaData.status === UserStatus.LOGGED_IN_WALLET_INITIALIZED) {
          if (noWaData.walletAddress !== web3AuthUser.walletAddress) {
            setLoading(false)
            throw new Error('Unexpected NoWa wallet address')
          }

          if (router.query[REDIRECT_QUERY_KEY]) {
            router.push(router.query[REDIRECT_QUERY_KEY] as string)
          } else {
            router.push('/dashboard')
          }
        }
      })
    }
  }, [web3AuthUser, AuthUser, noWaData])

  const handleSignIn: typeof signIn = async (values) => {
    setLoading(true)
    try {
      await signIn(values)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')

  return (
    <AuthCard
      header={'Sign In'}
      subtitle={'Enter your email and password to sign in!'}
    >
      <UseMetamask />
      {/*<IconButton icon={FcGoogle} text={'Sign in with Google'}/>*/}
      <Flex align="center" mb="25px">
        <HSeparator />
        <Text color="gray.400" mx="14px">
          or
        </Text>
        <HSeparator />
      </Flex>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSignIn}
        validationSchema={toFormikValidationSchema(Schema)}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Flex direction="column" gap="24px">
              <InputField
                label="Email"
                name="email"
                isRequired={true}
                placeholder={'mail@simmmple.com'}
                type={'email'}
                variant={'auth'}
              />
              <PasswordField
                name="password"
                label="Password"
                isRequired
                placeholder={'Min. 8 characters'}
                variant={'auth'}
              />

              <Flex justifyContent="space-between" align="center" mb="24px">
                <FormControl display="flex" alignItems="center">
                  <CheckBoxField
                    name="remember-login"
                    text={'Keep me logged in'}
                    id={'remember-login'}
                  />
                </FormControl>
                <NavLink href="/auth/forgot-password">
                  <Text
                    color={textColorBrand}
                    fontSize="sm"
                    w="124px"
                    fontWeight="500"
                  >
                    Forgot password?
                  </Text>
                </NavLink>
              </Flex>
              {error && (
                <Text color={'red'} fontSize="sm" fontWeight="500">
                  {error}
                </Text>
              )}
              <ActionButton
                type="submit"
                variant="brand"
                isLoading={isSubmitting || loading}
                isDisabled={(dirty && !isValid) || loading || isSubmitting}
              >
                Sign In
              </ActionButton>
              <Flex
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Not registered yet?
                </Text>
                <NavLink href="/auth/sign-up">
                  <Text
                    color={textColorBrand}
                    ms="5px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Create an Account
                  </Text>
                </NavLink>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthCard>
  )
}
export default SignIn
