import { Mood } from '@prisma/client'

export const moodsStub = (): Mood[] => {
  return [
    {
      id: 1,
      name: 'mood'
    }
  ]
}