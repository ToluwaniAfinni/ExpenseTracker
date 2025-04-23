import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ){}

  async login(loginDto: LoginDto)
  {
    const user = await this.validateUser(loginDto);
    
    const payload = { sub: user.id, email: user.email };
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return user;
  }
}
