import { TagModule } from './module/tag.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbUrl } from './constants';
import { LoginModule } from './module/login.module';
import { ArticleModule } from './module/article.module';
@Module({
  imports: [MongooseModule.forRoot(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }), LoginModule, ArticleModule, TagModule]
})
export class AppModule {}