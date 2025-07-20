import axios from 'axios'

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

  return where
}

/** 获取微信小程序access_token */
export const getAccessTokenAPI = async (appid: string, secret: string) => {
  const url = 'https://api.weixin.qq.com/cgi-bin/token'
  const { data } = await axios.get(url, {
    params: {
      grant_type: 'client_credential',
      appid,
      secret,
    },
  })

  return data
}
