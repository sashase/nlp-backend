import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { PostsRepository } from './posts.repository'

@Module({
  imports: [PrismaModule],
  providers: [PostsRepository]
})
export class PostsModule { }
