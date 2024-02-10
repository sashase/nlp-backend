import { Module } from '@nestjs/common'
import { GptModule } from '../../gpt/gpt.module'
import { PostsModule } from '../../posts/posts.module'
import { AxiosModule } from '../axios/axios.module'
import { TechcrunchService } from './techcrunch.service'

@Module({
  imports: [AxiosModule, GptModule, PostsModule],
  providers: [TechcrunchService],
  exports: [TechcrunchService]
})

export class TechcrunchModule { }
