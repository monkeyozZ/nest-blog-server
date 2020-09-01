import { ArticleService } from './article.service';
import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../interface/tag.interface';

@Injectable()
export class TagService {
  constructor (
  @InjectModel('tag')
  private readonly TagModel: Model<Document>,
  private readonly articleService: ArticleService
  ) {
  }
  async save (obj:Tag):Promise<any> {
    try {
      if (obj.id) {
        const res =  await this.TagModel.findOneAndUpdate({_id: obj.id}, obj)
        return res
      } else {
        const tagModel = new this.TagModel(obj)
        const res = await tagModel.save()
        return res
      }
    } catch (error) {
      
    }
  }

  async getList (params: Tag):Promise<any> {
    try {
      if (params.id) {
        const res = await this.TagModel.findById(params.id)
        return {
          data: res
        }
      } else {
        const page: number = parseInt(params.page)
        const limit: number =parseInt(params.limit)
        const skip: number = (page - 1) * limit
        const count = await this.TagModel.countDocuments({})
        const tagArr = await this.TagModel.find().skip(skip).limit(limit)
        for (let index = 0; index < tagArr.length; index++) {
          const articleArr = await this.articleService.getArticleByTag({tag: tagArr[index]['alias']})
          tagArr[index]['article_num'] = articleArr.length
        }
        return {
          count: count,
          data: tagArr
        }
      }
    } catch (error) {
      
    }
  }

  async delete (params: Tag):Promise<any> {
    const res = await this.TagModel.findByIdAndRemove(params.id)
    return res
  }
}
