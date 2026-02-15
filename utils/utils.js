// 一些工具函数

/**
 * 检查目标值是否为对象
 * @param {any} target - 需要检查的目标值
 * @returns {boolean} - 如果是对象则返回true，否则返回false
 */
export function isObject(target) {
  return typeof target === 'object' && target !== null;
}

export function hasChanged(oldValue, newValue) {
  // 可以判断NAN===NAN和+0===-0
  return !Object.is(oldValue, newValue);
}
// 检查是否为原始值
export const RAW = Symbol('raw');



