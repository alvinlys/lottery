import { ApiHideProperty } from '@nestjs/swagger';
import { Company } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CompanyEntity implements Company {
  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }

  @ApiHideProperty()
  @Exclude()
  id!: number;

  code!: string;

  name!: string;
}
