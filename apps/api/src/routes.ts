import { Routes } from '@nestjs/core';
import { DrawDatesModule } from './draw-dates/draw-dates.module';
import { CompaniesModule } from './companies/companies.module';

export const routes: Routes = [
  {
    path: 'public',
    children: [
      {
        path: '/',
        module: DrawDatesModule,
      },
      {
        path: '/',
        module: CompaniesModule,
      },
    ],
  },
];
