import { Time } from '../../schemas/time.schema';
import { TimeService } from '../../service/time.service';
import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

@Controller('time')
export class TimeController {
  constructor (private readonly timeService: TimeService) {}

  @Post('save')
  @HttpCode(200)
  async save(@Body() req:Time):Promise<any> {
    if (req.id) {
      const res = await this.timeService.save(req)
      if (res) {
        return {
          code: 200,
          message: '修改成功'
        }
      } else {
        return {
          code: 500,
          message: '服务器异常'
        }
      }
    } else {
      const res = await this.timeService.save(req)
      if (res) {
        return {
          code: 200,
          message: '时间轴续写成功'
        }
      } else {
        return {
          code: 500,
          message: '服务器异常'
        }
      }
    }
  }

  @Get('list')
  async getList(@Query() req:Time): Promise<any> {
    const res = await this.timeService.getList(req)
    if (res) {
      return {
        code: 200,
        data: res
      }
    }
  }

  @Get('del')
  async delTime(@Query() req:Time): Promise<any> {
    const res = await this.timeService.delete(req)
    if (res) {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  }
}
