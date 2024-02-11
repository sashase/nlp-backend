import { Test, TestingModule } from '@nestjs/testing'
import { Tag } from '@prisma/client'
import { TagsController } from '../tags.controller'
import { TagsService } from '../tags.service'
import { FindPopularTagsDto, SearchTagsDto } from '../dtos'
import { tagsStub } from './stubs'

describe('TagsController', () => {
  let controller: TagsController
  let tagsService: TagsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        { provide: TagsService, useValue: { findPopularTags: jest.fn(), searchTags: jest.fn() } }
      ],
    }).compile()

    controller = module.get<TagsController>(TagsController)
    tagsService = module.get<TagsService>(TagsService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findPopularTags', () => {
    describe('when findPopularTags is called', () => {
      const dto: FindPopularTagsDto = {count: 5}

      let tags: Tag[]

      beforeEach(async () => {
        jest.spyOn(tagsService, 'findPopularTags').mockResolvedValue(tagsStub())

        tags = await controller.findPopularTags(dto)
      })

      test('then it should call tagsService.findPopularTags', () => {
        expect(tagsService.findPopularTags).toBeCalledWith(dto)
      })

      test('then it should return tags', () => {
        expect(tags).toEqual(tagsStub())
      })
    })
  })

  describe('searchTags', () => {
    describe('when searchTags is called', () => {
      const dto: SearchTagsDto = {query: 'tag', count: 5}

      let tags: Tag[]

      beforeEach(async () => {
        jest.spyOn(tagsService, 'searchTags').mockResolvedValue(tagsStub())

        tags = await controller.searchTags(dto)
      })

      test('then it should call tagsService.searchTags', () => {
        expect(tagsService.searchTags).toBeCalledWith(dto)
      })

      test('then it should return tags', () => {
        expect(tags).toEqual(tagsStub())
      })
    })
  })
})