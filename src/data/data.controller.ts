import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { DouService } from './dou/dou.service'
import { FetchDouDto } from './dtos'

@Controller('data')
export class DataController {
  constructor(private readonly douService: DouService) { }

  @Get('dou')
  @HttpCode(200)
  async fetchDou(@Query() dto: FetchDouDto) {
    await this.douService.fetch(dto)
    return {
      status: 'ok'
    }
  }
}
