import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LotteryResultsService } from './lottery-results.service';

@Module({
  imports: [HttpModule],
  providers: [LotteryResultsService],
  exports: [LotteryResultsService],
})
export class LotteryResultsModule {}
