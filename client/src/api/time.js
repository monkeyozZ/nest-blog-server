
import request from '@/utils/request'

export function addTimeLine(data) {
  return request({
    url: '/time/save',
    method: 'post',
    data
  })
}

export function getList(params) {
  return request({
    url: '/time/list',
    method: 'get',
    params
  })
}

export function delTime(params) {
  return request({
    url: '/time/del',
    method: 'get',
    params
  })
}
