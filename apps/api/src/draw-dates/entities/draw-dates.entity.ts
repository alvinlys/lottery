// Swagger response types

import { DrawDate } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DrawDateEntity implements Partial<DrawDate> {
  @ApiProperty({
    enum: [1, 2, 3, 4, 5, 6, 7],
    default: new Date().getDay(),
  })
  day!: number;

  date!: Date;
}
