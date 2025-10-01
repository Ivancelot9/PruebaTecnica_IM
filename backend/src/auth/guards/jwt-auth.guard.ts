// ========================================
// @file       jwt-auth.guard.ts
// @module     Backend - Auth (Guard)
// @purpose    Proteger endpoints con estrategia JWT
// ========================================
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
