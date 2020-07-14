import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../service/users.service';
import { LoginSchema } from '../schemas/login.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'admin', schema: LoginSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
