import { Injectable } from '@nestjs/common'
import { HTMLElement } from 'node-html-parser'
import { GptService } from '../../gpt/gpt.service'
import { PostsService } from '../../posts/posts.service'
import { ProcessPostDto } from '../../gpt/dtos'
import { CreatePostDto } from '../../posts/dtos'
import { PostMetadata } from '../../gpt/interfaces'
import { ScrapperService } from '../scrapper/scrapper.service'
import { FetchDouDto } from '../dtos'
import { SourceService } from '../interfaces'

@Injectable()
export class DouService implements SourceService<FetchDouDto> {
  constructor(
    private readonly scrapperService: ScrapperService,
    private readonly gptService: GptService,
    private readonly postsService: PostsService
  ) { }

  private readonly sourceName: string = 'Dou'

  async fetch(dto: FetchDouDto) {
    const url = `${process.env.DOU_BASE_URL}/${dto.page}`

    try {
      const html: HTMLElement = await this.scrapperService.getHTML(url)
      const articles: HTMLElement[] = html.querySelectorAll('article')

      let i = 0

      for (const article of articles) {
        const post: ProcessPostDto = {
          title: article.querySelector('.title').text.replace(/[\t\n]/g, ''),
          content: article.querySelector('.b-typo').firstChild.text.replace(/[\t\n]/g, ''),
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
          url: article.querySelector('.title').querySelector('a').getAttribute('href'),
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
