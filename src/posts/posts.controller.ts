import { Controller, Get, Query } from '@nestjs/common'
import { PostsService } from './posts.service'
import { FindByTagsDto, SearchPostsDto } from './dtos'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @Get('tags')
  findByTags(@Query() dto: FindByTagsDto) {
    return this.postsService.findByTags(dto)
  }

  @Get('search')
  searchPosts(@Query() dto: SearchPostsDto) {
    return this.postsService.searchPosts(dto)
  }
}
