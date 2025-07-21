import { BaseListResponseDto, BaseResponseDto } from '@/common/dto/response.dto'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

export class CreateGuideDto {
  @ApiProperty({ description: '攻略标题', default: '线路介绍' })
  @IsString()
  title: string

  @ApiProperty({ description: '攻略详情图', default: '/detail.png' })
  @IsString()
  detail: string

  @ApiProperty({ description: '攻略封面图', default: '/cover2.png' })
  @IsString()
  cover: string

  @ApiProperty({ description: '攻略顶图', default: '/cover.jpeg' })
  @IsString()
  banner: string
}

export class UpdateGuideDto extends PartialType(CreateGuideDto) {}

export class DeleteGuideDto {
  @ApiProperty({ description: '攻略id' })
  @IsNumber()
  @Type(() => Number)
  id: number
}

export class GuideLikeDto {
  @ApiProperty({ description: '攻略id' })
  @IsNumber()
  @Type(() => Number)
  guideId: number

  @ApiProperty({})
  @IsNumber()
  @Type(() => Number)
  userId: number
}

export class GuideItem {
  @ApiProperty({ description: '攻略id' })
  id: number

  @ApiProperty({ description: '攻略标题' })
  title: string

  @ApiProperty({ description: '攻略详情图' })
  detail: string

  @ApiProperty({ description: '攻略封面图' })
  cover: string

  @ApiProperty({ description: '攻略顶图' })
  banner: string

  @ApiProperty({ description: '点赞数' })
  likes: number

  @ApiProperty({ description: '当前用户是否点赞' })
  isLiked: boolean
}

export class GuideItemResponse extends BaseResponseDto {
  @ApiProperty({ description: '攻略详情', type: GuideItem })
  data: GuideItem
}

export class GuideListResponse extends BaseListResponseDto {
  @ApiProperty({ description: '攻略列表', type: [GuideItem] })
  data: GuideItem[]
}
