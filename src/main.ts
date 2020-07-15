import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const option = {
    cors: true,
    origin: ['http://localhost:3000'],
    methods: ['HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: true,
    optionsSuccessStatus: '200'
  }
  const app = await NestFactory.create(AppModule, option);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
