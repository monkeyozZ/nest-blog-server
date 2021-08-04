import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Comment } from '../schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import _  = require('lodash');

type commentwhere = {
  aid: string,
  pid: string,
  pageSize?: string,
  pageNum?: string
}
type commentCountByIdType = {
  aid: string
}
type comment = {
  id: string
}

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment')
    private readonly CommentModel: Model<Document>
  ) {}
  async save(obj: Comment):Promise<any> {
    const res = await this.CommentModel.create(obj)
    return res
  }

  async list(params: commentwhere, isTopLevel: boolean):Promise<any> {
    const where = {
      aid: params.aid,
      pid: params.pid,
      recovery: false
    }
    if (isTopLevel) {
      const currentpage: number = parseInt(params.pageNum ? params.pageNum : '1')
      const limit: number =  parseInt(params.pageSize ? params.pageSize : '8')
      const skipRow = (currentpage as number - 1) * limit
      const count = await this.CommentModel.countDocuments(where)
      const topLevelList = await this.CommentModel.find(where).skip(skipRow).limit(limit).sort({ creatTime: -1 }).sort({ creatTime: -1 }).lean()
      const topLevelListArr = _.cloneDeep(topLevelList)
      for (let i = 0; i < topLevelListArr.length; i++) {
        const childWhere = {
          aid: params.aid,
          pid: topLevelListArr[i]._id,
          recovery: false
        }
        const flatChildList = await this.list(childWhere, false)
        topLevelListArr[i].childCount = flatChildList.length
        topLevelListArr[i].openChild = false
        topLevelListArr[i].userlike = false
      }
      return {
        count: count,
        data: topLevelListArr
      }
    } else {
      const transform = (arr) =>{
        for(let i=0; i < arr.length ; i++) {
            if(arr[i].childCommentList) {
              arr = arr.slice(0,i+1).concat(arr[i].childCommentList,arr.slice(i+1))
              delete arr[i].childCommentList
            }
        }
        return arr
      }
      const recursion = async (params:commentwhere) => {
        const childArr = await this.CommentModel.find(params).sort({ creatTime: -1 }).lean()
        const childList = _.cloneDeep(childArr)
        for (let i = 0; i < childList.length; i++) {
          const childWhere = {
            aid: params.aid,
            pid: childList[i]._id,
            recovery: false
          }
          const childCommentList = await recursion(childWhere)
          childList[i].childCommentList = childCommentList
          for (let j = 0; j < childCommentList.length; j++) {
            childCommentList[j].replayName = childList[i].name
          }
        }
        return childList
      }
      const res = await recursion(where)
      return transform(res)
    }
  }

  async commentCountById(params: commentCountByIdType):Promise<any> {
    const res = await this.CommentModel.countDocuments(params)
    return res
  }

  async likeCommentById(params: comment):Promise<any> {
    const res = await this.CommentModel.findById(params.id)
    const obj = {
      like: res['like'] + 1
    }
    const updateRes = await this.CommentModel.findByIdAndUpdate(params.id, obj)
    return updateRes
  }
}
