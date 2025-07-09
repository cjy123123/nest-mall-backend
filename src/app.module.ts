import { Module } from '@nestjs/common'
import { UploadModule } from './modules/upload/upload.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { CategoryModule } from './modules/category/category.module'
import { GoodsModule } from './modules/goods/goods.module'

@Module({
  imports: [
    UploadModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    GoodsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
