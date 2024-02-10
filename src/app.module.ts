import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { PostsModule } from './posts/posts.module'
import { SourcesModule } from './sources/sources.module'
import { TagsModule } from './tags/tags.module'
import { MoodsModule } from './moods/moods.module'

@Module({
  imports: [PrismaModule, PostsModule, SourcesModule, TagsModule, MoodsModule]
})
export class AppModule { }
