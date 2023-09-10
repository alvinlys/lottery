import { Module } from '@nestjs/common';
import { DrawDateController } from './draw-date/draw-date.controller';
import { DrawDateService } from './draw-date/draw-date.service';
import { DrawDateModule } from './draw-date/draw-date.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DrawDateModule],
  controllers: [AppController, DrawDateController],
  providers: [AppService, DrawDateService],
})
export class AppModule {}
