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
  @Get('hot')
  async getHotList (@Query() params) {
    params.hot = JSON.parse(params.hot)
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
    params.isClient = true
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
  @Get('like')
  async like(@Query() req):Promise<any> {
    const res = await this.articleService.likeById(req)
    if (res) {
      return {
        code: 200,
        data: 'success',
        message: '喜欢成功'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }
}
