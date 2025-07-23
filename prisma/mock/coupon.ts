import dayjs from 'dayjs'
import { create, faker } from '.'

export const mockCoupon = () =>
  create(100, async (prisma) => {
    await prisma.coupon.create({
      data: {
        name: '【油车巷】通用优惠券',
        description: '初次见面',
        amount: 10,
        minAmount: 50,
        startTime: dayjs().toISOString(),
        endTime: dayjs().add(1, 'week').toISOString(),
        goodsId: faker.number.int({ min: 1, max: 50 }),
      },
    })
  })
