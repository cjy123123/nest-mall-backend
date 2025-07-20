import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { PosterService } from './poster.service'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CreatePosterDto } from './poster.dto'

@ApiTags('海报')
@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @ApiOperation({ summary: 'TODO: 生成商品海报' })
  @ApiParam({ name: 'goodsId', description: '商品ID' })
  @Get(':goodsId')
  createGoodsPoster(@Param('goodsId') goodsId: number) {
    return this.posterService.createGoodsPoster(goodsId)
  }
}
