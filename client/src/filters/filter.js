/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  console.log(time)
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(/-/g, '/').replace('T', ' ').replace(/\+[0-9:]+/ig, '')// 为了兼容ios的时间格式转化
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000
  console.log(d, now, diff)
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

const catefilter = (cate) => {
  if (cate === 'learn') {
    return '学无止境'
  } else if (cate === 'note') {
    return '个人归档'
  } else if (cate === 'life') {
    return '慢生活'
  }
}

const openfilter = (status) => {
  if (status) {
    return '公开'
  } else {
    return '私密'
  }
}

const statusfilter = (status) => {
  if (status) {
    return '已发布'
  } else {
    return '草稿'
  }
}

export default { parseTime, formatTime, catefilter, openfilter, statusfilter }
