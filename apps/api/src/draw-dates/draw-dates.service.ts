import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Result, Prisma } from '@prisma/client';
import { drawDatesDto } from './dto';

@Injectable()
export class DrawDatesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ year }: drawDatesDto): Promise<Partial<Result>[]> {
    const drawDateWhereInput: Prisma.ResultWhereInput = {};

    if (year) {
      drawDateWhereInput.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }

    return await this.prisma.result.findMany({
      select: {
        date: true,
      },
      where: drawDateWhereInput,
    });
  }
}
