import { IsNumberString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class drawDatesDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(4)
  year?: string;
}
