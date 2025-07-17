import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto, UserPageParams, UserRegisterDto, UserUpdateDto } from './dto/user.dto'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { PrismaService } from '../prisma/prisma.service'
import { nanoid } from 'nanoid'
import { PageParams } from '@/common/dto/response.dto'
import { formatWhere } from '@/utils'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private httpService: HttpService,
  ) {}

  public async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  public async findAll({ page = 1, pageSize = 1000, phone, username }: UserPageParams) {
    const total = await this.prismaService.user.count()

    const userList = await this.prismaService.user.findMany({
      where: formatWhere({ phone, username }),
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return {
      data: userList,
      page,
      pageSize,
      total,
    }
  }

  public async login({ code: js_code }: UserLoginDto) {
    const appid = this.configService.get<string>('WECHAT_APP_ID')
    const secret = this.configService.get<string>('WECHAT_APP_SECRET')
    const grant_type = this.configService.get<string>('WECHAT_GRANT_TYPE')
    const url = this.configService.get<string>('WECHAT_CODE_SWTICH_ID_URL')!

    const checkResultObservable = this.httpService.get(url, {
      params: {
        appid,
        secret,
        js_code,
        grant_type,
      },
    })

    const { data } = await lastValueFrom(checkResultObservable)

    // code 错误时
    if (data.errcode) {
      throw new BadRequestException(data.errmsg)
    }

    // 成功时，获取到openid
    const { openid } = data

    // 检查是否存在用户
    const user = await this.prismaService.user.findUnique({
      where: {
        openid,
      },
    })

    if (!user) {
      return await this.register({ openid })
    }

    return user
  }

  async register({ openid }: UserRegisterDto) {
    const user = await this.prismaService.user.create({
      data: {
        openid,
        username: '用户' + nanoid(6),
      },
    })

    // 创建购物车
    const cart = await this.prismaService.cart.create({
      data: {
        userId: user.id,
      },
    })

    console.log('成功创建购物车：', cart)

    return user
  }

  async update(userInfo: UserUpdateDto, id: number) {
    try {
      await this.prismaService.user.update({
        where: { id },
        data: {
          username: userInfo.username,
          avatar: userInfo.avatar,
          phone: userInfo.phone,
        },
      })
    } catch {
      throw new BadRequestException('修改失败！')
    }

    return {
      message: '修改成功！',
    }
  }

  async delete(id: number) {
    try {
      await this.prismaService.user.delete({
        where: { id },
      })
    } catch {
      throw new BadRequestException('删除失败！')
    }

    return {
      message: '删除成功！',
    }
  }
}
