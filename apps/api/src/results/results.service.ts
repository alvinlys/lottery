import { Injectable } from '@nestjs/common';
import { resultsDto } from './dto';
import { Prisma, Result } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll({ date, companyCode }: resultsDto): Promise<Result[]> {
    const where: Prisma.ResultWhereInput = {
      date: new Date(date),
    };

    if (companyCode) {
      where.company = {
        code: companyCode,
      };
    }

    return this.prisma.result.findMany({
      where,
      include: {
        company: true,
      },
    });
  }
}
