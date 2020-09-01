import request from '@/utils/request'

export function save(data) {
  return request({
    url: '/article/save',
    method: 'post',
    data
  })
}

export function getArticle(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}
