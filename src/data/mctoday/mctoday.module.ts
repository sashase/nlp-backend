import { Module } from '@nestjs/common'
import { GptModule } from '../../gpt/gpt.module'
import { PostsModule } from '../../posts/posts.module'
import { ScrapperModule } from '../scrapper/scrapper.module'
import { MctodayService } from './mctoday.service'

@Module({
  imports: [ScrapperModule, GptModule, PostsModule],
  providers: [MctodayService],
  exports: [MctodayService]
})
export class MctodayModule { }
