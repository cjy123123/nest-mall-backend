import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { nanoid } from 'nanoid'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = nanoid(12) + '.' + file.originalname.split('.').pop()
          cb(null, fileName)
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB，单位为字节
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
