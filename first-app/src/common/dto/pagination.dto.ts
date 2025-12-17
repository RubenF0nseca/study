import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginatorDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Max(50)
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
