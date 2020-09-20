/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ArticleService } from './../../service/article.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('webArticle')
export class WebArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('list')
  async getList (@Query() params) {
    const res = await this.articleService.getArticle(params)
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
  @Get('detail')
  async getDetail (@Query() params) {
    console.log(params)
    const res = await this.articleService.getArticle(params)
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
