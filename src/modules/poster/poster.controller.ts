import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { PosterService } from './poster.service'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePosterDto, GetQRCodeDTO } from './poster.dto'
import { ResponseDto } from '@/common/dto/response.dto'
import { getAccessTokenAPI } from '@/utils'
import axios from 'axios'

@ApiTags('海报,二维码')
@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Get('code')
  @ApiOperation({ summary: '生成指定页面的二维码base64（纯二维码）' })
  @ApiResponse({ type: ResponseDto })
  getQRCode(@Query() dto: GetQRCodeDTO) {
    return this.posterService.getQRCode(dto)
  }

  @ApiOperation({ summary: '生成商品海报base64（附带二维码）' })
  @ApiResponse({ type: ResponseDto })
  @ApiParam({ name: 'goodsSpecId', description: '商品规格ID' })
  @Get(':goodsSpecId')
  createGoodsPoster(@Param('goodsSpecId') goodsSpecId: number) {
    return this.posterService.createGoodsPoster(goodsSpecId)
  }
}
