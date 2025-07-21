import { BaseResponseDto } from '@/common/dto/response.dto'
import { ApiProperty } from '@nestjs/swagger'

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '文件',
  })
  file: Express.Multer.File
}

export class FileUpload {
  @ApiProperty({ description: '文件路径' })
  url: string
}

export class FileUploadResponse extends BaseResponseDto {
  @ApiProperty({ type: FileUpload })
  data: FileUpload
}
