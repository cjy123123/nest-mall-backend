import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import type { Response, Request } from 'express'

/**
 * 异常拦截器
 * 拦截所有的异常，返回一个标准的响应格式
 */
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR
    let message = exception.message ?? '服务器内部错误'

    // 处理验证异常
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse()
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        const errorMessages = exceptionResponse['message']
        message = Array.isArray(errorMessages) ? errorMessages[0] : errorMessages
      }
    }

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
