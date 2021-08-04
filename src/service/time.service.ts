import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { TimeParams } from '../interface/time.interface';
import { Time } from '../schemas/time.schema';
import { UploadService } from './upload.service';

@Injectable()
export class TimeService {
  constructor (
    @InjectModel('time')
    private readonly TimeModule: Model<Document>,
    private readonly uploadService: UploadService
  ) {}

  async save(obj: Time):Promise<any> {
    if (obj.id) {
      const data = {
        content: obj.content,
        imageUrl: obj.imageUrl
      }
      const res = await this.TimeModule.findByIdAndUpdate(obj.id, data)
      return res
    } else {
      const res = await this.TimeModule.create(obj)
      return res
    }
  }
  async getList(params: TimeParams):Promise<any> {
    try {
      if (params.id) {
        const res = await this.TimeModule.findById(params.id)
        return {
          data: res
        }
      } else {
        const page: number = parseInt(params.pageNum)
        const limit: number =parseInt(params.pageSize)
        const skip: number = (page - 1) * limit
        const count = await this.TimeModule.countDocuments({})
        const timeArr = await this.TimeModule.find({recovery: false}).skip(skip).limit(limit)
        return {
          count: count,
          data: timeArr
        }
      }
    } catch (error) {
      
    }
  }

  async delete (params: TimeParams):Promise<any> {
    const timeDocu = await this.TimeModule.findById(params.id)
    const thumbKey = timeDocu['imageUrl'].split('/')[3]
    const delThumbRes = this.uploadService.delete(thumbKey)
    if (delThumbRes) {
      const res = await this.TimeModule.findByIdAndRemove(params.id)
      return res
    } else {
      return false
    }
  }
}
