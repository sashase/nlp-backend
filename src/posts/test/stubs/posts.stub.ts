import { Post } from '@prisma/client'

export const postsStub = (): Post[] => {
  return [
    {
      id: 1,
      title: 'title',
      content: 'content',
      url: 'url',
      sourceId: 1,
      moodId: 1
    }
  ]
}