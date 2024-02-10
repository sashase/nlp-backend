import { Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findMany(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.PostWhereUniqueInput,
    where?: Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByWithRelationInput
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.post.findMany({ skip, take, cursor, where, orderBy })
  }

  async findOne(params: {
    select?: Prisma.PostSelect, where: Prisma.PostWhereInput
  }): Promise<Post> {
    const { select, where } = params
    return this.prisma.post.findFirst({ select, where })
  }

  async create(params: { data: Prisma.PostCreateInput }): Promise<Post> {
    const { data } = params
    return this.prisma.post.create({ data })
  }

  async update(params: { where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput }): Promise<Post> {
    const { where, data } = params
    return this.prisma.post.update({ where, data })
  }

  async delete(params: { where: Prisma.PostWhereUniqueInput }): Promise<Post> {
    const { where } = params
    return this.prisma.post.delete({ where })
  }
}