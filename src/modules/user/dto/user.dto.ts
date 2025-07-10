import { ApiProperty } from '@nestjs/swagger'
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
