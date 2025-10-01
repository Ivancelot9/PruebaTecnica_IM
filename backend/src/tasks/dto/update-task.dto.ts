// ========================================
// @file       update-task.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Tasks (DTO)
// @purpose    Definir los datos para actualizar una tarea
// @description
//   Este DTO valida la información enviada en
//   el endpoint PUT /tasks/:id o PATCH /tasks/:id.
//   Todos los campos son opcionales, pero si se envían,
//   deben cumplir las reglas de validación.
//   - title: mínimo 3 caracteres
//   - description: máximo 200 caracteres
//   - category: texto libre
//   - dueDate: fecha válida
//   - completed: booleano
// @author     
//   Ivan Medina
// @created    Septiembre 2025
// @updated    [¿?]
// ========================================

import { IsString, IsOptional, MinLength, MaxLength, IsDateString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser un texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  @MaxLength(200, { message: 'La descripción no puede superar 200 caracteres' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser un texto' })
  category?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de vencimiento debe tener formato válido (YYYY-MM-DD)' })
  dueDate?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo completed debe ser verdadero o falso' })
  completed?: boolean;
}
