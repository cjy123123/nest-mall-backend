import { Module } from '@nestjs/common'
import { PosterController } from './poster.controller'
import { PosterService } from './poster.service'
import { GoodsSpecModule } from '../goods-spec/goods-spec.module'

@Module({
  imports: [GoodsSpecModule],
  controllers: [PosterController],
  providers: [PosterService],
})
export class PosterModule {}
