import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { // Enable implicit conversion para que los DTOs conviertan los tipos automáticamente (paginacion)
        enableImplicitConversion: true,
      },
    })
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application running on port ${process.env.PORT}`);
}
bootstrap();
