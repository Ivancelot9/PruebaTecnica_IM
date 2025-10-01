// ========================================
// @file       register.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (DTO)
// @purpose    Definir los datos necesarios
//             para registrar un usuario.
// @description
//  Indica qué información debe
//   recibir el endpoint POST /auth/register.
//   Nos ayuda a mantener orden y claridad
//   en la estructura de datos.
// @author     
//   Ivan Medina
// @created    Septiembre 2025
// ========================================

export class RegisterDto {
  email!: string;    // Correo del usuario (único en BD)
  password!: string; // Contraseña (será encriptada con bcrypt)
  name!: string;     // Nombre visible del usuario
}
