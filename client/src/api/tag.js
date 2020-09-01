
import request from '@/utils/request'

export function save(data) {
  return request({
    url: '/tag/save',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params
  })
}

export function remove(params) {
  return request({
    url: '/tag/delete',
    method: 'get',
    params
  })
}
