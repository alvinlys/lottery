import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

export class Winston {
  static createLogger(): LoggerService {
    return WinstonModule.createLogger({
      transports: [
        new transports.DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(
            format.timestamp(),
            format.printf((info) => {
              return `${info['timestamp']} ${info.level}: ${info.message}`;
            }),
          ),
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info['timestamp']} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    });
  }
}
