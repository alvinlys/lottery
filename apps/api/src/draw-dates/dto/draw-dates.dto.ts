import { Transform } from 'class-transformer';
import {
  IsNumberString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class drawDatesDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsOptional()
  @MaxLength(4)
  year?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  @Transform(({ value }) => parseInt(value))
  day?: number;
}
