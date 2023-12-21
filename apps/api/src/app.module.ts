import { Module } from '@nestjs/common';
import { DrawDatesModule } from './draw-dates/draw-dates.module';
import { CompaniesModule } from './companies/companies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DrawDatesModule,
    CompaniesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
