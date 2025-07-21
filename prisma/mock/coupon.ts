import { nanoid } from 'nanoid'
import { create } from '.'
import dayjs from 'dayjs'
import { fakerZH_CN as faker } from '@faker-js/faker'

export const mockCoupon = () =>
  create(100, async (prisma) => {
    await prisma.coupon.create({
      data: {
        name: '【油车巷】通用优惠券',
        description: '初次见面',
        amount: 10,
        minAmount: 50,
        startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().add(1, 'week').format('YYYY-MM-DD HH:mm:ss'),
        goodsId: faker.number.int({ min: 1, max: 50 }),
      },
    })
  })
