import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserLoginDto } from './dto/user.dto'

@Controller('user')
@ApiTags('用户相关')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: UserLoginDto, description: '需要微信登录凭证code' })
  @ApiOkResponse({
    example: {
      success: true,
      message: '请求成功',
      code: 0,
      data: {
        id: 100,
        avatar: '/uploads/default.jpg',
        role: 'user',
        username: '用户EpSxK7',
      },
    },
  })
  login(@Body() userInfo: UserLoginDto) {
    return this.userService.login(userInfo)
  }
}
