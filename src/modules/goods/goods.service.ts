import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGoodsDto, UpdateGoodsDto, GoodsQueryDto, GoodsListResponseDto } from './goods.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGoodsDto: CreateGoodsDto) {
    return await this.prisma.goods.create({
      data: createGoodsDto,
      include: { category: true },
    })
  }

  async findAll(query: GoodsQueryDto) {
    const { page = 1, pageSize = 100, title, categoryId, isOnSale } = query
    console.log(isOnSale)
    // 构建查询条件
    const where: Prisma.GoodsWhereInput = {}

    if (title) {
      where.title = { contains: title }
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (isOnSale !== undefined) {
      where.isOnSale = !!isOnSale
    }

    // 查询总数
    const total = await this.prisma.goods.count({ where })

    // 查询分页数据
    const data = await this.prisma.goods.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'desc' },
      include: {
        category: true,
        specification: true,
        coupon: true,
      },
    })

    const newData = data.map(({ specification, ...rest }) => {
      return {
        ...rest,
        minPrice: Math.min(...specification.map((spec) => spec.price)),
        maxPrice: Math.max(...specification.map((spec) => spec.price)),
        specification,
        cover: specification[0]?.cover?.[0],
      }
    })

    return {
      data: newData,
      total,
      page,
      pageSize,
    }
  }

  async findOne(id: number) {
    const goods = await this.prisma.goods.findUnique({
      where: { id },
      include: { category: true, specification: true },
    })

    if (!goods) {
      throw new NotFoundException(`商品ID ${id} 不存在`)
    }

    const { specification, ...rest } = goods
    const minPrice = Math.min(...specification.map((spec) => spec.price))
    const maxPrice = Math.max(...specification.map((spec) => spec.price))
    const cover = specification[0]?.cover?.[0]

    return {
      data: {
        ...rest,
        minPrice,
        maxPrice,
        cover,
        specification,
      },
    }
  }

  async update(id: number, updateGoodsDto: UpdateGoodsDto) {
    try {
      const goods = await this.prisma.goods.update({
        where: { id },
        data: updateGoodsDto,
        include: { category: true, specification: true },
      })

      return {
        message: '更新成功!',
      }
    } catch (error) {
      throw new NotFoundException(`商品ID ${id} 不存在`)
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.goods.delete({ where: { id } })
    } catch (error) {
      throw new NotFoundException(`商品ID ${id} 不存在`)
    }
  }
}
