import { ApiProperty } from '@nestjs/swagger'

export class CreatePosterDto {
  @ApiProperty({ description: '商品ID' })
  goodsId: number
}
