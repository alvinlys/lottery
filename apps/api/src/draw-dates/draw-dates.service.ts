import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { queryDrawDatesDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DrawDatesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ year }: queryDrawDatesDto): Promise<string[]> {
    const where: Prisma.DrawDateWhereInput = {};

    if (year) {
      where.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }

    const drawDates = await this.prisma.drawDate.findMany({
      select: {
        date: true,
      },
      where,
    });

    return drawDates!.map((drawDate) =>
      drawDate.date.toISOString().slice(0, 10),
    );
  }
}
