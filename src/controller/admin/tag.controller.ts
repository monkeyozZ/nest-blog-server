import { Tag } from '../../interface/tag.interface';
import { Controller, Post, Body, HttpCode, Get, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { TagService } from '../../service/tag.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';

@UseGuards(JwtAuthGuard)
@UseInterceptors(AuthInterceptor)
@Controller('tag')
export class TagController {
  constructor (private readonly tagService: TagService) {}
  @Post('save')
  @HttpCode(200)
  async save (@Body() req:Tag):Promise<any> {
    const res = await this.tagService.save(req)
    if (res) {
      return {
        code: 200,
        message: req.id ? '标签修改成功' :'标签添加成功'
      }
    } else {
      return {
        code: 500,
        message: req.id ? '标签修改失败' : '标签添加失败'
      }
    }
  }

  @Get('list')
  async getList (@Query() req:Tag):Promise<any> {
    const res = await this.tagService.getList(req)
    if (res) {
      return {
        code: 200,
        ...res
      }
    }
  }

  @Get('delete')
  async remove(@Query() req:Tag):Promise<any> {
    const res =  await this.tagService.delete(req)
    if (res) {
      return {
        code: 200,
        message: '标签删除成功'
      }
    } else {
      return {
        code: 500,
        message: '标签删除失败'
      }
    }
  }
}
