import { ArticleService } from './article.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../interface/tag.interface';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TagService implements OnModuleInit {
  private articleService: ArticleService;
  constructor (
    @InjectModel('tag')
    private readonly TagModel: Model<Document>,
    readonly moduleRef: ModuleRef,
  ) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onModuleInit() {
    this.articleService = this.moduleRef.get(ArticleService, { strict: false });
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
        const articleCount = await this.articleService.getArticleByTag({ tag: res['alias'] })
        const arr = JSON.parse(JSON.stringify(res))
        arr['article_count'] = articleCount.length
        return {
          data: arr
        }
      } else {
        const page: number = parseInt(params.pageNum)
        const limit: number =parseInt(params.pageSize)
        const skip: number = (page - 1) * limit
        const count = await this.TagModel.countDocuments({})
        const tagArr = await this.TagModel.find().skip(skip).limit(limit)
        const myTagArr: any[] = JSON.parse(JSON.stringify(tagArr))
        for (let index = 0; index < myTagArr.length; index++) {
          const articleArr = await this.articleService.getArticleByTag({tag: myTagArr[index]['alias']})
          myTagArr[index]['article_count'] = articleArr.length
        }
        return {
          count: count,
          data: myTagArr
        }
      }
    } catch (error) {
      
    }
  }

  async getTagByAlias (alias: string):Promise<any> {
    const res = await this.TagModel.find({ alias })
    return res
  }

  async delete (params: Tag):Promise<any> {
    const res = await this.TagModel.findByIdAndRemove(params.id)
    return res
  }
}
