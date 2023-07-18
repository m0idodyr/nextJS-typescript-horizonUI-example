/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import ActionButton from '../../../components/buttons/ActionButton'
import Card from '../../../components/card/Card'
import InputField from '../../../components/fields/InputField'
import IconBox from '../../../components/icons/IconBox'
import { useNoWa } from '../../../contexts/NoWaProvider'

interface RecoveryTabProps {
  setActiveBullets: React.SetStateAction<any>
}

const Schema = z.object({
  recoveryCode: z.string(),
})

const RecoveryTab = ({ setActiveBullets }: RecoveryTabProps) => {
  const { activateWallet } = useNoWa()

  const [error, setError] = useState<string | undefined>(undefined)

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const bg = useColorModeValue('gray.100', 'navy.700')
  const border = useColorModeValue('23E0E5F2FF', '23FFFFFF1A')

  const handleRecovery = async (values: { recoveryCode: string }) => {
    await activateWallet(values.recoveryCode)
      .then(() => {
        setActiveBullets({
          activate: false,
          complete: true,
        })
      })
      .catch((error: Error) => {
        console.error('error', error)
        setError(error.message)
      })
  }

  return (
    <Box w={{ sm: '350px', md: '700px', lg: '850px' }} p="0px" mx="auto">
      <Card p="30px">
        <Flex direction="column" w="100%">
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
            Your wallet is locked.
          </Text>
          <Text
            color="secondaryGray.600"
            pe={{ base: '0px', '3xl': '200px' }}
            mb="20px"
          >
            Please submit the recovery code.
          </Text>
          <Box>
            <Formik
              initialValues={{
                recoveryCode: '',
              }}
              onSubmit={handleRecovery}
              validationSchema={toFormikValidationSchema(Schema)}
            >
              {({ isSubmitting, dirty, isValid }) => (
                <Form>
                  <Card p="30px">
                    <Box>
                      <Flex
                        align="center"
                        justify="center"
                        flexDirection="column"
                        bg={bg}
                        bgImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%${border}' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`}
                        borderRadius="16px"
                        w="100%"
                        mb="12px"
                        py="70px"
                      >
                        <IconBox
                          h="64px"
                          w="64px"
                          bg={'red'}
                          borderRadius="24px"
                          boxShadow="0px 20px 40px -5px rgba(67, 24, 255, 0.4)"
                          icon={
                            <Icon
                              as={AiFillLock}
                              w="50px"
                              h="50px"
                              p="10px"
                              color="white"
                            />
                          }
                        />
                        <Box display="flex" flexDirection="column" gap={4}>
                          <InputField
                            textAlign="center"
                            label="Recovery Code"
                            name="recoveryCode"
                            isRequired={true}
                            type={'text'}
                            variant={'auth'}
                          />
                          <ActionButton
                            type="submit"
                            variant="brand"
                            isLoading={isSubmitting}
                            isDisabled={dirty && !isValid}
                          >
                            Activate Wallet
                          </ActionButton>
                          {error && (
                            <Text
                              textAlign="center"
                              fontSize="sm"
                              fontWeight="500"
                              color="red"
                            >
                              {error}
                            </Text>
                          )}
                          <Text
                            textAlign="center"
                            fontSize="sm"
                            fontWeight="500"
                            color="secondaryGray.500"
                          >
                            The recovery code was send to your email when wallet
                            was created.
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Card>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}

export default RecoveryTab
