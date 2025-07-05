import { Injectable } from '@nestjs/common'
import { FileUploadDto } from './dto/file-upload.dto'

@Injectable()
export class UploadService {
  uploadSingleFile({ file, name }: FileUploadDto) {
    // 截取扩展名
    const suffix = file.originalname.split('.').pop()
    // const fileName = name ? name + '.' + suffix : file.filename

    return {
      // name,
      // fileName,
      url: file.path,
      fileSize: file.size,
      fileType: suffix,
    }
  }
}
