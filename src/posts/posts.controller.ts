import { Controller, Get, Query } from '@nestjs/common'
import { PostsService } from './posts.service'
import { FindByTagsDto, SearchPostsDto } from './dtos'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getAllPosts() {
    return this.postsService.findAll()
  }

  @Get('tags')
  findByTags(@Query() dto: FindByTagsDto) {
    return this.postsService.findByTag(dto)
  }

  @Get('search')
  searchPosts(@Query() dto: SearchPostsDto) {
    return this.postsService.searchPosts(dto)
  }
}
