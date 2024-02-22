import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientUnknownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  override catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const message = exception.message;

    switch (exception.code) {
      case 'P2002': {
        // https://www.prisma.io/docs/orm/reference/error-reference#p2002
        const status = HttpStatus.CONFLICT;
        response.status(status).send({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2025': {
        // https://www.prisma.io/docs/orm/reference/error-reference#p2025
        const status = HttpStatus.NOT_FOUND;
        response.status(status).send({
          statusCode: status,
          message: message,
        });
        break;
      }
      default:
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).send({
          statusCode: status,
          message: message,
        });
        break;
    }
  }
}
