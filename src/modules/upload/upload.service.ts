import { Injectable } from '@nestjs/common'
import { FileUploadDto } from './upload.dto'

@Injectable()
export class UploadService {
  uploadSingleFile({ file }: FileUploadDto) {
    // 截取扩展名
    const suffix = file.originalname.split('.').pop()

    return {
      url: file.path.replace('uploads', ''),
      fileSize: file.size,
      fileType: suffix,
    }
  }

  uploadAvatar({ file }: FileUploadDto) {
    // 截取扩展名
    const suffix = file.originalname.split('.').pop()

    return {
      url: file.path.replace('uploads/avatar', ''),
      fileSize: file.size,
      fileType: suffix,
    }
  }
}
