import { TimeService } from '../service/time.service';
import { TimeController } from '../controller/admin/time.controller';
import { Module } from '@nestjs/common';
import { UploadModule } from './upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeSchema } from '../schemas/time.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'time', schema: TimeSchema }]),
    UploadModule
  ],
  controllers: [TimeController],
  providers: [TimeService],
  exports: [TimeService]
})
export class TimeModule {}
