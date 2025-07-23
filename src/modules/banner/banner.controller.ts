import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BannerService } from './banner.service'
import { BannerListResponse, CreateBannerDto, UpdateBannerDto } from './banner.dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BaseResponseDto } from '@/common/dto/response.dto'

@ApiTags('首页 - 轮播图')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @ApiBody({ type: CreateBannerDto })
  @ApiOperation({ summary: '创建轮播图' })
  @ApiResponse({ type: BaseResponseDto })
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto)
  }

  @Get()
  @ApiOperation({ summary: '获取轮播图列表' })
  @ApiResponse({ type: BannerListResponse })
  findAll() {
    return this.bannerService.findAll()
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBannerDto })
  @ApiOperation({ summary: '更新轮播图' })
  @ApiParam({ name: 'id', description: '轮播图id' })
  @ApiResponse({ type: BaseResponseDto })
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除轮播图' })
  @ApiParam({ name: 'id', description: '轮播图id' })
  @ApiResponse({ type: BaseResponseDto })
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id)
  }
}
