export enum ClaimTypeEnum {
  POINTS = 'POINTS',
  TOKEN = 'TOKEN',
}

interface ClaimConditions {}

export interface ClaimConditionPoints extends ClaimConditions {
  requiredPoints: number
}

export interface ClaimConditionToken extends ClaimConditions {
  cost: number
  maxSupply: number
  currentSupply: number
}

export interface Creator {
  name: string
  creatorAvatarUrl: string
}

export interface Claim<T> {
  address: string
  title: string
  creator: Creator
  image: string
  description: string
  type: {
    type: ClaimTypeEnum
    claimCondition: T
  }
}

type InterfacesAsProperties =
  | ClaimConditionPoints
  | ClaimConditionToken
  | Creator

type BackendResponse<T extends InterfacesAsProperties> = {
  claims: Claim<T>[]
}

export const mockupClaimBackend: BackendResponse<InterfacesAsProperties> = {
  claims: [
    {
      address: '1',
      title: 'Web3 Quiz',
      creator: {
        name: '3rd lab',
        creatorAvatarUrl: '/../public/img/avatars/avatar1.png',
      },
      image: '/../public/img/claims/card2.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit malesuada odio sit amet tincidunt. Morbi aliquet risus in augue finibus gravida. Pellentesque sollicitudin elit et varius posuere. Ut pretium iaculis odio non posuere. Cras laoreet felis sit amet massa convallis, pharetra pulvinar augue pharetra. In non velit eu metus pretium sodales id in augue. Vestibulum commodo tellus eget metus tempus dignissim.',
      type: {
        type: ClaimTypeEnum.POINTS,
        claimCondition: {
          requiredPoints: 100,
        },
      },
    },
    {
      address: '2',
      title: 'Playground Membership',
      creator: {
        name: '3rd Lab',
        creatorAvatarUrl: '/../public/img/avatars/avatar1.png',
      },
      image: '/../public/img/claims/card1.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus hendrerit malesuada odio sit amet tincidunt. Morbi aliquet risus in augue finibus gravida. Pellentesque sollicitudin elit et varius posuere. Ut pretium iaculis odio non posuere. Cras laoreet felis sit amet massa convallis, pharetra pulvinar augue pharetra. In non velit eu metus pretium sodales id in augue. Vestibulum commodo tellus eget metus tempus dignissim.',
      type: {
        type: ClaimTypeEnum.TOKEN,
        claimCondition: {
          maxSupply: 100,
          currentSupply: 50,
          cost: 0,
        },
      },
    },
  ],
}
