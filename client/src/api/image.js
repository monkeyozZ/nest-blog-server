import request from '@/utils/request'

export function deleteImg(params) {
  return request({
    url: '/upload/delete',
    method: 'get',
    params
  })
}
