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
  Put,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiOkResponse,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiBody,
} from '@nestjs/swagger'
import { CategoryService } from './category.service'
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
  CategoryListResponseDto,
  UpdateRecommendCategoryDto,
} from './dto/category.dto'

@Controller('category')
@ApiTags('商品分类')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 首页 - 推荐分类列表
  @Get('recommend')
  @ApiOperation({ summary: '首页 - 推荐分类列表' })
  getRecommendList() {
    return this.categoryService.getRecommendList()
  }

  // 首页 - 修改推荐分类
  @Put('recommend/:id')
  @ApiOperation({ summary: '首页 - 修改推荐分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiBody({ type: UpdateRecommendCategoryDto })
  updateRecommendCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() { isRecommend }: UpdateRecommendCategoryDto,
  ) {
    return this.categoryService.updateRecommendCategory(id, isRecommend)
  }

  @Post()
  @ApiOperation({ summary: '创建分类' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  @ApiOperation({ summary: '获取分类列表' })
  @ApiOkResponse({
    example: {
      success: true,
      message: '请求成功',
      code: 0,
      data: [
        {
          id: 1,
          name: '休闲体验',
          cover: null,
          createdAt: '2025-07-09T15:46:01.822Z',
          updatedAt: '2025-07-09T15:46:01.822Z',
          goods: [
            {
              id: 1,
              title: '木作体验',
              subTitle: '无意',
              description: '到店前请先电话预约',
              price: 50.2,
              stock: 10000,
              cover: '/uploads/test1.jpg',
              detail: '/uploads/test2.jpg',
              status: 0,
              isDiscount: false,
              discountPrice: 0,
              createdAt: '2025-07-09T15:55:29.306Z',
              updatedAt: '2025-07-09T15:55:29.306Z',
              categoryId: 1,
            },
          ],
        },
      ],
      pageSize: 1000,
      page: 1,
      total: 1,
    },
  })
  findAll(@Query() query: CategoryQueryDto) {
    console.log(query)
    return this.categoryService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取分类详情' })
  @ApiParam({ name: 'id', description: '分类ID', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新分类' })
  @ApiParam({ name: 'id', description: '分类ID', type: 'number' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @ApiParam({ name: 'id', description: '分类ID', type: 'number' })
  @ApiResponse({ status: 200, description: '删除成功' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id)
  }
}
