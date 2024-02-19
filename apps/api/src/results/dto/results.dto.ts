import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class resultsDto {
  @IsNotEmpty()
  @IsDateString()
  date: string = '2023-05-31';

  @IsOptional()
  companyCode?: string;
}
