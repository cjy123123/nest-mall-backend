import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'
import { BaseListResponseDto } from 'src/common/dto/response.dto'
import { GoodsResponseDto } from 'src/modules/goods/dto/goods.dto'

export class CreateCartDto {
  @ApiProperty({ description: '商品规格id', example: 1 })
  @IsInt()
  @Type(() => Number)
  goodsSpecId: number

  @ApiProperty({ description: '商品数量', example: 1 })
  @IsInt()
  @Type(() => Number)
  quantity: number

  @ApiProperty({ description: '用户id', example: 1 })
  @IsInt()
  @Type(() => Number)
  userId: number
}

export class UpdateCartDto extends CreateCartDto {}

export class DeleteCartItemsDto {
  @ApiProperty({ description: '用户id', example: 1 })
  @IsInt()
  @Type(() => Number)
  userId: number

  @ApiProperty({ description: '商品规格id数组', example: [1, 2, 3] })
  @IsInt({ each: true })
  @Type(() => Number)
  goodsSpecIds: number[]
}

export class CartResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '购物车商品列表', type: [GoodsResponseDto] })
  data: GoodsResponseDto[]
}
