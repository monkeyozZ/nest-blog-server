import { UploadService } from '../../service/upload.service';
import { Controller, UseInterceptors, UseGuards, Post, HttpCode, Body, UploadedFile, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { AuthInterceptor } from '../../interceptor/auth.interceptor';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
type File = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: any
}

type params = {
  key: string
}

// @UseInterceptors(AuthInterceptor)
// @UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  async image(@UploadedFile() file: File):Promise<any> {
    const res = await this.uploadService.image(file)
    if (res) {
      return {
        code: 200,
        data: res,
        message: '上传成功',
        success: true
      }
    } else {
      return {
        code: 500,
        message: '上传失败'
      }
    }
  }

  @Get('delete')
  @UseInterceptors(FileInterceptor('file'))
  async delete(@Query() params: params):Promise<any> {
    const key = params.key.split('/')[3]
    const res = await this.uploadService.delete(key)
    if (res) {
      return {
        code: 200,
        message: '删除成功',
      }
    } else {
      return {
        code: 500,
        message: '删除失败'
      }
    }
  }
}
