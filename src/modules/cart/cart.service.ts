import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCartDto, UpdateCartDto, DeleteCartItemsDto } from './dto/cart.dto'

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create({ userId, goodsSpecId, quantity }: CreateCartDto) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    })

    // 如果用户没有购物车，创建一个新的
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      })
    }

    // 检查商品是否已在购物车中
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        goodsSpecId,
      },
    })

    if (existingItem) {
      // 如果已存在，更新数量
      const cartItem = await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity ?? 1) },
      })

      return {
        data: cartItem.quantity,
        message: '购物车更新成功！',
      }
    }

    // 如果不存在，创建新的购物车项
    const cartItem = await this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        goodsSpecId,
        quantity: quantity ?? 1,
      },
    })

    return {
      data: null,
      message: '购物车添加成功！',
    }
  }

  async findOne(userId: number) {
    // 获取用户购物车及所有商品
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        cartItems: {
          include: { goodsSpec: true },
        },
      },
    })

    return {
      data: cart?.cartItems ?? [],
    }
  }

  async update({ userId, goodsSpecId, quantity }: UpdateCartDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    })

    // 检查商品是否已在购物车中
    const currentCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart!.id,
        goodsSpecId,
      },
    })

    await this.prisma.cartItem.update({
      where: {
        id: currentCartItem?.id,
      },
      data: { quantity },
    })

    return {
      data: null,
      message: '购物车更新成功！',
    }
  }

  async remove({ userId, goodsSpecIds }: DeleteCartItemsDto) {
    // 获取用户购物车
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      throw new BadRequestException('用户购物车不存在')
    }

    // 批量删除购物车项
    return this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        goodsSpecId: { in: goodsSpecIds },
      },
    })
  }
}
