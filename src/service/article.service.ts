import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Article } from '../schemas/article.schema';
import { ArticleParams, whereType } from '../interface/article.interface';
@Injectable()
export class ArticleService {
  constructor (@InjectModel('article') private readonly ArticleModel: Model<Document>) {
    
  }
  async saveArticle (obj: Article): Promise<any> {
    try {
      const articleModel = new this.ArticleModel(obj)
      const res = await articleModel.save()
      return res
    } catch (error) {
      /* throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'This is a custom message',
      }, 403); */
    }
  }
  async getArticle (params: ArticleParams): Promise<any> {
    try {
      if (params.id) {
        const res = await this.ArticleModel.findById(params.id)
        return res
      } else {
        const where:whereType = {}
        if (params.status) {
          where.status = params.status == 1 || params.status == 2
          where.recovery = params.status == 4
        }
        if (params.cate) {
          where.category = params.cate
        }
        if (params.tag) {
          where.category = params.tag
        }
        if (params.keywords) {
          const reg = new RegExp(params.keywords, 'i') // 模糊查询参数
          where.$or = [{ 'title': reg }]
        }
        const res = await this.ArticleModel.find(where)
        return res
      }
      console.log(HttpStatus)
      
    } catch (error) {
      
    }
  }
  async getArticleByTag (Params: ArticleParams): Promise<any> {
    const res = await this.ArticleModel.find({tag: Params.tag})
    return res
  }
}
