import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }
}
