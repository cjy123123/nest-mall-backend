import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

// 创建商品规格 DTO
export class CreateGoodsSpecDto {
  @ApiProperty({ description: '规格标题' })
  @IsString()
  title: string

  @ApiProperty({ description: '规格名称' })
  @IsString()
  name: string

  @ApiProperty({ description: '服务描述' })
  @IsString()
  description: string

  @ApiProperty({ description: '规格价格' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number

  @ApiProperty({ description: '规格库存' })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number

  @ApiProperty({ description: '商品封面图' })
  @IsOptional()
  @IsArray()
  cover: string[]

  @ApiProperty({ description: '商品详情图' })
  @IsString()
  detail: string

  @ApiPropertyOptional({ description: '是否优惠', default: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isDiscount?: boolean = false

  @ApiPropertyOptional({ description: '优惠价格' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  discountPrice?: number

  @ApiProperty({ description: '关联商品ID' })
  @IsNumber()
  @Type(() => Number)
  goodsId: number
}

// 更新商品规格 DTO
export class UpdateGoodsSpecDto {
  @ApiPropertyOptional({ description: '规格标题' })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({ description: '规格名称' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: '服务描述' })
  @IsString()
  description?: string

  @ApiPropertyOptional({ description: '规格价格' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number

  @ApiPropertyOptional({ description: '规格库存' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock?: number

  @ApiPropertyOptional({ description: '商品封面图' })
  @IsOptional()
  @IsArray()
  cover?: string[]

  @ApiPropertyOptional({ description: '商品详情图' })
  @IsOptional()
  @IsString()
  detail?: string

  @ApiPropertyOptional({ description: '是否优惠' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isDiscount?: boolean

  @ApiPropertyOptional({ description: '优惠价格' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  discountPrice?: number

  @ApiPropertyOptional({ description: '关联商品ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  goodsId?: number
}

// 查询商品规格 DTO
export class QueryGoodsSpecDto {
  @ApiPropertyOptional({ description: '页码', default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1

  @ApiPropertyOptional({ description: '每页数量', default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  pageSize?: number = 10

  @ApiPropertyOptional({ description: '商品ID' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  goodsId?: number

  @ApiPropertyOptional({ description: '规格名称关键词' })
  @IsOptional()
  @IsString()
  keyword?: string

  @ApiPropertyOptional({ description: '最低价格' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice?: number

  @ApiPropertyOptional({ description: '最高价格' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number

  @ApiPropertyOptional({ description: '是否只显示有库存', default: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hasStock?: boolean
}

// 批量更新商品规格项 DTO
export class BatchUpdateSpecItem {
  @ApiProperty({ description: '规格ID' })
  @IsNumber()
  id: number

  @ApiProperty({ description: '更新数据' })
  @ValidateNested()
  @Type(() => UpdateGoodsSpecDto)
  data: UpdateGoodsSpecDto
}

// 批量更新商品规格 DTO
export class BatchUpdateGoodsSpecDto {
  @ApiProperty({ description: '批量更新的规格列表', type: [BatchUpdateSpecItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchUpdateSpecItem)
  specs: BatchUpdateSpecItem[]
}

// 更新库存 DTO
export class UpdateStockDto {
  @ApiProperty({ description: '库存变化量（正数增加，负数减少）' })
  @IsNumber()
  @Type(() => Number)
  change: number
}

// 商品规格响应 DTO
export class GoodsSpecResponseDto {
  @ApiProperty({ description: '规格ID' })
  id: number

  @ApiProperty({ description: '规格标题' })
  title: string

  @ApiProperty({ description: '规格名称' })
  name: string

  @ApiProperty({ description: '规格价格' })
  price: number

  @ApiProperty({ description: '规格库存' })
  stock: number

  @ApiPropertyOptional({ description: '商品封面图' })
  cover: string[]

  @ApiPropertyOptional({ description: '商品详情图' })
  detail: string

  @ApiProperty({ description: '服务描述' })
  description: string

  @ApiProperty({ description: '是否优惠' })
  isDiscount: boolean

  @ApiPropertyOptional({ description: '优惠价格' })
  discountPrice?: number

  @ApiProperty({ description: '关联商品ID' })
  goodsId: number

  @ApiProperty({ description: '创建时间' })
  createdAt: Date

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date
}

// 分页元数据 DTO
export class PaginationMeta {
  @ApiProperty({ description: '当前页码' })
  page: number

  @ApiProperty({ description: '每页数量' })
  pageSize: number

  @ApiProperty({ description: '总记录数' })
  total: number

  @ApiProperty({ description: '总页数' })
  totalPages: number
}

// 分页响应 DTO
export class PaginatedResponseDto {
  @ApiProperty({ description: '数据列表', type: [GoodsSpecResponseDto] })
  data: GoodsSpecResponseDto[]

  @ApiProperty({ description: '分页元数据' })
  meta: PaginationMeta
}
