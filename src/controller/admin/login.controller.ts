/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    if (req.user.code === 200) {
      return this.authService.login(req.user);
    } else {
      return req.user
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/login')
  getProfile(@Request() req) {
    // console.log(req)
    return req.user;
  }
}