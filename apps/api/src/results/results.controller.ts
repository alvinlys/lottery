import { Controller, Get, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { Result } from '@prisma/client';
import { resultsDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResultEntity } from './entities/results.entity';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  @ApiOkResponse({ type: ResultEntity, isArray: true })
  async findAll(@Query() query: resultsDto): Promise<Result[]> {
    const results = await this.resultsService.findAll(query);
    return results.map((result) => new ResultEntity(result));
  }
}
