import { IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class FindPopularTagsDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  count?: number = 10
}