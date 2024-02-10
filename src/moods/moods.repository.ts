import { Injectable } from '@nestjs/common'
import { Mood, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class MoodsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.MoodWhereUniqueInput,
    where?: Prisma.MoodWhereInput,
    orderBy?: Prisma.MoodOrderByWithRelationInput
  }): Promise<Mood[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.mood.findMany({ skip, take, cursor, where, orderBy })
  }

  async findOne(params: {
    select?: Prisma.MoodSelect, where: Prisma.MoodWhereInput
  }): Promise<Mood> {
    const { select, where } = params
    return this.prisma.mood.findFirst({ select, where })
  }

  async create(params: { data: Prisma.MoodCreateInput }): Promise<Mood> {
    const { data } = params
    return this.prisma.mood.create({ data })
  }

  async update(params: { where: Prisma.MoodWhereUniqueInput, data: Prisma.MoodUpdateInput }): Promise<Mood> {
    const { where, data } = params
    return this.prisma.mood.update({ where, data })
  }

  async delete(params: { where: Prisma.MoodWhereUniqueInput }): Promise<Mood> {
    const { where } = params
    return this.prisma.mood.delete({ where })
  }
}