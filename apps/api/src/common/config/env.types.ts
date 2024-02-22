import { IsEnum, IsNumber, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  LOTTERY_URL!: string;
}
