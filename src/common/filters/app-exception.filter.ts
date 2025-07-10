import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import * as dayjs from 'dayjs'
import type { Response, Request } from 'express'

/**
 * 异常拦截器
 * 拦截所有的异常，返回一个标准的响应格式
 * @example
 * {
 *  success: false,
 *  message: '请求参数错误',
 *  code: 400,
 *  data: null,
 *  url: '/api/users'
 *  date: dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
 * }
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception.message ?? '服务器内部错误'

    const result = {
      success: false,
      message,
      code: status,
      data: null,
      url: request.url,
      date: dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
    }

    console.error(result)

    response.status(status).json(result)
  }
}
