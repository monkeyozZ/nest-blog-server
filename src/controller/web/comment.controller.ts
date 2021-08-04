import { CommentService } from '../../service/comment.service';
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Comment } from '../../schemas/comment.schema';

type listQuery = {
  id: string,
  aid: string,
  pid: string,
  isTopLevel: string
}

@Controller('webComment')
export class WebCommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('save')
  @HttpCode(200)
  async save(@Body() req: Comment):Promise<any> {
    const res = await this.commentService.save(req)
    if (res) {
      return {
        code: 200,
        data: 'success',
        message: '评论成功'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }

  @Get('list')
  async list(@Query() req: listQuery):Promise<any> {
    const res = await this.commentService.list(req, JSON.parse(req.isTopLevel))
    if (JSON.parse(req.isTopLevel)) {
      if (res.data) {
        return {
          code: 200,
          data: res
        }
      } else {
        return {
          code: 500,
          message: '服务器异常'
        }
      }
    } else {
      if (res) {
        return {
          code: 200,
          data: res
        }
      } else {
        return {
          code: 500,
          message: '服务器异常'
        }
      }
    }
  }

  @Get('like')
  async like(@Query() req: listQuery):Promise<any> {
    const res = await this.commentService.likeCommentById(req)
    if (res) {
      return {
        code: 200,
        data: 'success',
        message: '点赞成功'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }
}
