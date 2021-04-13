import { NestFactory } from '@nestjs/core';
import { UpdateModule } from './update.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(UpdateModule);
  await app.listen(3000);
}
bootstrap();
