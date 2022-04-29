import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';

import { ConfigService } from './config.service';
import { BASE_PATH } from './constants';
const busboy = require('connect-busboy');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const MB_MULTIPLIER = 1024 * 1024;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { });

  const options = new DocumentBuilder()
    .setTitle('CONTENTS API')
    .setBasePath('/')
    .setVersion('1.0')
    .setSchemes('http', 'https')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/${BASE_PATH}/swagger/`, app, document);

  const configService: ConfigService = app.get(ConfigService);

  app.use(cookieParser());
  app.use(busboy({
    highWaterMark: 4 * MB_MULTIPLIER,
    limits: {
      filesize: 2048 * MB_MULTIPLIER,
      files: 1
    }
  }));

  await app.listen(configService.get('PORT'));
}

bootstrap();
process.on('uncaughtException', e=> {
  console.log(e);
});
