import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateReceiptDto, UpdateReceiptDto } from './dto/receipt.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ReceiptService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReceiptDto: CreateReceiptDto) {
    // 如果isDefault = true 则将其他默认地址改为false
    if (createReceiptDto.isDefault) {
      await this.clearOtherDefaults(createReceiptDto.userId)
    }

    await this.prismaService.receipt.create({
      data: createReceiptDto,
    })

    return {
      data: null,
      message: '添加成功！',
    }
  }

  async findOne(userId: number) {
    const receiptList = await this.prismaService.receipt.findMany({
      where: {
        userId,
      },
    })

    return {
      data: receiptList,
      message: '查询成功！',
    }
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const currentReceipt = await this.prismaService.receipt.findUnique({
      where: {
        id,
      },
    })

    if (!currentReceipt) {
      throw new BadRequestException('收货地址不存在')
    }

    if (updateReceiptDto.isDefault) {
      await this.clearOtherDefaults(currentReceipt.userId)
    }

    await this.prismaService.receipt.update({
      where: {
        id,
      },
      data: updateReceiptDto,
    })

    return {
      data: null,
      message: '修改成功！',
    }
  }

  async remove(id: number) {
    await this.prismaService.receipt.delete({
      where: {
        id,
      },
    })

    return {
      data: null,
      message: '删除成功！',
    }
  }

  async clearOtherDefaults(userId: number) {
    await this.prismaService.receipt.updateMany({
      where: {
        userId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    })
  }
}
