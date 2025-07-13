import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { GoodsService } from './goods.service'
import {
  CreateGoodsDto,
  UpdateGoodsDto,
  GoodsQueryDto,
  GoodsListResponseDto,
  GoodsItemResponseDto,
} from './dto/goods.dto'

@Controller('goods')
@ApiTags('商品管理')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  @ApiOperation({ summary: '创建商品' })
  create(@Body() createGoodsDto: CreateGoodsDto) {
    return this.goodsService.create(createGoodsDto)
  }

  @Get()
  @ApiOperation({ summary: '获取商品列表' })
  @ApiResponse({ type: [GoodsListResponseDto] })
  findAll(@Query() query: GoodsQueryDto) {
    return this.goodsService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取商品详情' })
  @ApiResponse({ type: [GoodsItemResponseDto] })
  @ApiParam({ name: 'id', description: '商品ID', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新商品' })
  @ApiParam({ name: 'id', description: '商品ID', type: 'number' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGoodsDto: UpdateGoodsDto) {
    return this.goodsService.update(id, updateGoodsDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品' })
  @ApiParam({ name: 'id', description: '商品ID', type: 'number' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.delete(id)
  }
}
