import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Roles, RolesPermissions } from '../persist/roles';
import { AUTH_SERVICE, IAuthService } from '../interfaces/auth-service.interface';
import { ILoggedInUser } from '../interfaces/token-payload.interface';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE) private readonly _authService?: IAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  

  async validate(payload: ILoggedInUser) { 
    return payload
  }
}
