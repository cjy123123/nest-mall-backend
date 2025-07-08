import { ApiProperty } from '@nestjs/swagger'

export class UserLoginDto {
  @ApiProperty({ required: true })
  code: string
}

export class UserRegisterDto {
  @ApiProperty({ required: true })
  openid: string
}
