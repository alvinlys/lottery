import { ApiHideProperty } from '@nestjs/swagger';
import { Result } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { CompanyEntity } from '../../companies/entities/companies.entity';

export class ResultEntity implements Result {
  constructor({ company, ...partial }: Partial<ResultEntity>) {
    Object.assign(this, partial);

    if (company) {
      this.company = new CompanyEntity(company);
    }
  }

  @ApiHideProperty()
  @Exclude()
  id!: number;

  @ApiHideProperty()
  @Exclude()
  companyId!: number;

  @Transform(({ value }) => (value as Date).toISOString().substring(0, 10))
  date!: Date;

  drawNumber!: string;

  result!: string[];

  company!: CompanyEntity;
}
