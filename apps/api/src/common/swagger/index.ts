import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import metadata from '../../metadata';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { EnvironmentVariables } from '../config';

// Swagger OpenAPI docs
export class Swagger {
  async init(app: NestFastifyApplication, port: number): Promise<void> {
    // CLI plugin (before SwaggerModule.createDocument)
    await SwaggerModule.loadPluginMetadata(metadata);

    const env = <EnvironmentVariables['NODE_ENV']>app.get(ConfigService).get('NODE_ENV');
    let config = new DocumentBuilder().setTitle('Lottery').setVersion('1.0');
    if (env === 'development') {
      config = config.addServer(`http://localhost:${port}/public`);
    }
    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('public', app, document, {
      customSiteTitle: 'Lottery API',
      patchDocumentOnRequest: (_req, _res, document) => {
        for (const key in document.paths) {
          if (document.paths[key] && key.includes('/public')) {
            const newKey = key.replace('/public', '');
            document.paths[newKey] = <PathItemObject>document.paths[key];
            delete document.paths[key];
          }
        }
        return document;
      },
    });
  }
}