import { Module } from '@nestjs/common';
import { ArticleController } from './../controller/admin/article.controller';
import { ArticleService } from '../service/article.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../schemas/article.schema';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema }]),
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
