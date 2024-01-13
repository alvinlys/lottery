import { Module } from '@nestjs/common';
import { DrawDatesModule } from './draw-dates/draw-dates.module';
import { CompaniesModule } from './companies/companies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    DrawDatesModule,
    CompaniesModule,
    RouterModule.register(routes),
  ],
})
export class AppModule {}
