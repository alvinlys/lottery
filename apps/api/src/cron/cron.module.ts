import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { LotteryResultsModule } from '../common/lottery-results/lottery-results.module';

@Module({
  imports: [LotteryResultsModule],
  providers: [CronService],
})
export class CronModule {}
