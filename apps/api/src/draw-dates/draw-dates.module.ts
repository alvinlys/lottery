import { Module } from '@nestjs/common';
import { DrawDatesController } from './draw-dates.controller';
import { DrawDatesService } from './draw-dates.service';

@Module({
  controllers: [DrawDatesController],
  providers: [DrawDatesService],
})
export class DrawDatesModule {}
