import { Module } from '@nestjs/common'
import { UploadModule } from './modules/upload/upload.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { CategoryModule } from './modules/category/category.module'
import { GoodsModule } from './modules/goods/goods.module'
import { CartModule } from './modules/cart/cart.module'
import { ReceiptModule } from './modules/receipt/receipt.module'
import { GoodsSpecModule } from './modules/goods-spec/goods-spec.module'
import { PosterModule } from './modules/poster/poster.module'
import { CouponModule } from './modules/coupon/coupon.module'

@Module({
  imports: [
    CouponModule,
    PosterModule,
    ReceiptModule,
    UploadModule,
    UserModule,
    PrismaModule,
    CategoryModule,
    CartModule,
    GoodsModule,
    GoodsSpecModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
