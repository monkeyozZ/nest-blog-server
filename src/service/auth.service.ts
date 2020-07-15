import cryptoJs = require('crypto-js');
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interface/auth.interface'
import { type } from 'os';
type Token = {
  code: number,
  data: {
    access_token: string
  }
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === cryptoJs.MD5(password).toString()) {
      const result = {
        _id: user._id,
        username: user.username
      };
      return result;
    }
    return null;
  }

  async login(user: User):Promise<Token>{
    const payload = { username: user.username, sub: user._id };
    return {
      code: 200,
      data: {
        access_token: `Bearer ${this.jwtService.sign(payload)}`,
      }
    };
  }
}