import { Test, TestingModule } from '@nestjs/testing'
import { Post } from '@prisma/client'
import { PostsController } from '../posts.controller'
import { PostsService } from '../posts.service'
import { FindByTagsDto, SearchPostsDto } from '../dtos'
import { postsStub } from './stubs'

describe('PostsController', () => {
  let controller: PostsController
  let postsService: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        { provide: PostsService, useValue: { findAll: jest.fn(), findByTags: jest.fn(), searchPosts: jest.fn() } }
      ],
    }).compile()

    controller = module.get<PostsController>(PostsController)
    postsService = module.get<PostsService>(PostsService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let posts: Post[]

      beforeEach(async () => {
        jest.spyOn(postsService, 'findAll').mockResolvedValue(postsStub())

        posts = await controller.findAll()
      })

      test('then it should call postsService.findAll', () => {
        expect(postsService.findAll).toBeCalled()
      })

      test('then it should return Posts', () => {
        expect(posts).toEqual(postsStub())
      })
    })
  })

  describe('findByTags', () => {
    describe('when findByTags is called', () => {
      const dto: FindByTagsDto = {tags: 'tag1,tag2'}

      let posts: Post[]

      beforeEach(async () => {
        jest.spyOn(postsService, 'findByTags').mockResolvedValue(postsStub())

        posts = await controller.findByTags(dto)
      })

      test('then it should call postsService.findByTags', () => {
        expect(postsService.findByTags).toBeCalledWith(dto)
      })

      test('then it should return posts', () => {
        expect(posts).toEqual(postsStub())
      })
    })
  })

  describe('searchPosts', () => {
    describe('when searchPosts is called', () => {
      const dto: SearchPostsDto = {query: 'Post', count: 5}

      let posts: Post[]

      beforeEach(async () => {
        jest.spyOn(postsService, 'searchPosts').mockResolvedValue(postsStub())

        posts = await controller.searchPosts(dto)
      })

      test('then it should call postsService.searchPosts', () => {
        expect(postsService.searchPosts).toBeCalledWith(dto)
      })

      test('then it should return posts', () => {
        expect(posts).toEqual(postsStub())
      })
    })
  })
})