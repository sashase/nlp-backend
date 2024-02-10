import { Module } from '@nestjs/common'
import { DouModule } from './dou/dou.module'
import { DataController } from './data.controller'

@Module({
  imports: [DouModule],
  controllers: [DataController]
})
export class DataModule { }
