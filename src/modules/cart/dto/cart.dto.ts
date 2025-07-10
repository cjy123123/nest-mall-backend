import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class CreateCartDto {
  @ApiProperty({ description: '商品id', example: 1 })
  @IsInt()
  @Type(() => Number)
  goodsId: number

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

  @ApiProperty({ description: '商品id数组', example: [1, 2, 3] })
  @IsInt({ each: true })
  @Type(() => Number)
  goodsIds: number[]
}
