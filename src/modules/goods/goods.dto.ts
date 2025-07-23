import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsInt,
  IsPositive,
  IsEnum,
} from 'class-validator'
import { BaseListResponseDto, BaseResponseDto } from '@/common/dto/response.dto'
import { GoodsSpecResponseDto } from '@/modules/goods-spec/goods-spec.dto'
import { CategoryItemDto } from '@/modules/category/category.dto'
import { CouponResponseDto } from '../coupon/coupon.dto'
import { Type } from 'class-transformer'

export class CreateGoodsDto {
  @ApiProperty({ description: '商品标题（商品名称）', default: '木作体验' })
  @IsNotEmpty({ message: '商品标题不能为空' })
  @IsString()
  title: string

  @ApiPropertyOptional({ description: '商品副标题', default: '很不错' })
  @IsOptional()
  subTitle?: string

  @ApiProperty({ description: '商品状态', type: Boolean, default: true })
  isOnSale?: boolean

  @ApiProperty({ description: '商品分类ID' })
  @IsNotEmpty({ message: '商品分类ID不能为空' })
  @IsInt({ message: '商品分类ID必须为整数' })
  @IsPositive({ message: '商品分类ID必须为正整数' })
  categoryId: number
}

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) {}

export class GoodsQueryDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @ApiPropertyOptional({ description: '每页数量', default: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number

  @ApiPropertyOptional({ description: '商品标题关键词' })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({ description: '商品分类id' })
  @IsOptional()
  @IsNumber()
  categoryId?: number

  @ApiPropertyOptional({ description: '商品是否上架', type: Boolean })
  @IsOptional()
  @IsNumber()
  isOnSale?: number
}

export class GoodsResponseDto {
  @ApiProperty({ description: '商品ID' })
  id: number

  @ApiProperty({ description: '商品标题' })
  title: string

  @ApiPropertyOptional({ description: '商品最低价' })
  minPrice?: number

  @ApiPropertyOptional({ description: '商品最高价' })
  maxPrice?: number

  @ApiPropertyOptional({ description: '商品封面（取第一个规格第一张图）' })
  cover?: string

  @ApiProperty({ description: '是否在售' })
  isOnSale: boolean

  @ApiProperty({ description: '创建时间' })
  createdAt: Date

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date

  @ApiProperty({ description: '商品分类ID' })
  categoryId: number

  @ApiProperty({ description: '可领取的优惠券', type: [CouponResponseDto] })
  coupon: CouponResponseDto[]

  @ApiProperty({ description: '商品规格数组', type: [GoodsSpecResponseDto] })
  specification: GoodsSpecResponseDto[]

  @ApiProperty({ description: '所属分类', type: CategoryItemDto })
  category: CategoryItemDto
}

export class GoodsListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '商品列表', type: [GoodsResponseDto] })
  data: GoodsResponseDto[]
}

export class GoodsItemResponseDto extends BaseResponseDto {
  @ApiProperty({ description: '商品详情', type: GoodsResponseDto })
  data: GoodsResponseDto
}
