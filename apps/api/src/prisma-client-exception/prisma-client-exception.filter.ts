import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientUnknownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  override catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const code = exception.code;
    const message = (message?: string): string => `(${code}) ${message || exception.message}`;

    this.logger.error(message());
    switch (code) {
      case 'P2002': {
        // https://www.prisma.io/docs/orm/reference/error-reference#p2002
        const status = HttpStatus.CONFLICT;
        response.status(status).send({
          statusCode: status,
          message: message(),
        });
        break;
      }
      case 'P2025': {
        // https://www.prisma.io/docs/orm/reference/error-reference#p2025
        const status = HttpStatus.NOT_FOUND;
        response.status(status).send({
          statusCode: status,
          message: message(),
        });
        break;
      }
      default:
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).send({
          statusCode: status,
          message: message('Something went wrong. Please try again later.'),
        });
        break;
    }
  }
}
