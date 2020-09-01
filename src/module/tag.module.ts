import { ArticleModule } from './article.module';
import { TagSchema } from './../schemas/tag.schema';
import { TagController } from './../controller/admin/tag.controller';
import { Module } from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{
      name: 'tag',
      schema: TagSchema
    }]), ArticleModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
