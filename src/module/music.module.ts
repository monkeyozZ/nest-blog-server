import { MusicController } from '../controller/web/music.controller';
import { MusicService } from '../service/music.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService]
})
export class MusicModule {

}
