import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class SearchTagsDto {
  @IsString()
  @IsNotEmpty()
  query: string

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  count?: number = 10
}