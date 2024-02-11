import { Source } from '@prisma/client'

export const sourcesStub = (): Source[] => {
  return [
    {
      id: 1,
      name: 'source'
    }
  ]
}