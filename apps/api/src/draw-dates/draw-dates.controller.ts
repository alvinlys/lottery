import { Controller, Get, Query } from '@nestjs/common';
import { DrawDatesService } from './draw-dates.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Result } from '@prisma/client';
import { DrawDateEntity } from './entities/draw-dates.entity';
import { drawDatesDto } from './dto';

@ApiTags('draw-dates')
@Controller('draw-dates')
export class DrawDatesController {
  constructor(private readonly drawDatesService: DrawDatesService) {}

  @Get()
  @ApiOkResponse({ type: DrawDateEntity, isArray: true })
  findAll(@Query() query: drawDatesDto): Promise<Partial<Result>[]> {
    return this.drawDatesService.findAll(query);
  }
}
