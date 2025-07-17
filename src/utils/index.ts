/**
 * 查询数据时，生成合适的where参数，过滤空值
 */
export const formatWhere = (data: Record<string, any>) => {
  const where: Record<string, any> = {}

  for (const key in data) {
    if (data[key]) {
      where[key] = { contains: data[key] }
    }
  }
  console.log(data)
  return where
}
