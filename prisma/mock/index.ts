import { PrismaClient } from '@prisma/client'
import { mockUser } from './user'
import { mockCategory, mockGoods } from './goods'

export const create = async (count = 10, callback: (prisma: PrismaClient) => Promise<void>) => {
  const prisma = new PrismaClient()
  for (let i = 1; i <= count; i++) {
    await callback(prisma)
  }
}

const run = async () => {
  await mockUser()
  await mockCategory()
  await mockGoods()

  console.log('Seed OK')
}

run()
