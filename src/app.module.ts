
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUrl } from './constants';
import { LoginModule } from './module/login.module';
import { ArticleModule } from './module/article.module';

@Module({
  imports: [MongooseModule.forRoot(dbUrl), LoginModule, ArticleModule]
})
export class AppModule {}