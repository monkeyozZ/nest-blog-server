import request from '@/utils/request'

/**
 * 添加推广链接
 * @param {*} data
 */
export function addChannelLink(data) {
  return request({
    url: '/admin/addchannel_link',
    method: 'post',
    data
  })
}
/**
 * 推广链接列表
 * @param {*} data
 */
export function getChannelLinkList(params) {
  return request({
    url: '/admin/source/link_list',
    method: 'get',
    params
  })
}

/**
 * 新增推广渠道
 * @param {*} data
 */
export function addChannel(data) {
  return request({
    url: '/admin/channel/create',
    method: 'post',
    data
  })
}

/**
 * 渠道列表
 * @param {*} data
 */
export function getChannelList(params) {
  return request({
    url: '/admin/source/list',
    method: 'get',
    params
  })
}
