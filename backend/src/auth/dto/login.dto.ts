// ========================================
// @file       login.dto.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (DTO)
// @purpose    Datos de entrada para /auth/login
// @description
//   Este define los campos que el usuario debe
//   enviar para iniciar sesión en el sistema.
//   - email: correo electrónico registrado
//   - password: contraseña en texto plano (será validada)
// ========================================
export class LoginDto {
  email!: string;     // Correo del usuario
  password!: string;  // Contraseña del usuario
}
