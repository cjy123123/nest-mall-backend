import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { addMessageToResponse } from './utils'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/info')
  getInfo() {
    return addMessageToResponse([1, 2, 3], '获取信息成功')
  }
}
