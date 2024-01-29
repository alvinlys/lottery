import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class resultsDto {
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  date?: string;
}
