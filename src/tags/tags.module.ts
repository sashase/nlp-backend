import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { TagsController } from './tags.controller'
import { TagsService } from './tags.service'
import { TagsRepository } from './tags.repository'

@Module({
  imports: [PrismaModule],
  providers: [TagsRepository, TagsService],
  controllers: [TagsController],
  exports: [TagsRepository]
})
export class TagsModule { }
