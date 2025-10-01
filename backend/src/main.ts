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
// ========================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activar validaciones globales (class-validator + DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades extra que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan propiedades desconocidas
      transform: true, // convierte tipos (ej. string a number si el DTO lo pide)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
