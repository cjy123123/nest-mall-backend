import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileUploadDto } from './dto/file-upload.dto'

@Controller('upload')
@ApiTags('文件上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '上传单个文件',
    description: '限制最大为10MB，multipart/form-data格式',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiOkResponse({
    example: {
      success: true,
      message: '请求成功',
      code: 0,
      data: {
        url: 'uploads/XYSdzI5LMyPX.jpg',
        fileSize: 3575611,
        fileType: 'jpg',
      },
    },
  })
  uploadSingleFile(@UploadedFile() file: Express.Multer.File, @Body('name') name?: string) {
    return this.uploadService.uploadSingleFile({ file, name })
  }

  // TODO: 文件数组上传
  @Post('multiple')
  uploadMultipleFiles() {}
}
