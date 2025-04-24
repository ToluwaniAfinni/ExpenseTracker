import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()  || 'fallback-secret',
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get<string>('jwt.secret'),
    // });

    const jwtSecret = configService.get<string>('jwt.secret');
    
    if (!jwtSecret) {
    throw new Error('JWT secret not defined in environment variables!');
    }

    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return { id: payload.sub, email: payload.email };
  }
}