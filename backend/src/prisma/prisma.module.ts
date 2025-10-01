// ========================================
// @file       prisma.module.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Prisma
// @purpose    Exponer PrismaService como módulo global
// @description
//   Este módulo registra y exporta el PrismaService
//   para que otros módulos (auth, tasks, users) puedan
//   inyectarlo y acceder a la base de datos.
//   Con la anotación @Global, no es necesario importarlo
//   manualmente en cada módulo que lo use.
// @author     Ivan Medina
// @created    Septiembre 2025
// ========================================

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
