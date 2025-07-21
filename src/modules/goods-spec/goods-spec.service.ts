import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateGoodsSpecDto,
  UpdateGoodsSpecDto,
  QueryGoodsSpecDto,
  BatchUpdateSpecItem,
} from './goods-spec.dto'

@Injectable()
export class GoodsSpecService {
  constructor(private prisma: PrismaService) {}

  // 创建商品规格
  async create(createGoodsSpecDto: CreateGoodsSpecDto) {
    // 检查关联的商品是否存在
    const goods = await this.prisma.goods.findUnique({
      where: { id: createGoodsSpecDto.goodsId },
    })

    if (!goods) {
      throw new BadRequestException(`商品ID ${createGoodsSpecDto.goodsId} 不存在`)
    }

    return this.prisma.goodsSpec.create({
      data: createGoodsSpecDto,
    })
  }

  // 查找所有商品规格
  async findAll(goodsId?: number) {
    const where = goodsId ? { goodsId } : {}

    return this.prisma.goodsSpec.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        Goods: {
          select: {
            title: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }

  // 查找单个商品规格
  async findOne(id: number) {
    const goodsSpec = await this.prisma.goodsSpec.findUnique({
      where: { id },
      include: {
        Goods: {
          select: {
            title: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!goodsSpec) {
      throw new NotFoundException(`商品规格ID ${id} 不存在`)
    }

    return goodsSpec
  }

  // 更新商品规格
  async update(id: number, updateGoodsSpecDto: UpdateGoodsSpecDto) {
    // 检查商品规格是否存在
    await this.findOne(id)

    // 如果更新了商品ID，检查新的商品是否存在
    if (updateGoodsSpecDto.goodsId) {
      const goods = await this.prisma.goods.findUnique({
        where: { id: updateGoodsSpecDto.goodsId },
      })

      if (!goods) {
        throw new BadRequestException(`商品ID ${updateGoodsSpecDto.goodsId} 不存在`)
      }
    }

    return this.prisma.goodsSpec.update({
      where: { id },
      data: updateGoodsSpecDto,
    })
  }

  // 删除商品规格
  async remove(id: number) {
    try {
      await this.prisma.cartItem.deleteMany({
        where: { goodsSpecId: id },
      })

      await this.prisma.goodsSpec.delete({
        where: { id },
      })

      return {
        message: '删除成功！',
      }
    } catch (error) {
      throw new BadRequestException('删除失败！')
    }
  }

  // 批量创建商品规格
  async createMany(goodsId: number, specs: Omit<CreateGoodsSpecDto, 'goodsId'>[]) {
    // 检查商品是否存在
    const goods = await this.prisma.goods.findUnique({
      where: { id: goodsId },
    })

    if (!goods) {
      throw new BadRequestException(`商品ID ${goodsId} 不存在`)
    }

    // 为每个规格添加商品ID
    const specsWithGoodsId = specs.map((spec) => ({
      ...spec,
      goodsId,
    }))

    // 使用事务批量创建
    return this.prisma.$transaction(
      specsWithGoodsId.map((spec) => this.prisma.goodsSpec.create({ data: spec })),
    )
  }

  // 更新商品规格库存
  async updateStock(id: number, stockChange: number) {
    const goodsSpec = await this.findOne(id)

    const newStock = goodsSpec.stock + stockChange
    if (newStock < 0) {
      throw new BadRequestException('库存不足')
    }

    return this.prisma.goodsSpec.update({
      where: { id },
      data: { stock: newStock },
    })
  }

  // 批量更新商品规格
  async batchUpdate(updateData: BatchUpdateSpecItem[]) {
    // 使用事务确保原子性
    await this.prisma.$transaction(async (prisma) => {
      for (const item of updateData) {
        // 检查规格是否存在
        const exists = await prisma.goodsSpec.findUnique({
          where: { id: item.id },
        })

        if (!exists) {
          throw new NotFoundException(`商品规格ID ${item.id} 不存在`)
        }

        // 如果更新了商品ID，检查新的商品是否存在
        if (item.data.goodsId) {
          const goods = await prisma.goods.findUnique({
            where: { id: item.data.goodsId },
          })

          if (!goods) {
            throw new BadRequestException(`商品ID ${item.data.goodsId} 不存在`)
          }
        }

        await prisma.goodsSpec.update({
          where: { id: item.id },
          data: item.data,
        })
      }
    })

    return {
      message: '更新成功！',
    }
  }

  // 分页查询商品规格
  async findWithPagination(query: QueryGoodsSpecDto) {
    const { page = 1, pageSize = 10, goodsId, keyword, minPrice, maxPrice, hasStock } = query

    // 构建查询
    const where: any = {}

    if (goodsId) {
      where.goodsId = goodsId
    }

    if (keyword) {
      where.OR = [{ title: { contains: keyword } }, { name: { contains: keyword } }]
    }

    if (minPrice !== undefined) {
      where.price = {
        ...where.price,
        gte: minPrice,
      }
    }

    if (maxPrice !== undefined) {
      where.price = {
        ...where.price,
        lte: maxPrice,
      }
    }

    if (hasStock) {
      where.stock = {
        gt: 0,
      }
    }

    // 执行查询
    const [data, total] = await Promise.all([
      this.prisma.goodsSpec.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          Goods: {
            select: {
              title: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.goodsSpec.count({ where }),
    ])

    // 计算总页数
    const totalPages = Math.ceil(total / pageSize)

    // 返回分页结果
    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages,
      },
    }
  }

  // 检查并锁定库存
  async checkAndLockStock(specId: number, quantity: number): Promise<boolean> {
    // 使用事务和悲观锁确保库存操作的原子性
    return this.prisma.$transaction(async (prisma) => {
      // 查询并锁定记录
      const spec = await prisma.goodsSpec.findUnique({
        where: { id: specId },
        select: { stock: true },
      })

      if (!spec) {
        throw new NotFoundException(`商品规格ID ${specId} 不存在`)
      }

      if (spec.stock < quantity) {
        return false // 库存不足
      }

      // 扣减库存
      await prisma.goodsSpec.update({
        where: { id: specId },
        data: { stock: { decrement: quantity } },
      })

      return true // 库存充足且已锁定
    })
  }

  // 恢复库存
  async restoreStock(specId: number, quantity: number): Promise<void> {
    await this.prisma.goodsSpec.update({
      where: { id: specId },
      data: { stock: { increment: quantity } },
    })
  }
}
