import { Controller, Get, Post } from '@nestjs/common';
import { MusicService } from '../../service/music.service'

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('list')
  async likeList() {
    try {
      const res = await this.musicService.getList()
      console.log(res)
      if (res) {
        return {
          code: 200,
          data: res
        }
      } else {
        return {
          code: 500,
          message: '服务器异常'
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
