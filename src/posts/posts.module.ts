import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { SourcesModule } from '../sources/sources.module'
import { TagsModule } from '../tags/tags.module'
import { MoodsModule } from '../moods/moods.module'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { PostsRepository } from './posts.repository'

@Module({
  imports: [PrismaModule, SourcesModule, TagsModule, MoodsModule],
  providers: [PostsRepository, PostsService],
  exports: [PostsService],
  controllers: [PostsController]
})
export class PostsModule { }
