import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  //   constructor(private prisma: PrismaService) {}
  async findAll(): Promise<string[]> {
    return [];
  }
}
