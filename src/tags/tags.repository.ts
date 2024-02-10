import { Injectable } from '@nestjs/common'
import { Tag, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TagsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.TagWhereUniqueInput,
    where?: Prisma.TagWhereInput,
    orderBy?: Prisma.TagOrderByWithRelationInput
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.tag.findMany({ skip, take, cursor, where, orderBy })
  }

  async findOne(params: {
    select?: Prisma.TagSelect, where: Prisma.TagWhereInput
  }): Promise<Tag> {
    const { select, where } = params
    return this.prisma.tag.findFirst({ select, where })
  }

  async create(params: { data: Prisma.TagCreateInput }): Promise<Tag> {
    const { data } = params
    return this.prisma.tag.create({ data })
  }

  async update(params: { where: Prisma.TagWhereUniqueInput, data: Prisma.TagUpdateInput }): Promise<Tag> {
    const { where, data } = params
    return this.prisma.tag.update({ where, data })
  }

  async delete(params: { where: Prisma.TagWhereUniqueInput }): Promise<Tag> {
    const { where } = params
    return this.prisma.tag.delete({ where })
  }
}