import { Module } from '@nestjs/common'
import { GoodsSpecService } from './goods-spec.service'
import { GoodsSpecController } from './goods-spec.controller'

@Module({
  controllers: [GoodsSpecController],
  providers: [GoodsSpecService],
  exports: [GoodsSpecService],
})
export class GoodsSpecModule {}
