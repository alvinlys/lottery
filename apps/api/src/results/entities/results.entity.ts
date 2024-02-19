import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Result, Prisma } from '@prisma/client';
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

  @ApiProperty({ example: '2021-01-01' })
  @Transform(({ value }) => (<Date>value).toISOString().substring(0, 10))
  date!: Date;

  drawNumber!: string;

  @Transform(({ value }) => {
    value.top = value.t;
    value.special = value.s;
    value.consolation = value.c;
    delete value.t;
    delete value.s;
    delete value.c;
    return value;
  })
  result!: Prisma.JsonValue;

  company!: CompanyEntity;
}
