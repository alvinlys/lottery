import { Controller, Get, Query } from '@nestjs/common';
import { DrawDatesService } from './draw-dates.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { drawDatesDto } from './dto';

@ApiTags('draw-dates')
@Controller('draw-dates')
export class DrawDatesController {
  constructor(private readonly drawDatesService: DrawDatesService) {}

  @Get()
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'date',
      },
      example: ['2021-01-01', '2021-01-02'],
    },
  })
  async findAll(@Query() query: drawDatesDto): Promise<string[]> {
    const drawDates = await this.drawDatesService.findAll(query);
    return drawDates.map(({ date }) => (<Date>date).toISOString().substring(0, 10));
  }
}
