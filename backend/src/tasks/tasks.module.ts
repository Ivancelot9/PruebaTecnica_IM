// ========================================
// @file       tasks.module.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Tasks (Module)
// @purpose    Configuración del módulo de tareas
// @description
//   Declara el controlador y servicio de Tasks,
//   e importa PrismaModule para acceder a la BD.
// ========================================

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],  // para usar PrismaService
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
