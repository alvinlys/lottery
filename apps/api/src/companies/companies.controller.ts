import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CompanyEntity } from './entities/companies.entity';
import { Company } from '@prisma/client';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  async findAll(): Promise<Company[]> {
    const companies = await this.companiesService.findAll();
    return companies.map((company) => new CompanyEntity(company));
  }
}
