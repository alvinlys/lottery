import { Result } from '@prisma/client';
import { Transform } from 'class-transformer';

export class DrawDateEntity implements Partial<Result> {
  constructor(partial: Partial<DrawDateEntity>) {
    Object.assign(this, partial);
  }

  @Transform(({ value }) => (value as Date).toISOString().substring(0, 10))
  date!: Date;
}
