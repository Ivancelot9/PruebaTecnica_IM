// ========================================
// @file       main.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Core
// @purpose    Punto de entrada de la aplicación
// @description
//   Aquí se arranca el servidor NestJS.
//   - Se inicializa AppModule
//   - Se activa ValidationPipe global para validar DTOs
//   - Se levanta en el puerto definido en .env (PORT)
//   - Se habilita CORS para que el frontend pueda conectarse
// ========================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar validaciones globales (class-validator + DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔥 Habilitar CORS (frontend está en localhost:3000)
  app.enableCors({
    origin: 'http://localhost:3000', // origen permitido
    credentials: true,               // permite cookies/headers
  });

  await app.listen(process.env.PORT ?? 3001); 
}
bootstrap();
