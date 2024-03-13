import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/config';
import { Swagger } from './common/swagger';
import { Winston } from './common/winston';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: Winston.createLogger(),
  });
  const port = <EnvironmentVariables['PORT']>app.get(ConfigService).get('PORT');
  const env = <EnvironmentVariables['NODE_ENV']>app.get(ConfigService).get('NODE_ENV');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // allow validation at all routes
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  if (env === 'development') {
    await Swagger.init(app, port);
  }

  // listen on all network interfaces by fastify
  await app.listen(port, '0.0.0.0');
}

bootstrap();
