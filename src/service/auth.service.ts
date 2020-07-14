/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interface/auth.interface'
import md5 from 'crypto-js/md5'
import { type } from 'os';
type Token = {
  access_token: string
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && md5(user.password) === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User):Promise<Token>{
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}