import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FileUploadDto, FileUploadResponse } from './upload.dto'
import { diskStorage } from 'multer'
import { nanoid } from 'nanoid'

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
  @ApiResponse({ type: FileUploadResponse })
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadSingleFile({ file })
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatar',
        filename: (req, file, cb) => {
          const fileName = nanoid(12) + '.' + file.originalname.split('.').pop()
          cb(null, fileName)
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  @ApiOperation({
    summary: '头像上传',
    description: '限制最大为10MB，multipart/form-data格式',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @ApiResponse({ type: FileUploadResponse })
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadAvatar({ file })
  }

  // TODO: 文件数组上传
  // @ApiOperation({
  //   summary: '（暂时不做）上传多个文件',
  //   description: '限制最大为10MB，multipart/form-data格式',
  // })
  // @Post('multiple')
  // uploadMultipleFiles() {
  //   return {
  //     data: null,
  //     message: '接口不支持',
  //   }
  // }
}
