
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(!user)
    if (!user) {
      // throw new UnauthorizedException();
      // return false
      return {
        code: 201,
        message: '用户名或密码错误'
      }
    }
    return {
      code: 200,
      ...user,
      message: '用户名或密码错误'
    };
  }
}
