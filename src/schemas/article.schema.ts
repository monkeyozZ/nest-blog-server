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

  @Prop()
  source: string // 文章来源

  @Prop()
  status: boolean // 文章状态

  @Prop()
  open: boolean // 文章是否公开

  @Prop()
  thumb: string // 文章缩略图

  @Prop()
  content: string // 文章内容

  @Prop()
  view: string // 文章查看次数

  @Prop()
  like: string // 文章喜欢数

  @Prop()
  creatTime: string // 文章创建时间

}

export const ArticleSchema = SchemaFactory.createForClass(Article);