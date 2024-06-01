import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SessionBuilder } from '@ngrok/ngrok';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);

  // Setup ngrok ingress
  const session = await new SessionBuilder().authtoken("2hHz7t2TLAQIGO020rQCG4G5lAC_6FZMzhmvzUWQwvmRrTCs1").connect();
  const listener = await session.httpEndpoint().listen();
  new Logger('main').log(`Ingress established at ${listener.url()}`);
  listener.forward("localhost:3000");
}
bootstrap();
