// ========================================
// @file       jwt.strategy.ts
// @module     Backend - Auth (Strategy)
// @purpose    Validar JWT y adjuntar payload al request
// ========================================
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
  }

  // Lo que retornes aquí se coloca en req.user
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}
