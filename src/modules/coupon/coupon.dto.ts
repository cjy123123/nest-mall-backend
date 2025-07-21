import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { BaseListResponseDto, BaseResponseDto } from 'src/common/dto/response.dto'

export enum USER_COUPON_STATUS {
  'UN_USED' = 0,
  'USED' = 1,
  'EXPIRED' = 2,
}

export class CreateCouponDto {
  @ApiProperty({ description: '优惠券名称', example: '满100减10' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: '优惠券描述', example: '全场通用', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ description: '优惠金额', example: 10 })
  @Type(() => Number)
  @IsNumber()
  amount: number

  @ApiProperty({ description: '最低使用金额', example: 100 })
  @Type(() => Number)
  @IsNumber()
  minAmount: number

  @ApiProperty({ description: '生效时间', example: '2023-01-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  startTime: Date

  @ApiProperty({ description: '过期时间', example: '2023-12-31T23:59:59Z' })
  @IsDate()
  @Type(() => Date)
  endTime: Date

  @ApiPropertyOptional({ description: '优惠券类型：0-通用，1-商品分类', example: 0, default: 0 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  type?: number = 0

  @ApiPropertyOptional({
    description: '可用商品分类ID（当type=1时有效）',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number

  @ApiProperty({ description: '关联的商品ID（用于领取优惠券）', example: 1 })
  @IsInt()
  @Type(() => Number)
  goodsId: number
}

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}

export class ClaimCouponDto {
  @ApiProperty({ description: '优惠券ID', example: 1 })
  @IsInt()
  @Type(() => Number)
  couponId: number

  @ApiProperty({ description: '用户ID', example: 1 })
  @IsInt()
  @Type(() => Number)
  userId: number
}

export class UseCouponDto {
  @ApiProperty({ description: '优惠券ID', example: 1 })
  @IsInt()
  @Type(() => Number)
  couponId: number

  @ApiProperty({ description: '用户ID', example: 1 })
  @IsInt()
  @Type(() => Number)
  userId: number
}

export class CouponResponseDto {
  @ApiProperty({ description: '优惠券ID', example: 1 })
  id: number

  @ApiProperty({ description: '优惠券名称', example: '满100减10' })
  name: string

  @ApiProperty({ description: '优惠券描述', example: '全场通用' })
  description?: string

  @ApiProperty({ description: '优惠金额', example: '10.00' })
  amount: string

  @ApiProperty({ description: '最低使用金额', example: '100.00' })
  minAmount: string

  @ApiProperty({ description: '生效时间', example: '2023-01-01T00:00:00Z' })
  startTime: Date

  @ApiProperty({ description: '过期时间', example: '2023-12-31T23:59:59Z' })
  endTime: Date

  @ApiProperty({ description: '优惠券类型：0-通用，1-商品分类', example: 0 })
  type: number

  @ApiProperty({ description: '可用商品分类ID', example: 1 })
  categoryId?: number

  @ApiProperty({ description: '关联的商品ID', example: 1 })
  goodsId: number

  @ApiProperty({ description: '创建时间', example: '2023-01-01T00:00:00Z' })
  createdAt: Date

  @ApiProperty({ description: '更新时间', example: '2023-01-01T00:00:00Z' })
  updatedAt: Date
}

export class CouponListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '优惠券列表', type: [CouponResponseDto] })
  data: CouponResponseDto[]
}

export class UserCouponResponseDto {
  @ApiProperty({ description: '用户优惠券ID', example: 1 })
  id: number

  @ApiProperty({ description: '用户ID', example: 1 })
  userId: number

  @ApiProperty({ description: '优惠券ID', example: 1 })
  couponId: number

  @ApiProperty({
    enum: USER_COUPON_STATUS,
    description: '优惠券状态：0-未使用，1-已使用，2-已过期',
  })
  status: USER_COUPON_STATUS

  @ApiProperty({ description: '使用时间', example: '2023-01-01T00:00:00Z', required: false })
  usedTime?: Date

  @ApiProperty({ description: '创建时间', example: '2023-01-01T00:00:00Z' })
  createdAt: Date

  @ApiProperty({ description: '更新时间', example: '2023-01-01T00:00:00Z' })
  updatedAt: Date

  @ApiProperty({ description: '优惠券信息', type: CouponResponseDto })
  coupon: CouponResponseDto
}

export class UserCouponListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '用户优惠券列表', type: [UserCouponResponseDto] })
  data: UserCouponResponseDto[]
}

export class UserCurrentGoodsCoupon extends CouponResponseDto {
  @ApiProperty({ description: '是否已领取', example: true })
  claimed: boolean
}

export class UserCurrentGoodsCouponListDto {
  @ApiProperty({ description: '商品ID', example: 1 })
  @Type(() => Number)
  goodsId: number

  @ApiProperty({ description: '用户ID', example: 1 })
  @IsNumber()
  @Type(() => Number)
  userId: number
}

/** 当前用户对应当前商品的优惠券列表 */
export class UserCurrentGoodsCouponListResponse extends BaseListResponseDto {
  @ApiProperty({ description: '优惠券列表', type: [UserCurrentGoodsCoupon] })
  data: UserCurrentGoodsCoupon[]
}
