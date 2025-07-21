import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseListResponseDto, BaseResponseDto } from 'src/common/dto/response.dto'
import { GoodsResponseDto } from '@/modules/goods/goods.dto'

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称', default: '强烈推荐' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString()
  name: string

  @ApiPropertyOptional({ description: '分类封面图', default: null })
  @IsOptional()
  @IsString()
  cover?: string

  @ApiPropertyOptional({ description: '是否推荐', default: false })
  @IsOptional()
  @IsBoolean()
  isRecommend?: boolean
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CategoryQueryDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @Type(() => Number)
  @IsOptional()
  page?: number

  @ApiPropertyOptional({ description: '每页数量', default: 1000 })
  @Type(() => Number)
  @IsOptional()
  pageSize?: number

  @ApiPropertyOptional({ description: '分类名称关键词' })
  @IsOptional()
  keyword?: string
}

export class CategoryItemDto {
  @ApiProperty({ description: '分类ID' })
  id: number

  @ApiProperty({ description: '分类名称' })
  name: string

  @ApiPropertyOptional({ description: '分类封面图' })
  cover?: string

  @ApiProperty({ description: '商品列表' })
  goods: GoodsResponseDto[]

  @ApiProperty({ description: '是否推荐' })
  isRecommend: boolean

  @ApiProperty({ description: '排序' })
  order: number

  @ApiProperty({ description: '创建时间' })
  createdAt: Date

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date
}

export class UpdateRecommendCategoryDto {
  @ApiProperty({ description: '是否推荐' })
  @IsNotEmpty({ message: '是否推荐不能为空' })
  @Type(() => Boolean)
  isRecommend: boolean
}

export class CategoryListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '分类列表', type: [CategoryItemDto] })
  data: CategoryItemDto[]
}

export class CategoryItemResponseDto extends BaseResponseDto {
  @ApiProperty({ description: '分类', type: CategoryItemDto })
  data: CategoryItemDto
}
