import { Tag } from '../../interface/tag.interface';
import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from '../../service/tag.service';

@Controller('webTag')
export class WebTagController {
  constructor (private readonly tagService: TagService) {}
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
}
