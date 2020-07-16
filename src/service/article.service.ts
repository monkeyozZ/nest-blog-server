import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../schemas/article.schema';
@Injectable()
export class ArticleService {
  constructor (@InjectModel('article') private readonly ArticleModel: Model<Article>) {}

  async saveArticle (obj: Article): Promise<any> {
    try {
      console.log(obj)
      const articleModel = new  this.ArticleModel(obj)
      const res = await articleModel.save()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
