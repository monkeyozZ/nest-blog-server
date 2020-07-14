/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/login')
  getProfile(@Request() req) {
    return req.user;
  }
}