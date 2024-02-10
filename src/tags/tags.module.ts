import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { TagsRepository } from './tags.repository'

@Module({
  imports: [PrismaModule],
  providers: [TagsRepository],
  exports: [TagsRepository]
})
export class TagsModule { }
