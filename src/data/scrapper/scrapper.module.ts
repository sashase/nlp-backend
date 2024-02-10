import { Module } from '@nestjs/common'
import { AxiosModule } from '../axios/axios.module'
import { ScrapperService } from './scrapper.service'

@Module({
  imports: [AxiosModule],
  providers: [ScrapperService],
  exports: [ScrapperService]
})
export class ScrapperModule { }
