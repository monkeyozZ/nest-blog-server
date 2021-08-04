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
          message: req.id ? '文章修改成功'  : '文章添加成功'
        }
      } else {
        return {
          code: 500,
          message: req.id ? '文章修改失败'  :'文章添加失败'
        }
      }
  }

  @Get('list')
  async getList (@Query() params) {
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

  @Get('del')
  async fakeDel (@Query() params) {
    const res = await this.articleService.fakeDelArticle(params)
    if (res) {
      return {
        code: 200,
        message: '该记录已加入回收站'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }

  @Get('reallyDel')
  async reallyDel (@Query() params) {
    const res = await this.articleService.reallyDelArticle(params)
    if (res) {
      return {
        code: 200,
        message: '删除成功'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }

  @Get('recoveryDel')
  async recoveryDel (@Query() params) {
    const res = await this.articleService.recoveryDelArticle(params)
    if (res) {
      return {
        code: 200,
        message: '该记录已恢复'
      }
    } else {
      return {
        code: 500,
        message: '服务器异常'
      }
    }
  }
}
