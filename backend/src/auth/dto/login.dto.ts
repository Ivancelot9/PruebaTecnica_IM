// ========================================
// @file       login.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (DTO)
// @purpose    Datos de entrada para /auth/login
// @description
//   Este DTO valida que el usuario envíe:
//   - email válido (formato correcto)
//   - password obligatorio (mínimo 6 caracteres)
// ========================================

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email!: string; // Correo electrónico registrado

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string; // Contraseña del usuario
}
