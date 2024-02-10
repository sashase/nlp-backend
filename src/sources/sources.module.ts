import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { SourcesRepository } from './sources.repository'

@Module({
  imports: [PrismaModule],
  providers: [SourcesRepository],
  exports: [SourcesRepository]
})
export class SourcesModule { }
