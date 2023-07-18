import { Flex, FormControl, Text, useColorModeValue } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import ActionButton from '../../../components/buttons/ActionButton'
import AuthCard from '../../../components/card/AuthCard'
import CheckBoxField from '../../../components/fields/CheckBoxField'
import InputField from '../../../components/fields/InputField'
import PasswordField from '../../../components/fields/PasswordField'
import NavLink from '../../../components/link/NavLink'
import { useAuth } from '../../../contexts/auth/context'

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  agreement: z.boolean().refine((v) => v === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

const SignUp = () => {
  const { signUp, updateAuthUser } = useAuth()

  const router = useRouter()

  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onError: (error: Error) => {
      setError(error.message)
    },
    onSuccess: () => {
      setLoading(true)
      // TODO Using setTimeout is hacky
      setTimeout(() => {
        updateAuthUser().then(() => {
          router.push('/wallet/activate')
        })
      }, 4000)
    },
  })

  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')

  return (
    <AuthCard
      header={'Sign Up'}
      subtitle={'Enter your email and password to sign up!'}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          agreement: false,
        }}
        onSubmit={(values) => signUpMutation.mutateAsync(values)}
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
              <CheckBoxField
                id="agreement"
                name="agreement"
                text={
                  'By creating an account means you agree to the Terms and Conditions, and our Privacy Policy'
                }
              />
              {error && (
                <Text color={'red'} fontSize="sm" fontWeight="500">
                  {error}
                </Text>
              )}
              <FormControl isInvalid={!!signUpMutation.error}>
                <ActionButton
                  isLoading={isSubmitting || loading}
                  isDisabled={dirty && !isValid && loading}
                  type="submit"
                  variant="brand"
                >
                  Create my account
                </ActionButton>
              </FormControl>

              <Flex
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Already a member?
                </Text>
                <NavLink href="/auth/sign-in">
                  <Text
                    color={textColorBrand}
                    ms="5px"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Sign in
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
export default SignUp
