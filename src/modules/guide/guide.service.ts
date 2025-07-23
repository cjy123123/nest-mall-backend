import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGuideDto, DeleteGuideDto, GuideLikeDto, UpdateGuideDto } from './guide.dto'
import { PageParams } from '@/common/dto/response.dto'

@Injectable()
export class GuideService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page = 1, pageSize = 1000 }: PageParams) {
    const total = await this.prisma.guide.count()

    const guides = await this.prisma.guide.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return {
      data: guides,
      page,
      pageSize,
      total,
    }
  }

  async findOne(id: number, userId: number) {
    const guide = await this.prisma.guide.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        detail: true,
        banner: true,
        likes: true,
        likedUserIds: true,
      },
    })

    if (!guide) {
      throw new BadRequestException('攻略不存在！')
    }

    const { likedUserIds, ...rest } = guide

    return {
      data: {
        ...rest,
        isLiked: (guide.likedUserIds as number[]).includes(userId),
      },
    }
  }

  async create(createGuideDto: CreateGuideDto) {
    await this.prisma.guide.create({
      data: createGuideDto,
    })

    return {
      message: '创建成功！',
      data: null,
    }
  }

  async update(id: number, updateGuideDto: UpdateGuideDto) {
    await this.prisma.guide.update({
      where: { id },
      data: updateGuideDto,
    })

    return {
      message: '修改成功！',
      data: null,
    }
  }

  async delete(id: number) {
    await this.prisma.guide.delete({
      where: { id },
    })

    return {
      message: '删除成功！',
      data: null,
    }
  }

  async toggleLike({ guideId, userId }: GuideLikeDto) {
    const guide = await this.prisma.guide.findUnique({
      where: { id: guideId },
    })

    if (!guide) {
      throw new BadRequestException('攻略不存在！')
    }

    const likedUserIds: number[] = guide.likedUserIds as number[]

    const isLiked = likedUserIds.includes(userId)

    // 取消点赞
    if (isLiked) {
      await this.prisma.guide.update({
        where: { id: guideId },
        data: {
          likes: { decrement: 1 },
          likedUserIds: likedUserIds.filter((id) => id !== userId),
        },
      })

      return {
        message: '取消点赞成功！',
      }
    }
    // 点赞
    likedUserIds.push(userId)

    await this.prisma.guide.update({
      where: { id: guideId },
      data: {
        likes: { increment: 1 },
        likedUserIds,
      },
    })

    return {
      message: '点赞成功！',
    }
  }
}
