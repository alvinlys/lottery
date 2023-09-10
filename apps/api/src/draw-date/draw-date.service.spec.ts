import { Test, TestingModule } from '@nestjs/testing';
import { DrawDateService } from './draw-date.service';

describe('DrawDateService', () => {
  let service: DrawDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawDateService],
    }).compile();

    service = module.get<DrawDateService>(DrawDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
