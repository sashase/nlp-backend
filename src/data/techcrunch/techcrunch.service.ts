import { BadGatewayException, Injectable } from '@nestjs/common'
import { GptService } from '../../gpt/gpt.service'
import { PostsService } from '../../posts/posts.service'
import { ProcessPostDto } from '../../gpt/dtos'
import { CreatePostDto } from '../../posts/dtos'
import { PostMetadata } from '../../gpt/interfaces'
import { AxiosService } from '../axios/axios.service'
import { FetchTechcrunchDto } from '../dtos'
import { SourceService } from '../interfaces'
import { TechcrunchPost } from './interfaces'

@Injectable()
export class TechcrunchService implements SourceService<FetchTechcrunchDto> {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly gptService: GptService,
    private readonly postsService: PostsService
  ) { }

  private readonly sourceName: string = 'TechCrunch'

  async fetch(dto: FetchTechcrunchDto) {
    const url = `${process.env.TECHCRUNCH_BASE_URL}?page=${dto.page}`

    const articles: TechcrunchPost[] = await this.axiosService.get(url)
      .then(({ data }) => Promise.resolve(data))
      .catch(e => {
        console.log(e)
        throw new BadGatewayException()
      })

    let i = 0

    for (const article of articles) {
      const post: ProcessPostDto = {
        title: article.title.rendered,
        content: article.yoast_head_json.description
      }

      let processedPost: PostMetadata

      await new Promise<void>((resolve) => {
        setTimeout(async () => {
          processedPost = await this.gptService.processPost(post)
          resolve()
        }, i > 0 && 20 * 1000)
      })

      i++

      if (!processedPost) continue

      const createPostDto: CreatePostDto = {
        ...post,
        tags: processedPost.tags,
        mood: processedPost.mood,
        url: article.canonical_url,
        source: this.sourceName
      }

      await this.postsService.createPost(createPostDto)
    }
  }
}
