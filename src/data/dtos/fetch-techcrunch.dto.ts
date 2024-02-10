import { IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class FetchTechcrunchDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page?: number = 1
}