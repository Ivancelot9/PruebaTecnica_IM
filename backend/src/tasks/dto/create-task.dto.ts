// ========================================
// @file       create-task.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Tasks (DTO)
// @purpose    Validar datos al crear una tarea
// @description
//   Este DTO asegura que la información enviada
//   para crear una tarea cumpla con el formato correcto.
//   - title obligatorio, mínimo 3 caracteres
//   - description y category opcionales
//   - dueDate opcional (convertido a Date si llega como string)
// ========================================

import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser un texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title!: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser un texto' })
  category?: string;

  @IsOptional()
  @Type(() => Date) // 🔑 Convierte automáticamente el string a Date
  dueDate?: Date;
}
