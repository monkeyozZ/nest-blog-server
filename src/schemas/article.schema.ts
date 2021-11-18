import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Article extends Document {
  @Prop()
  title: string // 文章标题

  @Prop()
  keywords: string // 文章关键词

  @Prop()
  desc: string // 文章描述

  @Prop()
  category: [] // 文章类别

  @Prop()
  tag: [] // 文章标签

  @Prop({ default: 0 })
  source: number // 文章来源

  @Prop()
  status: boolean // 文章状态

  @Prop()
  thumb: string // 文章缩略图

  @Prop()
  content: string // 文章内容

  @Prop()
  contentText: string // 文章内容

  @Prop({ default: 0 })
  view: number // 文章查看次数

  @Prop({ default: 0 })
  like: number // 文章喜欢数

  @Prop({ default: false  })
  recovery: boolean // 文章假删除

  @Prop({ default: Date.now }) // 文章创建时间
  creatTime: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article);