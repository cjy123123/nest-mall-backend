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
  create(100, async (prisma) => {
    await prisma.goods.create({
      data: {
        categoryId: faker.number.int({ min: 1, max: 10 }),
        title: faker.music.genre() + faker.music.songName() + faker.word.noun(1),
        subTitle: faker.book.title(),
        description: faker.word.words({ count: { min: 5, max: 20 } }).replaceAll(' ', ''),
        price: faker.number.float({ min: 10, max: 500, multipleOf: 0.02 }),
        stock: faker.number.int({ min: 100, max: 1000 }),
        cover: '/cover2.png',
        detail: '/detail.png',
        status: 0,
        isDiscount: faker.datatype.boolean(),
        discountPrice: faker.number.float({ min: 10, max: 500, multipleOf: 0.02 }),
      },
    })
  })
