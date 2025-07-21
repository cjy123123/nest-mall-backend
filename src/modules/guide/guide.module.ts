import { Module } from '@nestjs/common'
import { GuideService } from './guide.service'
import { GuideController } from './guide.controller'

@Module({
  imports: [],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
