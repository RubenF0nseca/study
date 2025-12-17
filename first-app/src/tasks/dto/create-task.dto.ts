import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'change message for string' })
  @MinLength(3, { message: 'change message for length' })
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly description: string;
}
