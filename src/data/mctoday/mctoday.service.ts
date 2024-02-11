import { Injectable } from '@nestjs/common'
import { HTMLElement } from 'node-html-parser'
import { GptService } from '../../gpt/gpt.service'
import { PostsService } from '../../posts/posts.service'
import { ProcessPostDto } from '../../gpt/dtos'
import { CreatePostDto } from '../../posts/dtos'
import { PostMetadata } from '../../gpt/interfaces'
import { ScrapperService } from '../scrapper/scrapper.service'
import { FetchMctodayDto } from '../dtos'
import { SourceService } from '../interfaces'

@Injectable()
export class MctodayService implements SourceService<FetchMctodayDto> {
  constructor(
    private readonly scrapperService: ScrapperService,
    private readonly gptService: GptService,
    private readonly postsService: PostsService
  ) { }

  private readonly sourceName: string = 'McToday'

  async fetch(dto: FetchMctodayDto) {
    const url = process.env.MCTODAY_BASE_URL

    try {
      const html: HTMLElement = await this.scrapperService.getHTML(url, 'POST', { page: dto.page })
      const articles: HTMLElement[] = html.querySelectorAll('.lenta-item')

      let i = 0

      for (const article of articles) {
        const post: ProcessPostDto = {
          title: article.querySelector('h2').text,
          content: article.childNodes[7].text.trim(),
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
          url: article.querySelector('a:not(.cat-label a)').getAttribute('href'),
          source: this.sourceName
        }

        await this.postsService.createPost(createPostDto)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
}
