import { Controller, Get, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { PosterService } from './poster.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreatePosterDto } from './poster.dto'

@ApiTags('海报')
@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @ApiOperation({ summary: '生成商品海报' })
  @Get()
  generate(@Query() createPosterDto: CreatePosterDto) {
    return this.posterService.generatePoster(createPosterDto)
  }
}
