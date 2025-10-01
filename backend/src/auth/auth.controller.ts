// ========================================
// @file       auth.controller.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (Controller)
// @purpose    Endpoints de autenticación (registro, login, perfil)
// @description
//   Expone los endpoints HTTP para:
//   - POST /auth/register → crear usuario nuevo
//   - POST /auth/login    → iniciar sesión y obtener JWT
//   - GET  /auth/me       → devolver usuario autenticado (requiere JWT)
// ========================================

import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @route POST /auth/register
   * @summary Crea un usuario nuevo (contraseña encriptada con bcrypt)
   */
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * @route POST /auth/login
   * @summary Verifica credenciales y devuelve { access_token }
   */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * @route GET /auth/me
   * @summary Devuelve el payload del usuario autenticado
   * @guard   Requiere Authorization: Bearer <token>
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user; // { userId, email, name }
  }
}
