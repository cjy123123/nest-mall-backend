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

enum GoodsStatus {
  ON_SALE = 0,
  OFF_SHELF = 1,
}

export class CreateGoodsDto {
  @ApiProperty({ description: '商品标题（商品名称）', default: '木作体验' })
  @IsNotEmpty({ message: '商品标题不能为空' })
  @IsString()
  title: string

  @ApiPropertyOptional({ description: '商品副标题', default: '无意' })
  @IsOptional()
  @IsString()
  subTitle?: string

  @ApiPropertyOptional({ description: '商品描述', default: '到店前请先电话预约' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: '商品价格', default: 50.2 })
  @IsNotEmpty({ message: '商品价格不能为空' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: '商品价格最多保留两位小数' })
  @Min(0, { message: '商品价格不能小于0' })
  price: number

  @ApiProperty({ description: '商品库存', default: 10000 })
  @IsNotEmpty({ message: '商品库存不能为空' })
  @IsInt({ message: '商品库存必须为整数' })
  @Min(0, { message: '商品库存不能小于0' })
  stock: number

  @ApiProperty({ description: '商品封面图', default: '/uploads/test1.jpg' })
  @IsNotEmpty({ message: '商品封面图不能为空' })
  @IsString()
  cover: string

  @ApiProperty({ description: '商品详情图', default: '/uploads/test2.jpg' })
  @IsNotEmpty({ message: '商品详情图不能为空' })
  @IsString()
  detail: string

  @ApiProperty({ description: '商品状态', enum: GoodsStatus, default: GoodsStatus.ON_SALE })
  @IsNotEmpty({ message: '商品状态不能为空' })
  @IsEnum(GoodsStatus, { message: '商品状态只能为0(在售)或1(下架)' })
  status: number

  @ApiPropertyOptional({ description: '是否优惠', default: false })
  @IsOptional()
  @IsBoolean()
  isDiscount?: boolean

  @ApiPropertyOptional({ description: '优惠价格' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: '优惠价格最多保留两位小数' })
  @Min(0, { message: '优惠价格不能小于0' })
  discountPrice?: number

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
  keyword?: string

  @ApiPropertyOptional({ description: '商品分类ID' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number

  @ApiPropertyOptional({ description: '商品状态', enum: GoodsStatus })
  @IsOptional()
  @IsEnum(GoodsStatus)
  status?: number

  @ApiPropertyOptional({ description: '是否优惠' })
  @IsOptional()
  @IsBoolean()
  isDiscount?: boolean

  @ApiPropertyOptional({ description: '价格排序', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  priceSort?: 'asc' | 'desc'
}

export class GoodsResponseDto {
  @ApiProperty({ description: '商品ID' })
  id: number

  @ApiProperty({ description: '商品标题' })
  title: string

  @ApiPropertyOptional({ description: '商品副标题' })
  subTitle: string

  @ApiPropertyOptional({ description: '商品描述' })
  description: string

  @ApiProperty({ description: '商品价格' })
  price: number

  @ApiProperty({ description: '商品库存' })
  stock: number

  @ApiProperty({ description: '商品封面图' })
  cover: string

  @ApiProperty({ description: '商品详情图' })
  detail: string

  @ApiProperty({ description: '商品状态', enum: GoodsStatus })
  status: number

  @ApiProperty({ description: '是否优惠' })
  isDiscount: boolean

  @ApiPropertyOptional({ description: '优惠价格' })
  discountPrice: number

  @ApiProperty({ description: '创建时间' })
  createdAt: Date

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date

  @ApiProperty({ description: '商品分类ID' })
  categoryId: number
}

export class GoodsListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '商品列表', type: [GoodsResponseDto] })
  data: GoodsResponseDto[]
}

export class GoodsItemResponseDto extends BaseResponseDto {
  @ApiProperty({ description: '商品详情', type: GoodsResponseDto })
  data: GoodsResponseDto
}
