// ========================================
// @file       register.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (DTO)
// @purpose    Definir los datos necesarios para registrar un usuario.
// @description
//   Este DTO asegura que el endpoint POST /auth/register
//   reciba datos válidos y completos:
//   - email único y en formato válido
//   - password obligatorio (mínimo 6 caracteres)
//   - name obligatorio y con al menos 2 caracteres
// ========================================

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email!: string; // Correo del usuario (único en BD)

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string; // Contraseña (será encriptada con bcrypt)

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name!: string; // Nombre visible del usuario
}
