import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { DouService } from './dou/dou.service'
import { TechcrunchService } from './techcrunch/techcrunch.service'
import { FetchDouDto, FetchTechcrunchDto } from './dtos'

@Controller('data')
export class DataController {
  constructor(
    private readonly douService: DouService,
    private readonly techcrunchService: TechcrunchService
  ) { }

  @Get('dou')
  @HttpCode(200)
  async fetchDou(@Query() dto: FetchDouDto) {
    await this.douService.fetch(dto)
    return {
      status: 'ok'
    }
  }

  @Get('techcrunch')
  @HttpCode(200)
  async fetchTechcrunch(@Query() dto: FetchTechcrunchDto) {
    await this.techcrunchService.fetch(dto)
    return {
      status: 'ok'
    }
  }
}
