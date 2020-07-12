import request from '@/utils/request'

/**
 * 添加推广链接
 * @param {*} data
 */
export function getProductList(data) {
  return request({
    url: '/admin/get_admin_product_list',
    method: 'post',
    data
  })
}

/**
 * 获取产品分类
 * @param {*} params
 */
export function getProductcate(params) {
  return request({
    url: '/admin/get_admin_class_list',
    method: 'get',
    params
  })
}

/**
 * 添加产品
 * @param {*} data
 */
export function addProduct(data) {
  return request({
    url: '/admin/add_product',
    method: 'post',
    data
  })
}

/**
 * 单个产品详情
 * @param {*} data
 */
export function getProductById(params) {
  return request({
    url: '/admin/product_detail',
    method: 'get',
    params
  })
}

/**
 * 修改产品
 * @param {*} data
 */
export function updateProduct(data) {
  return request({
    url: '/admin/update_product',
    method: 'post',
    data
  })
}

/**
 * 修改产品
 * @param {*} data
 */
export function changeStatus(data) {
  return request({
    url: '/admin/product_status_Set',
    method: 'post',
    data
  })
}

/**
 * 添加产品分类
 * @param {*} data
 */
export function addProductCate(data) {
  return request({
    url: '/admin/add_product_class',
    method: 'post',
    data
  })
}
