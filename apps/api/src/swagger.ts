import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import metadata from './metadata';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

// Swagger OpenAPI docs
export class Swagger {
  async init(app: NestFastifyApplication, port: number): Promise<void> {
    const env: string = app.get(ConfigService).get('NODE_ENV')!;
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
            document.paths[newKey] = document.paths[key]!;
            delete document.paths[key];
          }
        }
        return document;
      },
    });

    // CLI plugin
    await SwaggerModule.loadPluginMetadata(metadata);
  }
}
