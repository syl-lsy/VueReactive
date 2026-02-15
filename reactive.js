import handler from './handler/index.js';
import { isObject } from './utils/utils.js';
// 原始对象和代理对象的映射
const proxyMap = new WeakMap();
// Vue响应式的初始文件
export default function reactive(target) {
  if (!isObject(target)) {
    // 如果不是对象则直接返回
    return target;
  }
  if (proxyMap.has(target)) {
    // 如果已经代理过则直接返回
    return proxyMap.get(target);
  }
  const proxy = new Proxy(target, handler);
  return proxy;
}
