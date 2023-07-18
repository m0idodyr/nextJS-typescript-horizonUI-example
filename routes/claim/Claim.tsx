import { Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CollectionCard from '../../components/card/CollectionCard'
import { LoadingSpinner } from '../../components/spinner/Spinner'
import ClaimConditionPoints from './../../components/claims/ClaimConditionPoints'
import ClaimConditionToken from './../../components/claims/ClaimConditionToken'
import { Claim, mockupClaimBackend } from './../../mockupBackend/claimInterface'
import { mockupUserBackend, User } from './../../mockupBackend/userInterface'

const Claim = () => {
  const router = useRouter()
  const { dropAddress } = router.query
  const [claimData, setClaimData] = useState<Claim<any> | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [claimArray, setClaimArray] = useState<Claim<any>[]>([])
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const userId = '2'

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const claims = await mockupClaimBackend.claims
        if (claims) {
          try {
            setClaimArray(claims)
            const claim = claims.find((claim) => claim.address === dropAddress)
            if (claim) {
              setClaimData(claim)
              const user = mockupUserBackend.users.find((u) => u.id === userId)
              setUserData(user || null)
            } else {
              setError('Claim not found')
            }
          } catch (e) {
            setError('Error fetching claim object')
          }
        } else {
          setError('Data not available')
        }
      } catch (e) {
        setError('Error fetching claim data')
      }
    }
    if (dropAddress) {
      fetchClaim()
    }
  }, [dropAddress, userId])

  const hasBeenClaimed =
    userData && userData.claimedIds.includes(Number(dropAddress))
  return (
    <Flex w="100%" p={10} direction="column" align="left" gap={4}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {claimData ? (
            <>
              {hasBeenClaimed && <p>User owns this claim</p>}
              {claimData.type.type === 'POINTS' ? (
                <ClaimConditionPoints
                  claimData={claimData}
                  userData={userData}
                />
              ) : claimData.type.type === 'TOKEN' ? (
                <ClaimConditionToken claimData={claimData} />
              ) : null}
            </>
          ) : (
            <LoadingSpinner />
          )}
          <Text
            mt="25px"
            mb="36px"
            color={textColor}
            fontSize="2xl"
            ms="24px"
            fontWeight="700"
          >
            More from 3rd Lab
          </Text>
          {claimArray ? (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
                {claimArray.map((claim, index) => (
                  <CollectionCard key={index} claimData={claim} />
                ))}
              </SimpleGrid>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </>
      )}
    </Flex>
  )
}

export default Claim
