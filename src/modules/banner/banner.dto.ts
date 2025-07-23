import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { BannerType } from '@prisma/client'
import { BaseListResponseDto } from '@/common/dto/response.dto'

export class CreateBannerDto {
  @ApiProperty({ description: '轮播图图片', example: '/cover.jpeg' })
  @IsString()
  cover: string

  @ApiProperty({ description: '轮播图标题', example: '轮播图1' })
  @IsString()
  title: string

  @ApiProperty({ description: '轮播图类型', enum: BannerType, example: BannerType.ARTICLE })
  @IsEnum(BannerType)
  type: BannerType

  @ApiPropertyOptional({ description: '轮播图跳转链接', example: 'https://www.baidu.com' })
  @IsOptional()
  articleUrl?: string

  @ApiPropertyOptional({ description: '轮播图跳转视频id', type: Number, example: 1 })
  @IsOptional()
  videoId?: number

  @ApiPropertyOptional({ description: '轮播图排序', example: 0 })
  @IsOptional()
  sort: number
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}

export class BannerItem extends CreateBannerDto {
  @ApiProperty({ description: '轮播图id' })
  id: number

  @ApiProperty({ description: '轮播图创建时间' })
  createdAt: Date

  @ApiProperty({ description: '轮播图更新时间' })
  updatedAt: Date
}

export class BannerListResponse extends BaseListResponseDto {
  @ApiProperty({ description: '轮播图响应数据', type: [BannerItem] })
  data: BannerItem[]
}
