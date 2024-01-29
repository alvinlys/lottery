import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Result, Prisma } from '@prisma/client';
import { drawDatesDto } from './dto';

@Injectable()
export class DrawDatesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll({ year }: drawDatesDto): Promise<Partial<Result>[]> {
    const where: Prisma.ResultWhereInput = {};

    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }

    return this.prisma.result.findMany({
      select: {
        date: true,
      },
      where,
      distinct: ['date'],
    });
  }
}
