import { ApiProperty } from '@nestjs/swagger'

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '文件',
  })
  file: Express.Multer.File

  @ApiProperty({
    description: '文件重命名，不需要扩展名',
    required: false,
    default: '',
  })
  name?: string = ''
}
