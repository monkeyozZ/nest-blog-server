import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { LoginController } from '../controller/admin/login.controller';

@Module({
  imports: [AuthModule],
  controllers: [LoginController]
})
export class LoginModule {}
