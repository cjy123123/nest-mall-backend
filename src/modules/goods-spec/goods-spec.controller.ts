import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'
import { GoodsSpecService } from './goods-spec.service'
import {
  CreateGoodsSpecDto,
  UpdateGoodsSpecDto,
  QueryGoodsSpecDto,
  BatchUpdateGoodsSpecDto,
  GoodsSpecResponseDto,
  PaginatedResponseDto,
  UpdateStockDto,
} from './dto/goods-spec.dto'

@ApiTags('商品规格')
@Controller('goods-spec')
export class GoodsSpecController {
  constructor(private readonly goodsSpecService: GoodsSpecService) {}

  @Post()
  @ApiOperation({ summary: '创建商品规格' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '创建成功',
    type: GoodsSpecResponseDto,
  })
  create(@Body() createGoodsSpecDto: CreateGoodsSpecDto) {
    return this.goodsSpecService.create(createGoodsSpecDto)
  }

  @Get()
  @ApiOperation({ summary: '获取所有商品规格' })
  @ApiQuery({ name: 'goodsId', required: false, description: '商品ID，可选过滤条件' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取成功',
    type: [GoodsSpecResponseDto],
  })
  findAll(@Query('goodsId') goodsId?: string) {
    return this.goodsSpecService.findAll(goodsId ? parseInt(goodsId) : undefined)
  }

  @Get('search')
  @ApiOperation({ summary: '搜索商品规格（带分页）' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询成功',
    type: PaginatedResponseDto,
  })
  search(@Query() query: QueryGoodsSpecDto) {
    return this.goodsSpecService.findWithPagination(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个商品规格' })
  @ApiParam({ name: 'id', description: '商品规格ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取成功',
    type: GoodsSpecResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '商品规格不存在' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsSpecService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新商品规格' })
  @ApiParam({ name: 'id', description: '商品规格ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
    type: GoodsSpecResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '商品规格不存在' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGoodsSpecDto: UpdateGoodsSpecDto) {
    return this.goodsSpecService.update(id, updateGoodsSpecDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品规格' })
  @ApiParam({ name: 'id', description: '商品规格ID' })
  @ApiResponse({ status: HttpStatus.OK, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.goodsSpecService.remove(id)
  }

  @Post('batch/:goodsId')
  @ApiOperation({ summary: '批量创建商品规格' })
  @ApiParam({ name: 'goodsId', description: '商品ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '批量创建成功',
    type: [GoodsSpecResponseDto],
  })
  createMany(
    @Param('goodsId', ParseIntPipe) goodsId: number,
    @Body() specs: Omit<CreateGoodsSpecDto, 'goodsId'>[],
  ) {
    return this.goodsSpecService.createMany(goodsId, specs)
  }

  @Patch(':id/stock')
  @ApiOperation({ summary: '更新商品规格库存' })
  @ApiParam({ name: 'id', description: '商品规格ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
    type: GoodsSpecResponseDto,
  })
  updateStock(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
    return this.goodsSpecService.updateStock(id, updateStockDto.change)
  }

  @Post('batch-update')
  @ApiOperation({ summary: '批量更新商品规格' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '批量更新成功',
    type: [GoodsSpecResponseDto],
  })
  batchUpdate(@Body() batchUpdateDto: BatchUpdateGoodsSpecDto) {
    return this.goodsSpecService.batchUpdate(batchUpdateDto.specs)
  }

  @Get('by-goods/:goodsId')
  @ApiOperation({ summary: '获取指定商品的所有规格' })
  @ApiParam({ name: 'goodsId', description: '商品ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取成功',
    type: [GoodsSpecResponseDto],
  })
  findByGoodsId(@Param('goodsId', ParseIntPipe) goodsId: number) {
    return this.goodsSpecService.findAll(goodsId)
  }
}
