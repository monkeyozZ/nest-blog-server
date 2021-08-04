import { UploadController } from '../controller/admin/upload.controller';
import { UploadService } from '../service/upload.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {
  
}
