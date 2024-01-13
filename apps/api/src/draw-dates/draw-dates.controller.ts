import { Controller, Get, Query } from '@nestjs/common';
import { DrawDatesService } from './draw-dates.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DrawDate } from '@prisma/client';
import { DrawDateEntity } from './entities/draw-dates.entity';
import { drawDatesDto } from './dto';

@Controller('draw-dates')
@ApiTags('draw-dates')
export class DrawDatesController {
  constructor(private drawDatesService: DrawDatesService) {}

  @Get()
  @ApiOkResponse({ type: DrawDateEntity, isArray: true })
  findAll(@Query() query: drawDatesDto): Promise<Partial<DrawDate>[]> {
    return this.drawDatesService.findAll(query);
  }
}
