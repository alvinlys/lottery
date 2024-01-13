import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DrawDate, Prisma } from '@prisma/client';
import { drawDatesDto } from './dto';

@Injectable()
export class DrawDatesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ year, day }: drawDatesDto): Promise<Partial<DrawDate>[]> {
    const drawDateWhereInput: Prisma.DrawDateWhereInput = {};

    if (year) {
      drawDateWhereInput.date = {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      };
    }
    if (day) {
      drawDateWhereInput.day = day;
    }

    const res = await this.prisma.drawDate.findMany({
      select: {
        day: true,
        date: true,
      },
      where: drawDateWhereInput,
    });
    console.log(res);
    return res;
  }
}
