import { Controller, Get, Query } from '@nestjs/common';
import { DrawDatesService } from './draw-dates.service';
import { queryDrawDatesDto } from './dto';

@Controller('draw-dates')
export class DrawDatesController {
  constructor(private drawDatesService: DrawDatesService) {}

  // query draw-dates?year=2024
  @Get()
  findAll(@Query() query: queryDrawDatesDto) {
    return this.drawDatesService.findAll(query);
  }
}
