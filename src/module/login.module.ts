import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { LoginController } from '../controller/admin/login.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [LoginController]
})
export class LoginModule {}
