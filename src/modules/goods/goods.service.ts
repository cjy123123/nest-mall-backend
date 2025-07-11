import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateGoodsDto,
  UpdateGoodsDto,
  GoodsQueryDto,
  GoodsListResponseDto,
} from './dto/goods.dto'

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGoodsDto: CreateGoodsDto) {
    return await this.prisma.goods.create({
      data: createGoodsDto,
      include: { category: true },
    })
  }

  async findAll(query: GoodsQueryDto): Promise<GoodsListResponseDto> {
    const { page = 1, pageSize = 10, keyword, categoryId, status, isDiscount, priceSort } = query

    // 构建查询条件
    const where: any = {}

    if (keyword) {
      where.title = { contains: keyword }
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (status !== undefined) {
      where.status = status
    }

    if (isDiscount !== undefined) {
      where.isDiscount = isDiscount
    }

    // 构建排序条件
    const orderBy: any = { id: 'desc' }

    if (priceSort) {
      orderBy.price = priceSort
    }

    // 查询总数
    const total = await this.prisma.goods.count({ where })

    // 查询分页数据
    const items = await this.prisma.goods.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: { category: true },
    })

    return {
      items,
      total,
      page,
      pageSize,
    }
  }

  async findOne(id: number) {
    const goods = await this.prisma.goods.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!goods) {
      throw new NotFoundException(`商品ID ${id} 不存在`)
    }

    return goods
  }

  async update(id: number, updateGoodsDto: UpdateGoodsDto) {
    try {
      const goods = await this.prisma.goods.update({
        where: { id },
        data: updateGoodsDto,
        include: { category: true },
      })

      return {
        ...goods,
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
