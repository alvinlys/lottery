import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/config';
import { Swagger } from './common/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // allow validation at all routes
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const port = <EnvironmentVariables['PORT']>app.get(ConfigService).get('PORT');

  await new Swagger().init(app, port);
  await app.listen(port);
}

bootstrap();
