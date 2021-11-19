import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
async function bootstrap() {
  const option = {
    cors: true,
    origin: ['/\.wowmonkey\.cn$/'],
    methods: ['HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: '200'
  }
  const app = await NestFactory.create(AppModule, option);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // app.enableCors()
  await app.listen(3000);
}
bootstrap();
