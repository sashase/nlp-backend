import { Controller, Get, Query } from '@nestjs/common'
import { TagsService } from './tags.service'
import { FindPopularTagsDto, SearchTagsDto } from './dtos'

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Get('popular')
  findPopularTags(@Query() dto: FindPopularTagsDto) {
    return this.tagsService.findPopularTags(dto)
  }

  @Get('search')
  searchTags(@Query() dto: SearchTagsDto) {
    return this.tagsService.searchTags(dto)
  }
}
