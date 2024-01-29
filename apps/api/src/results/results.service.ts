import { Injectable } from '@nestjs/common';
import { resultsDto } from './dto';
import { Prisma, Result } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll({ date }: resultsDto): Promise<Result[]> {
    const where: Prisma.ResultWhereInput = {};

    if (date) {
      where.date = new Date(date);
    }

    return this.prisma.result.findMany({
      where,
    });
  }
}
