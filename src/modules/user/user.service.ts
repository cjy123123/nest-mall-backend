import { BadRequestException, Injectable } from '@nestjs/common'
import { UserLoginDto, UserRegisterDto } from './dto/user.dto'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { PrismaService } from '../prisma/prisma.service'
import { nanoid } from 'nanoid'

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private httpService: HttpService,
  ) {}

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

    return user
  }
}
