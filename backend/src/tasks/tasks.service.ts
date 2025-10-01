// ========================================
// @file       tasks.service.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Tasks (Service)
// @purpose    Lógica de negocio de tareas
// @description
//   Usa Prisma para interactuar con la base
//   de datos y manejar operaciones CRUD de tareas.
//   Funcionalidades:
//   - Crear tarea nueva
//   - Listar tareas (filtradas por usuario y criterios)
//   - Buscar tarea por ID
//   - Actualizar tarea
//   - Eliminar tarea
// ========================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear una nueva tarea
   */
  async create(data: {
    title: string;
    description?: string;
    category?: string;
    dueDate?: Date;
    userId: number;
  }) {
    return this.prisma.task.create({ data });
  }

  /**
   * Listar todas las tareas con filtros opcionales
   */
  async findAll(params: {
    userId: number;
    status?: 'completed' | 'pending';
    category?: string;
    search?: string;
  }) {
    const where: any = { userId: params.userId };

    if (params.status) where.completed = params.status === 'completed';
    if (params.category) where.category = params.category;
    if (params.search) where.title = { contains: params.search, mode: 'insensitive' };

    return this.prisma.task.findMany({ where });
  }

  /**
   * Buscar tarea por ID
   */
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`No existe la tarea #${id}`);
    return task;
  }

  /**
   * Actualizar tarea
   */
  async update(id: number, data: any) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  /**
   * Eliminar tarea
   */
  async remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
