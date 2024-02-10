import { IsString } from 'class-validator'

export class FindByTagsDto {
  @IsString()
  tags: string
}