import { Test, TestingModule } from '@nestjs/testing'
import { PostsService } from '../posts.service'
import { PostsRepository } from '../posts.repository'
import { SourcesRepository } from '../../sources/sources.repository'
import { TagsRepository } from '../../tags/tags.repository'
import { MoodsRepository } from '../../moods/moods.repository'
import { CreatePostDto, FindByTagsDto, SearchPostsDto } from '../dtos'
import { Post, Prisma } from '@prisma/client'
import { postsStub } from './stubs'
import { tagsStub } from '../../tags/test/stubs'
import { sourcesStub } from '../../sources/test/stubs'
import { moodsStub } from '../../moods/test/stubs'
import { NotFoundException } from '@nestjs/common'

describe('PostsService', () => {
  let service: PostsService
  let postsRepository: PostsRepository
  let sourcesRepository: SourcesRepository
  let tagsRepository: TagsRepository
  let moodsRepository: MoodsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: {
            findMany: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: SourcesRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: TagsRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: MoodsRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<PostsService>(PostsService)
    postsRepository = module.get<PostsRepository>(PostsRepository)
    sourcesRepository = module.get<SourcesRepository>(SourcesRepository)
    tagsRepository = module.get<TagsRepository>(TagsRepository)
    moodsRepository = module.get<MoodsRepository>(MoodsRepository)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createPost', () => {
    describe('when createPost is called', () => {
      const dto: CreatePostDto = {
        title: 'title',
        content: 'content',
        tags: ['tag1', 'tag2'],
        mood: 'mood',
        url: 'url',
        source: 'source'
      }

      const { source, tags, mood, ...rest } = dto

      const postWhere: Prisma.PostWhereInput = {
        content: dto.content
      }

      const sourceWhere: Prisma.SourceWhereInput = {
        name: source
      }

      const moodWhere: Prisma.MoodWhereInput = {
        name: mood
      }

      const tagWhere: Prisma.TagWhereInput = {
        name: tags[0]
      }

      test('then it should return if post already exists', async () => {
        jest.spyOn(postsRepository, 'findOne').mockResolvedValue(postsStub()[0])

        await service.createPost(dto)

        expect(postsRepository.findOne).toBeCalledWith({ where: postWhere })
        expect(sourcesRepository.findOne).not.toBeCalled()
      })

      test('then it should create a new source if it does not existed before', async () => {
        jest.spyOn(postsRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(sourcesRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(moodsRepository, 'findOne').mockResolvedValue(moodsStub()[0])
        jest.spyOn(tagsRepository, 'findOne').mockResolvedValue(tagsStub()[0])

        jest.spyOn(sourcesRepository, 'create').mockResolvedValue(sourcesStub()[0])

        const sourceData: Prisma.SourceCreateInput = {
          name: source
        }

        await service.createPost(dto)

        expect(postsRepository.findOne).toBeCalledWith({ where: postWhere })
        expect(sourcesRepository.findOne).toBeCalledWith({ where: sourceWhere })
        expect(sourcesRepository.create).toBeCalledWith({ data: sourceData })
      })

      test('then it should create a new mood if it does not existed before', async () => {
        jest.spyOn(postsRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(sourcesRepository, 'findOne').mockResolvedValue(sourcesStub()[0])
        jest.spyOn(moodsRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(tagsRepository, 'findOne').mockResolvedValue(tagsStub()[0])

        jest.spyOn(moodsRepository, 'create').mockResolvedValue(moodsStub()[0])

        const moodData: Prisma.MoodCreateInput = {
          name: mood
        }

        await service.createPost(dto)

        expect(postsRepository.findOne).toBeCalledWith({ where: postWhere })
        expect(sourcesRepository.findOne).toBeCalledWith({ where: sourceWhere })
        expect(moodsRepository.findOne).toBeCalledWith({ where: moodWhere })
        expect(moodsRepository.create).toBeCalledWith({ data: moodData })
      })

      test('then it should create a new tag if it does not existed before', async () => {
        jest.spyOn(postsRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(sourcesRepository, 'findOne').mockResolvedValue(sourcesStub()[0])
        jest.spyOn(moodsRepository, 'findOne').mockResolvedValue(moodsStub()[0])
        jest.spyOn(tagsRepository, 'findOne').mockResolvedValue(null)

        jest.spyOn(tagsRepository, 'create').mockResolvedValue(tagsStub()[0])

        const tagData: Prisma.TagCreateInput = {
          name: tags[0]
        }

        await service.createPost(dto)

        expect(postsRepository.findOne).toBeCalledWith({ where: postWhere })
        expect(sourcesRepository.findOne).toBeCalledWith({ where: sourceWhere })
        expect(moodsRepository.findOne).toBeCalledWith({ where: moodWhere })
        expect(tagsRepository.findOne).toBeCalledWith({ where: tagWhere })
        expect(tagsRepository.findOne).toBeCalledTimes(tags.length)
        expect(tagsRepository.create).toBeCalledWith({ data: tagData })
      })

      test('then it should create a new post', async () => {
        jest.spyOn(postsRepository, 'findOne').mockResolvedValue(null)
        jest.spyOn(sourcesRepository, 'findOne').mockResolvedValue(sourcesStub()[0])
        jest.spyOn(moodsRepository, 'findOne').mockResolvedValue(moodsStub()[0])
        jest.spyOn(tagsRepository, 'findOne').mockResolvedValue(tagsStub()[0])

        jest.spyOn(postsRepository, 'create').mockResolvedValue(postsStub()[0])

        const postData: Prisma.PostCreateInput = {
          ...rest,
          Source: {
            connect: {
              id: sourcesStub()[0].id,
            },
          },
          Mood: {
            connect: {
              id: moodsStub()[0].id
            }
          },
          tags: {
            connect: [
              { id: tagsStub()[0].id },
              { id: tagsStub()[0].id }
            ]
          }
        }

        await service.createPost(dto)

        expect(postsRepository.findOne).toBeCalledWith({ where: postWhere })
        expect(sourcesRepository.findOne).toBeCalledWith({ where: sourceWhere })
        expect(moodsRepository.findOne).toBeCalledWith({ where: moodWhere })
        expect(tagsRepository.findOne).toBeCalledWith({ where: tagWhere })
        expect(tagsRepository.findOne).toBeCalledTimes(dto.tags.length)
        expect(postsRepository.create).toBeCalledWith({ data: postData })
      })
    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      test('then it should call postsRepository.findMany and return posts', async () => {
        jest.spyOn(postsRepository, 'findMany').mockResolvedValue(postsStub())

        const posts: Post[] = await service.findAll()

        expect(postsRepository.findMany).toBeCalled()
        expect(posts).toEqual(postsStub())
      })
    })
  })

  describe('findByTags', () => {
    const dto: FindByTagsDto = { tags: 'tag1,tag2,tag3' }

    describe('when findByTags is called', () => {
      test('then it should call postsRepository.findMany and return posts', async () => {
        jest.spyOn(postsRepository, 'findMany').mockResolvedValue(postsStub())

        const tags: string[] = dto.tags.split(',')

        const where: Prisma.PostWhereInput = {
          tags: {
            some: {
              name: {
                in: tags
              }
            }
          }
        }

        const include: Prisma.PostInclude = {
          Source: true,
          tags: true,
          Mood: true
        }

        const posts: Post[] = await service.findByTags(dto)

        expect(postsRepository.findMany).toBeCalledWith({ where, include })
        expect(posts).toEqual(postsStub())
      })

      test('then it should throw a NotFoundException if no post was returned from the postsRepository', async () => {
        jest.spyOn(postsRepository, 'findMany').mockResolvedValue(null)

        await expect(service.findByTags(dto)).rejects.toThrowError(NotFoundException)
      })
    })
  })

  describe('searchPosts', () => {
    const dto: SearchPostsDto = { query: 'tag1,tag2,tag3', count: 10 }

    describe('when searchPosts is called', () => {
      test('then it should call postsRepository.findMany and return posts', async () => {
        jest.spyOn(postsRepository, 'findMany').mockResolvedValue(postsStub())

        const where: Prisma.PostWhereInput = {
          OR: [
            {
              title: {
                contains: dto.query
              }
            },
            {
              content: {
                contains: dto.query
              }
            }
          ]
        }

        const include: Prisma.PostInclude = {
          Source: true,
          tags: true,
          Mood: true
        }

        const posts: Post[] = await service.searchPosts(dto)

        expect(postsRepository.findMany).toBeCalledWith({ where, include, take: dto.count })
        expect(posts).toEqual(postsStub())
      })
    })
  })
})