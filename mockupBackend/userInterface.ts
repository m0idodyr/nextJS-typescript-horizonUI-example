export interface User {
  id: string
  points: number
  claimedIds: Array<number>
}

export type BackendResponse = {
  users: User[]
}

export const mockupUserBackend: BackendResponse = {
  users: [
    {
      id: '1',
      points: 10,
      claimedIds: [1],
    },
    {
      id: '2',
      points: 20,
      claimedIds: [1, 2],
    },
  ],
}
