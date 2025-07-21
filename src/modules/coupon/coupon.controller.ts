import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common'
import { CouponService } from './coupon.service'
import {
  CreateCouponDto,
  UpdateCouponDto,
  ClaimCouponDto,
  UseCouponDto,
  CouponListResponseDto,
  CouponResponseDto,
  UserCouponListResponseDto,
  UserCurrentGoodsCouponListResponse,
  UserCurrentGoodsCouponListDto,
} from './coupon.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BaseResponseDto, ResponseDto } from 'src/common/dto/response.dto'

@ApiTags('优惠券管理')
@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @ApiOperation({ summary: '创建优惠券' })
  @ApiResponse({ type: ResponseDto })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto)
  }

  @Get('goods')
  @ApiOperation({
    summary: '获取当前用户对应当前商品的优惠券列表',
  })
  @ApiResponse({ type: UserCurrentGoodsCouponListResponse })
  getCouponsForUserAndGoods(@Query() { userId, goodsId }: UserCurrentGoodsCouponListDto) {
    return this.couponService.getCouponsForUserAndGoods(userId, goodsId)
  }

  @Get()
  @ApiOperation({ summary: '获取所有优惠券' })
  @ApiResponse({ type: CouponListResponseDto })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.couponService.findAll(+page, +limit)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个优惠券详情' })
  @ApiResponse({ type: BaseResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.findOne(id)
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取用户的优惠券' })
  @ApiResponse({ type: UserCouponListResponseDto })
  getUserCoupons(@Param('userId', ParseIntPipe) userId: number, @Query('status') status?: number) {
    return this.couponService.findUserCoupons(userId, status !== undefined ? +status : undefined)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新优惠券' })
  @ApiResponse({ type: ResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto)
  }

  @Post('claim')
  @ApiOperation({ summary: '用户领取优惠券' })
  @ApiResponse({ type: ResponseDto })
  claimCoupon(@Body() claimCouponDto: ClaimCouponDto) {
    return this.couponService.claimCoupon(claimCouponDto)
  }

  @Post('use')
  @ApiOperation({ summary: '标记优惠券为已使用' })
  @ApiResponse({ type: ResponseDto })
  useCoupon(@Body() useCouponDto: UseCouponDto) {
    return this.couponService.markCouponAsUsed(useCouponDto)
  }
}
