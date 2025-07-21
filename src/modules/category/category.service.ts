import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
  CategoryListResponseDto,
  CategoryItemDto,
} from './category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    })
  }

  async findAll(query: CategoryQueryDto) {
    const { page = 1, pageSize = 1000, keyword } = query
    // 构建查询条件
    const where = keyword ? { name: { contains: keyword } } : {}

    // 查询总数
    const total = await this.prisma.category.count({ where })

    // 查询分页数据
    const categories = await this.prisma.category.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      include: {
        goods: true,
      },
    })

    return {
      data: categories,
      total,
      page,
      pageSize,
    }
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { goods: true },
    })

    console.log(category)
    if (!category) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      })
    } catch (error) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }
  }

  async delete(id: number) {
    try {
      // 删除所有关联的 Coupon 记录（type=1 的分类优惠券）
      await this.prisma.coupon.deleteMany({
        where: { categoryId: id },
      })

      // 删除所有关联的 Goods 记录（商品分类）
      await this.prisma.goods.deleteMany({
        where: { categoryId: id },
      })

      await this.prisma.category.delete({ where: { id } })

      return {
        message: '删除成功！',
      }
    } catch (error) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }
  }

  async getRecommendList() {
    const categories = await this.prisma.category.findMany({
      where: { isRecommend: true },
      include: { goods: true },
    })

    return {
      data: categories,
    }
  }

  async updateRecommendCategory(id: number, isRecommend: boolean) {
    try {
      await this.prisma.category.update({
        where: { id },
        data: { isRecommend },
      })
    } catch (error) {
      throw new NotFoundException(`分类ID ${id} 不存在`)
    }

    return {
      data: null,
      message: '更新成功！',
    }
  }

  async updateOrder(list: CategoryItemDto[]) {
    try {
      await this.prisma.$transaction(
        list.map((item, index) => {
          return this.prisma.category.update({
            where: { id: item.id },
            data: { order: index + 1 },
          })
        }),
      )

      return {
        message: '修改成功！',
      }
    } catch (error) {
      throw new NotFoundException('修改失败！')
    }
  }
}
