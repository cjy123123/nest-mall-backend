import { BaseListResponseDto } from '@/common/dto/response.dto'
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsPhoneNumber } from 'class-validator'

export class CreateReceiptDto {
  @ApiProperty({ description: '用户ID', type: Number })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number

  @ApiProperty({ description: '收货人姓名', type: String })
  @IsNotEmpty({ message: '收货人姓名不能为空' })
  name: string

  @ApiProperty({ description: '手机号', type: String })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string

  @ApiProperty({ description: '所在地区（省，市，区，街道）', type: String })
  @IsNotEmpty({ message: '所在地区不能为空' })
  area: string

  @ApiProperty({ description: '详细地址', type: String })
  @IsNotEmpty({ message: '详细地址不能为空' })
  address: string

  @ApiPropertyOptional({ description: '是否为默认地址', type: Boolean })
  @IsBoolean({ message: '是否为默认地址必须为布尔值' })
  isDefault?: boolean
}

export class UpdateReceiptDto extends PartialType(CreateReceiptDto) {
  @ApiProperty({ description: '收货ID', type: Number })
  @IsNotEmpty({ message: '收货ID不能为空' })
  id: number
}

export class ReceiptDto {
  @ApiProperty({ description: '收货地址ID', type: Number })
  id: number

  @ApiProperty({ description: '用户ID', type: Number })
  userId: number

  @ApiProperty({ description: '收货人姓名', type: String })
  name: string

  @ApiProperty({ description: '手机号', type: String })
  phone: string

  @ApiProperty({ description: '所在地区（省，市，区，街道）', type: String })
  area: string

  @ApiProperty({ description: '详细地址', type: String })
  address: string

  @ApiProperty({ description: '是否为默认地址', type: Boolean })
  isDefault: boolean
}

export class ReceiptListResponseDto extends BaseListResponseDto {
  @ApiProperty({ description: '收货地址列表', type: [ReceiptDto] })
  data: ReceiptDto[]
}
