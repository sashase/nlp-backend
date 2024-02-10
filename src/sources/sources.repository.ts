import { Injectable } from '@nestjs/common'
import { Source, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SourcesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.SourceWhereUniqueInput,
    where?: Prisma.SourceWhereInput,
    orderBy?: Prisma.SourceOrderByWithRelationInput
  }): Promise<Source[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.source.findMany({ skip, take, cursor, where, orderBy })
  }

  async findOne(params: {
    select?: Prisma.SourceSelect, where: Prisma.SourceWhereInput
  }): Promise<Source> {
    const { select, where } = params
    return this.prisma.source.findFirst({ select, where })
  }

  async create(params: { data: Prisma.SourceCreateInput }): Promise<Source> {
    const { data } = params
    return this.prisma.source.create({ data })
  }

  async update(params: { where: Prisma.SourceWhereUniqueInput, data: Prisma.SourceUpdateInput }): Promise<Source> {
    const { where, data } = params
    return this.prisma.source.update({ where, data })
  }

  async delete(params: { where: Prisma.SourceWhereUniqueInput }): Promise<Source> {
    const { where } = params
    return this.prisma.source.delete({ where })
  }
}