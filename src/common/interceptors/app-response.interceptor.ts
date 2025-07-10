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
        const { message, pageSize, page, total, data: restData, ...rest } = data

        const result = {
          success: true,
          message: message ?? '请求成功！',
          code: 0,
          data: restData ?? (Object.keys(rest).length > 0 ? rest : null),
          pageSize,
          page,
          total,
        }

        console.log(result)

        return result
      }),
    )
  }
}
