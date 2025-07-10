import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { UserLoginDto, UserUpdateDto } from './dto/user.dto'

@Controller('user')
@ApiTags('用户相关')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
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

  @Patch(':id')
  @ApiBody({ type: UserUpdateDto })
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: '用户id',
    required: true,
    example: 1001,
  })
  @ApiOkResponse({
    example: {
      success: true,
      message: '修改成功！',
      code: 0,
      data: null,
    },
  })
  update(@Body() userInfo: UserUpdateDto, @Param('id', ParseIntPipe) id: number) {
    console.log(userInfo, id)
    return this.userService.update(userInfo, id)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: '用户id',
    required: true,
    example: 1001,
  })
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({
    example: {
      success: true,
      message: '删除成功！',
      code: 0,
      data: null,
    },
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}
