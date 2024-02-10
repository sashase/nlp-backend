import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { MoodsRepository } from './moods.repository'

@Module({
  imports: [PrismaModule],
  providers: [MoodsRepository],
  exports: [MoodsRepository]
})
export class MoodsModule { }
