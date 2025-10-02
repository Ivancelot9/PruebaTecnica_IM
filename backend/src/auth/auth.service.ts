// ========================================
// @file       auth.service.ts
// @project    To-Do App (Prueba Técnica)
// @module     Backend - Auth (Service)
// @purpose    Registro y login con JWT
// @description
//   - Maneja registro y login de usuarios
//   - Hashea contraseñas con bcrypt
//   - Genera JWT con payload del usuario
//   - Devuelve token + datos seguros del usuario
// ========================================

import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Registro de usuario
   */
  async register(dto: RegisterDto) {
    if (!dto?.email || !dto?.password || !dto?.name) {
      throw new BadRequestException('Faltan campos: email, password, name');
    }

    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('El email ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashedPassword, name: dto.name },
    });

    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.jwt.signAsync(payload);

    // No devolver la contraseña
    const { password, ...safeUser } = user;

    return { token: access_token, user: safeUser };
  }

  /**
   * Login de usuario
   */
  async login(dto: LoginDto) {
    if (!dto?.email || !dto?.password) {
      throw new BadRequestException('Faltan campos: email y password');
    }

    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, name: user.name };
    const access_token = await this.jwt.signAsync(payload);

    // No devolver la contraseña
    const { password, ...safeUser } = user;

    return { token: access_token, user: safeUser };
  }
}
