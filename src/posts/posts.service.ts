import { Injectable, NotFoundException } from '@nestjs/common'
import { SourcesRepository } from '../sources/sources.repository'
import { TagsRepository } from '../tags/tags.repository'
import { MoodsRepository } from '../moods/moods.repository'
import { PostsRepository } from './posts.repository'
import { CreatePostDto, FindByTagsDto } from './dtos'

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly sourcesRepository: SourcesRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly moodsRepository: MoodsRepository
  ) { }

  async createPost(dto: CreatePostDto) {
    const { source, tags, mood, ...rest } = dto
    const tagsIds: number[] = []

    if (await this.postsRepository.findOne({ where: { content: dto.content } })) return

    let sourceItem = await this.sourcesRepository.findOne({ where: { name: source } })
    if (!sourceItem) {
      sourceItem = await this.sourcesRepository.create({ data: { name: source } })
    }

    let moodItem = await this.moodsRepository.findOne({ where: { name: mood } })
    if (!moodItem) {
      moodItem = await this.moodsRepository.create({ data: { name: mood } })
    }

    for (const tag of tags) {
      let tagItem = await this.tagsRepository.findOne({ where: { name: tag } })
      if (!tagItem) {
        tagItem = await this.tagsRepository.create({ data: { name: tag } })
      }
      tagsIds.push(tagItem.id)
    }

    try {
      await this.postsRepository.create({
        data: {
          ...rest,
          Source: {
            connect: {
              id: sourceItem.id,
            },
          },
          Mood: {
            connect: {
              id: moodItem.id
            }
          },
          tags: {
            connect: tagsIds.map(id => ({ id }))
          }
        }
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  findAll() {
    return this.postsRepository.findMany({
      include: {
        Source: true,
        tags: true,
        Mood: true
      }
    })
  }

  async findByTag(dto: FindByTagsDto) {
    const tags: string[] = dto.tags.split(',')

    const posts = await this.postsRepository.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags
            }
          }
        }
      },
      include: {
        Source: true,
        tags: true,
        Mood: true
      }
    })

    if (!posts.length) throw new NotFoundException()

    return posts
  }
}
