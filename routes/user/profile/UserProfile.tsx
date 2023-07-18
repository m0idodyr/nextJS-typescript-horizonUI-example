import { Flex } from '@chakra-ui/react'
import { ThirdwebNftMedia, useContract } from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk'
import { PLAYGROUND_MEMBERSHIP_CONTRACT } from '@thrdlab/types/src/constants'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../../components/spinner/Spinner'
import { AuthUser } from '../../../contexts/auth/type'
import SimpleLayout from '../../../layout/simple'
import { trpc } from '../../../trpc'
import { NextPageWithLayout } from '../../../types/page'

const UserProfile: NextPageWithLayout = ({ user }: { user: AuthUser }) => {
  const { data: userData } = trpc.user.getUser.useQuery()

  const { data: membershipDrop, error: membershipDropFetchError } =
    trpc.drop.getDropByTitle.useQuery(
      {
        title: PLAYGROUND_MEMBERSHIP_CONTRACT,
      },
      {
        enabled: user !== undefined,
      },
    )

  const { contract, isLoading: isContractLoading } = useContract(
    membershipDrop?.address,
  )

  console.log('membershipDropFetchError', membershipDropFetchError)

  const [nfts, setNfts] = useState<NFT[]>()
  const [loading, setLoading] = useState(true)

  const getNfts = async (walletAddress: string) => {
    if (!contract) {
      console.warn('No NFT contract found')
      return
    }
    return await contract.erc1155.getOwned(walletAddress)
  }

  useEffect(() => {
    if (!isContractLoading && userData && userData.walletAddress) {
      setLoading(true)
      getNfts(userData.walletAddress).then((nfts) => {
        console.log('nfts', nfts)
        setNfts(nfts)
        setLoading(false)
      })
    }
  }, [userData, isContractLoading])

  return (
    <Flex w="100%" p={10} direction="column" align="left" gap={4}>
      <h2>Auth data:</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h2>User data:</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <div>
        {loading && <LoadingSpinner />}
        {!loading &&
          nfts &&
          nfts.length > 0 &&
          nfts.map((nft, index) => (
            <div key={index}>
              <ThirdwebNftMedia metadata={nft.metadata} />
            </div>
          ))}
        {!loading && nfts && nfts.length === 0 && <p>No NFTs found...</p>}
      </div>
    </Flex>
  )
}

UserProfile.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>
export default UserProfile
