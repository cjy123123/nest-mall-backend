import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UploadModule } from './modules/upload/upload.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './modules/prisma/prisma.module'

@Module({
  imports: [
    UploadModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
