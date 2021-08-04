import { CommentController } from '../controller/admin/comment.controller';
import { WebCommentController } from '../controller/web/comment.controller';
import { CommentService } from '../service/comment.service';
import { CommentSchema } from '../schemas/comment.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }])],
  controllers: [CommentController, WebCommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
