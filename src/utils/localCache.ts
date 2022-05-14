type key = string

/**
 * 设置本地缓存
 * @param key 键名
 * @param value 值
 */
function set<T>(key: key, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取的对应的localStorage的值
 * @param key 键名
 * @returns 对应的localStorage的值
 */
function get(key: key) {
  const cacheValue = window.localStorage.getItem(key)
  return cacheValue ? JSON.parse(cacheValue) : ''
}

/**
 * 固定期限的localStorage
 * @param key 键名
 * @param value 值
 * @param flag 时间标识
 * @param time 时间
 */
function setInTime<T>(key: key, value: T, flag: 'd' | 'm' | 's', time: number) {
  let timestamp = 0
  switch (flag) {
    case 'd':
      timestamp = time * 24 * 60 * 1000
      break
    case 'm':
      timestamp = time * 60 * 1000
      break
    case 's':
      timestamp = time * 1000
      break
  }
  timestamp = isNaN(timestamp) ? 0 : timestamp
  set(key, {
    value,
    create: new Date().valueOf(),
    end: timestamp
  })
}

/**
 * 获取的对应的localStorage的值以及判断是否过期
 * @param key 键名
 * @returns 对应的localStorage的值 isExpire是否过期
 */
function getInTime(key: key) {
  const { value, create, end } = get(key)
  const timestamp = new Date().valueOf()
  const isExpire = end ? timestamp - parseInt(create) >= parseInt(end) : false
  return {
    value,
    isExpire
  }
}

/**
 * 删除单个localStorage
 * @param key 键名
 */
function remove(key: key) {
  window.localStorage.removeItem(key)
}

/**
 * 移除所有的localStorage
 */
function clear() {
  window.localStorage.clear()
}

export default {
  set,
  get,
  setInTime,
  getInTime,
  remove,
  clear
}
