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

  async findAll(query: GoodsQueryDto) {
    const { page = 1, pageSize = 100, keyword, categoryId } = query

    // 构建查询条件
    const where: any = {}

    if (keyword) {
      where.title = { contains: keyword }
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    // 构建排序条件
    const orderBy: any = { id: 'desc' }

    // 查询总数
    const total = await this.prisma.goods.count({ where })

    // 查询分页数据
    const data = await this.prisma.goods.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: {
        category: true,
        specification: true,
      },
    })

    const newData = data.map(({ specification, ...rest }) => {
      return {
        ...rest,
        minPrice: Math.min(...specification.map((spec) => spec.price)),
        maxPrice: Math.max(...specification.map((spec) => spec.price)),
        specification,
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

    return goods
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
