import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron('0 21 * * *', {
    name: 'liveResults',
    timeZone: 'Asia/Kuala_Lumpur',
  })
  liveResults(): void {
    this.logger.debug('Called when the current second is 45');
  }
}
