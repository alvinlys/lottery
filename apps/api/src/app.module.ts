import { Module } from '@nestjs/common';
import { DrawDatesModule } from './draw-dates/draw-dates.module';
import { CompaniesModule } from './companies/companies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { ResultsModule } from './results/results.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    ScheduleModule.forRoot(),
    RouterModule.register(routes),
    DrawDatesModule,
    CompaniesModule,
    ResultsModule,
    CronModule,
  ],
})
export class AppModule {}
