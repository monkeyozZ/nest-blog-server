import request from '@/utils/request'

export function save(data) {
  return request({
    url: '/article/save',
    method: 'post',
    data
  })
}
