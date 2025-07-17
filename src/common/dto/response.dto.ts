import { T } from '@faker-js/faker/dist/airline-CLphikKp'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

class Base {
  @ApiProperty({ description: '是否成功', example: true })
  success: boolean

  @ApiProperty({ description: '业务状态码', example: 0 })
  code: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  message: string
}

export class BaseResponseDto extends Base {}

export class ResponseDto extends Base {
  @ApiProperty({ description: '响应数据', default: null })
  data: any
}

export class BaseListResponseDto extends Base {
  @ApiProperty({ description: '分页数量' })
  pageSize?: number

  @ApiProperty({ description: '分页页码' })
  page?: number

  @ApiProperty({ description: '总数量' })
  total?: number
}

export class ListResponseDto extends Base {
  @ApiProperty({ description: '分页数量' })
  pageSize?: number

  @ApiProperty({ description: '分页页码' })
  page?: number

  @ApiProperty({ description: '响应数据', default: [] })
  data: any[]
}

/** 分页基本参数 */
export class PageParams {
  @ApiPropertyOptional({ type: Number, description: '分页数量', default: 1000 })
  @IsOptional()
  @Type(() => Number)
  pageSize?: number

  @ApiPropertyOptional({ type: Number, description: '分页页码', default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  [key: string]: any
}
