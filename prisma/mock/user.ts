import { nanoid } from 'nanoid'
import { create, faker } from '.'

export const mockUser = () =>
  create(10, async (prisma) => {
    await prisma.user.create({
      data: {
        username: '用户' + nanoid(6),
        openid: nanoid(10),
      },
    })
  })
