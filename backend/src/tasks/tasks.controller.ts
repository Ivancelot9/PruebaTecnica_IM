// ========================================
// @file       tasks.controller.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Tasks (Controller)
// @purpose    Endpoints de gestión de tareas (CRUD + acciones extra)
// @description
//   Este controlador expone todas las rutas HTTP para que
//   cada usuario maneje sus tareas de manera protegida con JWT.
//   Funcionalidades cubiertas:
//   - POST   /tasks              → Crear tarea
//   - GET    /tasks              → Listar todas las tareas con filtros
//   - GET    /tasks/:id          → Buscar tarea por ID
//   - PUT    /tasks/:id          → Actualizar tarea existente
//   - DELETE /tasks/:id          → Eliminar tarea
//   - PATCH  /tasks/:id/complete → Marcar como completada
//
//   Todas las rutas usan JwtAuthGuard, lo que significa que
//   requieren un token válido para poder acceder.
// ========================================

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Patch,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Todas las rutas de este controlador están protegidas por JWT
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * @route   POST /tasks
   * @desc    Crea una nueva tarea vinculada al usuario autenticado
   * @body    { title: string, description?: string, category?: string, dueDate?: Date }
   * @return  La tarea creada con ID asignado
   */
  @Post()
  create(@Req() req: any, @Body() body: any) {
    const userId = req.user.userId; // ID del usuario desde el JWT
    return this.tasksService.create({ ...body, userId });
  }

  /**
   * @route   GET /tasks
   * @desc    Lista todas las tareas del usuario autenticado
   * @query   status: 'completed' | 'pending'
   *          category: string
   *          search: string (filtra por título)
   * @return  Array de tareas que cumplen con los filtros
   */
  @Get()
  findAll(
    @Req() req: any,
    @Query('status') status?: 'completed' | 'pending',
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const userId = req.user.userId;
    return this.tasksService.findAll({ userId, status, category, search });
  }

  /**
   * @route   GET /tasks/:id
   * @desc    Busca una tarea por su ID
   * @param   id → número de la tarea
   * @return  La tarea encontrada o error 404 si no existe
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  /**
   * @route   PUT /tasks/:id
   * @desc    Actualiza los campos de una tarea existente
   * @param   id → número de la tarea
   * @body    Campos a actualizar (title, description, etc.)
   * @return  La tarea actualizada
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(+id, body);
  }

  /**
   * @route   DELETE /tasks/:id
   * @desc    Elimina una tarea por su ID
   * @param   id → número de la tarea
   * @return  La tarea eliminada
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  /**
   * @route   PATCH /tasks/:id/complete
   * @desc    Marca una tarea como completada (completed = true)
   * @param   id → número de la tarea
   * @return  La tarea actualizada con completed = true
   */
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.update(+id, { completed: true });
  }
}
