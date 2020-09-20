import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Article } from '../schemas/article.schema';
import { ArticleParams, whereType, pageInfo } from '../interface/article.interface';
@Injectable()
export class ArticleService {
  constructor (@InjectModel('article') private readonly ArticleModel: Model<Document>) {
    
  }
  async saveArticle (obj: Article): Promise<any> {
    try {
      // findByIdAndUpdate
      const articleModel = this.ArticleModel
      if (obj.id) {
        const id: string = obj.id
        articleModel.findByIdAndUpdate(id, obj)
      } else {
        // const res = await articleModel.save()
        const res = await articleModel.create(obj)
        return res
      }
    } catch (error) {
      console.log(error)
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
        const pageObj:pageInfo = {}
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
        if (params.pageSize) {
          pageObj.pageSize = params.pageSize
        } else {
          pageObj.pageSize = 10
        }
        if (params.pageNum) {
          pageObj.pageNum = params.pageNum
        } else {
          pageObj.pageNum = 1
        }

        const currentpage: number | string = pageObj.pageNum
        const limit: number =  parseInt(pageObj.pageSize as string)
        const skipRow = (currentpage as number - 1) * limit
        const count = await this.ArticleModel.countDocuments(where)
        const res = await this.ArticleModel.find(where).skip(skipRow).limit(limit).sort({ creatTime: -1 }).lean()
        return {
          count: count,
          data: res
        }
      }
      console.log(HttpStatus)
      
    } catch (error) {
      
    }
  }
  async getArticleByTag (Params: ArticleParams): Promise<any> {
    const res = await this.ArticleModel.find({tag: Params.tag, status: true})
    return res
  }
}
