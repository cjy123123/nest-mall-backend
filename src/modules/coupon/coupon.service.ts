import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCouponDto, UpdateCouponDto, ClaimCouponDto, UseCouponDto } from './dto/coupon.dto'

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  // 创建优惠券
  async create(createCouponDto: CreateCouponDto) {
    // 检查关联的商品是否存在
    const goods = await this.prisma.goods.findUnique({
      where: { id: createCouponDto.goodsId },
    })

    if (!goods) {
      throw new NotFoundException(`商品ID ${createCouponDto.goodsId} 不存在`)
    }

    // 如果指定了分类，检查分类是否存在
    if (createCouponDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: createCouponDto.categoryId },
      })

      if (!category) {
        throw new NotFoundException(`分类ID ${createCouponDto.categoryId} 不存在`)
      }
    }

    // 创建优惠券
    const coupon = await this.prisma.coupon.create({
      data: {
        name: createCouponDto.name,
        description: createCouponDto.description,
        amount: createCouponDto.amount,
        minAmount: createCouponDto.minAmount,
        startTime: createCouponDto.startTime,
        endTime: createCouponDto.endTime,
        type: createCouponDto.type ?? 0,
        categoryId: createCouponDto.categoryId,
        goodsId: createCouponDto.goodsId,
      },
    })

    return {
      data: coupon,
      message: '优惠券创建成功',
    }
  }

  // 查找所有优惠券
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit

    const [coupons, total] = await Promise.all([
      this.prisma.coupon.findMany({
        skip,
        take: limit,
        include: {
          category: true,
          goods: {
            select: {
              id: true,
              title: true,
              cover: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.coupon.count(),
    ])

    return {
      data: coupons,
      meta: {
        total,
        page,
        limit,
      },
    }
  }

  // 查找单个优惠券
  async findOne(id: number) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { id },
      include: {
        category: true,
        goods: {
          select: {
            id: true,
            title: true,
            cover: true,
          },
        },
      },
    })

    if (!coupon) {
      throw new NotFoundException(`优惠券ID ${id} 不存在`)
    }

    return {
      data: coupon,
    }
  }

  // 更新优惠券
  async update(id: number, updateCouponDto: UpdateCouponDto) {
    // 检查优惠券是否存在
    const existingCoupon = await this.prisma.coupon.findUnique({
      where: { id },
    })

    if (!existingCoupon) {
      throw new NotFoundException(`优惠券ID ${id} 不存在`)
    }

    // 如果更新了商品ID，检查商品是否存在
    if (updateCouponDto.goodsId) {
      const goods = await this.prisma.goods.findUnique({
        where: { id: updateCouponDto.goodsId },
      })

      if (!goods) {
        throw new NotFoundException(`商品ID ${updateCouponDto.goodsId} 不存在`)
      }
    }

    // 如果更新了分类ID，检查分类是否存在
    if (updateCouponDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateCouponDto.categoryId },
      })

      if (!category) {
        throw new NotFoundException(`分类ID ${updateCouponDto.categoryId} 不存在`)
      }
    }

    // 更新优惠券
    const coupon = await this.prisma.coupon.update({
      where: { id },
      data: {
        ...updateCouponDto,
      },
    })

    return {
      data: coupon,
      message: '优惠券更新成功',
    }
  }

  // 用户领取优惠券
  async claimCoupon({ userId, couponId }: ClaimCouponDto) {
    // 检查用户是否存在
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException(`用户ID ${userId} 不存在`)
    }

    // 检查用户是否已领取过该优惠券
    const existingUserCoupon = await this.prisma.userCoupon.findUnique({
      where: {
        userId_couponId: {
          userId,
          couponId,
        },
      },
    })

    if (existingUserCoupon) {
      throw new ConflictException('您已领取过该优惠券')
    }

    // 领取优惠券
    const userCoupon = await this.prisma.userCoupon.create({
      data: {
        userId,
        couponId,
        status: 0, // 0-未使用
      },
      include: {
        coupon: true,
      },
    })

    return {
      data: userCoupon,
      message: '优惠券领取成功',
    }
  }

  // 查询用户的优惠券
  async findUserCoupons(userId: number, status?: number) {
    // 检查用户是否存在
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException(`用户ID ${userId} 不存在`)
    }

    const where: any = { userId }

    if (status !== undefined) {
      where.status = status
    }

    const userCoupons = await this.prisma.userCoupon.findMany({
      where,
      include: {
        coupon: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      data: userCoupons,
    }
  }

  // 标记优惠券为已使用
  async markCouponAsUsed({ userId, couponId }: UseCouponDto) {
    // 检查用户优惠券是否存在
    const userCoupon = await this.prisma.userCoupon.findUnique({
      where: {
        userId_couponId: {
          userId,
          couponId,
        },
      },
    })

    if (!userCoupon) {
      throw new NotFoundException('未找到该优惠券')
    }

    if (userCoupon.status !== 0) {
      throw new ConflictException('该优惠券不可用')
    }

    // 更新优惠券状态为已使用
    const updatedUserCoupon = await this.prisma.userCoupon.update({
      where: {
        id: userCoupon.id,
      },
      data: {
        status: 1, // 1-已使用
        usedTime: new Date(),
      },
      include: {
        coupon: true,
      },
    })

    return {
      data: updatedUserCoupon,
      message: '优惠券已使用',
    }
  }

  // 检查优惠券是否过期并更新状态
  async checkExpiredCoupons() {
    const now = new Date()

    // 查找已过期但状态不是已过期的用户优惠券
    const expiredUserCoupons = await this.prisma.userCoupon.findMany({
      where: {
        status: 0, // 未使用
        coupon: {
          endTime: { lt: now },
        },
      },
      include: {
        coupon: true,
      },
    })

    // 批量更新为已过期状态
    if (expiredUserCoupons.length > 0) {
      await this.prisma.userCoupon.updateMany({
        where: {
          id: {
            in: expiredUserCoupons.map((uc) => uc.id),
          },
        },
        data: {
          status: 2, // 2-已过期
        },
      })
    }

    return {
      data: expiredUserCoupons.length,
      message: `${expiredUserCoupons.length}张优惠券已标记为过期`,
    }
  }

  // 获取当前用户对应当前商品的优惠券列表
  async getCouponsForUserAndGoods(userId: number, goodsId: number) {
    // 先找到用户优惠券列表，获取到用户当前所有优惠券ID
    const userCouponList = await this.prisma.userCoupon.findMany({
      where: {
        userId,
      },
    })

    const userClaimedCouponIds = userCouponList.map((coupon) => coupon.couponId)

    const couponList = await this.prisma.coupon.findMany({
      where: {
        goodsId,
      },
    })

    return {
      data: couponList.map((coupon) => ({
        ...coupon,
        claimed: userClaimedCouponIds.includes(coupon.id),
      })),
    }
  }
}
