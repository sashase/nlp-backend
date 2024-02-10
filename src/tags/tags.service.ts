import { Injectable, NotFoundException } from '@nestjs/common'
import { TagsRepository } from './tags.repository'
import { FindPopularTagsDto, SearchTagsDto } from './dtos'

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) { }

  async findPopularTags(dto: FindPopularTagsDto) {
    const popularTags = await this.tagsRepository.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      take: dto.count,
    })

    if (!popularTags.length) throw new NotFoundException()

    return popularTags
  }

  async searchTags(dto: SearchTagsDto) {
    const tags = await this.tagsRepository.findMany({
      where: {
        name: {
          contains: dto.query
        }
      },
      take: dto.count
    })

    if (!tags.length) throw new NotFoundException()

    return tags
  }
}
