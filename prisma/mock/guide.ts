import { create, faker } from '.'

export const mockGuide = () =>
  create(30, async (prisma) => {
    await prisma.guide.create({
      data: {
        title: faker.music.songName(),
        detail: '/detail.png',
        cover: '/cover2.png',
        banner: '/cover.jpeg',
      },
    })
  })
