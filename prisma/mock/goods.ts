import { create } from '.'
import { fakerZH_CN as faker } from '@faker-js/faker'

export const mockCategory = () =>
  create(10, async (prisma) => {
    await prisma.category.create({
      data: {
        name: faker.food.adjective() + faker.food.dish(),
        cover: '/cover.jpeg',
        isRecommend: faker.datatype.boolean(),
      },
    })
  })

export const mockGoods = () =>
  create(50, async (prisma) => {
    await prisma.goods.create({
      data: {
        categoryId: faker.number.int({ min: 1, max: 10 }),
        title: faker.music.genre() + faker.music.songName() + faker.word.noun(1),
        cover: '/cover2.png',
        detail: '/detail.png',
        isOnSale: faker.datatype.boolean(),
      },
    })
  })

export const mockGoodsSpec = async () =>
  await create(200, async (prisma) => {
    const count = await prisma.goods.count()

    await prisma.goodsSpec.create({
      data: {
        goodsId: faker.number.int({ min: 1, max: count }),
        title: faker.music.songName(),
        name: faker.music.songName(),
        cover: '/cover2.png',
        detail: '/detail.png',
        price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
        isDiscount: faker.datatype.boolean(),
        stock: faker.number.int({ min: 100, max: 9999 }),
        discountPrice: faker.number.float({ min: 1, max: 500, fractionDigits: 2 }),
      },
    })
  })
