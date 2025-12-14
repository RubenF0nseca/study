import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Failed to start application:', message);
  process.exit(1);
});
