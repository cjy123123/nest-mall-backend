import { BaseListResponseDto, BaseResponseDto, PageParams } from '@/common/dto/response.dto'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UserLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'code不能为空' })
  code: string
}

export class UserRegisterDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'openid' })
  openid: string
}

export class UserUpdateDto {
  @ApiProperty({ default: '小青蛙' })
  @IsOptional()
  username?: string

  @ApiProperty({ default: '/uploads/1.jpg' })
  @IsOptional()
  avatar?: string
  @ApiProperty({ default: '13221811874' })
  @IsOptional()
  phone?: string
}

export class UserInfo {
  @ApiProperty({ type: 'number', description: '用户id' })
  id: number

  @ApiProperty({ type: 'string', description: '用户名称' })
  username: string

  @ApiPropertyOptional({ type: 'string', description: '密码' })
  password?: string

  @ApiProperty({ type: 'string', description: '头像' })
  avatar: string

  @ApiPropertyOptional({ type: 'string', description: '手机号码' })
  phone?: string

  @ApiProperty({ type: 'string', description: '角色' })
  role: string

  @ApiProperty({ type: 'string', description: 'openid' })
  openid: string

  @ApiProperty({ type: 'string', description: '创建时间' })
  createdAt: Date

  @ApiProperty({ type: 'string', description: '更新时间' })
  updatedAt: Date
}

export class UserListResponse extends BaseListResponseDto {
  @ApiProperty({ type: [UserInfo] })
  data: UserInfo[]
}

export class UserItemResponse extends BaseResponseDto {
  @ApiProperty({ type: UserInfo })
  data: UserInfo
}

export class UserPageParams extends PageParams {
  @ApiPropertyOptional({ type: 'string', description: '手机号码' })
  @IsOptional()
  phone?: string

  @ApiPropertyOptional({ type: 'string', description: '用户名' })
  @IsOptional()
  username?: string
}
