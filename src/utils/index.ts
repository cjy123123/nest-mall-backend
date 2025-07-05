/**
 * 给响应数据添加 message 字段
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应数据
 */
export const addMessageToResponse = (data: any, message: string = '操作成功！') => ({
  data,
  message,
})
