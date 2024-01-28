import { Result } from '@prisma/client';

export class DrawDateEntity implements Partial<Result> {
  date!: Date;
}
