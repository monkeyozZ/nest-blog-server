/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ArticleService } from './../../service/article.service';
import { Controller, Get, Post, HttpCode, Request, UseGuards, Body, UseInterceptors, Param, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';

@Controller('article')
@UseInterceptors(AuthInterceptor)
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // @UseGuards(JwtAuthGuard)
  @Post('save')
  @HttpCode(200)
  async save (@Body() req) {
    const res = await this.articleService.saveArticle(req)
    if (res) {
      return {
        code: 200,
        message: '文章添加成功'
      }
    } else {
      return {
        code: 500,
        message: '文章添加失败'
      }
    }
  }

  @Get('list')
  async getList (@Query() params) {
    console.log(params)
    const res = await this.articleService.getArticle(params)
    if (params.id) {
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
    } else {
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
    }
  }
}
