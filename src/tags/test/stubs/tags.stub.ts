import { Tag } from '@prisma/client'

export const tagsStub = (): Tag[] => {
  return [
    {
      id: 1,
      name: 'tag'
    }
  ]
}