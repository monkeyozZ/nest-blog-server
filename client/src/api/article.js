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

export function fakeDelArticle(params) {
  return request({
    url: '/article/del',
    method: 'get',
    params
  })
}

export function reallyDelArticle(params) {
  return request({
    url: '/article/reallyDel',
    method: 'get',
    params
  })
}

export function recoveryDelArticle(params) {
  return request({
    url: '/article/recoveryDel',
    method: 'get',
    params
  })
}
