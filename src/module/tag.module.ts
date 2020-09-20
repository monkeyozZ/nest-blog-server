import { ArticleModule } from './article.module';
import { TagSchema } from '../schemas/tag.schema';
import { TagController } from '../controller/admin/tag.controller';
import { Module } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebTagController } from '../controller/web/tag.controller';

@Module({
  imports:[MongooseModule.forFeature([{
      name: 'tag',
      schema: TagSchema
    }]), ArticleModule],
  controllers: [TagController, WebTagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
