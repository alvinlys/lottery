import { Test, TestingModule } from '@nestjs/testing';
import { DrawDateController } from './draw-date.controller';

describe('DrawDateController', () => {
  let controller: DrawDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawDateController],
    }).compile();

    controller = module.get<DrawDateController>(DrawDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
