/* eslint-disable @typescript-eslint/no-var-requires */
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ArticleController } from './../controller/admin/article.controller';
import { ArticleService } from '../service/article.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../schemas/article.schema';
import { AuthModule } from './auth.module';
/* import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose  from 'mongoose' */

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'article',
      schema: ArticleSchema,
      /* useFactory: (): any => {
        const schema = ArticleSchema
        console.log(mongoose)
        autoIncrement.initialize(mongoose.connection);
        schema.plugin(autoIncrement.plugin, {
          model: 'article',
          field: 'id',
          startAt: 1,
          incrementBy: 1
        });
        return schema;
      }, */
    }]),
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
