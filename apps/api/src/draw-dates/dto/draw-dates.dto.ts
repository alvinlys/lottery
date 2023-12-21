import {
  IsNumberString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class queryDrawDatesDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(4)
  year?: string;
}
