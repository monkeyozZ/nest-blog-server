import { ArticleService } from './../../service/article.service';
import { Controller, Get, Post, HttpCode, Request, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @UseGuards(JwtAuthGuard)
  @Post('save')
  // @HttpCode(200)
  async save (@Request() req) {
    if (!req.user) {
      return {
        code: 201,
        message: 'access_token已过期或无效'
      }
    }
    // return req.user;
    // console.log(data)
    /* const res = await this.articleService.saveArticle(data)
    console.log('res:' + res)
    if (res) {
      return {
        code: 200,
        data: {
          success: true
        },
        message: '文章添加成功'
      }
    } else {
      return {
        code: 500,
        data: {
          success: false
        },
        message: '文章添加失败'
      }
    } */
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  getProfile(@Request() req) {
    // console.log(req)
    if (req.user) {

    }
    // return req.user;
  }
}
