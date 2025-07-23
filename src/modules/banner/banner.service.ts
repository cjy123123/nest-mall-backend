import { Injectable } from '@nestjs/common'
import { CreateBannerDto, UpdateBannerDto } from './banner.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BannerService {
  constructor(private prismaService: PrismaService) {}
  async create(createBannerDto: CreateBannerDto) {
    console.log(createBannerDto)
    await this.prismaService.banner.create({
      data: createBannerDto,
    })

    return {
      message: '创建成功',
    }
  }

  async findAll() {
    const banners = await this.prismaService.banner.findMany()

    return {
      data: banners,
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    await this.prismaService.banner.update({
      where: {
        id,
      },
      data: updateBannerDto,
    })

    return {
      message: '更新成功',
    }
  }

  async remove(id: number) {
    await this.prismaService.banner.delete({
      where: {
        id,
      },
    })

    return {
      message: '删除成功',
    }
  }
}
