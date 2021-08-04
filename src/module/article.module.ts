import { UploadModule } from './upload.module';
/* eslint-disable @typescript-eslint/no-var-requires */
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';
import { ArticleController } from '../controller/admin/article.controller';
import { ArticleService } from '../service/article.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../schemas/article.schema';
import { AuthModule } from './auth.module';
import { WebArticleController } from '../controller/web/article.controller';
import { TagModule } from './tag.module';
// import * as autoIncrement from 'mongoose-auto-increment';
// import * as mongoose  from 'mongoose'
// import { connection } from 'mongoose';
import { CommentModule } from './comment.module';
import { TimeModule } from './time.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: 'article',
      // schema: ArticleSchema,
      useFactory: (): any => {
        const schema = ArticleSchema
        /* autoIncrement.initialize(connection);
        schema.plugin(autoIncrement.plugin, {
          model: 'article',
          field: 'id',
          startAt: 1,
          incrementBy: 1
        }); */
        return schema;
      },
    }]),
    AuthModule,
    UploadModule,
    CommentModule,
    forwardRef(() => TagModule)
  ],
  controllers: [ArticleController, WebArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
