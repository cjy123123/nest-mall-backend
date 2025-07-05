import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T | null
}

@Injectable()
export class AppResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpContext = context.switchToHttp()
    const response = httpContext.getResponse()

    // 状态码从默认的201改成200
    response.status(HttpStatus.OK)

    return next.handle().pipe(
      map((data) => {
        // 处理data是一个对象或数组的情况，能够自定义message
        const { message, ...otherData } = data

        if (message) {
          return {
            success: true,
            message,
            code: 0,
            data: otherData?.data ?? otherData ?? null,
          }
        }

        return {
          success: true,
          message: '请求成功',
          code: 0,
          data,
        }
      }),
    )
  }
}
