import { Optional } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class CreatePosterDto {
  @ApiProperty({ description: '商品ID' })
  goodsId: number

  @ApiProperty({ description: '商品规格ID' })
  goodsSpecId: number
}

export class GetQRCodeDTO {
  @ApiProperty({ description: '页面路径', default: 'pages/goods/detail' })
  page: string

  @ApiPropertyOptional({ description: '商品ID（商品详情页需要携带）', default: 1 })
  @Optional()
  @IsNumber()
  @Type(() => Number)
  goodsId?: number

  @ApiPropertyOptional({ description: '商品规格ID（商品详情页需要携带）', default: 1 })
  @Optional()
  @IsNumber()
  @Type(() => Number)
  goodsSpecId?: number
}
