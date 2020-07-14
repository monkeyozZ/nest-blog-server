
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUrl } from './constants';
import { LoginModule } from './module/login.module';

@Module({
  imports: [MongooseModule.forRoot(dbUrl),LoginModule]
})
export class AppModule {}