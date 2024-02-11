import { Module } from '@nestjs/common'
import { DouModule } from './dou/dou.module'
import { TechcrunchModule } from './techcrunch/techcrunch.module'
import { MctodayModule } from './mctoday/mctoday.module'
import { DataController } from './data.controller'

@Module({
  imports: [DouModule, TechcrunchModule, MctodayModule],
  controllers: [DataController]
})
export class DataModule { }
