import { Module } from '@nestjs/common'
import { GptModule } from '../../gpt/gpt.module'
import { PostsModule } from '../../posts/posts.module'
import { ScrapperModule } from '../scrapper/scrapper.module'
import { DouService } from './dou.service'

@Module({
  imports: [ScrapperModule, GptModule, PostsModule],
  providers: [DouService],
  exports: [DouService]
})
export class DouModule { }
