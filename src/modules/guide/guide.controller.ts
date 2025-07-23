import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { GuideService } from './guide.service'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateGuideDto,
  GuideItem,
  GuideItemResponse,
  GuideLikeDto,
  GuideListResponse,
  UpdateGuideDto,
} from './guide.dto'
import { PageParams, ResponseDto } from '@/common/dto/response.dto'

@ApiTags('乐游攻略')
@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get()
  @ApiOperation({ description: '获取攻略列表' })
  @ApiResponse({ type: GuideListResponse })
  findAll(@Query() query: PageParams) {
    return this.guideService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ description: '获取攻略详情' })
  @ApiResponse({ type: GuideItemResponse })
  @ApiParam({ name: 'id', description: '攻略id' })
  @ApiQuery({ name: 'userId', description: '用户id' })
  findOne(@Param('id', ParseIntPipe) id: number, @Query('userId', ParseIntPipe) userId: number) {
    return this.guideService.findOne(id, userId)
  }

  @Post()
  @ApiBody({ type: CreateGuideDto })
  @ApiOperation({ description: '创建攻略' })
  @ApiResponse({ type: ResponseDto })
  create(@Body() createGuideDto: CreateGuideDto) {
    this.guideService.create(createGuideDto)
  }

  @Patch(':id')
  @ApiOperation({ description: '更新攻略' })
  @ApiBody({ type: UpdateGuideDto })
  @ApiResponse({ type: ResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGuideDto: UpdateGuideDto) {
    this.guideService.update(id, updateGuideDto)
  }

  @Delete(':id')
  @ApiOperation({ description: '删除攻略' })
  @ApiResponse({ type: ResponseDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    this.guideService.delete(id)
  }

  @Post('like')
  @ApiBody({ type: GuideLikeDto })
  @ApiOperation({ description: '点赞' })
  @ApiResponse({ type: ResponseDto })
  toggleLike(@Body() guideLikeDto: GuideLikeDto) {
    return this.guideService.toggleLike(guideLikeDto)
  }
}
