import { UploadService } from './upload.service';
import { CommentService } from './comment.service';
import { TagService } from './tag.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Article } from '../schemas/article.schema';
import { ArticleParams, whereType, pageInfo } from '../interface/article.interface';

type sortType = {
  view?: number
  creatTime?: number
}
@Injectable()
export class ArticleService {
  constructor (
    @InjectModel('article')
    private readonly ArticleModel: Model<Document>,
    private readonly tagService: TagService,
    private readonly commentService: CommentService,
    private readonly uploadService: UploadService
  ) {}
  async saveArticle (obj: Article): Promise<any> {
    try {
      const articleModel = this.ArticleModel
      if (obj.id) {
        const id: string = obj.id
        const res = await articleModel.findByIdAndUpdate(id , obj)
        return res
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
        if (params.isClient && res) {
          await this.ArticleModel.findByIdAndUpdate(params.id, {view: res['view'] + 1})
        }
        const commentCount = await this.commentService.commentCountById({aid: params.id})
        const detail = JSON.parse(JSON.stringify(res))
        detail['comment_count'] = commentCount
        if (params.isClient) {
          detail['view'] += 1
          detail['haslike'] = false
        }
        detail['tagAlias'] = JSON.parse(JSON.stringify(detail['tag']))
        for (let j = 0; j < detail['tag'].length; j++) {
          const alias = detail['tag'][j]
          const tag = await this.tagService.getTagByAlias(alias)
          detail['tag'][j] = tag.map(item => item.name).join()
          if (!params.isClient) {
            detail['tagAlias'][j] = tag.map(item => item.alias).join()
          }
        }
        return detail
      } else {
        console.log(params)
        const where:whereType = {}
        const pageObj:pageInfo = {}
        const sort:sortType = {}
        if (params.status) {
          where.status = params.status == 1 || params.status == 2
          where.recovery = params.status == 4
        } else {
          where.status = true
          where.recovery = false
        }
        if (params.category) {
          where.category = params.category
        }
        if (params.tag) {
          where.tag = params.tag
        }
        if (params.beginTime) {
          const beginDate = new Date(parseInt(params.beginTime)).toISOString()
          const endDate = new Date(parseInt(params.beginTime) + 86400000).toISOString()
          where.creatTime = {$gte: beginDate, $lte: endDate}
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
        if (params.hot) {
          sort.view = -1
        } else {
          sort.creatTime = -1
        }
        const currentpage: number = parseInt(pageObj.pageNum as string)
        const limit: number =  parseInt(pageObj.pageSize as string)
        const skipRow = (currentpage as number - 1) * limit
        const count = await this.ArticleModel.countDocuments(where)
        console.log(where)
        const res = await this.ArticleModel.find(where).skip(skipRow).limit(limit).sort(sort).lean()
        for (let i = 0; i < res.length; i++) {
          const commentCount = await this.commentService.commentCountById({aid: res[i]._id})
          res[i]['commentCount'] = commentCount
          for (let j = 0; j < res[i]['tag'].length; j++) {
            const alias = res[i]['tag'][j]
            const tag = await this.tagService.getTagByAlias(alias)
            res[i]['tag'][j] = tag.map(item => item.name).join()
          } 
        }
        return {
          count: count,
          data: res
        }
      }
      
    } catch (error) {
      
    }
  }

  async getArticleByTag (Params: ArticleParams): Promise<any> {
    const res = await this.ArticleModel.find({tag: Params.tag, status: true})
    return res
  }

  async likeById(params: ArticleParams):Promise<any> {
    const res = await this.ArticleModel.findById(params.id)
    const obj = {
      like: res['like'] + 1
    }
    const updateRes = await this.ArticleModel.findByIdAndUpdate(params.id, obj)
    return updateRes
  }

  async fakeDelArticle (params: ArticleParams): Promise<any> {
    const res = await this.ArticleModel.findByIdAndUpdate(params.id, {recovery: true, status: false})
    return res
  }

  async reallyDelArticle (params: ArticleParams): Promise<any> {
    const articleDocu = await this.ArticleModel.findById(params.id)
    const thumbKey = articleDocu['thumb'].split('/')[3]
    const delThumbRes = this.uploadService.delete(thumbKey)
    if (delThumbRes) {
      const res = await this.ArticleModel.deleteOne({_id: params.id})
      return res
    } else {
      return false
    }
    
  }

  async recoveryDelArticle (params: ArticleParams): Promise<any> {
    const res = await this.ArticleModel.findByIdAndUpdate(params.id, {recovery: false, status: true})
    return res
  }
}
