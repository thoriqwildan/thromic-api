import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.use(cookieParser())

  app.use('/uploads/profile', express.static('uploads/profile'))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
