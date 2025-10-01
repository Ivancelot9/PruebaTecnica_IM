// ========================================
// @file       prisma.service.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Prisma
// @purpose    Servicio de conexión a la BD
// @description
//   Este archivo se 
//   conectará automáticamente a la base de datos
//   cuando se inicia la aplicación NestJS y cerrar
//   la conexión cuando la aplicación termina.
//   De esta forma, cualquier módulo (auth, tasks, etc.)
//   puede inyectar PrismaService y acceder a la BD.
// @author     Ivan Medina
// @created    Septiembre 2025
// ========================================

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * @summary Método que corre al iniciar el módulo
   * @description Establece la conexión con la base de datos SQLite
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * @summary Método que corre al destruir el módulo
   * @description Cierra la conexión con la base de datos de forma limpia
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
