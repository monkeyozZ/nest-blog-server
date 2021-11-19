import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Comment extends Document {
  @Prop()
  name: string // 昵称

  @Prop()
  email: string // 邮箱

  @Prop()
  content: string // 评论内容

  @Prop()
  aid: string // 文章id

  @Prop()
  pid: string // 父级id

  @Prop({ default: false })
  recovery: boolean // 假删除

  @Prop({ default: 0 })
  like: number // 假删除

  @Prop({ default: Date.now }) // 评论创建时间
  creatTime: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);