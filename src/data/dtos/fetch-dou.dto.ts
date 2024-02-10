import { IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class FetchDouDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page?: number = 1
}