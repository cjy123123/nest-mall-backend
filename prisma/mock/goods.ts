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
        cover: '/cover2.png',
        detail: '/detail.png',
        isOnSale: true,
      },
    })
  })
