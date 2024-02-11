import { Test, TestingModule } from '@nestjs/testing'
import { DataController } from '../data.controller'
import { DouService } from '../dou/dou.service'
import { TechcrunchService } from '../techcrunch/techcrunch.service'
import { MctodayService } from '../mctoday/mctoday.service'
import { FetchDouDto, FetchMctodayDto, FetchTechcrunchDto } from '../dtos'

describe('DataController', () => {
  let controller: DataController
  let douService: DouService
  let techcrunchService: TechcrunchService
  let mctodayService: MctodayService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [
        { provide: DouService, useValue: { fetch: jest.fn() } },
        { provide: TechcrunchService, useValue: { fetch: jest.fn() } },
        { provide: MctodayService, useValue: { fetch: jest.fn() } },
      ],
    }).compile()

    controller = module.get<DataController>(DataController)
    douService = module.get<DouService>(DouService)
    techcrunchService = module.get<TechcrunchService>(TechcrunchService)
    mctodayService = module.get<MctodayService>(MctodayService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('fetchDou', () => {
    describe('when fetchDou is called', () => {
      const dto: FetchDouDto = {page: 10}

      beforeEach(async () => {
        jest.spyOn(douService, 'fetch').mockResolvedValue()

        await controller.fetchDou(dto)
      })

      test('then it should call douService.fetch', () => {
        expect(douService.fetch).toBeCalledWith(dto)
      })
    })
  })

  describe('fetchTechcrunch', () => {
    describe('when fetchTechcrunch is called', () => {
      const dto: FetchTechcrunchDto = {page: 10}

      beforeEach(async () => {
        jest.spyOn(techcrunchService, 'fetch').mockResolvedValue()

        await controller.fetchTechcrunch(dto)
      })

      test('then it should call techcrunchService.fetch', () => {
        expect(techcrunchService.fetch).toBeCalledWith(dto)
      })
    })
  })

  describe('fetchMcToday', () => {
    describe('when fetchMcToday is called', () => {
      const dto: FetchMctodayDto = {page: 10}

      beforeEach(async () => {
        jest.spyOn(mctodayService, 'fetch').mockResolvedValue()

        await controller.fetchMcToday(dto)
      })

      test('then it should call mctodayService.fetch', () => {
        expect(mctodayService.fetch).toBeCalledWith(dto)
      })
    })
  })
})