// ========================================
// @file       auth.controller.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (Controller)
// @purpose    Endpoints de autenticación (registro, login, perfil)
// @description
//   Expone los endpoints HTTP para:
//   - POST /auth/register → crear usuario nuevo y devolver { token, user }
//   - POST /auth/login    → iniciar sesión y devolver { token, user }
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
   * @route   POST /auth/register
   * @summary Registra un nuevo usuario y devuelve token + datos de usuario
   */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * @route   POST /auth/login
   * @summary Verifica credenciales y devuelve token + datos de usuario
   */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * @route   GET /auth/me
   * @summary Devuelve los datos del usuario autenticado (payload del JWT)
   * @guard   Requiere Authorization: Bearer <token>
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    // req.user viene del JwtStrategy.validate()
    return { user: req.user };
  }
}
