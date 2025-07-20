import { Module } from '@nestjs/common'
import { PosterController } from './poster.controller'
import { PosterService } from './poster.service'

@Module({
  imports: [],
  controllers: [PosterController],
  providers: [PosterService],
})
export class PosterModule {}
